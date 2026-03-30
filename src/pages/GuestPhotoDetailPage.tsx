import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronLeft, Upload } from 'lucide-react';
import { formatUploadDate, getGuestPhotoUploadById } from '../lib/guestPhotoStorage';
import type { GuestPhotoUpload } from '../lib/guestPhotoStorage';
import { isSupabaseConfigured } from '../lib/supabase';

export function GuestPhotoDetailPage() {
  const { uploadId = '' } = useParams();
  const [upload, setUpload] = useState<GuestPhotoUpload | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setError('Supabase is not configured yet. Add your project credentials in .env.local to load shared guest uploads.');
      setIsLoading(false);
      return;
    }

    let isMounted = true;

    const loadUpload = async () => {
      try {
        const data = await getGuestPhotoUploadById(uploadId);
        if (isMounted) {
          setUpload(data);
        }
      } catch (loadError) {
        if (isMounted) {
          setError(loadError instanceof Error ? loadError.message : 'Unable to load this guest photo right now.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void loadUpload();

    return () => {
      isMounted = false;
    };
  }, [uploadId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[linear-gradient(180deg,#fffdf9_0%,#f5ede2_100%)]">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h1
            className="text-4xl"
            style={{ fontFamily: "'Playfair Display', serif", color: '#2d2926' }}
          >
            Loading guest photo
          </h1>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[linear-gradient(180deg,#fffdf9_0%,#f5ede2_100%)]">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h1
            className="text-4xl"
            style={{ fontFamily: "'Playfair Display', serif", color: '#2d2926' }}
          >
            Guest photo unavailable
          </h1>
          <p
            className="mx-auto mt-5 max-w-xl leading-8"
            style={{ fontFamily: "'Lora', serif", color: '#8f2d2d' }}
          >
            {error}
          </p>
        </div>
      </div>
    );
  }

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
            It may have been removed or the link may no longer be valid.
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
              src={upload.imageUrl}
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
