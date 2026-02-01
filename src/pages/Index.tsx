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

      {/* About Us Section with Notice Board */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-8 md:px-6 md:py-12">

        <div className="relative max-w-7xl w-full mb-6 mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Main About Us Card - Takes 2/3 on large screens */}
          <div className="lg:col-span-2">
            {/* Glassy Card */}
            <div
              className={`relative w-full rounded-xl overflow-hidden transition-all duration-500 ${showAbout ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              style={{
                border: '1px solid rgba(255, 255, 255, 0.15)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
                minHeight: '400px',
              }}
            >
              {/* Animation Background */}
              <div className="absolute inset-0 overflow-hidden rounded-xl opacity-60 pointer-events-none">
                <PaperShaderBackground />
              </div>

              {/* Content Overlay */}
              <div className="relative z-10 p-6 md:p-8 flex flex-col items-center text-center">
                {/* Close Button */}
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
                  aria-label="Close"
                >
                  <X size={20} color="white" opacity={0.7} />
                </button>

                {/* Content */}
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-wide">
                  ABOUT US
                </h2>

                <div className="space-y-4 text-gray-200 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto font-medium">
                  <p>
                    ComET (Community for Emerging Technology) is HBTU's largest officially recognized technology
                    community under the Technical Sub-Council (TSC). It brings multiple tech-focused clubs under
                    one unified ecosystem to build, execute, and deliver real-world solutions.
                  </p>

                  <p>
                    ComET focuses on hands-on learning through projects, workshops, hackathons, and industry-aligned
                    initiatives—ensuring ideas don't stay theoretical, but turn into practical impact.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Notice Board - Takes 1/3 on large screens */}
          <div
            className={`transition-all duration-700 delay-300 ${showAbout ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
          >
            <div
              className="relative w-full rounded-xl overflow-hidden h-full"
              style={{
                border: '1px solid rgba(255, 255, 255, 0.15)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
                minHeight: '400px',
                background: 'rgba(10, 10, 30, 0.6)',
                backdropFilter: 'blur(20px)',
              }}
            >
              {/* Header */}
              <div className="p-4 border-b border-white/10">
                <h3 className="text-xl md:text-2xl font-bold text-white tracking-wide text-center">
                  📢 NOTICE BOARD
                </h3>
              </div>

              {/* Notices List */}
              <div className="p-4 space-y-3 overflow-y-auto" style={{ maxHeight: '340px' }}>
                {/* Notice Item 1 */}
                <div className="p-3 rounded-lg bg-gradient-to-br from-purple-900/40 to-blue-900/30 border border-purple-500/30 hover:border-purple-500/60 transition-all">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-1 flex-shrink-0 animate-pulse"></div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-400 mb-1">Today, 10:30 AM</p>
                      <h4 className="text-sm md:text-base font-bold text-white mb-1">Game-E-Con Registration Open!</h4>
                      <p className="text-xs md:text-sm text-gray-300">Join the biggest gaming event of the year. Register now for exclusive access.</p>
                    </div>
                  </div>
                </div>

                {/* Notice Item 2 */}
                <div className="p-3 rounded-lg bg-gradient-to-br from-cyan-900/40 to-blue-900/30 border border-cyan-500/30 hover:border-cyan-500/60 transition-all">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-1 flex-shrink-0 animate-pulse"></div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-400 mb-1">Yesterday</p>
                      <h4 className="text-sm md:text-base font-bold text-white mb-1">Workshop: AI & ML Basics</h4>
                      <p className="text-xs md:text-sm text-gray-300">Learn the fundamentals of artificial intelligence. Limited seats available.</p>
                    </div>
                  </div>
                </div>

                {/* Notice Item 3 */}
                <div className="p-3 rounded-lg bg-gradient-to-br from-orange-900/40 to-red-900/30 border border-orange-500/30 hover:border-orange-500/60 transition-all">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-orange-400 mt-1 flex-shrink-0"></div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-400 mb-1">2 days ago</p>
                      <h4 className="text-sm md:text-base font-bold text-white mb-1">Hackathon Winners Announced</h4>
                      <p className="text-xs md:text-sm text-gray-300">Congratulations to all teams. Check the leaderboard for results.</p>
                    </div>
                  </div>
                </div>

                {/* Notice Item 4 */}
                <div className="p-3 rounded-lg bg-gradient-to-br from-green-900/40 to-emerald-900/30 border border-green-500/30 hover:border-green-500/60 transition-all">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-400 mt-1 flex-shrink-0"></div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-400 mb-1">1 week ago</p>
                      <h4 className="text-sm md:text-base font-bold text-white mb-1">New Team Members Welcome</h4>
                      <p className="text-xs md:text-sm text-gray-300">We're excited to welcome our new members to the ComET family!</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Join The Crew Section */}
        <div
          className={`max-w-7xl w-full relative overflow-hidden rounded-xl border border-white/20 p-4 md:p-6 bg-gradient-to-r from-blue-900/40 to-purple-900/40 backdrop-blur-md transition-all duration-700 delay-500 ${showAbout ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="absolute inset-0 bg-grid-white/[0.05]" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-white tracking-wide">
                JOIN THE CREW
              </h2>
              <p className="text-gray-300 text-sm md:text-base text-balance">
                Ready to explore the universe with us? We're always looking for passionate
                astronauts.
              </p>
            </div>
            <button className="px-6 py-2 bg-white text-black text-sm md:text-base font-bold rounded-full hover:scale-105 transition-transform duration-300 tracking-wide whitespace-nowrap shadow-lg hover:shadow-xl">
              APPLY NOW
            </button>
          </div>
        </div>

        {/* Contact / Socials Section */}
        <div className="max-w-7xl w-full mt-4 grid grid-cols-1 md:grid-cols-3 gap-3 mx-auto">
          <div className="p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all hover:scale-105 duration-300 flex flex-col items-center text-center group cursor-pointer">
            <Mail className="text-cyan-400 mb-2 group-hover:scale-110 transition-transform" size={24} />
            <h3 className="text-sm md:text-base font-bold text-white tracking-wide mb-1">EMAIL US</h3>
            <p className="text-gray-400 text-xs md:text-sm">hello@comet.space</p>
          </div>
          <div className="p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all hover:scale-105 duration-300 flex flex-col items-center text-center group cursor-pointer">
            <Linkedin className="text-blue-400 mb-2 group-hover:scale-110 transition-transform" size={24} />
            <h3 className="text-sm md:text-base font-bold text-white tracking-wide mb-1">LINKEDIN</h3>
            <p className="text-gray-400 text-xs md:text-sm">Connect with us</p>
          </div>
          <div className="p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all hover:scale-105 duration-300 flex flex-col items-center text-center group cursor-pointer">
            <Github className="text-purple-400 mb-2 group-hover:scale-110 transition-transform" size={24} />
            <h3 className="text-sm md:text-base font-bold text-white tracking-wide mb-1">GITHUB</h3>
            <p className="text-gray-400 text-xs md:text-sm">Open source</p>
          </div>
        </div>

      </div>

      {/* Extra spacing at bottom */}
      <div className="h-4 relative z-10" />

      {/* Stratathon Popup */}
      {showStratathonPopup && !isPopupMinimized && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 animate-in fade-in duration-300"
            onClick={() => setIsPopupMinimized(true)}
          />

          {/* Popup Modal - Gaming/Esports Theme */}
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[95%] md:w-[90%] max-w-md animate-in zoom-in-95 duration-300">
            <div
              className="relative overflow-hidden rounded-2xl border border-purple-500/50 bg-black backdrop-blur-xl p-6 md:p-8 shadow-2xl"
              style={{
                boxShadow: '0 0 80px rgba(147, 51, 234, 0.4), 0 0 120px rgba(6, 182, 212, 0.3)',
                background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.95) 0%, rgba(88, 28, 135, 0.2) 50%, rgba(17, 24, 39, 0.95) 100%)',
              }}
            >
              {/* Circuit board pattern background */}
              <div className="absolute inset-0 opacity-30">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="circuit" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
                      <path d="M10 10 L40 10 L40 40" stroke="#8B5CF6" strokeWidth="1" fill="none" opacity="0.3" />
                      <circle cx="10" cy="10" r="2" fill="#06B6D4" opacity="0.6" />
                      <circle cx="40" cy="40" r="2" fill="#A855F7" opacity="0.6" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#circuit)" />
                </svg>
              </div>
              {/* Animated gradient glows */}
              <div className="absolute top-0 right-0 w-56 h-56 bg-purple-600/20 rounded-full blur-[80px] animate-pulse" />
              <div className="absolute bottom-0 left-0 w-56 h-56 bg-cyan-500/20 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '1s' }} />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-purple-500/10 rounded-full blur-[60px]" />

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
                {/* Top banner */}
                <div className="mb-6">
                  <div className="inline-block px-6 py-1.5 border border-purple-500/50 rounded-full text-[9px] font-black tracking-[0.25em] uppercase" style={{
                    background: 'linear-gradient(90deg, rgba(139, 92, 246, 0.15), rgba(6, 182, 212, 0.15))',
                    boxShadow: '0 0 20px rgba(139, 92, 246, 0.3)'
                  }}>
                    <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">POWERED BY COMET TECHNOLOGY</span>
                  </div>
                </div>

                {/* Main Title */}
                <div className="mb-6">
                  <h2 className="text-4xl md:text-6xl font-black mb-2" style={{
                    fontFamily: 'Impact, sans-serif',
                    letterSpacing: '0.02em',
                    background: 'linear-gradient(180deg, #ffffff 0%, #e0e7ff 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '0 0 40px rgba(139, 92, 246, 0.5)',
                  }}>
                    DOMINATE
                  </h2>
                  <h3 className="text-3xl md:text-5xl font-black italic" style={{
                    fontFamily: 'Impact, sans-serif',
                    letterSpacing: '0.05em',
                    background: 'linear-gradient(90deg, #a855f7 0%, #06b6d4 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '0 0 30px rgba(168, 85, 247, 0.6)',
                  }}>
                    THE ARENA
                  </h3>
                </div>

                {/* Event name */}
                <div className="mb-6">
                  <div className="inline-block px-5 py-2 border border-cyan-500/40 rounded-lg" style={{
                    background: 'rgba(6, 182, 212, 0.1)',
                    boxShadow: '0 0 25px rgba(6, 182, 212, 0.2)'
                  }}>
                    <span className="text-xl md:text-2xl font-black tracking-[0.15em] text-white">GAME-E-CON</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-300 text-sm mb-8 leading-relaxed max-w-[90%] mx-auto">
                  Unrivaled performance. Elite strategy. We are the future of competitive
                  <span className="block text-purple-300 mt-1 font-semibold">play in HBTU, built on the backbone of ComET infrastructure.</span>
                </p>

                {/* Buttons */}
                <div className="flex flex-col gap-3 items-center">
                  <a
                    href="/stratathon"
                    className="group relative inline-flex items-center justify-center px-8 py-3.5 w-full text-white text-sm font-black rounded-lg hover:scale-[1.02] transition-all duration-300 overflow-hidden border border-purple-500/50"
                    style={{
                      background: 'linear-gradient(90deg, rgba(139, 92, 246, 0.4) 0%, rgba(6, 182, 212, 0.4) 100%)',
                      boxShadow: '0 0 30px rgba(139, 92, 246, 0.3), inset 0 0 20px rgba(139, 92, 246, 0.1)',
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-400/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
                    <span className="relative tracking-[0.2em] uppercase flex items-center gap-2">
                      LATEST UPDATES
                    </span>
                  </a>

                  <a
                    href="/leaderboard"
                    className="group relative inline-flex items-center justify-center px-8 py-3.5 w-full bg-transparent text-white text-sm font-black rounded-lg hover:scale-[1.02] transition-all duration-300 border border-cyan-500/50"
                    style={{
                      boxShadow: '0 0 20px rgba(6, 182, 212, 0.2)',
                    }}
                  >
                    <span className="relative tracking-[0.2em] uppercase flex items-center gap-2">
                      LEADERBOARD
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div >
        </>
      )}

      {/* Floating Gaming Button - Esports Theme */}
      {isPopupMinimized && (
        <button
          onClick={() => setIsPopupMinimized(false)}
          className="fixed bottom-24 md:bottom-8 right-[3%] z-50 group scale-90 md:scale-100 hover:scale-[1.05] transition-transform duration-500"
          aria-label="Open Game-E-Con Event"
        >
          <div className="relative w-56 h-28">
            {/* Purple/Cyan Energy Trail */}
            <div className="absolute right-24 top-1/2 -translate-y-1/2 w-[180px] h-1 bg-gradient-to-r from-transparent via-purple-500 to-cyan-400 blur-[2px] animate-pulse"></div>

            {/* Tail Glow Layers */}
            <div className="absolute right-20 top-1/2 -translate-y-1/2 w-[220px] h-16 bg-gradient-to-r from-transparent via-purple-600/30 to-cyan-500/40 blur-3xl"></div>
            <div className="absolute right-20 top-1/2 -translate-y-1/2 w-[200px] h-8 bg-gradient-to-r from-transparent via-purple-500/40 to-cyan-400/60 blur-xl"></div>

            {/* Speed Lines */}
            <div className="absolute right-28 top-1/2 -translate-y-1/2 -translate-y-4 w-[100px] h-[1px] bg-gradient-to-r from-transparent to-purple-400/50 blur-[0.5px]"></div>
            <div className="absolute right-28 top-1/2 -translate-y-1/2 translate-y-4 w-[120px] h-[1px] bg-gradient-to-r from-transparent to-cyan-400/50 blur-[0.5px]"></div>

            {/* Gaming Icon */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              {/* Head Glows */}
              <div className="absolute inset-0 -m-8 bg-purple-500/30 rounded-full blur-2xl animate-pulse"></div>
              <div className="absolute inset-0 -m-4 bg-cyan-400/40 rounded-full blur-xl"></div>

              {/* Main Icon */}
              <div
                className="relative w-16 h-16 rounded-lg flex items-center justify-center z-10 border-2 border-purple-500/50"
                style={{
                  background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.8), rgba(6, 182, 212, 0.6))',
                  boxShadow: '0 0 40px rgba(139, 92, 246, 0.6), 0 0 60px rgba(6, 182, 212, 0.4)',
                }}
              >
                <Zap size={30} className="text-white drop-shadow-lg" strokeWidth={3} fill="white" />

                {/* Highlight */}
                <div className="absolute top-2 left-3 w-4 h-2 bg-white/50 rounded-full blur-[1px] rotate-[-45deg]"></div>
              </div>
            </div>

            {/* NEW Badge */}
            <div className="absolute top-0 right-16 w-8 h-8 border-2 border-purple-500 rounded-full flex items-center justify-center animate-bounce z-20" style={{
              background: 'linear-gradient(135deg, #8B5CF6, #06B6D4)',
              boxShadow: '0 0 20px rgba(139, 92, 246, 0.8)'
            }}>
              <span className="text-[9px] font-black text-white">NEW</span>
            </div>
          </div>

          {/* Enhanced Tooltip */}
          <div className="absolute bottom-full right-4 mb-2 px-5 py-2.5 backdrop-blur-xl border text-white text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none translate-y-2 group-hover:translate-y-0" style={{
            background: 'rgba(0, 0, 0, 0.9)',
            borderColor: 'rgba(139, 92, 246, 0.5)',
            boxShadow: '0 0 30px rgba(139, 92, 246, 0.3)'
          }}>
            <div className="flex items-center gap-2 tracking-wide uppercase">
              <Zap size={14} className="text-purple-400 fill-purple-400" />
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Game-E-Con</span>
            </div>
          </div>
        </button>
      )}
    </div>
  );
};

export default Index;
