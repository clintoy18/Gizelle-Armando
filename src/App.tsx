import { useState } from 'react';
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

  // If intro is showing, render ONLY intro
  if (showIntro) {
    return <Intro onComplete={() => setShowIntro(false)} />;
  }

  // Otherwise render the full site
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="flex-1">

        <div id="home"><HomePage /></div>
        <div id="story"><OurStoryPage /></div>
        <div id="events"><EventDetailsPage /></div>
        <div id="gallery"><GalleryPage /></div>
        <div id="rsvp"><RSVPPage /></div>
        {/* <div id="contact"><ContactPage /></div> */}
      </main>

      <Footer />
    </div>
  );
}
