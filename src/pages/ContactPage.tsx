import { useState } from 'react';
import { Button, Section, SectionTitle } from '../components/common';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  return (
    <div className="min-h-screen">
      <Section bgColor="cream" className="py-20">
        <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-4 text-center">
          Contact Us
        </h1>
        <p className="text-xl text-gray-700 text-center">
          We'd love to hear from you!
        </p>
      </Section>

      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <SectionTitle>Get in Touch</SectionTitle>
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">📧 Email</h3>
                <a href="mailto:hello@wedding.com" className="text-amber-500 hover:text-amber-600 text-lg">
                  hello@wedding.com
                </a>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">📱 Phone</h3>
                <a href="tel:+1234567890" className="text-amber-500 hover:text-amber-600 text-lg">
                  +1 (234) 567-890
                </a>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">📍 Address</h3>
                <p className="text-gray-700">
                  123 Wedding Street<br />
                  City, State 12345<br />
                  Country
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Follow Us</h3>
                <div className="flex gap-4">
                  <a href="#" className="text-gray-600 hover:text-amber-500 text-2xl">
                    f
                  </a>
                  <a href="#" className="text-gray-600 hover:text-amber-500 text-2xl">
                    📷
                  </a>
                  <a href="#" className="text-gray-600 hover:text-amber-500 text-2xl">
                    🐦
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-2xl font-serif font-bold mb-6 text-gray-900">Send us a Message</h3>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                    placeholder="Message subject"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                    rows={5}
                    placeholder="Your message..."
                  />
                </div>

                {submitted ? (
                  <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                    ✓ Thank you! We'll get back to you soon.
                  </div>
                ) : (
                  <Button type="submit" variant="primary" size="lg" className="w-full">
                    Send Message
                  </Button>
                )}
              </div>
            </form>
          </div>
        </div>
      </Section>

      {/* Map Section */}
      <Section bgColor="gray">
        <SectionTitle>Venue Location</SectionTitle>
        <div className="bg-gray-300 rounded-lg h-96 flex items-center justify-center">
          <p className="text-gray-700">Map embed would go here</p>
        </div>
      </Section>
    </div>
  );
};
