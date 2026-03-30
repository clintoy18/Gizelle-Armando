import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Images, Upload } from 'lucide-react';
import { formatUploadDate, getGuestPhotoUploads } from '../lib/guestPhotoStorage';
import type { GuestPhotoUpload } from '../lib/guestPhotoStorage';
import { isSupabaseConfigured } from '../lib/supabase';

export function GuestPhotoGalleryPage() {
  const [uploads, setUploads] = useState<GuestPhotoUpload[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setError('Supabase is not configured yet. Add your project credentials in .env.local to load the shared gallery.');
      setIsLoading(false);
      return;
    }

    let isMounted = true;

    const loadUploads = async () => {
      try {
        const data = await getGuestPhotoUploads();
        if (isMounted) {
          setUploads(data);
        }
      } catch (loadError) {
        if (isMounted) {
          setError(loadError instanceof Error ? loadError.message : 'Unable to load guest uploads right now.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void loadUploads();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fffdf9_0%,#f5ede2_100%)]">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <Link
            to="/#rsvp"
            className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em]"
            style={{ fontFamily: "'Lora', serif", color: '#8b6f47' }}
          >
            <ChevronLeft className="h-4 w-4" />
            Back to invitation
          </Link>

          <Link
            to="/guest-upload"
            className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm uppercase tracking-[0.18em] text-white transition hover:opacity-90"
            style={{ backgroundColor: '#8b6f47', fontFamily: "'Lora', serif" }}
          >
            <Upload className="h-4 w-4" />
            Upload a photo
          </Link>
        </div>

        <div className="mb-10 text-center">
          <p
            className="mb-4 text-sm uppercase tracking-[0.35em]"
            style={{ fontFamily: "'Lora', serif", color: '#8b6f47' }}
          >
            Shared Memories
          </p>
          <h1
            className="text-4xl sm:text-5xl"
            style={{ fontFamily: "'Playfair Display', serif", color: '#2d2926' }}
          >
            Guest Photo Wall
          </h1>
          <p
            className="mx-auto mt-5 max-w-2xl text-base leading-8 sm:text-lg"
            style={{ fontFamily: "'Lora', serif", color: '#5a5a5a' }}
          >
            Browse the moments captured throughout the celebration. Each card links to its own page so every upload can be viewed on its own.
          </p>
        </div>

        {error ? (
          <div className="rounded-[2rem] border border-rose-200 bg-white px-8 py-16 text-center shadow-sm">
            <h2
              className="text-3xl"
              style={{ fontFamily: "'Playfair Display', serif", color: '#2d2926' }}
            >
              Gallery unavailable
            </h2>
            <p
              className="mx-auto mt-4 max-w-2xl leading-8"
              style={{ fontFamily: "'Lora', serif", color: '#8f2d2d' }}
            >
              {error}
            </p>
          </div>
        ) : isLoading ? (
          <div className="rounded-[2rem] border border-stone-200 bg-white px-8 py-16 text-center shadow-sm">
            <h2
              className="text-3xl"
              style={{ fontFamily: "'Playfair Display', serif", color: '#2d2926' }}
            >
              Loading guest uploads
            </h2>
          </div>
        ) : uploads.length === 0 ? (
          <div className="rounded-[2rem] border border-stone-200 bg-white px-8 py-16 text-center shadow-sm">
            <div className="mx-auto mb-6 w-fit rounded-full bg-stone-100 p-4">
              <Images className="h-8 w-8" style={{ color: '#8b6f47' }} />
            </div>
            <h2
              className="text-3xl"
              style={{ fontFamily: "'Playfair Display', serif", color: '#2d2926' }}
            >
              No guest uploads yet
            </h2>
            <p
              className="mx-auto mt-4 max-w-lg leading-8"
              style={{ fontFamily: "'Lora', serif", color: '#5a5a5a' }}
            >
              Be the first to share a memory from the wedding day.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {uploads.map((upload) => (
              <Link
                key={upload.id}
                to={`/guest-photos/${upload.id}`}
                className="group overflow-hidden rounded-[1.75rem] border border-stone-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={upload.imageUrl}
                    alt={`Uploaded by ${upload.guestName}`}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/55 to-transparent" />
                </div>
                <div className="p-6">
                  <p
                    className="text-sm uppercase tracking-[0.18em]"
                    style={{ fontFamily: "'Lora', serif", color: '#8b6f47' }}
                  >
                    Uploaded by
                  </p>
                  <h2
                    className="mt-2 text-2xl"
                    style={{ fontFamily: "'Playfair Display', serif", color: '#2d2926' }}
                  >
                    {upload.guestName}
                  </h2>
                  <p
                    className="mt-3 text-sm"
                    style={{ fontFamily: "'Lora', serif", color: '#5a5a5a' }}
                  >
                    {formatUploadDate(upload.createdAt)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
