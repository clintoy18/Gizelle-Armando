import { Button, Section, SectionTitle } from '../components/common';

export const EventDetailsPage: React.FC = () => {
  const events = [
    {
      id: 1,
      name: 'Rehearsal Dinner',
      date: 'Friday, June 14, 2024',
      time: '6:00 PM - 9:00 PM',
      location: 'Downtown Restaurant',
      address: '123 Main Street, City, State 12345',
      description: 'Join us for a casual dinner the evening before the big day. Great food, good company, and a chance to connect!',
      icon: '🍽️',
    },
    {
      id: 2,
      name: 'Wedding Ceremony',
      date: 'Saturday, June 15, 2024',
      time: '4:00 PM',
      location: 'Garden Venue',
      address: '456 Garden Lane, City, State 12345',
      description: 'The main event! Join us for our ceremony as we exchange vows and celebrate our love.',
      icon: '💒',
    },
    {
      id: 3,
      name: 'Reception & Dinner',
      date: 'Saturday, June 15, 2024',
      time: '6:00 PM - Midnight',
      location: 'Grand Ballroom',
      address: '789 Celebration Avenue, City, State 12345',
      description: 'Dancing, dining, celebration with our loved ones. Join us for an unforgettable evening!',
      icon: '🎉',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Section bgColor="cream" className="py-20">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-4">
            Event Details
          </h1>
          <p className="text-xl text-gray-700">
            Here's what you can expect on our special day
          </p>
        </div>
      </Section>

      <Section bgColor="white" className="py-20">
        <div className="max-w-4xl mx-auto">
          <SectionTitle>Wedding Schedule</SectionTitle>

          <div className="space-y-8">
            {events.map((event) => (
              <div key={event.id} className="bg-white border-l-4 border-amber-500 shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-8">
                  <div className="flex items-start justify-between mb-4 gap-4">
                    <div>
                      <div className="text-4xl mb-2">{event.icon}</div>
                      <h3 className="text-3xl font-serif font-bold text-gray-900">{event.name}</h3>
                    </div>
                    <span className="bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap">
                      {event.date}
                    </span>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-3 text-gray-700">
                      <span className="text-xl">🕐</span>
                      <span className="text-lg font-medium">{event.time}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700">
                      <span className="text-xl">📍</span>
                      <div>
                        <p className="text-lg font-medium">{event.location}</p>
                        <p className="text-sm text-gray-600">{event.address}</p>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-lg text-gray-700 leading-relaxed">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Information Section */}
      <Section bgColor="gray" className="py-20">
        <SectionTitle>Important Information</SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow hover:shadow-lg transition-shadow border-t-4 border-amber-500">
            <h3 className="text-2xl font-semibold mb-4 text-gray-900">👔 Dress Code</h3>
            <p className="text-xl text-amber-600 font-semibold mb-3">Cocktail Attire (Semi-formal)</p>
            <p className="text-gray-700 leading-relaxed">
              We're going for an elegant yet relaxed vibe. Feel free to express your style while keeping the look formal-adjacent. 
              Think dress, suit, or evening wear. Summer colors and lightweight fabrics are perfect!
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow hover:shadow-lg transition-shadow border-t-4 border-amber-500">
            <h3 className="text-2xl font-semibold mb-4 text-gray-900">🥗 Dietary Restrictions</h3>
            <p className="text-xl text-amber-600 font-semibold mb-3">Let Us Know Your Needs</p>
            <p className="text-gray-700 leading-relaxed">
              We want everyone to enjoy delicious food! When you RSVP, please let us know about any dietary restrictions. 
              We have options for vegetarian, vegan, gluten-free, and allergy considerations.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow hover:shadow-lg transition-shadow border-t-4 border-amber-500">
            <h3 className="text-2xl font-semibold mb-4 text-gray-900">🏨 Accommodations</h3>
            <p className="text-xl text-amber-600 font-semibold mb-3">Special Hotel Rates</p>
            <p className="text-gray-700 leading-relaxed">
              We've negotiated special rates at nearby hotels. Use code WEDDING24 for 15% off at the Grand Hotel, 
              or LOVE2024 for 20% off at Riverside Inn.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow hover:shadow-lg transition-shadow border-t-4 border-amber-500">
            <h3 className="text-2xl font-semibold mb-4 text-gray-900">🚗 Parking</h3>
            <p className="text-xl text-amber-600 font-semibold mb-3">Free Parking Available</p>
            <p className="text-gray-700 leading-relaxed">
              Complimentary parking will be available at all venues. Just follow the signs when you arrive. 
              Valet parking is available at the reception venue at no charge.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow hover:shadow-lg transition-shadow border-t-4 border-amber-500">
            <h3 className="text-2xl font-semibold mb-4 text-gray-900">👶 Children</h3>
            <p className="text-xl text-amber-600 font-semibold mb-3">Kids Are Welcome</p>
            <p className="text-gray-700 leading-relaxed">
              Children are invited and cherished! A kids' table will be available at the reception. 
              Please note dietary needs for any children attending.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow hover:shadow-lg transition-shadow border-t-4 border-amber-500">
            <h3 className="text-2xl font-semibold mb-4 text-gray-900">📸 Photography</h3>
            <p className="text-xl text-amber-600 font-semibold mb-3">Share Your Photos</p>
            <p className="text-gray-700 leading-relaxed">
              Help us capture memories! Share your photos using #OurWeddingDay. 
              We'll compile them into a shared gallery for everyone to enjoy.
            </p>
          </div>
        </div>
      </Section>

      {/* Timeline */}
      <Section bgColor="white" className="py-20">
        <SectionTitle>Day-Of Timeline</SectionTitle>
        <div className="max-w-3xl mx-auto">
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="text-2xl flex-shrink-0">3:00 PM</div>
              <div className="flex-1 pb-6 border-b-2 border-amber-200">
                <p className="text-lg font-semibold text-gray-900">Guest Arrival & Seating</p>
                <p className="text-gray-600">Guests begin to arrive and are seated</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-2xl flex-shrink-0">4:00 PM</div>
              <div className="flex-1 pb-6 border-b-2 border-amber-200">
                <p className="text-lg font-semibold text-gray-900">Ceremony Begins</p>
                <p className="text-gray-600">The ceremony starts - here we go!</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-2xl flex-shrink-0">4:30 PM</div>
              <div className="flex-1 pb-6 border-b-2 border-amber-200">
                <p className="text-lg font-semibold text-gray-900">Ceremony Ends & Photos</p>
                <p className="text-gray-600">Family & group photos in the garden</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-2xl flex-shrink-0">6:00 PM</div>
              <div className="flex-1 pb-6 border-b-2 border-amber-200">
                <p className="text-lg font-semibold text-gray-900">Cocktail Hour</p>
                <p className="text-gray-600">Appetizers, drinks, and mingling</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-2xl flex-shrink-0">7:00 PM</div>
              <div className="flex-1 pb-6 border-b-2 border-amber-200">
                <p className="text-lg font-semibold text-gray-900">Dinner Service</p>
                <p className="text-gray-600">Toasts and delicious food</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-2xl flex-shrink-0">8:30 PM</div>
              <div className="flex-1">
                <p className="text-lg font-semibold text-gray-900">Dancing & Celebration</p>
                <p className="text-gray-600">Let's party! First dance, cake cutting, and dancing until midnight</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Questions Section */}
      <Section bgColor="cream" className="py-20">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-serif font-bold mb-4 text-gray-900">Questions?</h2>
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            For any questions about our wedding events, feel free to reach out to us!
          </p>
          <a href="mailto:hello@wedding.com">
            <Button variant="primary" size="lg">
              Contact Us
            </Button>
          </a>
        </div>
      </Section>
    </div>
  );
};
