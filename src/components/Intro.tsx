import { useEffect, useState } from 'react';

interface IntroProps {
  onComplete: () => void;
}

export function Intro({ onComplete }: IntroProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Add Google Fonts for wedding typography
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Great+Vibes:wght@400&family=Playfair+Display:wght@400;700&family=Lora:wght@400;500&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  const handleClick = () => {
    setIsVisible(false);
    setTimeout(() => {
      onComplete();
    }, 500);
  };

  if (!isVisible) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-gradient-to-b from-white via-amber-50 to-white cursor-pointer transition-opacity duration-500 flex items-center justify-center overflow-hidden"
      onClick={handleClick}
    >
      {/* Decorative background elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-amber-100 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-amber-50 rounded-full opacity-20 blur-3xl"></div>

      <div className="text-center space-y-8 px-6 relative z-10">
        {/* Main Names */}
        <div className="space-y-6">
          <h1 
            className="text-7xl md:text-8xl font-bold text-amber-900 transition-all duration-1000 animate-fade-in"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Armando
          </h1>
          
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-amber-700"></div>
            <span className="text-3xl md:text-4xl text-amber-700" style={{ fontFamily: "'Great Vibes', cursive" }}>
              &
            </span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-amber-700"></div>
          </div>

          <h2 
            className="text-6xl md:text-7xl font-bold text-amber-900 transition-all duration-1000 animate-fade-in"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Gee
          </h2>
        </div>

        {/* Subtitle */}
        <p 
          className="text-xl md:text-2xl text-amber-700 font-light tracking-wide"
          style={{ fontFamily: "'Lora', serif" }}
        >
          Together we celebrate love
        </p>

        {/* Click instruction */}
        <div className="pt-8 text-amber-600 text-sm md:text-base animate-pulse" style={{ fontFamily: "'Lora', serif" }}>
          Click anywhere to continue
        </div>
      </div>
    </div>
  );
}
