import { Section } from '../components/common';
import { Heart, Users, Clock, Shirt, Gift, Camera, Phone, MapPin, Wine } from 'lucide-react';

export function RulesRemindersPage() {
  const rules = [
    {
  icon: Users,
  title: "Intimate Guest List",
  description: "Due to limited space, we're unable to accommodate additional guests. We hope you understand and look forward to celebrating with you.",
  importance: "essential"
},
{
  icon: Clock,
  title: "Join Us for the Full Evening",
  description: "We've planned a beautiful evening from ceremony to last dance. We'd be honored if you could join us for the entire celebration.",
  importance: "essential"
},
{
  icon: Shirt,
  title: "Formal Elegance Requested",
  description: "Help us create a stunning atmosphere by dressing in your finest formal attire. We can't wait to see you looking fabulous!",
  importance: "essential"
}
  ];

  return (
    <Section bgColor="cream" className="py-16 sm:py-20 md:py-24">
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-amber-200 rounded-full flex items-center justify-center">
              <Heart className="w-8 h-8 text-amber-700" />
            </div>
          </div>
          
          <h2 
            className="text-3xl sm:text-4xl md:text-5xl mb-4 sm:mb-6"
            style={{ 
              fontFamily: "'Playfair Display', serif",
              color: 'hsl(var(--wedding-brown))'
            }}
          >
            Rules & Reminders
          </h2>
          
          <p 
            className="text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ 
              fontFamily: "'Lora', serif",
              color: 'hsl(var(--wedding-champagne))'
            }}
          >
            To ensure our special day runs smoothly and everyone enjoys the celebration, 
            we kindly ask that you observe the following guidelines.
          </p>

          {/* Decorative divider */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <div className="h-px w-16 bg-stone-300" />
            <div className="w-2 h-2 rounded-full border border-stone-300" />
            <div className="h-px w-16 bg-stone-300" />
          </div>
        </div>

        {/* Essential Rules Banner */}
        <div 
          className="bg-gradient-to-r from-amber-50 to-amber-100 border-l-4 rounded-lg p-6 sm:p-8 mb-12"
          style={{ borderColor: 'hsl(var(--wedding-brown))' }}
        >
          <h3 
            className="text-xl sm:text-2xl font-bold mb-3"
            style={{ 
              fontFamily: "'Playfair Display', serif",
              color: 'hsl(var(--wedding-brown))'
            }}
          >
            Essential Guidelines
          </h3>
          <p 
            className="text-sm sm:text-base leading-relaxed"
            style={{ 
              fontFamily: "'Lora', serif",
              color: 'hsl(var(--wedding-champagne))'
            }}
          >
            These guidelines are crucial to the success of our celebration. 
            By attending, you agree to honor these requests with grace and understanding.
          </p>
        </div>

        {/* Rules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12">
          {rules.map((rule, index) => {
            const IconComponent = rule.icon;
            const isEssential = rule.importance === 'essential';
            
            return (
              <div
                key={index}
                className={`bg-white rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-all duration-300 border-2 ${
                  isEssential 
                    ? 'border-amber-200 hover:border-amber-300' 
                    : 'border-stone-100 hover:border-stone-200'
                }`}
              >
                <div className="flex items-start gap-4 sm:gap-5">
                  <div 
                    className={`flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center ${
                      isEssential 
                        ? 'bg-gradient-to-br from-amber-100 to-amber-200' 
                        : 'bg-stone-100'
                    }`}
                  >
                    <IconComponent 
                      className="w-6 h-6 sm:w-7 sm:h-7" 
                      style={{ color: 'hsl(var(--wedding-brown))' }}
                    />
                  </div>
                  
                  <div className="flex-1">
                    {isEssential && (
                      <span 
                        className="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mb-2"
                        style={{ 
                          backgroundColor: 'hsl(var(--wedding-champagne) / 0.2)',
                          color: 'hsl(var(--wedding-brown))'
                        }}
                      >
                        Required
                      </span>
                    )}
                    
                    <h3 
                      className="text-lg sm:text-xl font-bold mb-2"
                      style={{ 
                        fontFamily: "'Playfair Display', serif",
                        color: 'hsl(var(--wedding-brown))'
                      }}
                    >
                      {rule.title}
                    </h3>
                    
                    <p 
                      className="text-sm sm:text-base leading-relaxed"
                      style={{ 
                        fontFamily: "'Lora', serif",
                        color: 'hsl(var(--wedding-champagne))'
                      }}
                    >
                      {rule.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Note */}
        <div className="text-center bg-white rounded-2xl p-8 sm:p-10 shadow-sm border border-stone-100">
          <div className="max-w-2xl mx-auto">
            <p 
              className="text-2xl sm:text-3xl mb-4 italic"
              style={{ 
                fontFamily: "'Playfair Display', serif",
                color: 'hsl(var(--wedding-brown))'
              }}
            >
              "Love is patient, love is kind."
            </p>
            <p 
              className="text-xs sm:text-sm uppercase tracking-wider mb-6"
              style={{ 
                fontFamily: "'Lora', serif",
                color: 'hsl(var(--wedding-champagne))'
              }}
            >
              1 Corinthians 13:4
            </p>
            <p 
              className="text-base sm:text-lg leading-relaxed"
              style={{ 
                fontFamily: "'Lora', serif",
                color: 'hsl(var(--wedding-champagne))'
              }}
            >
              Thank you for respecting our wishes and helping us create 
              the perfect celebration of our union. Your understanding means the world to us.
            </p>
            
            {/* Signature */}
            <div className="mt-8 pt-8 border-t border-stone-200">
              <p 
                className="text-3xl sm:text-4xl"
                style={{ 
                  fontFamily: "'Great Vibes', cursive",
                  color: 'hsl(var(--wedding-brown))'
                }}
              >
                With Love & Gratitude
              </p>
            </div>
          </div>
        </div>

      </div>
    </Section>
  );
}