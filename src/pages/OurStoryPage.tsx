import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Section } from "../components/common";

const weddingPhotos = [
  "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800",
  "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800",
  "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=800",
  "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800",
  "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=800",
];

export function OurStoryPage() {
  const galleryRef = useRef<HTMLDivElement>(null);
  const [galleryWidth, setGalleryWidth] = useState(0);

  useEffect(() => {
    const calculateWidth = () => {
      if (galleryRef.current) {
        const totalWidth = galleryRef.current.scrollWidth / 2;
        setGalleryWidth(totalWidth);
      }
    };

    calculateWidth();
    window.addEventListener("resize", calculateWidth);
    return () => window.removeEventListener("resize", calculateWidth);
  }, []);

  return (
    <Section
      bgColor="cream"
      className="pt-24 pb-0 overflow-hidden min-h-screen flex flex-col justify-between"
    >
      {/* Scripture Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="flex flex-col items-center text-center px-4 sm:px-6 max-w-3xl mx-auto mb-12 md:mb-16"
      >
        <span
          className="block text-[10px] sm:text-sm uppercase tracking-[0.3em] sm:tracking-[0.4em] mb-2 sm:mb-4"
          style={{
            color: "hsl(var(--wedding-champagne))",
            fontFamily: "'Lora', serif",
          }}
        >
          Proverbs 18:22
        </span>
        <h2
          className="text-base sm:text-lg md:text-2xl lg:text-4xl xl:text-5xl italic leading-snug sm:leading-relaxed mb-4 sm:mb-6"
          style={{
            fontFamily: "'Playfair Display', serif",
            color: "hsl(var(--wedding-brown))",
          }}
        >
          "He who finds a wife finds what is good and receives favor from the
          Lord."
        </h2>
        <div className="flex justify-center items-center gap-2 sm:gap-4">
          <div className="h-px w-6 sm:w-16 bg-stone-300" />
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full border border-stone-300" />
          <div className="h-px w-6 sm:w-16 bg-stone-300" />
        </div>
      </motion.div>

      {/* Infinite Sliding Photo Gallery */}
      <div className="relative mt-12 sm:mt-20 mb-10 w-full overflow-hidden">
        <motion.div
          className="flex gap-3 sm:gap-4 px-2 sm:px-4"
          ref={galleryRef}
          animate={{ x: [0, -galleryWidth] }} // start at 0, slide to negative galleryWidth
          transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
        >
          {[...weddingPhotos, ...weddingPhotos].map((src, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-48 sm:w-64 md:w-80 h-60 sm:h-80 md:h-[450px] rounded-sm overflow-hidden shadow-md"
            >
              <img
                src={src}
                alt={`Wedding moment ${index + 1}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          ))}
        </motion.div>

        {/* Gradient overlays */}
        <div className="absolute inset-y-0 left-0 w-12 sm:w-20 bg-gradient-to-r from-cream to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-12 sm:w-20 bg-gradient-to-l from-cream to-transparent z-10" />
      </div>

      {/* Footer Text */}
      <div className="text-center pb-12 px-4 sm:px-6">
        <p
          className="text-base sm:text-lg opacity-60 italic"
          style={{
            fontFamily: "'Lora', serif",
            color: "hsl(var(--wedding-brown))",
          }}
        >
          Scroll to see event details.
        </p>
      </div>
    </Section>
  );
}
