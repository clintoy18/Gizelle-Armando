import { Section } from '../components/common';

const timeline = [
  {
    date: 'January 2020',
    title: 'We First Met',
    description: 'Our paths crossed for the first time, and little did we know it would be the start of something beautiful.',
  },
  {
    date: 'March 2020',
    title: 'First Date',
    description: 'Our first date was magical. We talked for hours and knew there was something special between us.',
  },
  {
    date: 'December 2021',
    title: 'He Said "I Love You"',
    description: 'Those three little words changed everything. Our love grew stronger with each passing day.',
  },
  {
    date: 'February 2024',
    title: 'The Proposal',
    description: 'Under the stars, he got down on one knee and asked the question that would change our lives forever.',
  },
];

export function OurStoryPage() {
  return (
    <Section bgColor="cream" className="text-center">
      <h2 
        className="text-4xl md:text-5xl mb-4"
        style={{ 
          fontFamily: "'Playfair Display', serif",
          color: 'hsl(var(--wedding-brown))'
        }}
      >
        Our Story
      </h2>
      <p 
        className="text-lg mb-12 max-w-xl mx-auto"
        style={{ 
          fontFamily: "'Lora', serif",
          color: 'hsl(var(--wedding-champagne))'
        }}
      >
        The journey of our love
      </p>

      <div className="relative max-w-2xl mx-auto">
        {/* Timeline line */}
        <div 
          className="absolute left-1/2 transform -translate-x-1/2 w-px h-full"
          style={{ backgroundColor: 'hsl(var(--wedding-champagne) / 0.3)' }}
        />

        {timeline.map((item, index) => (
          <div 
            key={index}
            className={`relative flex items-center mb-12 ${
              index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
            }`}
          >
            <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12 text-left'}`}>
              <p 
                className="text-sm mb-2"
                style={{ 
                  fontFamily: "'Lora', serif",
                  color: 'hsl(var(--wedding-champagne))'
                }}
              >
                {item.date}
              </p>
              <h3 
                className="text-xl md:text-2xl mb-2"
                style={{ 
                  fontFamily: "'Playfair Display', serif",
                  color: 'hsl(var(--wedding-brown))'
                }}
              >
                {item.title}
              </h3>
              <p 
                className="text-sm"
                style={{ 
                  fontFamily: "'Lora', serif",
                  color: 'hsl(var(--wedding-brown-light))'
                }}
              >
                {item.description}
              </p>
            </div>

            {/* Timeline dot */}
            <div 
              className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full border-4"
              style={{ 
                backgroundColor: 'hsl(var(--wedding-cream))',
                borderColor: 'hsl(var(--wedding-champagne))'
              }}
            />

            <div className="w-1/2" />
          </div>
        ))}
      </div>
    </Section>
  );
}
