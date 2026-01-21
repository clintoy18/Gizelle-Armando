import { Section } from '../components/common';

const photos = [
  { id: 1, alt: 'Couple photo 1' },
  { id: 2, alt: 'Couple photo 2' },
  { id: 3, alt: 'Couple photo 3' },
  { id: 4, alt: 'Couple photo 4' },
  { id: 5, alt: 'Couple photo 5' },
  { id: 6, alt: 'Couple photo 6' },
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
            <div 
              className="w-full h-full flex items-center justify-center"
              style={{ backgroundColor: 'hsl(var(--wedding-champagne) / 0.1)' }}
            >
              <span 
                className="text-sm"
                style={{ 
                  fontFamily: "'Lora', serif",
                  color: 'hsl(var(--wedding-champagne))'
                }}
              >
                Photo {photo.id}
              </span>
            </div>
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
        Upload your photos to personalize your gallery
      </p>
    </Section>
  );
}
