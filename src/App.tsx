import { useState, useRef, useEffect } from "react";
import "./App.css";

import { Header, Footer } from "./components/layout";
import { Intro } from "./components/Intro";

import {
  HomePage,
  OurStoryPage,
  EventDetailsPage,
  RulesRemindersPage,
  GalleryPage,
} from "./pages";

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!showIntro && audioRef.current) {
      audioRef.current.volume = 1;
      audioRef.current.loop = true;
      audioRef.current
        .play()
        .catch((err) => console.log("Audio play failed:", err));
    }
  }, [showIntro]);

  return (
    // ✅ FIX 1: Add overflow-x-hidden to prevent horizontal scroll
    <div className="flex flex-col min-h-screen bg-white overflow-x-hidden">
      <audio ref={audioRef} src="/music/wedding-song.mp3" />

      {showIntro && <Intro onComplete={() => setShowIntro(false)} />}

      {!showIntro && (
        <>
          <Header />
          {/* ✅ FIX 2: Constrain main content */}
          <main
            className={`transition-transform duration-1000 ${showIntro ? "scale-95" : "scale-100"}`}
          >
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
              <RulesRemindersPage />
            </div>
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}
