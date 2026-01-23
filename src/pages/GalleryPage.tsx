import { Section } from '../components/common';

const photos = [
  { id: 1, src: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80', alt: 'Couple photo 1' },
  { id: 2, src: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80', alt: 'Couple photo 2' },
  { id: 3, src: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80', alt: 'Couple photo 3' },
  { id: 4, src: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Couple photo 4' },
  { id: 5, src: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80', alt: 'Couple photo 5' },
  { id: 6, src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80', alt: 'Couple photo 6' },
];

export function GalleryPage() {
  return (
    <Section bgColor="white" className="text-center">
      <h2 
        className="text-4xl md:text-5xl mb-4"
        style={{ 
          fontFamily: "'Playfair Display', serif",
          color: 'hsl(var(--wedding-brown))'
        }}
      >
        Our Gallery
      </h2>
      <p 
        className="text-lg mb-12 max-w-xl mx-auto"
        style={{ 
          fontFamily: "'Lora', serif",
          color: 'hsl(var(--wedding-champagne))'
        }}
      >
        Moments captured in time
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {photos.map((photo) => (
          <div 
            key={photo.id}
            className="aspect-square rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-105"
            style={{ backgroundColor: 'hsl(var(--wedding-cream))' }}
          >
            <img
              src={photo.src}
              alt={photo.alt}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      <p 
        className="mt-8 text-sm"
        style={{ 
          fontFamily: "'Lora', serif",
          color: 'hsl(var(--wedding-champagne))'
        }}
      >
      </p>
    </Section>
  );
}
