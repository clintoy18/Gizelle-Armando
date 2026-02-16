import { useEffect, useRef, useState } from 'react';

interface IntroProps {
  onComplete: () => void;
}

export function Intro({ onComplete }: IntroProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Great+Vibes&family=Playfair+Display:wght@400;700&family=Lora:wght@400;500&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => { document.head.removeChild(link); };
  }, []);

  const handleClick = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      onComplete();
    }, 1000);
  };

  if (!isVisible) return null;

  // New Color Constants (Beige-Brown Palette)
  const colors = {
    bgLight: '#F5F2ED',    // Soft Beige/Cream
    bgWarm: '#E8E2D9',     // Warm Sand
    textBrown: '#5C4B40',  // Rich Earthy Brown
    accentGold: '#A68D76', // Muted Taupe/Beige
  };

  return (
    <div 
      className={`fixed inset-0 z-[100] cursor-pointer flex items-center justify-center overflow-hidden transition-opacity duration-1000 ${isExiting ? 'opacity-0' : 'opacity-100'}`}
      style={{
        // Gradient changed from pink-tones to a soft beige transition
        background: `linear-gradient(180deg, ${colors.bgLight} 0%, ${colors.bgWarm} 50%, ${colors.bgLight} 100%)`,
      }}
      onClick={handleClick}
    >
      <audio ref={audioRef} src="/music/wedding-song.mp3" />

      {/* Refined Background Elements - Using Taupe and Sand blur circles */}
      <div className="absolute top-[10%] left-[10%] w-64 h-64 rounded-full blur-3xl animate-float opacity-30" 
           style={{ backgroundColor: colors.accentGold }} />
      <div className="absolute bottom-[15%] right-[5%] w-96 h-96 rounded-full blur-3xl animate-float-delayed opacity-20" 
           style={{ backgroundColor: colors.textBrown }} />

      {/* Main content */}
      <div className="text-center space-y-10 px-6 relative z-10 animate-fade-in">
        <div className="space-y-4">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight" 
              style={{ fontFamily: "'Playfair Display', serif", color: colors.textBrown }}>
            Armando
          </h1>
          
          <div className="flex items-center justify-center gap-6">
            <div className="h-px w-12 md:w-20" style={{ backgroundColor: colors.accentGold, opacity: 0.5 }} />
            <span className="text-5xl md:text-6xl italic" 
                  style={{ fontFamily: "'Great Vibes', cursive", color: colors.accentGold }}>
              &
            </span>
            <div className="h-px w-12 md:w-20" style={{ backgroundColor: colors.accentGold, opacity: 0.5 }} />
          </div>

          <h2 className="text-6xl md:text-8xl font-bold tracking-tight" 
              style={{ fontFamily: "'Playfair Display', serif", color: colors.textBrown }}>
            Gee
          </h2>
        </div>

        <p className="text-lg md:text-xl font-medium tracking-[0.2em] uppercase" 
           style={{ fontFamily: "'Lora', serif", color: colors.accentGold }}>
          Together we celebrate love
        </p>

        <div className="pt-12">
          <span className="text-xs md:text-sm tracking-widest uppercase animate-pulse opacity-60" 
                style={{ fontFamily: "'Lora', serif", color: colors.textBrown }}>
            Click to enter
          </span>
        </div>
      </div>
    </div>
  );
}