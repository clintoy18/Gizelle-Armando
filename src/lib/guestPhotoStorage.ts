import { GUEST_PHOTO_BUCKET, getSupabaseClient } from './supabase';

export interface GuestPhotoUpload {
  id: string;
  guestName: string;
  imageUrl: string;
  createdAt: string;
  fileName: string;
}

interface CreateGuestPhotoUploadInput {
  guestName: string;
  file: File;
}

interface CreateGuestPhotoUploadsInput {
  guestName: string;
  files: File[];
}

interface GuestPhotoUploadRow {
  id: string;
  guest_name: string;
  storage_path: string;
  file_name: string;
  created_at: string;
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

function mapUploadRow(row: GuestPhotoUploadRow): GuestPhotoUpload {
  const { data } = getSupabaseClient().storage.from(GUEST_PHOTO_BUCKET).getPublicUrl(row.storage_path);

  return {
    id: row.id,
    guestName: row.guest_name,
    imageUrl: data.publicUrl,
    createdAt: row.created_at,
    fileName: row.file_name,
  };
}

async function isImageUrlAvailable(imageUrl: string): Promise<boolean> {
  try {
    const response = await fetch(imageUrl, {
      method: 'HEAD',
    });
    return response.ok;
  } catch {
    return false;
  }
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

export async function getGuestPhotoUploads(): Promise<GuestPhotoUpload[]> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('guest_photo_uploads')
    .select('id, guest_name, storage_path, file_name, created_at')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  const uploads = (data ?? []).map((row) => mapUploadRow(row as GuestPhotoUploadRow));
  const availability = await Promise.all(uploads.map((upload) => isImageUrlAvailable(upload.imageUrl)));

  return uploads.filter((_, index) => availability[index]);
}

export async function getGuestPhotoUploadById(uploadId: string): Promise<GuestPhotoUpload | null> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('guest_photo_uploads')
    .select('id, guest_name, storage_path, file_name, created_at')
    .eq('id', uploadId)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    return null;
  }

  const upload = mapUploadRow(data as GuestPhotoUploadRow);
  const isAvailable = await isImageUrlAvailable(upload.imageUrl);
  return isAvailable ? upload : null;
}

export async function createGuestPhotoUpload({
  guestName,
  file,
}: CreateGuestPhotoUploadInput): Promise<GuestPhotoUpload> {
  const [upload] = await createGuestPhotoUploads({
    guestName,
    files: [file],
  });

  return upload;
}

export async function createGuestPhotoUploads({
  guestName,
  files,
}: CreateGuestPhotoUploadsInput): Promise<GuestPhotoUpload[]> {
  const supabase = getSupabaseClient();
  const user = await ensureAnonymousSession();
  const createdUploads: GuestPhotoUpload[] = [];

  for (const file of files) {
    const uploadId = crypto.randomUUID();
    const compressedImage = await compressImage(file);
    const sanitizedFileName = file.name.replace(/\s+/g, '-').toLowerCase();
    const storagePath = `${user.id}/${uploadId}-${sanitizedFileName}.jpg`;

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

    const { data, error } = await supabase
      .from('guest_photo_uploads')
      .insert({
        id: uploadId,
        user_id: user.id,
        guest_name: guestName.trim(),
        storage_path: storagePath,
        file_name: file.name,
      })
      .select('id, guest_name, storage_path, file_name, created_at')
      .single();

    if (error) {
      throw new Error(error.message);
    }

    createdUploads.push(mapUploadRow(data as GuestPhotoUploadRow));
  }

  return createdUploads;
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
