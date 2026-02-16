import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section } from '../components/common';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const photos = [
  { 
    id: 1, 
    src: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80', 
    alt: 'Engagement portrait',
    orientation: 'portrait'
  },
  { 
    id: 2, 
    src: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80', 
    alt: 'Wedding ceremony',
    orientation: 'landscape'
  },
  { 
    id: 3, 
    src: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80', 
    alt: 'Reception celebration',
    orientation: 'landscape'
  },
  { 
    id: 4, 
    src: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=1200&auto=format&fit=crop', 
    alt: 'Couple dancing',
    orientation: 'portrait'
  },
  { 
    id: 5, 
    src: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=1200&q=80', 
    alt: 'Wedding details',
    orientation: 'square'
  },
  { 
    id: 6, 
    src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80', 
    alt: 'Romantic sunset',
    orientation: 'landscape'
  },
  { 
    id: 7, 
    src: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=80', 
    alt: 'First dance',
    orientation: 'portrait'
  },
  { 
    id: 8, 
    src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80', 
    alt: 'Wedding rings',
    orientation: 'square'
  },
];

export function GalleryPage() {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  const handlePrevious = () => {
    if (selectedPhoto === null) return;
    const currentIndex = photos.findIndex(p => p.id === selectedPhoto);
    const newIndex = currentIndex > 0 ? currentIndex - 1 : photos.length - 1;
    setSelectedPhoto(photos[newIndex].id);
  };

  const handleNext = () => {
    if (selectedPhoto === null) return;
    const currentIndex = photos.findIndex(p => p.id === selectedPhoto);
    const newIndex = currentIndex < photos.length - 1 ? currentIndex + 1 : 0;
    setSelectedPhoto(photos[newIndex].id);
  };

  const selectedPhotoData = photos.find(p => p.id === selectedPhoto);

  // Solène-style asymmetric layout pattern
  const getGridClass = (index: number) => {
    const pattern = index % 5;
    switch (pattern) {
      case 0: return 'col-span-2 row-span-2'; // Large
      case 1: return 'col-span-1 row-span-1'; // Small
      case 2: return 'col-span-1 row-span-2'; // Tall
      case 3: return 'col-span-2 row-span-1'; // Wide
      case 4: return 'col-span-1 row-span-1'; // Small
      default: return 'col-span-1 row-span-1';
    }
  };

  return (
    <Section bgColor="white" className="py-0">
      {/* ✨ HERO HEADER - Full width with background image */}
      <div className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=80')"
          }}
        >
          <div className="absolute inset-0 bg-black/30" />
        </div>
        
        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <p 
              className="text-sm sm:text-base md:text-lg tracking-[0.3em] uppercase mb-8 text-white/90"
              style={{ fontFamily: "'Lora', serif" }}
            >
              December 15, 2024
            </p>
            <h1 
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Our Gallery
            </h1>
            <div className="flex justify-center items-center gap-4">
              <div className="h-px w-16 sm:w-20 bg-white/50" />
              <div className="w-2 h-2 rounded-full bg-white/50" />
              <div className="h-px w-16 sm:w-20 bg-white/50" />
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-white/50 rounded-full" />
          </div>
        </div>
      </div>

      {/* ✨ EDITORIAL INTRODUCTION */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-20 md:py-24 text-center">
        <p 
          className="text-base sm:text-lg md:text-xl leading-relaxed mb-8"
          style={{ 
            fontFamily: "'Lora', serif",
            color: 'hsl(var(--wedding-champagne))'
          }}
        >
          A visual journey through our most cherished moments. Each photograph tells a story 
          of love, joy, and the beginning of our forever together.
        </p>
        
        <p 
          className="text-sm italic"
          style={{ 
            fontFamily: "'Lora', serif",
            color: 'hsl(var(--wedding-brown))'
          }}
        >
          Photography by Jessica Lane Studios
        </p>
      </div>

      {/* ✨ ASYMMETRIC GRID - Solène style */}
      <div className="w-full px-0 sm:px-4 md:px-6 lg:px-8 pb-16 sm:pb-20 md:pb-24">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 auto-rows-[150px] sm:auto-rows-[200px] md:auto-rows-[250px] gap-2 sm:gap-3 md:gap-4">
            {photos.map((photo, index) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`
                  ${getGridClass(index)}
                  group relative overflow-hidden cursor-pointer
                `}
                onClick={() => setSelectedPhoto(photo.id)}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                
                {/* Minimal overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ✨ CLOSING QUOTE */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-20 sm:pb-24 md:pb-32 text-center">
        <div className="border-t border-stone-200 pt-16 sm:pt-20">
          <p 
            className="text-2xl sm:text-3xl md:text-4xl italic mb-6 leading-relaxed"
            style={{ 
              fontFamily: "'Playfair Display', serif",
              color: 'hsl(var(--wedding-brown))'
            }}
          >
            "The best thing to hold onto in life is each other."
          </p>
          <p 
            className="text-sm tracking-wider"
            style={{ 
              fontFamily: "'Lora', serif",
              color: 'hsl(var(--wedding-champagne))'
            }}
          >
            — AUDREY HEPBURN
          </p>
        </div>
      </div>

      {/* ✨ ELEGANT LIGHTBOX */}
      <AnimatePresence>
        {selectedPhoto !== null && selectedPhotoData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-white z-50 flex items-center justify-center"
            onClick={() => setSelectedPhoto(null)}
          >
            {/* Minimal close button */}
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-6 right-6 sm:top-8 sm:right-8 z-50 w-12 h-12 flex items-center justify-center group"
              aria-label="Close"
            >
              <X className="w-6 h-6 transition-transform group-hover:rotate-90 duration-300" style={{ color: 'hsl(var(--wedding-brown))' }} />
            </button>

            {/* Navigation */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrevious();
              }}
              className="absolute left-4 sm:left-8 z-50 w-12 h-12 flex items-center justify-center group"
              aria-label="Previous"
            >
              <ChevronLeft className="w-7 h-7 transition-transform group-hover:-translate-x-1 duration-300" style={{ color: 'hsl(var(--wedding-brown))' }} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-4 sm:right-8 z-50 w-12 h-12 flex items-center justify-center group"
              aria-label="Next"
            >
              <ChevronRight className="w-7 h-7 transition-transform group-hover:translate-x-1 duration-300" style={{ color: 'hsl(var(--wedding-brown))' }} />
            </button>

            {/* Image */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-5xl max-h-[85vh] w-full px-16 sm:px-20"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedPhotoData.src}
                alt={selectedPhotoData.alt}
                className="w-full h-full object-contain"
              />
            </motion.div>

            {/* Elegant counter */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
              <p 
                className="text-sm tracking-wider"
                style={{ 
                  fontFamily: "'Lora', serif",
                  color: 'hsl(var(--wedding-brown))'
                }}
              >
                {photos.findIndex(p => p.id === selectedPhoto) + 1} / {photos.length}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}