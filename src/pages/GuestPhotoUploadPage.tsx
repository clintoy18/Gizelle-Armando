import { useEffect, useMemo, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Camera, ChevronLeft, Images, Upload } from 'lucide-react';
import { createGuestPhotoUpload } from '../lib/guestPhotoStorage';
import { isSupabaseConfigured } from '../lib/supabase';

export function GuestPhotoUploadPage() {
  const navigate = useNavigate();
  const [guestName, setGuestName] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const isConfigured = isSupabaseConfigured();

  const uploadHint = useMemo(
    () => 'Share one of your favorite moments from the celebration and add your name so we know who captured it.',
    [],
  );

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setSelectedFile(file);
    setError('');

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    if (!file) {
      setPreviewUrl('');
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!guestName.trim() || !selectedFile) {
      setError('Please enter your name and choose a photo before uploading.');
      return;
    }

    if (!isConfigured) {
      setError('Supabase is not configured yet. Add your project credentials in .env.local before accepting uploads.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const upload = await createGuestPhotoUpload({
        guestName,
        file: selectedFile,
      });
      navigate(`/guest-photos/${upload.id}`);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : 'Unable to save this photo right now. Please try again.',
      );
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f7f1e8_0%,#ffffff_100%)]">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
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
            to="/guest-photos"
            className="inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm uppercase tracking-[0.18em] transition hover:bg-stone-50"
            style={{ borderColor: '#d7cab8', color: '#2d2926', fontFamily: "'Lora', serif" }}
          >
            <Images className="h-4 w-4" />
            View guest gallery
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[2rem] border border-stone-200 bg-white/85 p-8 shadow-sm sm:p-10">
            <p
              className="mb-4 text-sm uppercase tracking-[0.35em]"
              style={{ fontFamily: "'Lora', serif", color: '#8b6f47' }}
            >
              Capture with Love
            </p>
            <h1
              className="mb-5 text-4xl sm:text-5xl"
              style={{ fontFamily: "'Playfair Display', serif", color: '#2d2926' }}
            >
              Upload Your Wedding Photos
            </h1>
            <p
              className="max-w-xl text-base leading-8 sm:text-lg"
              style={{ fontFamily: "'Lora', serif", color: '#5a5a5a' }}
            >
              {uploadHint}
            </p>

            <form onSubmit={handleSubmit} className="mt-10 space-y-6">
              <div>
                <label
                  htmlFor="guestName"
                  className="mb-2 block text-sm uppercase tracking-[0.18em]"
                  style={{ fontFamily: "'Lora', serif", color: '#8b6f47' }}
                >
                  Your name
                </label>
                <input
                  id="guestName"
                  value={guestName}
                  onChange={(event) => setGuestName(event.target.value)}
                  placeholder="Ex. Maria Santos"
                  className="w-full rounded-2xl border border-stone-300 bg-stone-50 px-5 py-4 outline-none transition focus:border-amber-700 focus:bg-white"
                  style={{ fontFamily: "'Lora', serif", color: '#2d2926' }}
                />
              </div>

              <div>
                <label
                  htmlFor="photoUpload"
                  className="mb-2 block text-sm uppercase tracking-[0.18em]"
                  style={{ fontFamily: "'Lora', serif", color: '#8b6f47' }}
                >
                  Select photo
                </label>
                <label
                  htmlFor="photoUpload"
                  className="flex min-h-56 cursor-pointer flex-col items-center justify-center rounded-[1.75rem] border border-dashed border-stone-300 bg-stone-50 px-6 text-center transition hover:border-amber-700 hover:bg-white"
                >
                  <Upload className="mb-4 h-10 w-10" style={{ color: '#8b6f47' }} />
                  <span
                    className="text-lg"
                    style={{ fontFamily: "'Playfair Display', serif", color: '#2d2926' }}
                  >
                    Tap to browse your photos
                  </span>
                  <span
                    className="mt-2 text-sm"
                    style={{ fontFamily: "'Lora', serif", color: '#5a5a5a' }}
                  >
                    JPG, PNG, or HEIC snapshots work best
                  </span>
                </label>
                <input
                  id="photoUpload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="sr-only"
                  disabled={!isConfigured}
                />
              </div>

              {error && (
                <div
                  className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm"
                  style={{ fontFamily: "'Lora', serif", color: '#8f2d2d' }}
                >
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting || !isConfigured}
                className="inline-flex w-full items-center justify-center rounded-full px-6 py-4 text-sm uppercase tracking-[0.2em] text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                style={{ backgroundColor: '#8b6f47', fontFamily: "'Lora', serif" }}
              >
                {isSubmitting ? 'Uploading...' : 'Upload photo'}
              </button>

              {!isConfigured && (
                <p
                  className="text-sm leading-7"
                  style={{ fontFamily: "'Lora', serif", color: '#8f2d2d' }}
                >
                  Supabase is not configured yet. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in `.env.local` first.
                </p>
              )}
            </form>
          </div>

          <div className="rounded-[2rem] border border-stone-200 bg-[#fdfaf6] p-6 shadow-sm sm:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-full bg-white p-3 shadow-sm">
                <Camera className="h-6 w-6" style={{ color: '#8b6f47' }} />
              </div>
              <div>
                <p
                  className="text-sm uppercase tracking-[0.18em]"
                  style={{ fontFamily: "'Lora', serif", color: '#8b6f47' }}
                >
                  Preview
                </p>
                <p style={{ fontFamily: "'Lora', serif", color: '#5a5a5a' }}>
                  Guests will see your name with the uploaded image.
                </p>
              </div>
            </div>

            <div className="overflow-hidden rounded-[1.5rem] bg-white shadow-inner">
              {previewUrl ? (
                <img src={previewUrl} alt="Selected preview" className="h-[28rem] w-full object-cover" />
              ) : (
                <div className="flex h-[28rem] items-center justify-center bg-[radial-gradient(circle_at_top,#f2e8dc,transparent_55%),linear-gradient(180deg,#fffefb_0%,#f5efe5_100%)] px-8 text-center">
                  <div>
                    <p
                      className="text-3xl"
                      style={{ fontFamily: "'Playfair Display', serif", color: '#2d2926' }}
                    >
                      Your moment will appear here
                    </p>
                    <p
                      className="mx-auto mt-4 max-w-md leading-7"
                      style={{ fontFamily: "'Lora', serif", color: '#5a5a5a' }}
                    >
                      Select a photo, add your name, and submit it to create a trackable guest memory.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 rounded-[1.5rem] bg-white px-5 py-4">
              <p
                className="text-sm uppercase tracking-[0.18em]"
                style={{ fontFamily: "'Lora', serif", color: '#8b6f47' }}
              >
                Submitted by
              </p>
              <p
                className="mt-2 text-2xl"
                style={{ fontFamily: "'Playfair Display', serif", color: '#2d2926' }}
              >
                {guestName.trim() || 'Guest Name'}
              </p>
              <p
                className="mt-2 text-sm leading-7"
                style={{ fontFamily: "'Lora', serif", color: '#5a5a5a' }}
              >
                Guests still do not sign in manually. The app creates an anonymous Supabase session behind the scenes for uploads.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
