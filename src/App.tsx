import { useState } from 'react';
import './App.css';
import { Header, Footer } from './components/layout';
import { Section } from './components/common';
import { Button } from './components/common';
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

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {showIntro && <Intro onComplete={() => setShowIntro(false)} />}
      <Header />

      <main className="flex-1">
        {/* Intro Section */}
        <Section id="intro" bgColor="cream" className="py-32 md:py-48 flex items-center justify-center text-center">
          <div className="fade-in max-w-2xl">
            <h1 className="text-6xl md:text-7xl font-serif font-bold text-amber-900 mb-6">
              Gizelle & Armando
            </h1>
            <p className="text-2xl text-amber-700 mb-8 font-light">
              Together we celebrate love, family, and the beginning of forever
            </p>
            <div className="flex gap-4 justify-center">
              <Button variant="primary" size="lg" onClick={() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })}>
                Explore Our Wedding
              </Button>
            </div>
          </div>
        </Section>

        {/* Home Section - Imported Component */}
        <div id="home">
          <HomePage />
        </div>

        {/* Our Story Section */}
        <div id="story">
          <OurStoryPage />
        </div>

        {/* Events Section */}
        <div id="events">
          <EventDetailsPage />
        </div>

        {/* Gallery Section */}
        <div id="gallery">
          <GalleryPage />
        </div>

        {/* RSVP Section */}
        <div id="rsvp">
          <RSVPPage />
        </div>

        {/* Contact Section */}
        <div id="contact">
          <ContactPage />
        </div>
      </main>

      <Footer />
    </div>
  );
}
