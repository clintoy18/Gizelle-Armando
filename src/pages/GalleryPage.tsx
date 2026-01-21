import { GalleryCard, Section, SectionTitle } from '../components/common';

export const GalleryPage: React.FC = () => {
  const galleryImages = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=500&h=500&fit=crop',
      title: 'Engagement Photos',
      description: 'Our first official couple photos',
      alt: 'Engagement photo',
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=500&h=500&fit=crop',
      title: 'Beach Day',
      description: 'Golden hour at our favorite beach',
      alt: 'Beach memories',
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1502933691298-84fc14542831?w=500&h=500&fit=crop',
      title: 'Adventure Time',
      description: 'Mountain hiking adventure',
      alt: 'Adventure together',
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&h=500&fit=crop',
      title: 'Sunset Moments',
      description: 'Romantic sunset together',
      alt: 'Sunset photo',
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1629634148412-c9ce1b236e0a?w=500&h=500&fit=crop',
      title: 'Special Moments',
      description: 'Candid moment together',
      alt: 'Special moment',
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1498972905285-8ba55e8ac200?w=500&h=500&fit=crop',
      title: 'Together',
      description: 'Just the two of us',
      alt: 'Together photo',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Section bgColor="cream" className="py-20">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-4">
            Our Gallery
          </h1>
          <p className="text-xl text-gray-700">
            Moments from our journey together
          </p>
        </div>
      </Section>

      <Section bgColor="white" className="py-20">
        <SectionTitle subtitle="Memories we treasure">
          Our Love Through the Years
        </SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {galleryImages.map((item) => (
            <GalleryCard
              key={item.id}
              image={item.image}
              title={item.title}
              description={item.description}
              alt={item.alt}
            />
          ))}
        </div>
      </Section>

      {/* Shared Gallery */}
      <Section bgColor="gray" className="py-20">
        <SectionTitle>Share Your Memories</SectionTitle>
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xl text-gray-700 mb-8 leading-relaxed">
            Help us capture all the wonderful moments! Use hashtag
            <span className="font-bold text-amber-600 mx-2">#OurWeddingDay</span>
            to share your photos with us.
          </p>
          <div className="bg-white p-12 rounded-lg shadow-lg border-2 border-amber-200">
            <div className="text-5xl mb-4">📸</div>
            <p className="text-xl text-gray-900 font-semibold mb-2">Share Your Photos!</p>
            <p className="text-gray-700 mb-6">
              Follow us on social media and tag us in your wedding day photos using #OurWeddingDay. 
              We'll repost and share our favorites!
            </p>
            <div className="space-y-3">
              <p className="text-gray-600">📷 Instagram: @OurWeddingDay</p>
              <p className="text-gray-600">📌 Facebook: Our Wedding Celebration</p>
              <p className="text-gray-600">🐦 Twitter: @OurWeddingDay</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Photo Tips */}
      <Section bgColor="white" className="py-20">
        <SectionTitle>Photo Tips</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-amber-50 p-8 rounded-lg border-l-4 border-amber-500">
            <h3 className="text-xl font-semibold mb-3 text-gray-900">🌅 Golden Hour</h3>
            <p className="text-gray-700">
              The best light is during golden hour - early morning or sunset. These photos will be stunning!
            </p>
          </div>
          <div className="bg-amber-50 p-8 rounded-lg border-l-4 border-amber-500">
            <h3 className="text-xl font-semibold mb-3 text-gray-900">📍 Location Shots</h3>
            <p className="text-gray-700">
              Don't forget to capture the venue! Wide shots with the beautiful garden background are perfect.
            </p>
          </div>
          <div className="bg-amber-50 p-8 rounded-lg border-l-4 border-amber-500">
            <h3 className="text-xl font-semibold mb-3 text-gray-900">😄 Candid Moments</h3>
            <p className="text-gray-700">
              The best photos are often candid - capture real emotions, laughter, and genuine moments!
            </p>
          </div>
        </div>
      </Section>

      {/* Live Updates */}
      <Section bgColor="gray" className="py-20">
        <div className="max-w-2xl mx-auto bg-white p-12 rounded-lg shadow-lg border-2 border-amber-500">
          <h2 className="text-3xl font-serif font-bold mb-4 text-gray-900 text-center">📱 Real-Time Updates</h2>
          <p className="text-lg text-gray-700 text-center mb-6">
            Follow us on social media for live updates throughout the day!
          </p>
          <p className="text-center text-gray-600">
            We'll be sharing photos and updates as the day unfolds. Don't miss a moment!
          </p>
        </div>
      </Section>
    </div>
  );
};
