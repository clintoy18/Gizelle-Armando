import { Section } from '../components/common';

const events = [
  {
    title: 'Ceremony',
    time: '3:00 PM',
    venue: 'San Agustin Church',
    address: 'Intramuros, Manila',
    description: 'Join us as we exchange our vows in this historic church.',
  },
  {
    title: 'Reception',
    time: '6:00 PM',
    venue: 'Manila Hotel',
    address: 'One Rizal Park, Manila',
    description: 'Celebrate with us over dinner, drinks, and dancing.',
  },
];

export function EventDetailsPage() {
  return (
    <Section bgColor="white" className="text-center">
      <h2 
        className="text-4xl md:text-5xl mb-4"
        style={{ 
          fontFamily: "'Playfair Display', serif",
          color: 'hsl(var(--wedding-brown))'
        }}
      >
        Wedding Events
      </h2>
      <p 
        className="text-lg mb-12 max-w-xl mx-auto"
        style={{ 
          fontFamily: "'Lora', serif",
          color: 'hsl(var(--wedding-champagne))'
        }}
      >
        December 15, 2025
      </p>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {events.map((event, index) => (
          <div 
            key={index}
            className="p-8 rounded-lg transition-transform hover:scale-105"
            style={{ backgroundColor: 'hsl(var(--wedding-cream))' }}
          >
            <h3 
              className="text-2xl md:text-3xl mb-2"
              style={{ 
                fontFamily: "'Great Vibes', cursive",
                color: 'hsl(var(--wedding-brown))'
              }}
            >
              {event.title}
            </h3>
            <p 
              className="text-xl mb-4"
              style={{ 
                fontFamily: "'Playfair Display', serif",
                color: 'hsl(var(--wedding-champagne))'
              }}
            >
              {event.time}
            </p>
            <div className="h-px w-16 mx-auto mb-4" style={{ backgroundColor: 'hsl(var(--wedding-champagne) / 0.3)' }} />
            <h4 
              className="text-lg font-medium mb-1"
              style={{ 
                fontFamily: "'Playfair Display', serif",
                color: 'hsl(var(--wedding-brown))'
              }}
            >
              {event.venue}
            </h4>
            <p 
              className="text-sm mb-4"
              style={{ 
                fontFamily: "'Lora', serif",
                color: 'hsl(var(--wedding-champagne))'
              }}
            >
              {event.address}
            </p>
            <p 
              className="text-sm"
              style={{ 
                fontFamily: "'Lora', serif",
                color: 'hsl(var(--wedding-brown-light))'
              }}
            >
              {event.description}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
