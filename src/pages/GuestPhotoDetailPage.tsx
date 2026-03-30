import { useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Upload } from 'lucide-react';
import { formatUploadDate, getGuestPhotoBatchById } from '../lib/guestPhotoStorage';
import type { GuestPhotoBatch } from '../lib/guestPhotoStorage';
import { isSupabaseConfigured } from '../lib/supabase';

export function GuestPhotoDetailPage() {
  const { uploadId = '' } = useParams();
  const [searchParams] = useSearchParams();
  const [batch, setBatch] = useState<GuestPhotoBatch | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const uploadedCount = Number(searchParams.get('uploaded') ?? '0');

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setError('Supabase is not configured yet. Add your project credentials in .env.local to load shared guest uploads.');
      setIsLoading(false);
      return;
    }

    let isMounted = true;

    const loadBatch = async () => {
      try {
        const data = await getGuestPhotoBatchById(uploadId);
        if (isMounted) {
          setBatch(data);
          setActiveIndex(0);
        }
      } catch (loadError) {
        if (isMounted) {
          setError(loadError instanceof Error ? loadError.message : 'Unable to load this guest photo album right now.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void loadBatch();

    return () => {
      isMounted = false;
    };
  }, [uploadId]);

  const goToPrevious = () => {
    if (!batch) {
      return;
    }

    setActiveIndex((currentIndex) =>
      currentIndex === 0 ? batch.photos.length - 1 : currentIndex - 1,
    );
  };

  const goToNext = () => {
    if (!batch) {
      return;
    }

    setActiveIndex((currentIndex) =>
      currentIndex === batch.photos.length - 1 ? 0 : currentIndex + 1,
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[linear-gradient(180deg,#fffdf9_0%,#f5ede2_100%)]">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h1
            className="text-4xl"
            style={{ fontFamily: "'Playfair Display', serif", color: '#2d2926' }}
          >
            Loading guest album
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
            Guest album unavailable
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

  if (!batch) {
    return (
      <div className="min-h-screen bg-[linear-gradient(180deg,#fffdf9_0%,#f5ede2_100%)]">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <p
            className="mb-4 text-sm uppercase tracking-[0.35em]"
            style={{ fontFamily: "'Lora', serif", color: '#8b6f47' }}
          >
            Guest Album
          </p>
          <h1
            className="text-4xl"
            style={{ fontFamily: "'Playfair Display', serif", color: '#2d2926' }}
          >
            This album could not be found
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
              Upload another photo set
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const activePhoto = batch.photos[activeIndex];

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
            Upload another photo set
          </Link>
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
              Your album now contains {uploadedCount} photo{uploadedCount === 1 ? '' : 's'}.
            </p>
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="overflow-hidden rounded-[2rem] bg-white shadow-sm">
            <div
              className="relative"
              onTouchStart={(event) => setTouchStartX(event.changedTouches[0].clientX)}
              onTouchEnd={(event) => {
                if (touchStartX === null) {
                  return;
                }

                const deltaX = event.changedTouches[0].clientX - touchStartX;
                if (deltaX > 40) {
                  goToPrevious();
                } else if (deltaX < -40) {
                  goToNext();
                }

                setTouchStartX(null);
              }}
            >
              <img
                src={activePhoto.imageUrl}
                alt={`${batch.guestName} photo ${activeIndex + 1}`}
                className="h-full max-h-[80vh] w-full object-cover"
              />

              {batch.photoCount > 1 && (
                <>
                  <button
                    type="button"
                    onClick={goToPrevious}
                    className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-sm transition hover:bg-white"
                    aria-label="Previous photo"
                  >
                    <ChevronLeft className="h-5 w-5" style={{ color: '#2d2926' }} />
                  </button>
                  <button
                    type="button"
                    onClick={goToNext}
                    className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-sm transition hover:bg-white"
                    aria-label="Next photo"
                  >
                    <ChevronRight className="h-5 w-5" style={{ color: '#2d2926' }} />
                  </button>
                </>
              )}

              <div
                className="absolute bottom-4 right-4 rounded-full bg-black/60 px-3 py-1 text-xs uppercase tracking-[0.16em] text-white"
                style={{ fontFamily: "'Lora', serif" }}
              >
                {activeIndex + 1} / {batch.photoCount}
              </div>
            </div>

            {batch.photoCount > 1 && (
              <div className="grid grid-cols-4 gap-2 border-t border-stone-200 bg-stone-50 p-3 sm:grid-cols-6">
                {batch.photos.map((photo, index) => (
                  <button
                    key={photo.id}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={`overflow-hidden rounded-xl border-2 transition ${index === activeIndex ? 'border-amber-700' : 'border-transparent'}`}
                  >
                    <img src={photo.imageUrl} alt={photo.fileName} className="h-20 w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <aside className="rounded-[2rem] border border-stone-200 bg-white p-8 shadow-sm sm:p-10">
            <p
              className="text-sm uppercase tracking-[0.35em]"
              style={{ fontFamily: "'Lora', serif", color: '#8b6f47' }}
            >
              Guest Album
            </p>
            <h1
              className="mt-4 text-4xl"
              style={{ fontFamily: "'Playfair Display', serif", color: '#2d2926' }}
            >
              {batch.guestName}
            </h1>
            <p
              className="mt-4 text-base leading-8"
              style={{ fontFamily: "'Lora', serif", color: '#5a5a5a' }}
            >
              Opened as one grouped upload set from Armando and Gizelle&apos;s wedding memory wall.
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
                  {formatUploadDate(batch.createdAt)}
                </p>
              </div>

              <div>
                <p
                  className="text-sm uppercase tracking-[0.18em]"
                  style={{ fontFamily: "'Lora', serif", color: '#8b6f47' }}
                >
                  Total photos
                </p>
                <p
                  className="mt-2 text-lg"
                  style={{ fontFamily: "'Playfair Display', serif", color: '#2d2926' }}
                >
                  {batch.photoCount}
                </p>
              </div>

              <div>
                <p
                  className="text-sm uppercase tracking-[0.18em]"
                  style={{ fontFamily: "'Lora', serif", color: '#8b6f47' }}
                >
                  Current photo
                </p>
                <p
                  className="mt-2 break-all text-base"
                  style={{ fontFamily: "'Lora', serif", color: '#5a5a5a' }}
                >
                  {activePhoto.fileName}
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
