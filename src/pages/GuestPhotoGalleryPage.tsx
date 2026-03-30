import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ChevronLeft, Images, Upload } from 'lucide-react';
import { formatUploadDate, getGuestPhotoBatches } from '../lib/guestPhotoStorage';
import type { GuestPhotoBatch } from '../lib/guestPhotoStorage';
import { isSupabaseConfigured } from '../lib/supabase';

export function GuestPhotoGalleryPage() {
  const [searchParams] = useSearchParams();
  const [batches, setBatches] = useState<GuestPhotoBatch[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const uploadedCount = Number(searchParams.get('uploaded') ?? '0');

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setError('Supabase is not configured yet. Add your project credentials in .env.local to load the shared gallery.');
      setIsLoading(false);
      return;
    }

    let isMounted = true;

    const loadBatches = async () => {
      try {
        const data = await getGuestPhotoBatches();
        if (isMounted) {
          setBatches(data);
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

    void loadBatches();

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
            Upload a photo set
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
            Each card is one guest album. Open it to swipe through the full set that guest uploaded together.
          </p>
        </div>

        {uploadedCount > 0 && (
          <div className="mb-8 rounded-[1.5rem] border border-emerald-200 bg-emerald-50 px-6 py-4 text-center">
            <p
              className="text-sm uppercase tracking-[0.18em]"
              style={{ fontFamily: "'Lora', serif", color: '#2f6b52' }}
            >
              Album uploaded
            </p>
            <p
              className="mt-2 text-base"
              style={{ fontFamily: "'Lora', serif", color: '#2d2926' }}
            >
              Your guest album now contains {uploadedCount} photo{uploadedCount === 1 ? '' : 's'}.
            </p>
          </div>
        )}

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
              Loading guest albums
            </h2>
          </div>
        ) : batches.length === 0 ? (
          <div className="rounded-[2rem] border border-stone-200 bg-white px-8 py-16 text-center shadow-sm">
            <div className="mx-auto mb-6 w-fit rounded-full bg-stone-100 p-4">
              <Images className="h-8 w-8" style={{ color: '#8b6f47' }} />
            </div>
            <h2
              className="text-3xl"
              style={{ fontFamily: "'Playfair Display', serif", color: '#2d2926' }}
            >
              No guest albums yet
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
            {batches.map((batch) => (
              <Link
                key={batch.id}
                to={`/guest-photos/${batch.id}`}
                className="group overflow-hidden rounded-[1.75rem] border border-stone-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={batch.coverImageUrl}
                    alt={`Uploaded by ${batch.guestName}`}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div
                    className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs uppercase tracking-[0.16em]"
                    style={{ fontFamily: "'Lora', serif", color: '#2d2926' }}
                  >
                    {batch.photoCount} photo{batch.photoCount === 1 ? '' : 's'}
                  </div>
                </div>
                <div className="p-6">
                  <p
                    className="text-sm uppercase tracking-[0.18em]"
                    style={{ fontFamily: "'Lora', serif", color: '#8b6f47' }}
                  >
                    Album by
                  </p>
                  <h2
                    className="mt-2 text-2xl"
                    style={{ fontFamily: "'Playfair Display', serif", color: '#2d2926' }}
                  >
                    {batch.guestName}
                  </h2>
                  <p
                    className="mt-3 text-sm"
                    style={{ fontFamily: "'Lora', serif", color: '#5a5a5a' }}
                  >
                    {formatUploadDate(batch.createdAt)}
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
