import { useEffect, useRef, useState } from 'react';

interface IntroProps {
  onComplete: () => void;
}

export function Intro({ onComplete }: IntroProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  // Audio reference
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Add Google Fonts
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Great+Vibes&family=Playfair+Display:wght@400;700&family=Lora:wght@400;500&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const handleClick = () => {
    // // Play music
    // if (audioRef.current) {
    //   audioRef.current.play().catch((err) => {
    //     console.log('Audio play failed:', err);
    //   });
    // }

    // Exit intro
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      onComplete();
    }, 1000);
  };

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 z-[100] cursor-pointer flex items-center justify-center overflow-hidden transition-opacity duration-500 ${isExiting ? 'opacity-0' : 'opacity-100'}`}
      style={{
        background: 'linear-gradient(180deg, hsl(var(--wedding-cream)) 0%, hsl(var(--wedding-tulle)) 50%, hsl(var(--wedding-cream)) 100%)',
      }}
      onClick={handleClick}
    >
      {/* Audio Element */}
      <audio ref={audioRef} src="/music/wedding-song.mp3" />

      {/* Decorative background elements */}
      <div className="absolute top-[10%] left-[10%] w-64 h-64 rounded-full blur-3xl animate-float" style={{ backgroundColor: 'hsl(var(--wedding-champagne) / 0.15)' }} />
      <div className="absolute bottom-[10%] right-[10%] w-80 h-80 rounded-full blur-3xl animate-float-delayed" style={{ backgroundColor: 'hsl(var(--wedding-brown) / 0.08)' }} />
      <div className="absolute top-[40%] right-[20%] w-48 h-48 rounded-full blur-3xl animate-float" style={{ backgroundColor: 'hsl(var(--wedding-champagne) / 0.1)' }} />

      {/* Main content */}
      <div className="text-center space-y-8 px-6 relative z-10 animate-fade-in">
        <div className="space-y-6">
          <h1 className="text-6xl md:text-8xl font-bold transition-all duration-1000" style={{ fontFamily: "'Playfair Display', serif", color: 'hsl(var(--wedding-brown))', textShadow: '0 2px 4px hsl(var(--wedding-brown) / 0.1)' }}>Armando</h1>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-16 md:w-24" style={{ background: 'linear-gradient(to right, transparent, hsl(var(--wedding-champagne)))' }} />
            <span className="text-4xl md:text-5xl" style={{ fontFamily: "'Great Vibes', cursive", color: 'hsl(var(--wedding-champagne))' }}>&</span>
            <div className="h-px w-16 md:w-24" style={{ background: 'linear-gradient(to left, transparent, hsl(var(--wedding-champagne)))' }} />
          </div>
          <h2 className="text-6xl md:text-8xl font-bold transition-all duration-1000" style={{ fontFamily: "'Playfair Display', serif", color: 'hsl(var(--wedding-brown))', textShadow: '0 2px 4px hsl(var(--wedding-brown) / 0.1)' }}>Gee</h2>
        </div>

        <p className="text-xl md:text-2xl font-light tracking-wide" style={{ fontFamily: "'Lora', serif", color: 'hsl(var(--wedding-champagne))' }}>
          Together we celebrate love
        </p>

        <div className="pt-8 text-sm md:text-base animate-pulse" style={{ fontFamily: "'Lora', serif", color: 'hsl(var(--wedding-champagne) / 0.8)' }}>
          Click anywhere to continue
        </div>
      </div>
    </div>
  );
}
