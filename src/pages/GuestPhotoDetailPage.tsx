import { Link, useParams } from 'react-router-dom';
import { ChevronLeft, Upload } from 'lucide-react';
import { formatUploadDate, getGuestPhotoUploadById } from '../lib/guestPhotoStorage';

export function GuestPhotoDetailPage() {
  const { uploadId = '' } = useParams();
  const upload = getGuestPhotoUploadById(uploadId);

  if (!upload) {
    return (
      <div className="min-h-screen bg-[linear-gradient(180deg,#fffdf9_0%,#f5ede2_100%)]">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <p
            className="mb-4 text-sm uppercase tracking-[0.35em]"
            style={{ fontFamily: "'Lora', serif", color: '#8b6f47' }}
          >
            Guest Photo
          </p>
          <h1
            className="text-4xl"
            style={{ fontFamily: "'Playfair Display', serif", color: '#2d2926' }}
          >
            This upload could not be found
          </h1>
          <p
            className="mx-auto mt-5 max-w-xl leading-8"
            style={{ fontFamily: "'Lora', serif", color: '#5a5a5a' }}
          >
            It may have been removed from this browser or was never uploaded on this device.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/guest-photos"
              className="rounded-full border px-5 py-3 text-sm uppercase tracking-[0.18em]"
              style={{ borderColor: '#d7cab8', color: '#2d2926', fontFamily: "'Lora', serif" }}
            >
              Return to gallery
            </Link>
            <Link
              to="/guest-upload"
              className="rounded-full px-5 py-3 text-sm uppercase tracking-[0.18em] text-white"
              style={{ backgroundColor: '#8b6f47', fontFamily: "'Lora', serif" }}
            >
              Upload another photo
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcf8f2]">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <Link
            to="/guest-photos"
            className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em]"
            style={{ fontFamily: "'Lora', serif", color: '#8b6f47' }}
          >
            <ChevronLeft className="h-4 w-4" />
            Back to guest gallery
          </Link>

          <Link
            to="/guest-upload"
            className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm uppercase tracking-[0.18em] text-white transition hover:opacity-90"
            style={{ backgroundColor: '#8b6f47', fontFamily: "'Lora', serif" }}
          >
            <Upload className="h-4 w-4" />
            Upload another photo
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="overflow-hidden rounded-[2rem] bg-white shadow-sm">
            <img
              src={upload.imageDataUrl}
              alt={`Uploaded by ${upload.guestName}`}
              className="h-full max-h-[80vh] w-full object-cover"
            />
          </div>

          <aside className="rounded-[2rem] border border-stone-200 bg-white p-8 shadow-sm sm:p-10">
            <p
              className="text-sm uppercase tracking-[0.35em]"
              style={{ fontFamily: "'Lora', serif", color: '#8b6f47' }}
            >
              Guest Submission
            </p>
            <h1
              className="mt-4 text-4xl"
              style={{ fontFamily: "'Playfair Display', serif", color: '#2d2926' }}
            >
              {upload.guestName}
            </h1>
            <p
              className="mt-4 text-base leading-8"
              style={{ fontFamily: "'Lora', serif", color: '#5a5a5a' }}
            >
              Captured and uploaded as part of Armando and Gizelle&apos;s wedding memory wall.
            </p>

            <div className="mt-10 space-y-5 border-t border-stone-200 pt-8">
              <div>
                <p
                  className="text-sm uppercase tracking-[0.18em]"
                  style={{ fontFamily: "'Lora', serif", color: '#8b6f47' }}
                >
                  Uploaded on
                </p>
                <p
                  className="mt-2 text-lg"
                  style={{ fontFamily: "'Playfair Display', serif", color: '#2d2926' }}
                >
                  {formatUploadDate(upload.createdAt)}
                </p>
              </div>

              <div>
                <p
                  className="text-sm uppercase tracking-[0.18em]"
                  style={{ fontFamily: "'Lora', serif", color: '#8b6f47' }}
                >
                  Original file
                </p>
                <p
                  className="mt-2 break-all text-base"
                  style={{ fontFamily: "'Lora', serif", color: '#5a5a5a' }}
                >
                  {upload.fileName}
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
