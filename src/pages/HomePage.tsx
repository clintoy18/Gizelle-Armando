import { Button, Section, SectionTitle } from '../components/common';

export const HomePage: React.FC = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <Section bgColor="cream" className="py-24 md:py-32 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="fade-in">
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-amber-900 mb-6">
              Welcome to Our Wedding
            </h1>
            <p className="text-xl text-amber-800 mb-8 leading-relaxed">
              We're thrilled to share this special day with you. Explore our story, 
              event details, and join us in celebrating our love.
            </p>
            <div className="flex gap-4 flex-wrap justify-center">
              <Button variant="primary" size="lg" onClick={() => scrollToSection('story')}>
                Our Story
              </Button>
              <Button variant="secondary" size="lg" onClick={() => scrollToSection('rsvp')}>
                RSVP Now
              </Button>
            </div>
          </div>
          
          <div className="fade-in mt-12" style={{ animationDelay: '0.2s' }}>
            <div className="bg-gradient-to-br from-amber-100 to-yellow-100 rounded-lg h-80 flex items-center justify-center shadow-lg mx-auto max-w-md">
              <div className="text-7xl animate-bounce">💒</div>
            </div>
          </div>
        </div>
      </Section>

      {/* Quick Info Section */}
      <Section bgColor="white" className="py-20 text-center">
        <SectionTitle>Celebration Details</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center p-8 bg-amber-50 rounded-lg hover:shadow-lg transition-shadow border border-amber-100">
            <div className="text-5xl mb-4">📅</div>
            <h3 className="text-2xl font-semibold mb-3 text-gray-900">Date</h3>
            <p className="text-lg text-amber-900 font-medium">June 15, 2024</p>
            <p className="text-amber-700 text-sm mt-2">Saturday</p>
          </div>
          
          <div className="text-center p-8 bg-amber-50 rounded-lg hover:shadow-lg transition-shadow border border-amber-100">
            <div className="text-5xl mb-4">📍</div>
            <h3 className="text-2xl font-semibold mb-3 text-gray-900">Location</h3>
            <p className="text-lg text-amber-900 font-medium">Garden Venue</p>
            <p className="text-amber-700 text-sm mt-2">City, State</p>
          </div>
          
          <div className="text-center p-8 bg-amber-50 rounded-lg hover:shadow-lg transition-shadow border border-amber-100">
            <div className="text-5xl mb-4">🕐</div>
            <h3 className="text-2xl font-semibold mb-3 text-gray-900">Time</h3>
            <p className="text-lg text-amber-900 font-medium">4:00 PM</p>
            <p className="text-amber-700 text-sm mt-2">Ceremony & Reception</p>
          </div>
        </div>
      </Section>

      {/* Highlights Section */}
      <Section bgColor="beige" className="py-20 text-center">
        <SectionTitle>What to Expect</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-semibold mb-4 text-amber-900">✨ Ceremony</h3>
            <p className="text-gray-700 leading-relaxed">
              Join us for an intimate and meaningful ceremony where we'll exchange vows and celebrate our commitment to each other. 
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-semibold mb-4 text-amber-900">🎉 Reception</h3>
            <p className="text-gray-700 leading-relaxed">
              Dance, dine, and celebrate with us! Enjoy delicious food, great music, and lots of joy as we commemorate this day.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-semibold mb-4 text-amber-900">📸 Photos</h3>
            <p className="text-gray-700 leading-relaxed">
              Help us capture memories! Share your photos using #GizellArmandoWedding. We'd love to see the world through your lens.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-semibold mb-4 text-amber-900">💌 Love</h3>
            <p className="text-gray-700 leading-relaxed">
              Most importantly, we'll be surrounded by the people we love most. Your presence is the greatest gift of all.
            </p>
          </div>
        </div>
      </Section>
      {/* Navigation Section */}
      <Section bgColor="white" className="py-20 text-center">
        <SectionTitle>Explore Our Site</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <button
            onClick={() => document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' })}
            className="group text-left hover:no-underline"
          >
            <div className="bg-gradient-to-br from-amber-100 to-yellow-100 p-8 rounded-lg hover:shadow-xl transition-shadow border border-amber-200 h-full">
              <div className="text-4xl mb-4">💕</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 group-hover:text-amber-700">Our Story</h3>
              <p className="text-gray-600">Learn how we met and fell in love</p>
            </div>
          </button>

          <button
            onClick={() => document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' })}
            className="group text-left hover:no-underline"
          >
            <div className="bg-gradient-to-br from-amber-100 to-yellow-100 p-8 rounded-lg hover:shadow-xl transition-shadow border border-amber-200 h-full">
              <div className="text-4xl mb-4">📋</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 group-hover:text-amber-700">Events</h3>
              <p className="text-gray-600">See schedule and event details</p>
            </div>
          </button>

          <button
            onClick={() => document.getElementById('rsvp')?.scrollIntoView({ behavior: 'smooth' })}
            className="group text-left hover:no-underline"
          >
            <div className="bg-gradient-to-br from-amber-100 to-yellow-100 p-8 rounded-lg hover:shadow-xl transition-shadow border border-amber-200 h-full">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 group-hover:text-amber-700">RSVP</h3>
              <p className="text-gray-600">Confirm your attendance</p>
            </div>
          </button>
        </div>
      </Section>

      {/* Call to Action */}
      <Section bgColor="cream" className="py-20 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-serif font-bold mb-6 text-amber-900">Ready to Celebrate?</h2>
          <p className="text-lg text-amber-800 mb-10 leading-relaxed">
            Whether you're a longtime friend or family member, we can't wait to see you 
            on our special day. Secure your spot now!
          </p>
          <div className="flex justify-center">
            <Button variant="primary" size="lg" onClick={() => document.getElementById('rsvp')?.scrollIntoView({ behavior: 'smooth' })}>
              RSVP Today
            </Button>
          </div>
        </div>
      </Section>
    </div>
  );
};
