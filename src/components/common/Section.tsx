import type { ReactNode } from 'react';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: ReactNode;
  className?: string;
  id?: string;
  bgColor?: 'white' | 'gray' | 'beige' | 'cream';
}

export const Section: React.FC<SectionProps> = ({
  children,
  className = '',
  id,
  bgColor = 'white',
  style,
}) => {
  const bgStyles = {
    white: 'bg-white',
    gray: 'bg-stone-100',
    beige: 'bg-amber-50',
    cream: 'bg-yellow-50',
  };

  return (
    <section
      id={id}
      className={`${bgStyles[bgColor]} py-16 md:py-24 ${className}`}
      style={style}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
};
