import { useState, useEffect } from 'react';
import { SolarSystem2D } from '@/components/SolarSystem2D/SolarSystem2D';
import { HUD } from '@/components/UI/HUD';
import { Preloader } from '@/components/Preloader';

import { X, Mail, Linkedin, Github, Zap } from 'lucide-react';
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
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12 md:px-8 md:py-20">

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
            <div className="relative z-10 p-6 md:p-10 flex flex-col items-center text-center">
              {/* Close Button */}
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
                aria-label="Close"
              >
                <X size={20} color="white" opacity={0.7} />
              </button>

              {/* Content */}
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white tracking-wide">
                ABOUT US
              </h2>

              <div className="space-y-4 text-gray-300 text-sm md:text-base leading-relaxed">
                <p>
                  ComET (Community for Emerging Technology) is HBTU’s largest officially recognized technology
                  community under the Technical Sub-Council (TSC). It brings multiple tech-focused clubs under
                  one unified ecosystem to build, execute, and deliver real-world solutions.
                </p>

                <p>
                  ComET focuses on hands-on learning through projects, workshops, hackathons, and industry-aligned
                  initiatives—ensuring ideas don’t stay theoretical, but turn into practical impact.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Join The Crew Section */}
        <div
          className={`max-w-5xl w-full relative overflow-hidden rounded-xl border border-white/20 p-5 md:p-6 bg-gradient-to-r from-blue-900/40 to-purple-900/40 backdrop-blur-md ${showAbout ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
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
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 animate-in fade-in duration-300"
            onClick={() => setIsPopupMinimized(true)}
          />

          {/* Popup Modal - Premium Monochrome Theme */}
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[95%] md:w-[90%] max-w-md animate-in zoom-in-95 duration-300">
            <div
              className="relative overflow-hidden rounded-2xl border border-white/30 bg-black backdrop-blur-xl p-6 md:p-8 shadow-2xl"
              style={{
                boxShadow: '0 0 80px rgba(255, 255, 255, 0.15), 0 0 120px rgba(255, 255, 255, 0.1)',
              }}
            >
              {/* Animated background effects */}
              <div className="absolute inset-0 bg-grid-white/[0.05]" />
              <div className="absolute top-0 right-0 w-56 h-56 bg-white/10 rounded-full blur-[80px] animate-pulse" />
              <div className="absolute bottom-0 left-0 w-56 h-56 bg-zinc-500/10 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '1s' }} />

              {/* Close button */}
              <button
                onClick={() => setIsPopupMinimized(true)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 hover:scale-110 transition-all duration-300 group"
                aria-label="Close"
              >
                <X size={18} className="text-white group-hover:rotate-90 transition-transform duration-300" />
              </button>

              {/* Content */}
              <div className="relative z-10 text-center">
                {/* Icon and badge */}
                <div className="flex flex-col items-center mb-5">
                  <div className="relative w-20 h-20 mb-4 group">
                    <div className="absolute inset-0 bg-white/30 rounded-full blur-xl animate-pulse"></div>
                    <div className="relative w-full h-full bg-gradient-to-br from-white via-zinc-200 to-zinc-400 rounded-full flex items-center justify-center border-4 border-black shadow-[0_0_30px_rgba(255,255,255,0.4)]">
                      <Zap size={36} className="text-black drop-shadow-md" strokeWidth={3} fill="black" />
                    </div>
                  </div>
                  <span className="inline-block px-4 py-1.5 bg-white/10 border border-white/30 rounded-full text-[10px] font-black text-white tracking-[0.2em] uppercase shadow-[0_0_15px_rgba(255,255,255,0.2)] backdrop-blur-md">
                    New Event Alert
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-500 tracking-tighter mb-2 font-display drop-shadow-sm">
                  STARTATHON
                  <span className="block text-2xl md:text-3xl mt-1 tracking-[0.3em] font-light text-white/90">2026</span>
                </h2>

                {/* Subtitle */}
                <div className="flex items-center justify-center gap-3 mb-6 opacity-90">
                  <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-white/50"></div>
                  <p className="text-zinc-300 text-[10px] md:text-xs font-bold tracking-widest uppercase shadow-black drop-shadow-md">
                    24 HRS • INNOVATION SPRINT
                  </p>
                  <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-white/50"></div>
                </div>

                {/* Description */}
                <p className="text-zinc-400 text-sm mb-8 leading-relaxed max-w-[90%] mx-auto font-medium">
                  Build the next unicorn with your team.
                  <span className="block text-white mt-1">Ignite innovation through collaboration.</span>
                </p>

                {/* Buttons */}
                <div className="flex flex-col gap-3 items-center">
                  <a
                    href="/stratathon"
                    className="group relative inline-flex items-center justify-center px-8 py-3.5 w-full bg-white text-black text-sm font-black rounded-xl hover:scale-[1.02] transition-all duration-300 overflow-hidden shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:shadow-[0_0_50px_rgba(255,255,255,0.5)]"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
                    <span className="relative tracking-widest uppercase flex items-center gap-2">
                      Explore Now <span className="text-lg">→</span>
                    </span>
                  </a>

                  <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse shadow-[0_0_10px_white]"></span>
                    Registration Open
                  </div>
                </div>
              </div>
            </div>
          </div >
        </>
      )}

      {/* Floating Realistic Comet - Premium Monochrome */}
      {isPopupMinimized && (
        <button
          onClick={() => setIsPopupMinimized(false)}
          className="fixed bottom-24 md:bottom-8 right-[3%] z-50 group scale-90 md:scale-100 hover:scale-[1.05] transition-transform duration-500"
          aria-label="Open Startathon Event"
        >
          <div className="relative w-56 h-28">
            {/* Super Bright Tail Core */}
            <div className="absolute right-24 top-1/2 -translate-y-1/2 w-[180px] h-1 bg-gradient-to-r from-transparent via-white to-white blur-[2px] animate-pulse"></div>

            {/* Tail Glow Layers */}
            <div className="absolute right-20 top-1/2 -translate-y-1/2 w-[220px] h-16 bg-gradient-to-r from-transparent via-zinc-400/20 to-white/40 blur-3xl"></div>
            <div className="absolute right-20 top-1/2 -translate-y-1/2 w-[200px] h-8 bg-gradient-to-r from-transparent via-zinc-300/30 to-white/60 blur-xl"></div>

            {/* Speed Lines */}
            <div className="absolute right-28 top-1/2 -translate-y-1/2 -translate-y-4 w-[100px] h-[1px] bg-gradient-to-r from-transparent to-white/50 blur-[0.5px]"></div>
            <div className="absolute right-28 top-1/2 -translate-y-1/2 translate-y-4 w-[120px] h-[1px] bg-gradient-to-r from-transparent to-white/30 blur-[0.5px]"></div>

            {/* Comet Head */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              {/* Head Glows */}
              <div className="absolute inset-0 -m-8 bg-white/20 rounded-full blur-2xl animate-pulse"></div>
              <div className="absolute inset-0 -m-4 bg-white/40 rounded-full blur-xl"></div>

              {/* Main Sphere */}
              <div
                className="relative w-16 h-16 bg-gradient-to-br from-white via-zinc-200 to-zinc-400 rounded-full flex items-center justify-center z-10"
                style={{
                  boxShadow: '0 0 50px rgba(255, 255, 255, 0.6), inset -5px -5px 10px rgba(0,0,0,0.2)',
                }}
              >
                <Zap size={30} className="text-black drop-shadow-sm rotate-12" strokeWidth={3} fill="black" />

                {/* Specular Highlight */}
                <div className="absolute top-2 left-3 w-4 h-2 bg-white rounded-full blur-[1px] rotate-[-45deg]"></div>
              </div>
            </div>

            {/* NEW Badge */}
            <div className="absolute top-0 right-16 w-8 h-8 bg-white border-2 border-black rounded-full flex items-center justify-center animate-bounce z-20 shadow-[0_0_20px_white]">
              <span className="text-[9px] font-black text-black">NEW</span>
            </div>
          </div>

          {/* Enhanced Tooltip */}
          <div className="absolute bottom-full right-4 mb-2 px-5 py-2.5 bg-black/90 backdrop-blur-xl border border-white/20 text-white text-xs font-bold rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none shadow-[0_0_30px_rgba(255,255,255,0.2)] translate-y-2 group-hover:translate-y-0">
            <div className="flex items-center gap-2 tracking-wide uppercase">
              <Zap size={14} className="text-white fill-white" />
              <span>Startathon 2026</span>
            </div>
          </div>
        </button>
      )}
    </div>
  );
};

export default Index;
