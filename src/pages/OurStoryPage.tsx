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
      className="pt-16 sm:pt-20 md:pt-24 pb-0"  // ✅ Remove min-h-screen
    >
      {/* ✅ Remove justify-between */}
      <div className="w-full overflow-hidden">
        
        {/* Scripture Header */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="flex flex-col items-center text-center mb-8 sm:mb-10 md:mb-12"
          >
            <div className="w-full max-w-3xl mx-auto space-y-4 sm:space-y-6">
              <span
                className="block text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.3em] sm:tracking-[0.4em]"
                style={{
                  color: "hsl(var(--wedding-champagne))",
                  fontFamily: "'Lora', serif",
                }}
              >
                Proverbs 18:22
              </span>
              
              <h2
                className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl italic leading-relaxed sm:leading-relaxed md:leading-loose px-2 sm:px-4 md:px-0"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: "hsl(var(--wedding-brown))",
                }}
              >
                "He who finds a wife finds what is good and receives favor from the Lord."
              </h2>
              
              <div className="flex justify-center items-center gap-3 sm:gap-4 pt-2">
                <div className="h-px w-8 sm:w-12 md:w-16 bg-stone-300" />
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full border border-stone-300" />
                <div className="h-px w-8 sm:w-12 md:w-16 bg-stone-300" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Gallery */}
        <div className="relative mt-8 sm:mt-10 md:mt-12 mb-6 sm:mb-8 w-full">
          <div className="overflow-hidden">
            <motion.div
              ref={galleryRef}
              className="flex gap-2 sm:gap-3 md:gap-4 lg:gap-6"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                ease: "linear",
                duration: weddingPhotos.length * 5,
                repeat: Infinity,
              }}
            >
              {[...weddingPhotos, ...weddingPhotos].map((src, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-36 xs:w-40 sm:w-48 md:w-64 lg:w-80 xl:w-96 
                             h-44 xs:h-48 sm:h-60 md:h-80 lg:h-[450px] 
                             rounded-sm overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
                >
                  <img
                    src={src}
                    alt={`Wedding moment ${(index % weddingPhotos.length) + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Gradient overlays */}
          <div 
            className="absolute inset-y-0 left-0 w-6 sm:w-10 md:w-16 lg:w-20 pointer-events-none z-10"
            style={{
              background: "linear-gradient(to right, hsl(var(--cream, 48 12% 93%)) 0%, transparent 100%)"
            }}
          />
          <div 
            className="absolute inset-y-0 right-0 w-6 sm:w-10 md:w-16 lg:w-20 pointer-events-none z-10"
            style={{
              background: "linear-gradient(to left, hsl(var(--cream, 48 12% 93%)) 0%, transparent 100%)"
            }}
          />
        </div>

        {/* Footer */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8">
          <div className="text-center">
            <p
              className="text-sm sm:text-base md:text-lg opacity-60 italic"
              style={{
                fontFamily: "'Lora', serif",
                color: "hsl(var(--wedding-brown))",
              }}
            >
              Scroll to see event details.
            </p>
          </div>
        </div>

      </div>
    </Section>
  );
}