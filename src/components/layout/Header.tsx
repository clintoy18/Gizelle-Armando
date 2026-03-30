import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#home', label: 'Home', type: 'section' },
    { href: '#events', label: 'Events', type: 'section' },
    { href: '#gallery', label: 'Gallery', type: 'section' },
    { href: '#rsvp', label: 'RSVP', type: 'section' },
    { href: '/guest-upload', label: 'Upload Photos', type: 'route' },
    { href: '/guest-photos', label: 'Guest Photos', type: 'route' },
  ] as const;

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const headerHeight = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
    setIsMobileMenuOpen(false);
  };

  const handleSectionLink = (href: string) => {
    if (isHomePage) {
      scrollToSection(href);
      return;
    }

    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-3 shadow-lg' : 'py-5'
      }`}
      style={{
        backgroundColor: isScrolled ? '#ffffff' : 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: isScrolled ? '1px solid rgba(0, 0, 0, 0.08)' : 'none',
      }}
    >
      <div className="container mx-auto flex items-center justify-between px-6">
        <Link
          to="/"
          onClick={(event) => {
            if (isHomePage) {
              event.preventDefault();
              scrollToSection('#home');
            }
          }}
          className="text-2xl transition-opacity hover:opacity-70 md:text-3xl"
          style={{
            fontFamily: "'Great Vibes', cursive",
            color: '#8b6f47',
            fontWeight: '400',
          }}
        >
          Gizelle & Armando
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) =>
            link.type === 'section' ? (
              <Link
                key={link.href}
                to={`/${link.href}`}
                onClick={(event) => {
                  if (isHomePage) {
                    event.preventDefault();
                  }
                  handleSectionLink(link.href);
                }}
                className="group relative text-sm uppercase tracking-widest transition-all duration-300 hover:opacity-60"
                style={{
                  fontFamily: "'Lora', serif",
                  color: '#5a5a5a',
                  letterSpacing: '0.12em',
                  fontWeight: '500',
                }}
              >
                {link.label}
                <span
                  className="absolute bottom-0 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full"
                  style={{ backgroundColor: '#8b6f47' }}
                />
              </Link>
            ) : (
              <Link
                key={link.href}
                to={link.href}
                className="group relative text-sm uppercase tracking-widest transition-all duration-300 hover:opacity-60"
                style={{
                  fontFamily: "'Lora', serif",
                  color: '#5a5a5a',
                  letterSpacing: '0.12em',
                  fontWeight: '500',
                }}
              >
                {link.label}
                <span
                  className="absolute bottom-0 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full"
                  style={{ backgroundColor: '#8b6f47' }}
                />
              </Link>
            ),
          )}
        </nav>

        <button
          className="p-2 transition-opacity hover:opacity-70 md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
          style={{ color: '#8b6f47' }}
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {isMobileMenuOpen && (
        <div
          className="absolute top-full left-0 right-0 border-t py-4 shadow-lg md:hidden"
          style={{
            backgroundColor: '#ffffff',
            borderColor: 'rgba(0, 0, 0, 0.08)',
          }}
        >
          <nav className="flex flex-col items-center gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.type === 'section' ? `/${link.href}` : link.href}
                onClick={(event) => {
                  if (link.type === 'section' && isHomePage) {
                    event.preventDefault();
                  }

                  if (link.type === 'section') {
                    handleSectionLink(link.href);
                    return;
                  }

                  setIsMobileMenuOpen(false);
                }}
                className="text-sm uppercase tracking-widest transition-opacity hover:opacity-60"
                style={{
                  fontFamily: "'Lora', serif",
                  color: '#5a5a5a',
                  letterSpacing: '0.12em',
                  fontWeight: '500',
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
