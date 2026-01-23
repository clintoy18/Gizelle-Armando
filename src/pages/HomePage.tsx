import { Section } from '../components/common';
import { motion } from 'framer-motion';

export function HomePage() {
  return (
    <Section 
      id="home-content" 
      className="relative text-center min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/30" 
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.4)' }}
      />

      {/* Animate content */}
      <motion.div
        className="relative z-10 max-w-3xl mx-auto px-4"
        initial={{ opacity: 0, y: 20 }}       // start invisible & slightly down
        animate={{ opacity: 1, y: 0 }}        // fade in and move up
        transition={{ duration: 2.5, ease: "easeOut" }} // smooth fade
      >
        <p 
          className="text-lg md:text-xl mb-8"
          style={{ fontFamily: "'Lora', serif", color: 'hsl(var(--wedding-champagne))' }}
        >
          We joyfully invite you to celebrate
        </p>
        <h2 
          className="text-5xl md:text-7xl mb-6"
          style={{ fontFamily: "'Playfair Display', serif", color: 'hsl(var(--wedding-brown))' }}
        >
          Our Wedding Day
        </h2>
        
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px w-12 md:w-20" style={{ backgroundColor: 'hsl(var(--wedding-champagne))' }} />
          <span 
            className="text-4xl md:text-5xl"
            style={{ fontFamily: "'Great Vibes', cursive", color: 'hsl(var(--wedding-champagne))' }}
          >
            Save the Date
          </span>
          <div className="h-px w-12 md:w-20" style={{ backgroundColor: 'hsl(var(--wedding-champagne))' }} />
        </div>

        <p 
          className="text-2xl md:text-4xl font-light mb-4"
          style={{ fontFamily: "'Playfair Display', serif", color: 'hsl(var(--wedding-brown))' }}
        >
          December 15, 2025
        </p>
        <p 
          className="text-xl"
          style={{ fontFamily: "'Lora', serif", color: 'hsl(var(--wedding-champagne))' }}
        >
          Manila, Philippines
        </p>
      </motion.div>
    </Section>
  );
}
