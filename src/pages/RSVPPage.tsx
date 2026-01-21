import { useState } from 'react';
import { Section, Button } from '../components/common';

export function RSVPPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    attending: '',
    guests: '1',
    dietary: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to a backend
    console.log('RSVP submitted:', formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Section bgColor="cream" className="text-center">
        <div className="max-w-md mx-auto">
          <h2 
            className="text-4xl md:text-5xl mb-4"
            style={{ 
              fontFamily: "'Great Vibes', cursive",
              color: 'hsl(var(--wedding-brown))'
            }}
          >
            Thank You!
          </h2>
          <p 
            className="text-lg"
            style={{ 
              fontFamily: "'Lora', serif",
              color: 'hsl(var(--wedding-champagne))'
            }}
          >
            We have received your RSVP. We can't wait to celebrate with you!
          </p>
        </div>
      </Section>
    );
  }

  return (
    <Section bgColor="cream" className="text-center">
      <h2 
        className="text-4xl md:text-5xl mb-4"
        style={{ 
          fontFamily: "'Playfair Display', serif",
          color: 'hsl(var(--wedding-brown))'
        }}
      >
        RSVP
      </h2>
      <p 
        className="text-lg mb-12 max-w-xl mx-auto"
        style={{ 
          fontFamily: "'Lora', serif",
          color: 'hsl(var(--wedding-champagne))'
        }}
      >
        Kindly respond by November 15, 2025
      </p>

      <form onSubmit={handleSubmit} className="max-w-md mx-auto text-left space-y-6">
        <div>
          <label 
            className="block text-sm mb-2"
            style={{ 
              fontFamily: "'Lora', serif",
              color: 'hsl(var(--wedding-brown))'
            }}
          >
            Your Name *
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2"
            style={{ 
              borderColor: 'hsl(var(--wedding-champagne) / 0.3)',
              fontFamily: "'Lora', serif",
            }}
          />
        </div>

        <div>
          <label 
            className="block text-sm mb-2"
            style={{ 
              fontFamily: "'Lora', serif",
              color: 'hsl(var(--wedding-brown))'
            }}
          >
            Email *
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2"
            style={{ 
              borderColor: 'hsl(var(--wedding-champagne) / 0.3)',
              fontFamily: "'Lora', serif",
            }}
          />
        </div>

        <div>
          <label 
            className="block text-sm mb-2"
            style={{ 
              fontFamily: "'Lora', serif",
              color: 'hsl(var(--wedding-brown))'
            }}
          >
            Will you be attending? *
          </label>
          <select
            required
            value={formData.attending}
            onChange={(e) => setFormData({ ...formData, attending: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2"
            style={{ 
              borderColor: 'hsl(var(--wedding-champagne) / 0.3)',
              fontFamily: "'Lora', serif",
            }}
          >
            <option value="">Please select</option>
            <option value="yes">Joyfully Accept</option>
            <option value="no">Regretfully Decline</option>
          </select>
        </div>

        {formData.attending === 'yes' && (
          <>
            <div>
              <label 
                className="block text-sm mb-2"
                style={{ 
                  fontFamily: "'Lora', serif",
                  color: 'hsl(var(--wedding-brown))'
                }}
              >
                Number of Guests
              </label>
              <select
                value={formData.guests}
                onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2"
                style={{ 
                  borderColor: 'hsl(var(--wedding-champagne) / 0.3)',
                  fontFamily: "'Lora', serif",
                }}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>

            <div>
              <label 
                className="block text-sm mb-2"
                style={{ 
                  fontFamily: "'Lora', serif",
                  color: 'hsl(var(--wedding-brown))'
                }}
              >
                Dietary Requirements
              </label>
              <input
                type="text"
                value={formData.dietary}
                onChange={(e) => setFormData({ ...formData, dietary: e.target.value })}
                placeholder="Any allergies or dietary needs?"
                className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2"
                style={{ 
                  borderColor: 'hsl(var(--wedding-champagne) / 0.3)',
                  fontFamily: "'Lora', serif",
                }}
              />
            </div>
          </>
        )}

        <div>
          <label 
            className="block text-sm mb-2"
            style={{ 
              fontFamily: "'Lora', serif",
              color: 'hsl(var(--wedding-brown))'
            }}
          >
            Message for the Couple
          </label>
          <textarea
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            rows={4}
            placeholder="Share your wishes..."
            className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 resize-none"
            style={{ 
              borderColor: 'hsl(var(--wedding-champagne) / 0.3)',
              fontFamily: "'Lora', serif",
            }}
          />
        </div>

        <div className="text-center pt-4">
          <Button variant="primary" size="lg">
            Send RSVP
          </Button>
        </div>
      </form>
    </Section>
  );
}
