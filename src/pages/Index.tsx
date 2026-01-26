import { useState, useEffect } from 'react';


import { SolarSystem2D } from '@/components/SolarSystem2D/SolarSystem2D';
import { HUD } from '@/components/UI/HUD';
import { Preloader } from '@/components/Preloader';
import AuthHeader from '@/components/AuthHeader';
import { X } from 'lucide-react';
import AnoAI from '@/components/UI/animated-shader-background';

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [showAbout, setShowAbout] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      // Show About section when scrolled down 300px
      if (window.scrollY > 300) {
        setShowAbout(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate blur amount based on scroll (0-10px)
  const blurAmount = Math.min(scrollY / 50, 10);
  // Calculate opacity (fade out as you scroll)
  const opacity = Math.max(1 - scrollY / 500, 0.3);

  return (
    <div className="relative w-full bg-background">
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      
      {/* Auth Header */}
      <AuthHeader />

      {/* Fixed Solar System Background - Blurs on Scroll */}
      <div
        className="fixed inset-0 w-full h-screen transition-all duration-300"
        style={{
          filter: `blur(${blurAmount}px)`,
          opacity: opacity
        }}
      >
        {/* 2D Solar System */}
        <SolarSystem2D />

        {/* HUD Overlay */}
        <HUD />
      </div>

      {/* Spacer to allow scrolling */}
      <div className="h-screen" />

      {/* About Us Section */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-8 py-20">
        <div
          className={`max-w-2xl w-full rounded-xl overflow-hidden relative transition-all duration-500 ${showAbout ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          style={{
            border: '1px solid rgba(255, 255, 255, 0.15)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
            minHeight: '400px',
          }}
        >
          {/* Aurora Shader Background */}
          <div className="absolute inset-0 w-full h-full">
            <AnoAI />
          </div>

          {/* Content Overlay */}
          <div className="relative z-10 p-10">
            {/* Close Button */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
              aria-label="Close"
            >
              <X size={20} color="white" opacity={0.7} />
            </button>

            {/* Content */}
            <h2 className="text-3xl font-bold mb-6 text-white tracking-wide">
              ABOUT US
            </h2>

            <div className="space-y-4 text-gray-300 text-base leading-relaxed">
              <p>
                Welcome to the Comet Mission. We are dedicated to exploring the furthest
                reaches of our solar system, analyzing celestial bodies, and unlocking the
                mysteries of the cosmos.
              </p>

              <p>
                Our advanced technology enables us to gather vital data for humanity's
                future in space. Through innovative research and exploration, we push the
                boundaries of what's possible.
              </p>

              <p>
                Join us on this extraordinary journey as we chart new territories and
                discover the wonders that lie beyond our planet.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Extra spacing at bottom */}
      <div className="h-20 relative z-10" />
    </div>
  );
};

export default Index;
