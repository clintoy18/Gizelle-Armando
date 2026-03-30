export interface GuestPhotoUpload {
  id: string;
  guestName: string;
  imageDataUrl: string;
  createdAt: string;
  fileName: string;
}

interface CreateGuestPhotoUploadInput {
  guestName: string;
  file: File;
}

const STORAGE_KEY = 'gizelle-armando-guest-photos';
const MAX_IMAGE_WIDTH = 1600;
const JPEG_QUALITY = 0.82;

function readUploads(): GuestPhotoUpload[] {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw) as GuestPhotoUpload[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeUploads(uploads: GuestPhotoUpload[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(uploads));
}

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

async function compressImage(file: File): Promise<string> {
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
    return dataUrl;
  }

  context.drawImage(image, 0, 0, width, height);
  return canvas.toDataURL('image/jpeg', JPEG_QUALITY);
}

export function getGuestPhotoUploads(): GuestPhotoUpload[] {
  return readUploads().sort(
    (left, right) => new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime(),
  );
}

export function getGuestPhotoUploadById(uploadId: string): GuestPhotoUpload | undefined {
  return getGuestPhotoUploads().find((upload) => upload.id === uploadId);
}

export async function createGuestPhotoUpload({
  guestName,
  file,
}: CreateGuestPhotoUploadInput): Promise<GuestPhotoUpload> {
  const imageDataUrl = await compressImage(file);
  const uploads = readUploads();

  const upload: GuestPhotoUpload = {
    id: crypto.randomUUID(),
    guestName: guestName.trim(),
    imageDataUrl,
    createdAt: new Date().toISOString(),
    fileName: file.name,
  };

  uploads.unshift(upload);
  writeUploads(uploads);
  return upload;
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
