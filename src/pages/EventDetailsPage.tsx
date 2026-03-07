import { Section } from '../components/common';
import { motion } from 'framer-motion';

const events = [
  {
    title: 'Ceremony',
    time: '1:30 PM',
    venue: 'Cebu Metropolitan Cathedral',
    address: 'Cebu City, Cebu, Philippines',
    description: 'Join us as Armando and Gizelle exchange their vows in this sacred celebration of love.',
  },
  {
    title: 'Reception',
    time: '6:00 PM',
    venue: 'Golden Prince (Alicia Hall)',
    address: 'Cebu City, Cebu, Philippines',
    description: 'Celebrate with us over dinner, drinks, and dancing as we begin our forever together.',
  },
];

export function EventDetailsPage() {
  return (
    <Section bgColor="white" className="text-center py-16 sm:py-20 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 
          className="text-4xl md:text-5xl mb-4"
          style={{ 
            fontFamily: "'Playfair Display', serif",
            color: '#2d2926',
            letterSpacing: '0.02em'
          }}
        >
          Wedding Events
        </h2>
        <p 
          className="text-lg mb-12 max-w-xl mx-auto"
          style={{ 
            fontFamily: "'Lora', serif",
            color: '#8b6f47',
            letterSpacing: '0.05em'
          }}
        >
          December 15, 2025
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {events.map((event, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            className="p-8 rounded-lg transition-all hover:shadow-lg"
            style={{ backgroundColor: '#f5f1e8' }}
          >
            <h3 
              className="text-2xl md:text-3xl mb-2 font-light"
              style={{ 
                fontFamily: "'Great Vibes', cursive",
                color: '#8b6f47'
              }}
            >
              {event.title}
            </h3>
            <p 
              className="text-xl mb-4 font-light"
              style={{ 
                fontFamily: "'Playfair Display', serif",
                color: '#2d2926',
                letterSpacing: '0.05em'
              }}
            >
              {event.time}
            </p>
            <div className="h-px w-16 mx-auto mb-4" style={{ backgroundColor: '#8b6f47', opacity: 0.3 }} />
            <h4 
              className="text-lg font-medium mb-1"
              style={{ 
                fontFamily: "'Playfair Display', serif",
                color: '#2d2926'
              }}
            >
              {event.venue}
            </h4>
            <p 
              className="text-sm mb-4"
              style={{ 
                fontFamily: "'Lora', serif",
                color: '#5a5a5a'
              }}
            >
              {event.address}
            </p>
            <p 
              className="text-sm leading-relaxed"
              style={{ 
                fontFamily: "'Lora', serif",
                color: '#5a5a5a'
              }}
            >
              {event.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12"
      >
        <div className="text-center">
          <p
            className="text-sm sm:text-base md:text-lg opacity-70 italic"
            style={{
              fontFamily: "'Lora', serif",
              color: "#8b6f47",
            }}
          >
            Armando & Gizelle's Nuptials
          </p>
        </div>
      </motion.div>
    </Section>
  );
}
