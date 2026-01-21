export function Footer() {
  return (
    <footer 
      className="py-12 text-center"
      style={{ backgroundColor: 'hsl(var(--wedding-brown))' }}
    >
      <div className="container mx-auto px-6">
        <h3 
          className="text-3xl md:text-4xl mb-4"
          style={{ 
            fontFamily: "'Great Vibes', cursive",
            color: 'hsl(var(--wedding-cream))'
          }}
        >
          Gizelle & Armando
        </h3>
        <p 
          className="text-sm mb-6"
          style={{ 
            fontFamily: "'Lora', serif",
            color: 'hsl(var(--wedding-cream) / 0.8)'
          }}
        >
          Together we celebrate love
        </p>
        <div 
          className="h-px w-24 mx-auto mb-6"
          style={{ backgroundColor: 'hsl(var(--wedding-champagne) / 0.3)' }}
        />
        <p 
          className="text-xs"
          style={{ 
            fontFamily: "'Lora', serif",
            color: 'hsl(var(--wedding-cream) / 0.6)'
          }}
        >
          © {new Date().getFullYear()} Gizelle & Armando Wedding
        </p>
      </div>
    </footer>
  );
}
