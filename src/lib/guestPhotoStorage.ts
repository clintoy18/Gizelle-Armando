import { GUEST_PHOTO_BUCKET, getSupabaseClient } from './supabase';

export interface GuestPhotoItem {
  id: string;
  imageUrl: string;
  fileName: string;
  sortOrder: number;
}

export interface GuestPhotoBatch {
  id: string;
  guestName: string;
  createdAt: string;
  coverImageUrl: string;
  photoCount: number;
  photos: GuestPhotoItem[];
}

interface CreateGuestPhotoUploadsInput {
  guestName: string;
  files: File[];
}

interface GuestPhotoBatchRow {
  id: string;
  guest_name: string;
  created_at: string;
  photos: GuestPhotoItemRow[];
}

interface GuestPhotoItemRow {
  id: string;
  storage_path: string;
  file_name: string;
  sort_order: number;
}

const MAX_IMAGE_WIDTH = 1600;
const JPEG_QUALITY = 0.82;

function loadImage(dataUrl: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error('Failed to load image preview.'));
    image.src = dataUrl;
  });
}

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error('Unable to read the selected file.'));
    reader.readAsDataURL(file);
  });
}

async function compressImage(file: File): Promise<Blob> {
  const dataUrl = await readFileAsDataUrl(file);
  const image = await loadImage(dataUrl);
  const scale = image.width > MAX_IMAGE_WIDTH ? MAX_IMAGE_WIDTH / image.width : 1;
  const width = Math.round(image.width * scale);
  const height = Math.round(image.height * scale);

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext('2d');
  if (!context) {
    return file;
  }

  context.drawImage(image, 0, 0, width, height);
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error('Unable to prepare this image for upload.'));
          return;
        }

        resolve(blob);
      },
      'image/jpeg',
      JPEG_QUALITY,
    );
  });
}

function createPublicImageUrl(storagePath: string) {
  const { data } = getSupabaseClient().storage.from(GUEST_PHOTO_BUCKET).getPublicUrl(storagePath);
  return data.publicUrl;
}

function mapPhotoItem(row: GuestPhotoItemRow): GuestPhotoItem {
  return {
    id: row.id,
    imageUrl: createPublicImageUrl(row.storage_path),
    fileName: row.file_name,
    sortOrder: row.sort_order,
  };
}

function mapBatchRow(row: GuestPhotoBatchRow): GuestPhotoBatch {
  const photos = [...(row.photos ?? [])]
    .sort((left, right) => left.sort_order - right.sort_order)
    .map(mapPhotoItem);

  return {
    id: row.id,
    guestName: row.guest_name,
    createdAt: row.created_at,
    coverImageUrl: photos[0]?.imageUrl ?? '',
    photoCount: photos.length,
    photos,
  };
}

async function isImageUrlAvailable(imageUrl: string): Promise<boolean> {
  try {
    const response = await fetch(imageUrl, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
}

async function filterMissingPhotos(batch: GuestPhotoBatch): Promise<GuestPhotoBatch | null> {
  const availability = await Promise.all(batch.photos.map((photo) => isImageUrlAvailable(photo.imageUrl)));
  const photos = batch.photos.filter((_, index) => availability[index]);

  if (photos.length === 0) {
    return null;
  }

  return {
    ...batch,
    photos,
    photoCount: photos.length,
    coverImageUrl: photos[0].imageUrl,
  };
}

async function ensureAnonymousSession() {
  const supabase = getSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session?.user) {
    return session.user;
  }

  const { data, error } = await supabase.auth.signInAnonymously();
  if (error || !data.user) {
    throw new Error(error?.message ?? 'Unable to start a guest upload session.');
  }

  return data.user;
}

export async function getGuestPhotoBatches(): Promise<GuestPhotoBatch[]> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('guest_photo_batches')
    .select(
      'id, guest_name, created_at, photos:guest_photo_items(id, storage_path, file_name, sort_order)',
    )
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  const mappedBatches = (data ?? []).map((row) => mapBatchRow(row as GuestPhotoBatchRow));
  const filteredBatches = await Promise.all(mappedBatches.map(filterMissingPhotos));
  return filteredBatches.filter((batch): batch is GuestPhotoBatch => batch !== null);
}

export async function getGuestPhotoBatchById(batchId: string): Promise<GuestPhotoBatch | null> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('guest_photo_batches')
    .select(
      'id, guest_name, created_at, photos:guest_photo_items(id, storage_path, file_name, sort_order)',
    )
    .eq('id', batchId)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    return null;
  }

  return filterMissingPhotos(mapBatchRow(data as GuestPhotoBatchRow));
}

export async function createGuestPhotoUploads({
  guestName,
  files,
}: CreateGuestPhotoUploadsInput): Promise<GuestPhotoBatch> {
  const supabase = getSupabaseClient();
  const user = await ensureAnonymousSession();
  const batchId = crypto.randomUUID();

  const { error: batchError } = await supabase.from('guest_photo_batches').insert({
    id: batchId,
    user_id: user.id,
    guest_name: guestName.trim(),
  });

  if (batchError) {
    throw new Error(batchError.message);
  }

  for (const [index, file] of files.entries()) {
    const itemId = crypto.randomUUID();
    const compressedImage = await compressImage(file);
    const sanitizedFileName = file.name.replace(/\s+/g, '-').toLowerCase();
    const storagePath = `${user.id}/${batchId}/${index + 1}-${itemId}-${sanitizedFileName}.jpg`;

    const { error: uploadError } = await supabase.storage
      .from(GUEST_PHOTO_BUCKET)
      .upload(storagePath, compressedImage, {
        cacheControl: '3600',
        contentType: 'image/jpeg',
        upsert: false,
      });

    if (uploadError) {
      throw new Error(uploadError.message);
    }

    const { error: itemError } = await supabase.from('guest_photo_items').insert({
      id: itemId,
      batch_id: batchId,
      storage_path: storagePath,
      file_name: file.name,
      sort_order: index,
    });

    if (itemError) {
      throw new Error(itemError.message);
    }
  }

  const createdBatch = await getGuestPhotoBatchById(batchId);
  if (!createdBatch) {
    throw new Error('Unable to load the uploaded photo batch.');
  }

  return createdBatch;
}

export function formatUploadDate(createdAt: string): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(createdAt));
}
