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
      'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Lora:wght@400;500&family=Great+Vibes:wght@400&display=swap';
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
    background: '#f5f1e8',  // Warm cream background
    primary: '#2d2926',     // Deep charcoal text
    accent: '#8b6f47',      // Warm brown accent
    light: '#ffffff',       // Pure white
  };

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center cursor-pointer transition-all duration-1000 ease-in-out
        ${isExiting ? 'translate-y-[-100%] opacity-0' : 'translate-y-0 opacity-100'}`}
      style={{ backgroundColor: colors.background }}
      onClick={handleStart}
    >
      <div className="relative z-10 text-center max-w-2xl px-4">
        {/* Date or Location - Top Detail */}
        <p
          className="mb-12 text-[10px] md:text-xs tracking-[0.4em] uppercase opacity-70 transition-all duration-700"
          style={{ fontFamily: "'Lora', serif", color: colors.primary }}
        >
          April Twenty-Ninth • Two Thousand Twenty-Six
        </p>

        {/* Main Typography Block */}
        <div className="space-y-2 md:space-y-4 mb-16">
          <h1
            className="text-5xl md:text-8xl font-light tracking-tight animate-fade-in-up"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: colors.primary,
              letterSpacing: '0.05em',
            }}
          >
            Armando
          </h1>

          <div className="flex items-center justify-center gap-4 py-2">
            <div
              className="h-px w-8 md:w-12"
              style={{ backgroundColor: colors.accent }}
            />
            <span
              className="text-3xl md:text-4xl font-light"
              style={{
                fontFamily: "'Great Vibes', cursive",
                color: colors.accent,
              }}
            >
              &
            </span>
            <div
              className="h-px w-8 md:w-12"
              style={{ backgroundColor: colors.accent }}
            />
          </div>

          <h1
            className="text-5xl md:text-8xl font-light tracking-tight animate-fade-in-up delay-200"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: colors.primary,
              letterSpacing: '0.05em',
            }}
          >
            Gizelle
          </h1>
        </div>

        {/* CTA */}
        <div className="space-y-6">
          <p
            className="text-[11px] md:text-sm tracking-[0.3em] uppercase"
            style={{
              fontFamily: "'Lora', serif",
              color: colors.accent,
              letterSpacing: '0.15em',
            }}
          >
            Together with their families
          </p>

          <div className="pt-8">
            <button
              className="group relative overflow-hidden px-8 py-3 transition-all"
              onClick={handleStart}
            >
              <span
                className="text-[10px] tracking-[0.5em] uppercase transition-all duration-300 group-hover:opacity-70"
                style={{
                  color: colors.primary,
                  fontFamily: "'Lora', serif",
                  fontWeight: '500',
                }}
              >
                Click to Open
              </span>
              {/* Animated underline */}
              <div
                className="absolute bottom-0 left-1/2 w-0 h-[2px] transition-all duration-500 group-hover:w-1/2 group-hover:left-1/4"
                style={{ backgroundColor: colors.accent }}
              />
            </button>
          </div>

          {/* Scroll indicator */}
          <div className="pt-12 opacity-50">
            <p
              className="text-[9px] tracking-[0.3em] uppercase"
              style={{
                fontFamily: "'Lora', serif",
                color: colors.primary,
              }}
            >
              or scroll down
            </p>
          </div>
        </div>
      </div>

      {/* Decorative corner elements */}
      <div
        className="absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2"
        style={{ borderColor: colors.accent, opacity: 0.3 }}
      />
      <div
        className="absolute bottom-8 right-8 w-12 h-12 border-b-2 border-r-2"
        style={{ borderColor: colors.accent, opacity: 0.3 }}
      />

      {/* Modern Background Texture: Grain (Optional but adds "Luxury Paper" feel) */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
    </div>
  );
}
