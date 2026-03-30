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

  useEffect(() => {
    if (!batch) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        setActiveIndex((currentIndex) =>
          currentIndex === 0 ? batch.photos.length - 1 : currentIndex - 1,
        );
      }

      if (event.key === 'ArrowRight') {
        setActiveIndex((currentIndex) =>
          currentIndex === batch.photos.length - 1 ? 0 : currentIndex + 1,
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [batch]);

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
  const progressWidth = `${((activeIndex + 1) / batch.photoCount) * 100}%`;

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#f7efe2_0%,#fcf8f2_40%,#f3ebdf_100%)]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
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

        <div className="grid gap-8 xl:grid-cols-[minmax(0,1.45fr)_24rem]">
          <section className="overflow-hidden rounded-[2rem] border border-white/60 bg-white/80 shadow-[0_24px_80px_rgba(56,40,24,0.14)] backdrop-blur">
            <div className="border-b border-stone-200/70 px-5 py-5 sm:px-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p
                    className="text-xs uppercase tracking-[0.35em]"
                    style={{ fontFamily: "'Lora', serif", color: '#8b6f47' }}
                  >
                    Guest Album
                  </p>
                  <h1
                    className="mt-2 text-3xl sm:text-4xl"
                    style={{ fontFamily: "'Playfair Display', serif", color: '#2d2926' }}
                  >
                    {batch.guestName}
                  </h1>
                </div>

                <div className="text-right">
                  <p
                    className="text-xs uppercase tracking-[0.22em]"
                    style={{ fontFamily: "'Lora', serif", color: '#8b6f47' }}
                  >
                    Viewing
                  </p>
                  <p
                    className="mt-2 text-lg"
                    style={{ fontFamily: "'Playfair Display', serif", color: '#2d2926' }}
                  >
                    Photo {activeIndex + 1} of {batch.photoCount}
                  </p>
                </div>
              </div>

              <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-stone-200">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{ width: progressWidth, background: 'linear-gradient(90deg, #8b6f47 0%, #d8b789 100%)' }}
                />
              </div>
            </div>

            <div
              className="relative bg-[linear-gradient(180deg,rgba(57,42,24,0.06)_0%,rgba(57,42,24,0)_100%)] px-3 pb-3 pt-3 sm:px-5 sm:pb-5"
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
              <div className="relative overflow-hidden rounded-[1.6rem] bg-[#f4ecdf]">
                <img
                  src={activePhoto.imageUrl}
                  alt={`${batch.guestName} photo ${activeIndex + 1}`}
                  className="h-[50vh] w-full object-contain bg-[#f4ecdf] sm:h-[62vh] xl:h-[72vh]"
                />
              </div>

              {batch.photoCount > 1 && (
                <>
                  <button
                    type="button"
                    onClick={goToPrevious}
                    className="absolute left-6 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/92 shadow-lg transition hover:scale-105 hover:bg-white"
                    aria-label="Previous photo"
                  >
                    <ChevronLeft className="h-5 w-5" style={{ color: '#2d2926' }} />
                  </button>
                  <button
                    type="button"
                    onClick={goToNext}
                    className="absolute right-6 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/92 shadow-lg transition hover:scale-105 hover:bg-white"
                    aria-label="Next photo"
                  >
                    <ChevronRight className="h-5 w-5" style={{ color: '#2d2926' }} />
                  </button>
                </>
              )}

              <div
                className="absolute bottom-6 right-6 rounded-full bg-black/65 px-3 py-1 text-xs uppercase tracking-[0.16em] text-white"
                style={{ fontFamily: "'Lora', serif" }}
              >
                {activeIndex + 1} / {batch.photoCount}
              </div>

              {batch.photoCount > 1 && (
                <div
                  className="absolute bottom-6 left-6 rounded-full bg-white/92 px-4 py-2 text-[10px] uppercase tracking-[0.22em] shadow-sm sm:text-xs"
                  style={{ fontFamily: "'Lora', serif", color: '#5a5a5a' }}
                >
                  Swipe or use arrow keys
                </div>
              )}
            </div>

            {batch.photoCount > 1 && (
              <div className="border-t border-stone-200/70 bg-stone-50/90 px-3 py-4 sm:px-5">
                <div className="mb-3 flex items-center justify-between gap-4">
                  <p
                    className="text-xs uppercase tracking-[0.22em]"
                    style={{ fontFamily: "'Lora', serif", color: '#8b6f47' }}
                  >
                    Filmstrip
                  </p>
                  <p
                    className="text-xs"
                    style={{ fontFamily: "'Lora', serif", color: '#5a5a5a' }}
                  >
                    Tap any photo to jump
                  </p>
                </div>
                <div className="hide-scrollbar flex gap-3 overflow-x-auto pb-1">
                  {batch.photos.map((photo, index) => (
                    <button
                      key={photo.id}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      className={`group shrink-0 overflow-hidden rounded-2xl border-[3px] bg-white transition ${index === activeIndex ? 'border-amber-700 shadow-md' : 'border-transparent hover:border-stone-300'}`}
                    >
                      <img src={photo.imageUrl} alt={photo.fileName} className="h-24 w-20 object-cover sm:h-28 sm:w-24" />
                      <div
                        className={`px-2 py-2 text-center text-[10px] uppercase tracking-[0.18em] ${index === activeIndex ? '' : 'opacity-70 group-hover:opacity-100'}`}
                        style={{ fontFamily: "'Lora', serif", color: index === activeIndex ? '#8b6f47' : '#5a5a5a' }}
                      >
                        {index + 1}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </section>

          <aside className="xl:sticky xl:top-24 xl:self-start">
            <div className="rounded-[2rem] border border-white/60 bg-white/88 p-8 shadow-[0_24px_80px_rgba(56,40,24,0.1)] backdrop-blur sm:p-10">
              <p
                className="text-sm uppercase tracking-[0.35em]"
                style={{ fontFamily: "'Lora', serif", color: '#8b6f47' }}
              >
                Album Notes
              </p>
              <h2
                className="mt-4 text-3xl"
                style={{ fontFamily: "'Playfair Display', serif", color: '#2d2926' }}
              >
                {batch.guestName}
              </h2>
              <p
                className="mt-4 text-base leading-8"
                style={{ fontFamily: "'Lora', serif", color: '#5a5a5a' }}
              >
                A grouped guest submission from Armando and Gizelle&apos;s shared wedding memory wall.
              </p>

              <div className="mt-8 grid gap-4">
                <div className="rounded-[1.5rem] bg-stone-50 px-5 py-4">
                  <p
                    className="text-xs uppercase tracking-[0.22em]"
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

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-[1.5rem] bg-stone-50 px-5 py-4">
                    <p
                      className="text-xs uppercase tracking-[0.22em]"
                      style={{ fontFamily: "'Lora', serif", color: '#8b6f47' }}
                    >
                      Total photos
                    </p>
                    <p
                      className="mt-2 text-2xl"
                      style={{ fontFamily: "'Playfair Display', serif", color: '#2d2926' }}
                    >
                      {batch.photoCount}
                    </p>
                  </div>

                  <div className="rounded-[1.5rem] bg-stone-50 px-5 py-4">
                    <p
                      className="text-xs uppercase tracking-[0.22em]"
                      style={{ fontFamily: "'Lora', serif", color: '#8b6f47' }}
                    >
                      Current
                    </p>
                    <p
                      className="mt-2 text-2xl"
                      style={{ fontFamily: "'Playfair Display', serif", color: '#2d2926' }}
                    >
                      {activeIndex + 1}
                    </p>
                  </div>
                </div>

                <div className="rounded-[1.5rem] border border-stone-200 bg-white px-5 py-4">
                  <p
                    className="text-xs uppercase tracking-[0.22em]"
                    style={{ fontFamily: "'Lora', serif", color: '#8b6f47' }}
                  >
                    Navigation tips
                  </p>
                  <p
                    className="mt-3 text-sm leading-7"
                    style={{ fontFamily: "'Lora', serif", color: '#5a5a5a' }}
                  >
                    Swipe on mobile, use the left and right arrow keys on desktop, or select a frame from the filmstrip below the image.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
