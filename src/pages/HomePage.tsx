import { Section } from '../components/common';
import { motion } from 'framer-motion';

export function HomePage() {
  return (
    <Section
      id="home-content"
      className="relative text-center min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: "url('/images/bg.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay - dark for text contrast */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
      />

      {/* Animate content */}
      <motion.div
        className="relative z-10 max-w-3xl mx-auto px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2.5, ease: "easeOut" }}
      >
        <p
          className="text-lg md:text-xl mb-8 font-light tracking-wide"
          style={{
            fontFamily: "'Lora', serif",
            color: '#f5f1e8',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
          }}
        >
          We joyfully invite you to celebrate
        </p>

        <h2
          className="text-5xl md:text-7xl mb-6 font-light"
          style={{
            fontFamily: "'Playfair Display', serif",
            color: '#ffffff',
            textShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
            letterSpacing: '0.05em',
          }}
        >
          Our Wedding Day
        </h2>

        <div className="flex items-center justify-center gap-4 mb-8">
          <div
            className="h-px w-12 md:w-20"
            style={{
              backgroundColor: '#f5f1e8',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
            }}
          />
          <span
            className="text-4xl md:text-5xl font-light"
            style={{
              fontFamily: "'Great Vibes', cursive",
              color: '#f5f1e8',
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
            }}
          >
            Save the Date
          </span>
          <div
            className="h-px w-12 md:w-20"
            style={{
              backgroundColor: '#f5f1e8',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
            }}
          />
        </div>

        <p
          className="text-2xl md:text-4xl font-light mb-4"
          style={{
            fontFamily: "'Playfair Display', serif",
            color: '#ffffff',
            textShadow: '0 3px 10px rgba(0, 0, 0, 0.4)',
            letterSpacing: '0.02em',
          }}
        >
          April 29, 2026
        </p>

        <p
          className="text-xl font-light tracking-wide"
          style={{
            fontFamily: "'Lora', serif",
            color: '#f5f1e8',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
          }}
        >
          Cebu Metropolitan Cathedral, Cebu City
        </p>

        <div className="mt-12">
          <p
            className="text-lg md:text-xl font-light tracking-wide"
            style={{
              fontFamily: "'Lora', serif",
              color: '#f5f1e8',
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
            }}
          >
            #GIZELLEctedByGodForARMANDO
          </p>
        </div>
      </motion.div>
    </Section>
  );
}
