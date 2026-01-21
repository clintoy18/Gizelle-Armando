interface GalleryCardProps {
  image: string;
  title?: string;
  description?: string;
  alt: string;
}

export const GalleryCard: React.FC<GalleryCardProps> = ({
  image,
  title,
  description,
  alt,
}) => {
  return (
    <div className="group overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
      <div className="relative h-72 overflow-hidden">
        <img
          src={image}
          alt={alt}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      {(title || description) && (
        <div className="p-4 bg-white">
          {title && <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>}
          {description && <p className="text-gray-600 text-sm">{description}</p>}
        </div>
      )}
    </div>
  );
};
