import { useState, useEffect } from 'react';
import { SolarSystem2D } from '@/components/SolarSystem2D/SolarSystem2D';
import { HUD } from '@/components/UI/HUD';
import { Preloader } from '@/components/Preloader';
import { X, Mail, Linkedin, Github, Zap } from 'lucide-react';
import { PaperShaderBackground } from '@/components/UI/PaperShaderBackground';

// ... other imports



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
  const [showStratathonPopup, setShowStratathonPopup] = useState(false);
  const [isPopupMinimized, setIsPopupMinimized] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      // Show About section when scrolled down 100px
      if (window.scrollY > 100) {
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
    // Show Stratathon popup after 2 seconds
    setTimeout(() => setShowStratathonPopup(true), 2000);
  };

  return (
    <div className="relative w-full bg-background">
      {loading && <Preloader onComplete={handlePreloaderComplete} />}

      {/* Fixed Solar System Background - Blurs on Scroll */}
      <div
        className="fixed inset-0 w-full h-screen transition-all duration-100"
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

        <div className="relative max-w-5xl w-full mb-8 mx-auto">
          {/* Glassy Card */}
          <div
            className={`relative w-full rounded-xl overflow-hidden ${showAbout ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
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
          className={`max-w-5xl w-full relative overflow-hidden rounded-xl border border-white/20 p-6 bg-gradient-to-r from-blue-900/40 to-purple-900/40 backdrop-blur-md ${showAbout ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
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
        <div className="max-w-5xl w-full mt-6 grid grid-cols-1 md:grid-cols-3 gap-3 mx-auto">
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

      {/* Stratathon Popup */}
      {showStratathonPopup && !isPopupMinimized && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-in fade-in duration-300"
            onClick={() => setIsPopupMinimized(true)}
          />

          {/* Popup Modal */}
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-md animate-in zoom-in-95 duration-300">
            <div
              className="relative overflow-hidden rounded-2xl border-2 border-cyan-400/60 bg-gradient-to-br from-purple-900/95 to-cyan-900/95 backdrop-blur-xl p-8 shadow-2xl"
              style={{
                boxShadow: '0 0 60px rgba(0, 240, 255, 0.4), 0 0 100px rgba(147, 51, 234, 0.3)',
              }}
            >
              {/* Animated background effects */}
              <div className="absolute inset-0 bg-grid-white/[0.03]" />
              <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-400/20 rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

              {/* Close button */}
              <button
                onClick={() => setIsPopupMinimized(true)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all hover:rotate-90 duration-300"
                aria-label="Close"
              >
                <X size={18} color="white" />
              </button>

              {/* Content */}
              <div className="relative z-10 text-center">
                {/* Icon and badge */}
                <div className="flex flex-col items-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full flex items-center justify-center mb-3 animate-bounce">
                    <Zap size={32} className="text-black" strokeWidth={3} />
                  </div>
                  <span className="inline-block px-3 py-1 bg-cyan-400/20 border border-cyan-400/50 rounded-full text-xs font-bold text-cyan-300 tracking-widest uppercase animate-pulse">
                    New Event Alert
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-3xl md:text-4xl font-bold text-white tracking-wide mb-3 font-display">
                  STRATATHON 2026
                </h2>

                {/* Subtitle */}
                <p className="text-cyan-400 text-sm md:text-base font-semibold mb-4 tracking-wide">
                  24 HRS • INNOVATION SPRINT
                </p>

                {/* Description */}
                <p className="text-gray-300 text-sm md:text-base mb-6 leading-relaxed">
                  Join the ultimate innovation challenge! Build the next unicorn with your team in just 24 hours.
                  <span className="text-cyan-300 font-semibold">Ignite innovation through collaboration.</span>
                </p>

                {/* Status badge */}
                <div className="flex items-center justify-center gap-2 mb-6">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  <span className="text-green-400 text-sm font-semibold">Registration Open Now</span>
                </div>

                {/* CTA Button */}
                <a
                  href="/stratathon"
                  className="inline-block px-8 py-3 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 text-black text-sm md:text-base font-bold rounded-full hover:scale-105 hover:shadow-2xl hover:shadow-cyan-400/50 transition-all duration-300 tracking-wide"
                >
                  EXPLORE STRATATHON →
                </a>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Floating Realistic Comet Button */}
      {isPopupMinimized && (
        <button
          onClick={() => setIsPopupMinimized(false)}
          className="fixed bottom-32 md:bottom-8 right-[3%] z-50 group"
          aria-label="Open Stratathon Event"
        >
          <div className="relative w-48 h-24">
            {/* Long Glowing Tail - Multiple layers for realistic glow */}
            <div className="absolute right-20 top-1/2 -translate-y-1/2 w-[200px] h-16 bg-gradient-to-r from-transparent via-purple-400/20 to-cyan-300/40 blur-2xl animate-pulse"></div>
            <div className="absolute right-20 top-1/2 -translate-y-1/2 w-[180px] h-12 bg-gradient-to-r from-transparent via-purple-500/30 to-cyan-400/50 blur-xl"></div>
            <div className="absolute right-20 top-1/2 -translate-y-1/2 w-[160px] h-8 bg-gradient-to-r from-transparent via-purple-400/40 to-cyan-300/60 blur-lg animate-pulse" style={{ animationDelay: '0.3s' }}></div>
            <div className="absolute right-20 top-1/2 -translate-y-1/2 w-[140px] h-6 bg-gradient-to-r from-transparent via-cyan-300/50 to-white/70 blur-md"></div>

            {/* Particle streaks in tail */}
            <div className="absolute right-24 top-1/2 -translate-y-1/2 w-[100px] h-1 bg-gradient-to-r from-transparent to-cyan-300/80 blur-sm animate-pulse"></div>
            <div className="absolute right-28 top-1/2 -translate-y-1/2 translate-y-2 w-[80px] h-0.5 bg-gradient-to-r from-transparent to-purple-400/60 blur-sm animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute right-26 top-1/2 -translate-y-1/2 -translate-y-3 w-[90px] h-0.5 bg-gradient-to-r from-transparent to-cyan-200/70 blur-sm animate-pulse" style={{ animationDelay: '0.7s' }}></div>

            {/* Star particles around comet */}
            <div className="absolute right-16 top-2 w-1 h-1 bg-white rounded-full animate-ping"></div>
            <div className="absolute right-12 bottom-3 w-1.5 h-1.5 bg-cyan-300 rounded-full animate-ping" style={{ animationDelay: '0.4s' }}></div>
            <div className="absolute right-20 top-6 w-1 h-1 bg-purple-400 rounded-full animate-pulse"></div>

            {/* Comet Head - Bright glowing core */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2">
              {/* Outer glow layers */}
              <div className="absolute inset-0 -m-8 bg-gradient-to-br from-cyan-400/40 to-purple-500/40 rounded-full blur-2xl animate-pulse"></div>
              <div className="absolute inset-0 -m-6 bg-gradient-to-br from-cyan-400/50 to-purple-500/50 rounded-full blur-xl"></div>
              <div className="absolute inset-0 -m-4 bg-gradient-to-br from-white/40 to-cyan-200/60 rounded-full blur-lg animate-pulse" style={{ animationDelay: '0.2s' }}></div>

              {/* Main comet head */}
              <div
                className="relative w-16 h-16 bg-gradient-to-br from-white via-cyan-300 to-purple-500 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-125 transition-all duration-300"
                style={{
                  boxShadow: '0 0 30px rgba(255, 255, 255, 0.9), 0 0 60px rgba(6, 182, 212, 0.8), 0 0 90px rgba(147, 51, 234, 0.6), 0 0 120px rgba(6, 182, 212, 0.4)',
                }}
              >
                {/* Bright white core */}
                <div className="absolute inset-3 bg-gradient-to-br from-white to-cyan-100 rounded-full blur-sm animate-pulse"></div>

                {/* Icon */}
                <div className="relative z-10">
                  <Zap size={32} className="text-black drop-shadow-2xl" strokeWidth={4} />
                </div>

                {/* Shine spots */}
                <div className="absolute top-2 left-3 w-3 h-3 bg-white rounded-full blur-[2px]"></div>
                <div className="absolute top-4 right-4 w-2 h-2 bg-white/80 rounded-full blur-sm"></div>
              </div>
            </div>

            {/* NEW Badge */}
            <div className="absolute -top-1 right-12 w-8 h-8 bg-gradient-to-br from-cyan-300 to-blue-500 rounded-full border-2 border-background flex items-center justify-center shadow-lg animate-bounce z-10">
              <span className="text-[10px] font-black text-black">NEW</span>
            </div>
          </div>

          {/* Enhanced Tooltip */}
          <div className="absolute bottom-full right-0 mb-4 px-4 py-2 bg-gradient-to-r from-cyan-900/95 to-purple-900/95 backdrop-blur-md border border-cyan-400/50 text-white text-sm font-bold rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none shadow-2xl">
            <div className="flex items-center gap-2">
              <Zap size={16} className="text-cyan-400" />
              <span>STRATATHON 2026 • Click to explore!</span>
            </div>
            <div className="absolute top-full right-8 -mt-1 border-8 border-transparent border-t-cyan-900/95"></div>
          </div>
        </button>
      )}
    </div>
  );
};

export default Index;
