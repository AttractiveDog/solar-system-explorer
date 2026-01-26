import { useState, useEffect } from 'react';
import { SolarSystem2D } from '@/components/SolarSystem2D/SolarSystem2D';
import { HUD } from '@/components/UI/HUD';
import { Preloader } from '@/components/Preloader';
import AuthHeader from '@/components/AuthHeader';
import { X, Mail, Linkedin, Github } from 'lucide-react';
import { PaperShaderBackground } from '@/components/UI/PaperShaderBackground';

declare global {
  interface Window {
    hasShownCometAnimation?: boolean;
  }
}

const Index = () => {
  // Show loading animation on first load or reload (window property resets on reload)
  // Skips on SPA navigation (Back button) as window property persists
  const [loading, setLoading] = useState(() => {
    return !window.hasShownCometAnimation;
  });
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

  const handlePreloaderComplete = () => {
    setLoading(false);
    // Mark comet animation as shown for this session (resets on refresh)
    window.hasShownCometAnimation = true;
  };

  return (
    <div className="relative w-full bg-background">
      {loading && <Preloader onComplete={handlePreloaderComplete} />}
      
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
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-8 py-20">

        <div className="relative max-w-xl w-full mb-8 mx-auto">
          {/* Glassy Card */}
          <div
            className={`relative w-full rounded-xl overflow-hidden transition-all duration-500 bg-black/40 backdrop-blur-xl ${showAbout ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            style={{
              border: '1px solid rgba(255, 255, 255, 0.15)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
              minHeight: '400px',
            }}
          >
            {/* Animation Background - Merged with Glass (Screen Blend) */}
            {/* Animation Background */}
            <div className="absolute inset-0 overflow-hidden rounded-xl opacity-60 pointer-events-none">
              <PaperShaderBackground />
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 p-10 flex flex-col items-center text-center">
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

        {/* Join The Crew Section */}
        <div
          className={`max-w-xl w-full relative overflow-hidden rounded-xl border border-white/20 p-6 bg-gradient-to-r from-blue-900/40 to-purple-900/40 backdrop-blur-md transition-all duration-500 delay-100 mx-auto ${showAbout ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="absolute inset-0 bg-grid-white/[0.05]" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center md:text-left">
              <h2 className="text-xl font-bold text-white tracking-wide">
                JOIN THE CREW
              </h2>
              <p className="text-gray-300 text-xs text-balance">
                Ready to explore the universe with us? We're always looking for passionate
                astronauts.
              </p>
            </div>
            <button className="px-5 py-1.5 bg-white text-black text-sm font-bold rounded-full hover:scale-105 transition-transform duration-300 tracking-wide whitespace-nowrap">
              APPLY NOW
            </button>
          </div>
        </div>

        {/* Contact / Socials Section */}
        <div className="max-w-xl w-full mt-6 grid grid-cols-1 md:grid-cols-3 gap-3 mx-auto">
          <div className="p-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-colors flex flex-col items-center text-center group cursor-pointer">
            <Mail className="text-cyan-400 mb-2 group-hover:scale-110 transition-transform" size={20} />
            <h3 className="text-xs font-bold text-white tracking-wide mb-0.5">EMAIL US</h3>
            <p className="text-gray-400 text-[10px]">hello@comet.space</p>
          </div>
          <div className="p-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-colors flex flex-col items-center text-center group cursor-pointer">
            <Linkedin className="text-blue-400 mb-2 group-hover:scale-110 transition-transform" size={20} />
            <h3 className="text-xs font-bold text-white tracking-wide mb-0.5">LINKEDIN</h3>
            <p className="text-gray-400 text-[10px]">Connect with us</p>
          </div>
          <div className="p-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-colors flex flex-col items-center text-center group cursor-pointer">
            <Github className="text-purple-400 mb-2 group-hover:scale-110 transition-transform" size={20} />
            <h3 className="text-xs font-bold text-white tracking-wide mb-0.5">GITHUB</h3>
            <p className="text-gray-400 text-[10px]">Open source</p>
          </div>
        </div>

      </div>

      {/* Extra spacing at bottom */}
      <div className="h-20 relative z-10" />
    </div>
  );
};

export default Index;
