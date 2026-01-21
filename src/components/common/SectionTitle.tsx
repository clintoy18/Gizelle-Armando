import type { ReactNode } from 'react';

interface SectionTitleProps {
  children: ReactNode;
  subtitle?: string;
  className?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  children,
  subtitle,
  className = '',
}) => {
  return (
    <div className={`text-center mb-12 ${className}`}>
      <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
        {children}
      </h2>
      {subtitle && (
        <p className="text-lg text-gray-600">{subtitle}</p>
      )}
    </div>
  );
};
