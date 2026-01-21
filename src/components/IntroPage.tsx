import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const IntroPage: React.FC = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    setIsVisible(true);
  }, []);

  const handleClick = () => {
    setIsExiting(true);
    // Wait for exit animation to complete
    setTimeout(() => {
      navigate('/home');
    }, 600);
  };

  return (
    <div
      onClick={handleClick}
      className={`fixed inset-0 w-full h-screen flex items-center justify-center cursor-pointer overflow-hidden
        ${isExiting ? 'fade-out' : ''}`}
      style={{
        backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
        animation: isVisible ? 'fadeIn 0.8s ease-in-out' : 'none',
      }}
    >
      {/* Animated background elements */}
      <div
        className="absolute w-96 h-96 bg-white opacity-10 rounded-full blur-3xl"
        style={{
          animation: 'float 6s ease-in-out infinite',
          top: '10%',
          left: '10%',
        }}
      />
      <div
        className="absolute w-96 h-96 bg-rose-300 opacity-10 rounded-full blur-3xl"
        style={{
          animation: 'float 8s ease-in-out infinite 1s',
          bottom: '10%',
          right: '10%',
        }}
      />

      {/* Main content */}
      <div className="relative z-10 text-center text-white scale-in">
        <h1 className="text-6xl md:text-7xl font-serif font-bold mb-6 drop-shadow-lg">
          Welcome
        </h1>
        
        <div className="mb-8">
          <div className="inline-block">
            <p className="text-3xl md:text-4xl font-light mb-2 drop-shadow-md">
              💕
            </p>
            <p className="text-2xl md:text-3xl font-light drop-shadow-md">
              Our Love Story
            </p>
          </div>
        </div>

        <p className="text-xl md:text-2xl font-light mb-12 drop-shadow-md max-w-md mx-auto">
          Click anywhere to continue
        </p>

        {/* Animated scroll hint */}
        <div className="mt-8 animate-bounce">
          <svg
            className="w-8 h-8 mx-auto drop-shadow-md"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(30px); }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .fade-out {
          animation: fadeOut 0.6s ease-out forwards;
        }

        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }

        .scale-in {
          animation: scaleIn 0.8s ease-out;
        }
      `}</style>
    </div>
  );
};
