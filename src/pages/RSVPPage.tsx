import { useState } from 'react';
import { Button, Section, SectionTitle } from '../components/common';

export const RSVPPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    attending: 'yes',
    guests: '1',
    dietary: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd send this to a server
    console.log('RSVP Submitted:', formData);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen">
      <Section bgColor="cream" className="py-20">
        <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-4 text-center">
          RSVP
        </h1>
        <p className="text-xl text-gray-700 text-center">
          We'd love to have you celebrate with us!
        </p>
      </Section>

      <Section>
        <div className="max-w-2xl mx-auto">
          {submitted ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-6">✓</div>
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">
                Thank You!
              </h2>
              <p className="text-lg text-gray-700 mb-8">
                We've received your RSVP. We can't wait to celebrate with you on our special day!
              </p>
              <p className="text-gray-600">
                A confirmation email has been sent to {formData.email}
              </p>
            </div>
          ) : (
            <>
              <SectionTitle subtitle="Please respond by June 1, 2024">
                Confirm Your Attendance
              </SectionTitle>

              <form onSubmit={handleSubmit} className="bg-gray-50 p-8 rounded-lg">
                <div className="space-y-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                      placeholder="John Doe"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                      placeholder="john@example.com"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  {/* Attending */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Will you be attending? *
                    </label>
                    <select
                      name="attending"
                      value={formData.attending}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                    >
                      <option value="yes">Yes, I'll be there!</option>
                      <option value="no">No, I can't make it</option>
                      <option value="maybe">Maybe</option>
                    </select>
                  </div>

                  {/* Number of Guests */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Number of Guests *
                    </label>
                    <select
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                    >
                      <option value="1">1 Guest</option>
                      <option value="2">2 Guests</option>
                      <option value="3">3 Guests</option>
                      <option value="4">4 Guests</option>
                      <option value="5">5+ Guests</option>
                    </select>
                  </div>

                  {/* Dietary */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Dietary Restrictions
                    </label>
                    <input
                      type="text"
                      name="dietary"
                      value={formData.dietary}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                      placeholder="e.g., Vegetarian, Gluten-free"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Special Message (Optional)
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                      rows={4}
                      placeholder="Share your wishes and well-wishes..."
                    />
                  </div>

                  {/* Submit */}
                  <Button type="submit" variant="primary" size="lg" className="w-full">
                    Submit RSVP
                  </Button>
                </div>
              </form>
            </>
          )}
        </div>
      </Section>

      {/* Hotel Info */}
      <Section bgColor="gray">
        <SectionTitle>Hotel Accommodations</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2 text-gray-900">Grand Hotel</h3>
            <p className="text-gray-600 mb-4">Use code: WEDDING24 for 15% off</p>
            <p className="text-sm text-gray-500">123 Main Street, City</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2 text-gray-900">Riverside Inn</h3>
            <p className="text-gray-600 mb-4">Use code: LOVE2024 for 20% off</p>
            <p className="text-sm text-gray-500">456 River Road, City</p>
          </div>
        </div>
      </Section>
    </div>
  );
};
