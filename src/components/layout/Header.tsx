import { useState, useEffect } from 'react';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#home', label: 'Home' },
    // { href: '#story', label: 'Our Story' },
    { href: '#events', label: 'Events' },
    { href: '#gallery', label: 'Gallery' },
    { href: '#rsvp', label: 'Rules' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      // ✅ Account for header height when scrolling
      const headerHeight = 80; // Approximate header height
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'py-3 shadow-md' 
          : 'py-5'
      }`}
      style={{ 
        backgroundColor: isScrolled 
          ? 'hsl(var(--wedding-cream))' 
          : 'hsl(var(--wedding-cream) / 0.95)', // ✅ Always have slight background
        backdropFilter: 'blur(8px)' // ✅ Add blur for elegance
      }}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <a 
          href="#home" 
          onClick={(e) => { e.preventDefault(); scrollToSection('#home'); }}
          className="text-2xl md:text-3xl transition-opacity hover:opacity-70"
          style={{ 
            fontFamily: "'Great Vibes', cursive",
            color: 'hsl(var(--wedding-brown))'
          }}
        >
          Gizelle & Armando
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
              className="text-sm tracking-wide transition-colors hover:opacity-70 uppercase"
              style={{ 
                fontFamily: "'Lora', serif",
                color: 'hsl(var(--wedding-brown))',
                letterSpacing: '0.1em'
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 transition-opacity hover:opacity-70"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
          style={{ color: 'hsl(var(--wedding-brown))' }}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden absolute top-full left-0 right-0 py-4 shadow-lg border-t"
          style={{ 
            backgroundColor: 'hsl(var(--wedding-cream))',
            borderColor: 'hsl(var(--wedding-brown) / 0.1)'
          }}
        >
          <nav className="flex flex-col items-center gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                className="text-sm tracking-wide uppercase transition-opacity hover:opacity-70"
                style={{ 
                  fontFamily: "'Lora', serif",
                  color: 'hsl(var(--wedding-brown))',
                  letterSpacing: '0.1em'
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}