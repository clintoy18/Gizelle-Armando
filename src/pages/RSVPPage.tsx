import { Section } from '../components/common';
import { Heart, Camera } from 'lucide-react';
import { motion } from 'framer-motion';

export function RSVPPage() {
  const attireColors = [
    { name: 'Coral', hex: '#F08080' },
    { name: 'Blush Pink', hex: '#FFB6C1' },
    { name: 'Gold', hex: '#D4AF37' },
    { name: 'Cream', hex: '#FFFDD0' },
    { name: 'Beige', hex: '#F5F5DC' },
  ];

  return (
    <Section bgColor="white" className="py-16 sm:py-20 md:py-24">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2
            className="text-5xl sm:text-6xl md:text-7xl mb-6"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: '#2d2926',
              letterSpacing: '0.1em'
            }}
          >
            RSVP
          </h2>

          <p
            className="text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-4"
            style={{
              fontFamily: "'Lora', serif",
              color: '#5a5a5a'
            }}
          >
            We are delighted to share the joy of our wedding day with our closest family and friends!
          </p>

          {/* Decorative divider */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <div className="h-px w-12 bg-stone-300" />
            <Heart className="w-5 h-5" style={{ color: '#8b6f47' }} />
            <div className="h-px w-12 bg-stone-300" />
          </div>
        </motion.div>

        {/* RSVP Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-gradient-to-br from-stone-50 to-stone-100 rounded-2xl p-8 sm:p-10 mb-12 border border-stone-200"
        >
          <p
            className="text-center text-lg sm:text-xl mb-4"
            style={{
              fontFamily: "'Lora', serif",
              color: '#2d2926'
            }}
          >
            The favor of a response is requested before
          </p>
          <p
            className="text-center text-2xl sm:text-3xl font-bold mb-4"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: '#8b6f47'
            }}
          >
            April 25, 2026
          </p>
          <p
            className="text-center text-lg"
            style={{
              fontFamily: "'Lora', serif",
              color: '#5a5a5a'
            }}
          >
            Thank you!
          </p>
          <p
            className="text-center text-base italic mt-6"
            style={{
              fontFamily: "'Lora', serif",
              color: '#5a5a5a'
            }}
          >
            Please message us to confirm your attendance.
          </p>
        </motion.div>

        {/* Attire Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-12"
        >
          <h3
            className="text-3xl sm:text-4xl text-center mb-8"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: '#2d2926',
              letterSpacing: '0.1em'
            }}
          >
            ATTIRE
          </h3>

          <div className="bg-stone-50 rounded-2xl p-8 sm:p-10 border border-stone-200 mb-8">
            <p
              className="text-center text-lg mb-6"
              style={{
                fontFamily: "'Lora', serif",
                color: '#5a5a5a'
              }}
            >
              We would love to see you in your formal attire. We encourage you to dress according to our wedding color.
            </p>

            {/* Color Palette */}
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              {attireColors.map((color) => (
                <div key={color.name} className="text-center">
                  <div
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full shadow-md mb-2 border-2 border-stone-300"
                    style={{ backgroundColor: color.hex }}
                  />
                  <p
                    className="text-sm"
                    style={{
                      fontFamily: "'Lora', serif",
                      color: '#5a5a5a'
                    }}
                  >
                    {color.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Note of Gifts Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-12"
        >
          <h3
            className="text-3xl sm:text-4xl text-center mb-8"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: '#2d2926',
              letterSpacing: '0.1em'
            }}
          >
            NOTE OF GIFTS
          </h3>

          <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-8 sm:p-10 border border-rose-200">
            <p
              className="text-center text-lg leading-relaxed"
              style={{
                fontFamily: "'Lora', serif",
                color: '#5a5a5a'
              }}
            >
              With all that we have, we've been truly blessed, your presence and prayers all that we request. But if you desire to give nonetheless, monetary gifts is the one we humbly suggest.
            </p>
          </div>
        </motion.div>

        {/* Photo Sharing Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center"
        >
          <h3
            className="text-3xl sm:text-4xl mb-8"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: '#2d2926',
              letterSpacing: '0.1em'
            }}
          >
            Capture with Love
          </h3>

          <div className="bg-stone-50 rounded-2xl p-8 sm:p-10 border border-stone-200 max-w-2xl mx-auto">
            <Camera className="w-12 h-12 mx-auto mb-6" style={{ color: '#8b6f47' }} />

            <p
              className="text-lg sm:text-xl mb-6 font-light"
              style={{
                fontFamily: "'Great Vibes', cursive",
                color: '#2d2926'
              }}
            >
              Share Your Photos With Us!
            </p>

            <p
              className="text-base leading-relaxed"
              style={{
                fontFamily: "'Lora', serif",
                color: '#5a5a5a'
              }}
            >
              Scan the QR code with your smartphone and upload your favorites!
            </p>

            <div className="mt-8 p-6 bg-white rounded-lg inline-block border-2 border-stone-300">
              <div className="w-32 h-32 bg-stone-200 rounded flex items-center justify-center">
                <span style={{ color: '#8b6f47' }}>QR Code</span>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </Section>
  );
}
