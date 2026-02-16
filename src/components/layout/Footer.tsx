export function Footer() {
  return (
    <footer 
      className="py-16 sm:py-20 text-center"
      style={{ backgroundColor: 'hsl(var(--wedding-brown))' }}
    >
      <div className="container mx-auto px-6">
        
        {/* ✨ BIG ROMANTIC MESSAGE - Script font */}
        <div className="mb-8 sm:mb-10">
          <p 
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl mb-2"
            style={{ 
              fontFamily: "'Great Vibes', cursive",
              color: 'hsl(var(--wedding-cream))',
              lineHeight: '1.2',
              fontWeight: '400'
            }}
          >
            See You There!
          </p>
          <p 
            className="text-base sm:text-lg md:text-xl mt-6"
            style={{ 
              fontFamily: "'Lora', serif",
              color: 'hsl(var(--wedding-champagne))',
              letterSpacing: '0.1em'
            }}
          >
            DECEMBER 15, 2024
          </p>
        </div>

        {/* Decorative divider */}
        <div className="flex justify-center items-center gap-4 my-8 sm:my-10">
          <div className="h-px w-16 bg-stone-400/30" />
          <div className="w-2 h-2 rounded-full border border-stone-400/30" />
          <div className="h-px w-16 bg-stone-400/30" />
        </div>

        {/* Names */}
        <h3 
          className="text-3xl sm:text-4xl md:text-5xl mb-4"
          style={{ 
            fontFamily: "'Great Vibes', cursive",
            color: 'hsl(var(--wedding-cream))'
          }}
        >
          Gizelle & Armando
        </h3>

        <p 
          className="text-sm sm:text-base mb-8"
          style={{ 
            fontFamily: "'Lora', serif",
            color: 'hsl(var(--wedding-cream) / 0.8)',
            fontStyle: 'italic'
          }}
        >
          Together we celebrate love
        </p>

        {/* Copyright */}
        <p 
          className="text-xs sm:text-sm pt-8 border-t border-stone-400/20"
          style={{ 
            fontFamily: "'Lora', serif",
            color: 'hsl(var(--wedding-cream) / 0.6)'
          }}
        >
          © {new Date().getFullYear()} Gizelle & Armando Wedding
        </p>
        
          <p 
            className="text-[10px] sm:text-xs mt-2 opacity-60"
            style={{ 
              fontFamily: "'Lora', serif",
              color: 'hsl(var(--wedding-cream))'
            }}
          >
            Crafted with love by Clint
          </p>
        
      </div>
    </footer>
  );
}