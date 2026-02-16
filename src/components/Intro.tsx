import { useEffect, useState } from 'react';

interface IntroProps {
  onComplete: () => void;
}

export function Intro({ onComplete }: IntroProps) {
  const [isExiting, setIsExiting] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Elegant Google Font imports
    const link = document.createElement('link');
    link.href =
      'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Lora:wght@400;500&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const handleStart = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      onComplete();
    }, 1200); // Slightly longer for a smoother exit
  };

  if (!isVisible) return null;

  const colors = {
    paper: '#FBFBF9', // Almost white, high-end paper feel
    ink: '#2D2926',   // Deep charcoal/soft black
    gold: '#BFAF80',  // True champagne gold
  };

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center cursor-pointer transition-all duration-1000 ease-in-out
        ${isExiting ? 'translate-y-[-100%] opacity-0' : 'translate-y-0 opacity-100'}`}
      style={{ backgroundColor: colors.paper }}
      onClick={handleStart}
    >
      <div className="relative z-10 text-center max-w-2xl px-4">
        {/* Date or Location - Top Detail */}
        <p
          className="mb-12 text-[10px] md:text-xs tracking-[0.4em] uppercase opacity-60 transition-all duration-700"
          style={{ fontFamily: "'Lora', serif", color: colors.ink }}
        >
          Twenty Fourth of April • Two Thousand Twenty Six
        </p>

        {/* Main Typography Block */}
        <div className="space-y-2 md:space-y-4 mb-16">
          <h1
            className="text-5xl md:text-8xl font-light tracking-tight animate-fade-in-up"
            style={{ fontFamily: "'Playfair Display', serif", color: colors.ink }}
          >
            Armando
          </h1>

          <div className="flex items-center justify-center gap-4 py-2">
            <span
              className="text-3xl md:text-4xl italic opacity-40"
              style={{ fontFamily: "'Playfair Display', serif", color: colors.gold }}
            >
              &
            </span>
          </div>

          <h1
            className="text-5xl md:text-8xl font-light tracking-tight animate-fade-in-up delay-200"
            style={{ fontFamily: "'Playfair Display', serif", color: colors.ink }}
          >
            Gee
          </h1>
        </div>

        {/* CTA */}
        <div className="space-y-6">
          <p
            className="text-[11px] md:text-sm tracking-[0.3em] uppercase italic"
            style={{ fontFamily: "'Lora', serif", color: colors.gold }}
          >
            Together with their families
          </p>

          <div className="pt-8">
            <button className="group relative overflow-hidden px-8 py-3 transition-all">
              <span
                className="text-[10px] tracking-[0.5em] uppercase opacity-40 group-hover:opacity-100 transition-opacity"
                style={{ color: colors.ink }}
              >
                Click to Open
              </span>
              {/* Animated underline */}
              <div className="absolute bottom-0 left-1/2 w-0 h-[1px] bg-[#BFAF80] transition-all duration-500 group-hover:w-1/2 group-hover:left-1/4" />
            </button>
          </div>
        </div>
      </div>

      {/* Modern Background Texture: Grain (Optional but adds "Luxury Paper" feel) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
    </div>
  );
}