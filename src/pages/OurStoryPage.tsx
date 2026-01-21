import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section } from '../components/common';

const timeline = [
  {
    date: 'January 2020',
    title: 'We First Met',
    description: 'Our paths crossed for the first time, and little did we know it would be the start of something beautiful.',
    image: 'https://images.unsplash.com/photo-1516589174184-c68526674fd6?q=80&w=1000&auto=format&fit=crop'
  },
  {
    date: 'March 2020',
    title: 'First Date',
    description: 'Our first date was magical. We talked for hours and knew there was something special between us.',
    image: 'https://images.unsplash.com/photo-1522673607200-1648832cee98?q=80&w=1000&auto=format&fit=crop'
  },
  {
    date: 'December 2021',
    title: 'He Said "I Love You"',
    description: 'Those three little words changed everything. Our love grew stronger with each passing day.',
    image: 'https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?q=80&w=1000&auto=format&fit=crop'
  },
  {
    date: 'February 2024',
    title: 'The Proposal',
    description: 'Under the stars, he got down on one knee and asked the question that would change our lives forever.',
    image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=1000&auto=format&fit=crop'
  },
];

export function OurStoryPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextStory = () => setCurrentIndex((prev) => (prev + 1) % timeline.length);
  const prevStory = () => setCurrentIndex((prev) => (prev - 1 + timeline.length) % timeline.length);

  // Auto-slide logic
  useEffect(() => {
    if (isPaused) return; // Stop timer if user is hovering

    const timer = setInterval(() => {
      nextStory();
    }, 5000); // Changes slide every 5 seconds

    return () => clearInterval(timer); // Cleanup on unmount
  }, [currentIndex, isPaused]);

  return (
    <Section bgColor="cream" className="text-center min-h-screen flex flex-col justify-center">
      <div className="max-w-5xl mx-auto px-4 w-full">
        
        <header className="mb-12">
          <h2 className="text-4xl md:text-5xl mb-2" style={{ fontFamily: "'Playfair Display', serif", color: 'hsl(var(--wedding-brown))' }}>
            Our Story
          </h2>
          <div className="h-px w-20 bg-champagne mx-auto mb-4" style={{ backgroundColor: 'hsl(var(--wedding-champagne))' }} />
        </header>

        <div 
          className="relative bg-white/50 backdrop-blur-sm rounded-lg overflow-hidden shadow-xl min-h-[500px] flex flex-col md:flex-row"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentIndex}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="flex flex-col md:flex-row w-full"
            >
              {/* Image Side */}
              <div className="w-full md:w-1/2 h-64 md:h-[500px] overflow-hidden">
                <motion.img 
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 3 }}
                  src={timeline[currentIndex].image} 
                  alt={timeline[currentIndex].title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Text Side */}
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center text-left">
                <p className="text-sm uppercase tracking-widest mb-4" style={{ fontFamily: "'Lora', serif", color: 'hsl(var(--wedding-champagne))' }}>
                  {timeline[currentIndex].date}
                </p>
                <h3 className="text-3xl md:text-4xl mb-6" style={{ fontFamily: "'Playfair Display', serif", color: 'hsl(var(--wedding-brown))' }}>
                  {timeline[currentIndex].title}
                </h3>
                <p className="text-lg leading-relaxed" style={{ fontFamily: "'Lora', serif", color: 'hsl(var(--wedding-brown-light))' }}>
                  {timeline[currentIndex].description}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="absolute bottom-6 right-6 flex gap-4 z-10">
            <button 
              onClick={(e) => { e.stopPropagation(); prevStory(); }}
              className="p-3 rounded-full border border-champagne bg-white/80 hover:bg-white transition-colors"
              style={{ borderColor: 'hsl(var(--wedding-champagne))' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); nextStory(); }}
              className="p-3 rounded-full border border-champagne bg-white/80 hover:bg-white transition-colors"
              style={{ borderColor: 'hsl(var(--wedding-champagne))' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="mt-8 flex justify-center gap-3">
          {timeline.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className="group relative h-4 w-8 flex items-center justify-center"
            >
              <div 
                className={`h-1 transition-all duration-500 rounded-full ${idx === currentIndex ? 'w-8' : 'w-2'}`}
                style={{ backgroundColor: idx === currentIndex ? 'hsl(var(--wedding-brown))' : 'hsl(var(--wedding-champagne) / 0.5)' }}
              />
            </button>
          ))}
        </div>
      </div>
    </Section>
  );
}