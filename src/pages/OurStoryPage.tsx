import { Section, SectionTitle } from '../components/common';

export const OurStoryPage: React.FC = () => {
  const milestones = [
    {
      year: '2018',
      title: 'We Met',
      description: 'Our story began at a coffee shop in downtown. It was love at first sight when he ordered the same drink I was about to order!',
      icon: '☕',
    },
    {
      year: '2020',
      title: 'First Adventure',
      description: 'We took our first trip together to the mountains and knew we wanted to explore the world together. That trip changed everything!',
      icon: '✈️',
    },
    {
      year: '2022',
      title: 'Moving In Together',
      description: 'We took the next step and got our first apartment together. It was small but filled with big dreams and endless love.',
      icon: '🏠',
    },
    {
      year: '2023',
      title: 'The Proposal',
      description: 'Under the stars at our favorite beach, he asked the question and she said YES! The happiest moment of our lives so far!',
      icon: '💍',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Section bgColor="cream" className="py-20 text-center">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-amber-900 mb-4">
            Our Love Story
          </h1>
          <p className="text-xl text-amber-800">From the moment we met to today</p>
        </div>
      </Section>

      <Section bgColor="white" className="py-20">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-xl text-gray-700 leading-relaxed mb-6 text-center">
              Our story is one of serendipity, adventure, and endless love. What started as 
              a chance encounter at our favorite coffee shop blossomed into a beautiful journey 
              of shared dreams and cherished memories.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-6 text-center">
              Every moment with each other has been a gift. Through laughter and tears, adventures 
              and quiet nights at home, we've grown together and built something truly special. 
              Today, we're excited to celebrate our love with all of you!
            </p>
          </div>

          {/* Timeline */}
          <div className="mt-16">
            <SectionTitle>Our Journey</SectionTitle>
            <div className="space-y-8 max-w-3xl mx-auto">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex gap-8 items-start">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0 shadow-lg">
                      {milestone.icon}
                    </div>
                    {index < milestones.length - 1 && (
                      <div className="w-1 h-24 bg-amber-200 mt-4" />
                    )}
                  </div>
                  <div className="pt-4 pb-12 flex-1">
                    <div className="text-sm font-semibold text-amber-600 mb-2 uppercase tracking-wider">{milestone.year}</div>
                    <h3 className="text-3xl font-serif font-bold text-gray-900 mb-3">
                      {milestone.title}
                    </h3>
                    <p className="text-lg text-gray-700 leading-relaxed">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Story Details */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-10 rounded-lg border-2 border-amber-100">
              <h3 className="text-2xl font-serif font-bold mb-4 text-gray-900">💑 His Perspective</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                From the moment I saw her smile, I knew my life was about to change forever. 
                Every moment with her is a gift, and I can't wait to spend the rest of my life 
                creating beautiful memories together. She makes me want to be the best version of myself.
              </p>
            </div>
            <div className="bg-gradient-to-br from-stone-100 to-yellow-50 p-10 rounded-lg border-2 border-amber-100">
              <h3 className="text-2xl font-serif font-bold mb-4 text-gray-900">👰 Her Perspective</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                He walked into my life unexpectedly and made it extraordinary. With him, 
                I've discovered what it truly means to be loved and cherished. I'm so grateful for every 
                moment, every laugh, and every adventure we share. He's my best friend and soulmate.
              </p>
            </div>
          </div>

          {/* Fun Facts */}
          <div className="mt-16 bg-amber-100 p-10 rounded-lg">
            <h3 className="text-2xl font-serif font-bold mb-6 text-gray-900 text-center">Fun Facts About Us</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4">
                <p className="text-sm text-gray-600 mb-2">FIRST DATE</p>
                <p className="text-lg font-semibold text-gray-900">Coffee at The Brew</p>
              </div>
              <div className="text-center p-4">
                <p className="text-sm text-gray-600 mb-2">FAVORITE PLACE</p>
                <p className="text-lg font-semibold text-gray-900">Sunset Beach</p>
              </div>
              <div className="text-center p-4">
                <p className="text-sm text-gray-600 mb-2">OUR SONG</p>
                <p className="text-lg font-semibold text-gray-900">Timeless Love</p>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};
