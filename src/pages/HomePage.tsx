import { Section } from '../components/common';

export function HomePage() {
  return (
    <Section id="home-content" bgColor="white" className="text-center">
      <div className="max-w-3xl mx-auto">
        <p 
          className="text-lg md:text-xl mb-8"
          style={{ 
            fontFamily: "'Lora', serif",
            color: 'hsl(var(--wedding-champagne))'
          }}
        >
          We joyfully invite you to celebrate
        </p>
        <h2 
          className="text-4xl md:text-6xl mb-6"
          style={{ 
            fontFamily: "'Playfair Display', serif",
            color: 'hsl(var(--wedding-brown))'
          }}
        >
          Our Wedding Day
        </h2>
        <div 
          className="flex items-center justify-center gap-4 mb-8"
        >
          <div className="h-px w-16 md:w-24" style={{ backgroundColor: 'hsl(var(--wedding-champagne))' }} />
          <span 
            className="text-3xl"
            style={{ 
              fontFamily: "'Great Vibes', cursive",
              color: 'hsl(var(--wedding-champagne))'
            }}
          >
            Save the Date
          </span>
          <div className="h-px w-16 md:w-24" style={{ backgroundColor: 'hsl(var(--wedding-champagne))' }} />
        </div>
        <p 
          className="text-2xl md:text-3xl font-light mb-4"
          style={{ 
            fontFamily: "'Playfair Display', serif",
            color: 'hsl(var(--wedding-brown))'
          }}
        >
          December 15, 2025
        </p>
        <p 
          className="text-lg"
          style={{ 
            fontFamily: "'Lora', serif",
            color: 'hsl(var(--wedding-champagne))'
          }}
        >
          Manila, Philippines
        </p>
      </div>
    </Section>
  );
}
