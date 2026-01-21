export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">Gizelle & Armando</h3>
            <p className="text-gray-300">
              Celebrating love, family, and the beginning of our forever.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <button
                  onClick={() => scrollToSection('home')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('story')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Our Story
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('events')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Events
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('gallery')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Gallery
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                Email:{' '}
                <a
                  href="mailto:hello@wedding.com"
                  className="hover:text-amber-400 transition-colors"
                >
                  hello@wedding.com
                </a>
              </li>
              <li>
                Phone:{' '}
                <a
                  href="tel:+1234567890"
                  className="hover:text-amber-400 transition-colors"
                >
                  +1 (234) 567-890
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} Gizelle & Armando. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
