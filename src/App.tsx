import { useState } from 'react';
import './App.css';

import { Header, Footer } from './components/layout';
import { Section, Button } from './components/common';
import { Intro } from './components/Intro';

import {
  HomePage,
  OurStoryPage,
  EventDetailsPage,
  RSVPPage,
  GalleryPage,
  ContactPage,
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
        {/* Hero Section */}
        <Section
          id="intro"
          bgColor="cream"
          className="min-h-screen flex items-center justify-center text-center px-4"
        >
          <div className="fade-in max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-amber-900 mb-6">
              Gizelle & Armando
            </h1>

            <p className="text-xl md:text-2xl text-amber-700 mb-10 font-light">
              Together we celebrate love, family, and the beginning of forever
            </p>

            <Button
              variant="primary"
              size="lg"
              onClick={() =>
                document
                  .getElementById('home')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              Explore Our Wedding
            </Button>
          </div>
        </Section>

        <div id="home"><HomePage /></div>
        <div id="story"><OurStoryPage /></div>
        <div id="events"><EventDetailsPage /></div>
        <div id="gallery"><GalleryPage /></div>
        <div id="rsvp"><RSVPPage /></div>
        <div id="contact"><ContactPage /></div>
      </main>

      <Footer />
    </div>
  );
}
