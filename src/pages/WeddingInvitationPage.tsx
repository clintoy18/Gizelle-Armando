import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Intro } from '../components/Intro';
import { Footer, Header } from '../components/layout';
import { EventDetailsPage } from './EventDetailsPage';
import { GalleryPage } from './GalleryPage';
import { HomePage } from './HomePage';
import { OurStoryPage } from './OurStoryPage';
import { RSVPPage } from './RSVPPage';

const INTRO_STORAGE_KEY = 'gizelle-armando-intro-opened';

export function WeddingInvitationPage() {
  const location = useLocation();
  const [showIntro, setShowIntro] = useState(() => {
    if (typeof window === 'undefined') {
      return true;
    }

    return window.sessionStorage.getItem(INTRO_STORAGE_KEY) !== 'true';
  });
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!showIntro && audioRef.current) {
      audioRef.current.volume = 1;
      audioRef.current.loop = true;
      audioRef.current.play().catch((error) => console.log('Audio play failed:', error));
    }
  }, [showIntro]);

  useEffect(() => {
    if (showIntro) {
      return;
    }

    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const scrollToHash = () => {
      const element = document.querySelector(location.hash);
      if (!element) {
        return;
      }

      const headerHeight = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - headerHeight,
        behavior: 'smooth',
      });
    };

    window.setTimeout(scrollToHash, 150);
  }, [location.hash, showIntro]);

  const handleIntroComplete = () => {
    window.sessionStorage.setItem(INTRO_STORAGE_KEY, 'true');
    setShowIntro(false);
  };

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-white">
      <audio ref={audioRef} src="/music/wedding-song.mp3" />

      {showIntro && <Intro onComplete={handleIntroComplete} />}

      {!showIntro && (
        <>
          <Header />
          <main className="scale-100 transition-transform duration-1000">
            <div id="home" className="w-full">
              <HomePage />
            </div>
            <div id="story" className="w-full">
              <OurStoryPage />
            </div>
            <div id="events" className="w-full">
              <EventDetailsPage />
            </div>
            <div id="gallery" className="w-full">
              <GalleryPage />
            </div>
            <div id="rsvp" className="w-full">
              <RSVPPage />
            </div>
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}
