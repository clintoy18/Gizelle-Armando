import { useState, useRef, useEffect } from 'react';
import './App.css';

import { Header, Footer } from './components/layout';
import { Intro } from './components/Intro';

import {
  HomePage,
  OurStoryPage,
  EventDetailsPage,
  RSVPPage,
  GalleryPage,
} from './pages';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Play audio only when intro is done
  useEffect(() => {
    if (!showIntro && audioRef.current) {
      audioRef.current.volume = 1;
      audioRef.current.loop = true;
      audioRef.current.play().catch((err) => console.log('Audio play failed:', err));
    }
  }, [showIntro]);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Only play audio after intro */}
      <audio ref={audioRef} src="/music/wedding-song.mp3" />

      {showIntro && <Intro onComplete={() => setShowIntro(false)} />}

      {!showIntro && (
        <>
          <Header />
          <main className="flex-1">
            <div id="home"><HomePage /></div>
            <div id="story"><OurStoryPage /></div>
            <div id="events"><EventDetailsPage /></div>
            <div id="gallery"><GalleryPage /></div>
            <div id="rsvp"><RSVPPage /></div>
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}
