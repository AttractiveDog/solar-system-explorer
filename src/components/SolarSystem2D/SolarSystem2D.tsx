import { useEffect, useState } from 'react';
import { Planet3D } from '../Planet3D';

const planets = [
  {
    name: 'TERRA',
    color: 'hsl(210, 100%, 65%)',
    glowColor: 'hsl(210, 100%, 70%)',
    size: 150, // Adjusted for new camera zoom (was 300)
    orbitRadius: 200,
    orbitDuration: 24,
    rotationDuration: 8,
    discovered: true,
    texture: '/planet-terra.png',
  },
  {
    name: 'EMBER',
    color: 'hsl(0, 80%, 50%)',
    glowColor: 'hsl(0, 100%, 60%)',
    size: 150, // Adjusted (was 300)
    orbitRadius: 300,
    orbitDuration: 36,
    rotationDuration: 6,
    discovered: true,
    texture: '/planet-ember.png',
  },
  {
    name: 'AZURE',
    color: 'hsl(165, 100%, 42%)',
    glowColor: 'hsl(165, 100%, 50%)',
    size: 150, // Adjusted (was 300)
    orbitRadius: 400,
    orbitDuration: 52,
    rotationDuration: 4,
    discovered: true,
    texture: '/planet-azure.png',
  },
  {
    name: 'PHANTOM-X',
    color: 'hsl(320, 100%, 70%)',
    glowColor: 'hsl(320, 100%, 80%)',
    size: 45, // Adjusted (was 90)
    orbitRadius: 500,
    orbitDuration: 70,
    rotationDuration: 12,
    discovered: true,
    texture: '/planet-phantom.png',
  },
  {
    name: 'VOID-7',
    color: 'hsl(240, 40%, 12%)',
    glowColor: 'hsl(260, 50%, 30%)',
    size: 42, // Adjusted (was 85)
    orbitRadius: 550,
    orbitDuration: 100,
    rotationDuration: 16,
    discovered: false,
    texture: '/planet-void.png',
  },
];

const Stars = () => {
  const [stars] = useState(() =>
    Array.from({ length: 200 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.7 + 0.3,
      twinkle: Math.random() * 3 + 2,
    }))
  );

  return (
    <div className="absolute inset-0 overflow-hidden">
      {stars.map((star, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animation: `twinkle ${star.twinkle}s ease-in-out infinite`,
          }}
        />
      ))}
    </div>
  );
};

import { User, Search, LayoutDashboard, LogIn, Power, ChevronLeft, ChevronRight } from 'lucide-react';

interface AsteroidProps {
  size: number;
  orbitRadius: number;
  orbitDuration: number;
  startAngle: number;
  color: string;
  glowColor: string;
  label: string;
  icon: any;
  delay?: number;
  active: boolean;
}

const Asteroid = ({
  size,
  orbitRadius,
  orbitDuration,
  startAngle,
  color,
  glowColor,
  label,
  icon: Icon,
  delay = 0,
  active
}: AsteroidProps) => {
  const [isHovered, setIsHovered] = useState(false);

  // Ellipse dimensions
  const ellipseWidth = orbitRadius * 2.8;
  const ellipseHeight = orbitRadius * 0.9;

  // Calculate static position based on startAngle
  const angleOffset = (startAngle * Math.PI) / 180;
  const x = (ellipseWidth / 2) * Math.cos(angleOffset);
  const y = (ellipseHeight / 2) * Math.sin(angleOffset) * -1;

  return (
    <div
      className="absolute bottom-0 left-1/2"
      style={{
        zIndex: isHovered ? 30 : 20,
      }}
    >
      {/* Visual Orbit Line for this specific asteroid */}
      <svg
        className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-[50%]"
        width={ellipseWidth + 40}
        height={ellipseHeight + 40}
        style={{ overflow: 'visible', opacity: active ? 0.2 : 0, transition: 'opacity 1s' }}
      >
        <ellipse
          cx={(ellipseWidth + 40) / 2}
          cy={(ellipseHeight + 40) / 2}
          rx={ellipseWidth / 2}
          ry={ellipseHeight / 2}
          fill="none"
          stroke={glowColor}
          strokeWidth="1"
          strokeDasharray="4 4"
        />
      </svg>

      {/* The Stationary Asteroid Wrapper */}
      <div
        className="absolute left-0 bottom-0 transition-all duration-1000 ease-out"
        style={{
          transform: active ? `translate(${x}px, ${y}px)` : 'translate(0px, 0px)',
          opacity: active ? 1 : 0,
        }}
      >
        {/* Asteroid Body & Content */}
        <div
          className="flex flex-col items-center justify-center cursor-pointer transition-transform duration-300"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            transform: `translate(-50%, -50%) scale(${isHovered ? 1.2 : 1})`,
            pointerEvents: active ? 'auto' : 'none',
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Asteroid Shape */}
          <div
            className="absolute inset-0 flex items-center justify-center transition-all duration-300"
            style={{
              borderRadius: '40% 60% 50% 50% / 50% 45% 55% 50%', // Blob shape
              background: `radial-gradient(circle at 30% 30%, ${color}, #1a1a1a)`,
              boxShadow: isHovered
                ? `0 0 20px ${glowColor}, inset -4px -4px 8px rgba(0,0,0,0.8)`
                : `0 0 5px ${glowColor}, inset -4px -4px 8px rgba(0,0,0,0.8)`,
              filter: active ? 'none' : 'blur(5px)',
            }}
          >
            {/* Icon Overlay */}
            <Icon
              size={Math.floor(size * 0.5)}
              color={glowColor}
              strokeWidth={2}
              style={{
                filter: `drop-shadow(0 0 2px ${glowColor})`,
                opacity: 0.9
              }}
            />
          </div>

          {/* Label (visible on hover) */}
          <div
            className={`absolute -top-8 px-2 py-1 bg-black/80 border border-${glowColor}/30 rounded text-xs font-bold tracking-widest uppercase whitespace-nowrap transition-all duration-300 pointer-events-none`}
            style={{
              color: glowColor,
              opacity: isHovered ? 1 : 0,
              transform: isHovered ? 'translateY(0)' : 'translateY(10px)',
              textShadow: `0 0 10px ${glowColor}`
            }}
          >
            {label}
          </div>
        </div>
      </div>
    </div>
  );
};

interface SunProps {
  isExpanded: boolean;
  onToggle: () => void;
  isMobile: boolean;
}

const Sun = ({ isExpanded, onToggle, isMobile }: SunProps) => {
  const sunSize = isMobile ? 400 : 1200;

  return (
    <div
      onClick={onToggle}
      className={`absolute cursor-pointer ${isMobile
        ? 'left-0 top-1/2 -translate-y-1/2 -translate-x-[75%]'
        : 'bottom-0 left-1/2 -translate-x-1/2 translate-y-[90%]'
        }`}
      role="button"
      aria-label="Toggle navigation menu"
    >

      {/* Sun core - Visual Representation */}
      <div
        className="relative rounded-full transition-all duration-700 ease-in-out group"
        style={{
          width: `${sunSize}px`,
          height: `${sunSize}px`,
          background: isExpanded
            ? 'radial-gradient(circle at 50% 30%, hsl(45, 100%, 75%) 0%, hsl(40, 100%, 60%) 40%, hsl(25, 100%, 50%) 100%)' // Hotter when expanded
            : 'radial-gradient(circle at 30% 30%, hsl(45, 100%, 70%) 0%, hsl(35, 100%, 55%) 40%, hsl(25, 100%, 45%) 100%)',
          boxShadow: isExpanded
            ? '0 0 100px 40px hsla(35, 100%, 60%, 0.8), 0 0 200px 80px hsla(35, 100%, 50%, 0.4)'
            : '0 0 60px 25px hsla(35, 100%, 50%, 0.6), 0 0 120px 50px hsla(35, 100%, 50%, 0.3)',
        }}
      >
        {/* Sun surface details */}
        <div
          className="absolute inset-0 rounded-full opacity-30 transition-opacity duration-700"
          style={{
            background: 'radial-gradient(circle at 70% 60%, transparent 20%, hsla(20, 100%, 40%, 0.3) 100%)',
            opacity: isExpanded ? 0.5 : 0.3,
          }}
        />
      </div>

      {/* Sun glow layers */}
      <div
        className="absolute rounded-full animate-pulse transition-all duration-700 ease-in-out"
        style={{
          width: '300px',
          height: '300px',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, hsla(35, 100%, 60%, 0.2) 0%, transparent 70%)',
          opacity: isExpanded ? 0.8 : 1,
          scale: isExpanded ? 1.5 : 1,
        }}
      />
      <div
        className="absolute rounded-full transition-all duration-700 ease-in-out"
        style={{
          width: '200px',
          height: '200px',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, hsla(35, 100%, 55%, 0.4) 0%, transparent 60%)',
          scale: isExpanded ? 1.3 : 1,
        }}
      />




    </div>
  );
};

interface PlanetProps {
  name: string;
  color: string;
  glowColor: string;
  size: number;
  orbitRadius: number;
  orbitDuration: number;
  rotationDuration: number;
  discovered: boolean;
  hasRings?: boolean;
  ringColor?: string;
  texture?: string;
  index: number;
  isMobile: boolean;
  isOrbiting?: boolean;
  orbitDirection?: 'left' | 'right' | null;
}

const Planet = ({
  name,
  color,
  glowColor,
  size,
  orbitRadius,
  orbitDuration,
  rotationDuration,
  discovered,
  hasRings,
  ringColor,
  texture,
  index,
  isMobile,
  isOrbiting = false,
  orbitDirection = null,
}: PlanetProps) => {
  // Use fixed size for all planets in mobile, original size in desktop
  const displaySize = isMobile ? 180 : size;
  const [isHovered, setIsHovered] = useState(false);

  // Ellipse dimensions: wider than tall
  const ellipseWidth = orbitRadius * 5.5;
  const ellipseHeight = orbitRadius * 1.2;

  // Generate unique animation name for this planet
  const animationName = `ellipseOrbit-${index}`;

  // Calculate keyframe positions for smooth elliptical motion
  const generateKeyframes = () => {
    const steps = 36; // Number of keyframe steps
    let keyframes = '@keyframes ' + animationName + ' {\n';

    for (let i = 0; i <= steps; i++) {
      const percent = (i / steps) * 100;
      // Angle from 180deg (left) to 0deg (right) for top half
      const angle = (180 - (i / steps) * 180) * (Math.PI / 180);

      const x = ellipseWidth / 2 + (ellipseWidth / 2) * Math.cos(angle);
      const y = ellipseHeight - ellipseHeight * Math.sin(angle);

      keyframes += `  ${percent.toFixed(1)}% {\n`;
      keyframes += `    left: ${x}px;\n`;
      keyframes += `    top: ${y}px;\n`;
      keyframes += `  }\n`;
    }

    keyframes += '}';
    return keyframes;
  };

  return (
    <div
      className={isMobile ? "absolute inset-0 flex items-center justify-center" : "absolute bottom-0 left-1/2"}
      style={isMobile ? {
        paddingLeft: '50%', // Shift right to center in visible area (accounting for sun on left)
        paddingTop: '30%', // Shift down vertically
      } : {
        width: `${ellipseWidth}px`,
        height: `${ellipseHeight}px`,
        marginLeft: `-${ellipseWidth / 2}px`,
        marginBottom: '0px',
      }}
    >
      {/* Elliptical orbit path using SVG - only in desktop */}
      {!isMobile && (
        <svg
          className="absolute inset-0"
          width={ellipseWidth}
          height={ellipseHeight}
          style={{ overflow: 'visible' }}
        >
          <ellipse
            cx={ellipseWidth / 2}
            cy={ellipseHeight}
            rx={ellipseWidth / 2}
            ry={ellipseHeight}
            fill="none"
            stroke={discovered ? 'hsla(210, 100%, 60%, 0.2)' : 'hsla(270, 60%, 40%, 0.15)'}
            strokeWidth="1"
          />
        </svg>
      )}

      {/* Inject keyframes for this planet - only needed for desktop */}
      {!isMobile && <style>{generateKeyframes()}</style>}

      {/* Planet container - orbits along ellipse in desktop, static in mobile */}
      <div
        className="absolute"
        style={isMobile ? {
          // Mobile: center the planet with orbit animation
          position: 'relative',
          zIndex: 10,
          transform: isOrbiting
            ? orbitDirection === 'left'
              ? 'translate(-100px, -150px) scale(0.5) rotate(-30deg)' // Orbit up and to the left
              : 'translate(100px, -150px) scale(0.5) rotate(30deg)'   // Orbit up and to the right
            : 'translate(0, 0) scale(1) rotate(0deg)',
          opacity: isOrbiting ? 0 : 1,
          transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        } : {
          // Desktop: orbital motion
          left: '0',
          top: '0',
          animation: `${animationName} ${orbitDuration}s linear infinite`,
          animationDelay: `${index * -5}s`,
          animationPlayState: isHovered ? 'paused' : 'running',
          zIndex: isHovered ? 100 : 10,
        }}
      >
        {/* Planet wrapper for centering */}
        <div
          onMouseEnter={() => !isMobile && setIsHovered(true)}
          onMouseLeave={() => !isMobile && setIsHovered(false)}
          onClick={() => {
            console.log(`Clicked on planet: ${name}`);
            // Add your planet click logic here
          }}
          style={{
            position: 'relative',
            width: `${displaySize}px`,
            height: `${displaySize}px`,
            borderRadius: '50%', // Make hit area circular
            // Removed scale from here to keep hit box constant size
            transform: `translate(-50%, -50%)`,
            transition: 'transform 0.3s ease-in-out',
            cursor: 'pointer',
          }}
        >
          {/* Glow effect wrapper */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              // Apply scaling here instead so the visual grows but the hit-box stays the same
              transform: isHovered ? 'scale(1.3)' : 'scale(1)',
              filter: isHovered
                ? `drop-shadow(0 0 ${displaySize * 1.5}px ${glowColor}) drop-shadow(0 0 ${displaySize * 0.9}px ${glowColor}) drop-shadow(0 0 ${displaySize * 2.4}px ${glowColor}88)`
                : `drop-shadow(0 0 ${displaySize * 0.5}px ${glowColor}) drop-shadow(0 0 ${displaySize * 0.3}px ${glowColor}) drop-shadow(0 0 ${displaySize * 0.8}px ${glowColor}88)`,
              animation: 'planetGlow 3s ease-in-out infinite',
              transition: 'filter 0.3s ease-in-out, transform 0.3s ease-in-out',
            }}
          >
            {/* 3D Planet using Three.js */}
            <Planet3D
              size={displaySize}
              color={color}
              glowColor={glowColor}
              texture={texture}
              rotationSpeed={1 / rotationDuration}
              discovered={discovered}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export const SolarSystem2D = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentPlanetIndex, setCurrentPlanetIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isOrbiting, setIsOrbiting] = useState(false);
  const [orbitDirection, setOrbitDirection] = useState<'left' | 'right' | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleToggle = () => {
    setIsAnimating(true);
    setIsExpanded(!isExpanded);
    setTimeout(() => setIsAnimating(false), 1000); // Match transition duration
  };

  const nextPlanet = () => {
    setIsOrbiting(true);
    setOrbitDirection('left'); // Swipe left = orbit to left
    setTimeout(() => {
      setCurrentPlanetIndex((prev) => (prev + 1) % planets.length);
      setIsOrbiting(false);
      setOrbitDirection(null);
    }, 600); // Duration of orbit animation
  };

  const prevPlanet = () => {
    setIsOrbiting(true);
    setOrbitDirection('right'); // Swipe right = orbit to right
    setTimeout(() => {
      setCurrentPlanetIndex((prev) => (prev - 1 + planets.length) % planets.length);
      setIsOrbiting(false);
      setOrbitDirection(null);
    }, 600); // Duration of orbit animation
  };

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null); // Reset touchEnd
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextPlanet();
    } else if (isRightSwipe) {
      prevPlanet();
    }
  };

  return (
    <div
      className="absolute inset-0 overflow-hidden bg-gradient-to-b from-[hsl(240,50%,5%)] via-[hsl(250,40%,4%)] to-[hsl(260,50%,8%)]"
      onTouchStart={isMobile ? onTouchStart : undefined}
      onTouchMove={isMobile ? onTouchMove : undefined}
      onTouchEnd={isMobile ? onTouchEnd : undefined}
    >
      <Stars />

      {/* Background Logo 'comet' */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0"
      >
        <img
          src="/comet-logo-original.png"
          alt="Comet"
          className="w-[50vw] h-auto opacity-100"
          style={{
            filter: 'grayscale(1) brightness(10) contrast(100)',
            maxWidth: '1200px'
          }}
        />
      </div>

      {/* COMET Logo Button - Clickable to toggle asteroids */}
      <div
        onClick={handleToggle}
        className={`fixed z-50 flex flex-col items-center justify-center transition-transform duration-500 ease-out cursor-pointer hover:scale-105 ${isMobile ? 'top-8' : ''
          }`}
        style={isMobile ? {
          left: '50%',
          transform: 'translateX(-50%)',
        } : {
          bottom: 'calc(7% - 50px)',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <h1
          className="font-display font-bold tracking-widest transition-all duration-500"
          style={{
            fontSize: isMobile ? (isExpanded ? '1.8rem' : '2rem') : (isExpanded ? '2.4rem' : '2.8rem'),
            background: 'radial-gradient(ellipse at center, hsl(20, 100%, 22%) 0%, hsl(15, 90%, 15%) 50%, hsl(10, 80%, 10%) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: `
              drop-shadow(0 0 2px rgba(255, 255, 255, 0.9))
              drop-shadow(0 0 6px rgba(255, 255, 255, 0.7))
              drop-shadow(0 0 12px rgba(255, 240, 200, 0.6))
              drop-shadow(0 0 20px rgba(255, 200, 100, 0.5))
              drop-shadow(0 0 35px rgba(255, 150, 50, 0.4))
            `,
            letterSpacing: '0.3em',
          }}
        >
          ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ
        </h1>
        <p
          className="tracking-widest uppercase font-semibold transition-opacity duration-500"
          style={{
            fontSize: isMobile ? '0.45rem' : '0.55rem',
            color: 'rgba(255, 200, 100, 0.8)',
            letterSpacing: '0.8em',
            marginTop: '-5px',
            opacity: isExpanded ? 0 : 1,
            textShadow: '0 0 10px rgba(255, 100, 0, 0.5)',
          }}
        >
          ㅤㅤㅤㅤㅤㅤㅤㅤㅤ
        </p>
      </div>

      {/* Sun Component with State Control */}
      <Sun isExpanded={isExpanded} onToggle={handleToggle} isMobile={isMobile} />

      {/* Planets Container - Expands/Moves away when Sun is active */}
      <div
        className={`absolute inset-0 transition-transform duration-1000 ease-in-out pointer-events-none ${isMobile ? '' : ''}`}
        style={isMobile ? {} : {
          transform: isExpanded ? 'scale(1.3) translateY(-10%)' : 'scale(1)', // Move planets back/up slightly
          opacity: isExpanded ? 0.6 : 1, // Fade them out slightly to focus on asteroids
          filter: isExpanded ? 'blur(1px)' : 'none',
          transformOrigin: '50% 100%'
        }}
      >
        <div className="pointer-events-auto">
          {isMobile ? (
            // Mobile: Show only current planet
            <Planet
              key={planets[currentPlanetIndex].name}
              {...planets[currentPlanetIndex]}
              index={currentPlanetIndex}
              isMobile={isMobile}
              isOrbiting={isOrbiting}
              orbitDirection={orbitDirection}
            />
          ) : (
            // Desktop: Show all planets
            planets.map((planet, index) => (
              <Planet key={planet.name} {...planet} index={index} isMobile={isMobile} />
            ))
          )}
        </div>
      </div>

      {/* New Asteroid Belt - Appears only when Sun is expanded - Hidden in mobile */}
      {!isMobile && (
        <div
          className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${isExpanded ? 'opacity-100' : 'opacity-0'}`}
          style={{ zIndex: 20 }}
        >
          <div className="pointer-events-none">
            {/* Asteroid 1 - MINING */}
            <Asteroid
              size={50}
              orbitRadius={350}
              orbitDuration={25}
              startAngle={150}
              color="hsl(30, 40%, 40%)"
              glowColor="hsl(35, 80%, 60%)"
              label="MINING"
              icon={LayoutDashboard}
              active={isExpanded}
            />
            {/* Asteroid 2 - RESEARCH */}
            <Asteroid
              size={45}
              orbitRadius={350}
              orbitDuration={30}
              startAngle={120}
              color="hsl(25, 30%, 35%)"
              glowColor="hsl(30, 70%, 50%)"
              label="RESEARCH"
              icon={Search}
              active={isExpanded}
            />
            {/* Asteroid 3 - CREW */}
            <Asteroid
              size={55}
              orbitRadius={350}
              orbitDuration={28}
              startAngle={90}
              delay={-5}
              color="hsl(40, 20%, 30%)"
              glowColor="hsl(45, 60%, 40%)"
              label="CREW"
              icon={User}
              active={isExpanded}
            />
            {/* Asteroid 4 - SECURITY */}
            <Asteroid
              size={40}
              orbitRadius={350}
              orbitDuration={35}
              startAngle={60}
              color="hsl(20, 35%, 25%)"
              glowColor="hsl(25, 70%, 45%)"
              label="SECURITY"
              icon={LogIn}
              active={isExpanded}
            />
            {/* Asteroid 5 - SYSTEMS */}
            <Asteroid
              size={60}
              orbitRadius={350}
              orbitDuration={32}
              startAngle={30}
              color="hsl(15, 25%, 30%)"
              glowColor="hsl(20, 60%, 50%)"
              label="SYSTEMS"
              icon={Power}
              active={isExpanded}
            />
          </div>
        </div>
      )}

      {/* Mobile Navigation Controls */}
      {isMobile && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-6">
          <button
            onClick={prevPlanet}
            className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95"
            style={{
              boxShadow: '0 0 20px rgba(59, 130, 246, 0.5), 0 0 40px rgba(59, 130, 246, 0.3)',
            }}
          >
            <ChevronLeft size={28} color="white" strokeWidth={3} />
          </button>

          <div className="flex flex-col items-center">
            <span className="text-white text-lg font-bold tracking-wider" style={{ textShadow: '0 0 10px rgba(255, 255, 255, 0.5)' }}>
              {planets[currentPlanetIndex].name}
            </span>
            <span className="text-white/60 text-xs tracking-widest">
              {currentPlanetIndex + 1} / {planets.length}
            </span>
          </div>

          <button
            onClick={nextPlanet}
            className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95"
            style={{
              boxShadow: '0 0 20px rgba(59, 130, 246, 0.5), 0 0 40px rgba(59, 130, 246, 0.3)',
            }}
          >
            <ChevronRight size={28} color="white" strokeWidth={3} />
          </button>
        </div>
      )}

      {/* CSS for animations */}
      <style>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        /* 3D Rotation Keyframes for each planet */
        @keyframes spin3D-0 {
          0% {
            transform: rotateY(0deg) rotateX(15deg);
          }
          100% {
            transform: rotateY(360deg) rotateX(15deg);
          }
        }
        
        @keyframes spin3D-1 {
          0% {
            transform: rotateY(0deg) rotateX(20deg);
          }
          100% {
            transform: rotateY(360deg) rotateX(20deg);
          }
        }
        
        @keyframes spin3D-2 {
          0% {
            transform: rotateY(0deg) rotateX(10deg);
          }
          100% {
            transform: rotateY(360deg) rotateX(10deg);
          }
        }
        
        @keyframes spin3D-3 {
          0% {
            transform: rotateY(0deg) rotateX(25deg);
          }
          100% {
            transform: rotateY(360deg) rotateX(25deg);
          }
        }
        
        @keyframes spin3D-4 {
          0% {
            transform: rotateY(0deg) rotateX(12deg);
          }
          100% {
            transform: rotateY(360deg) rotateX(12deg);
          }
        }
        
        @keyframes planetGlow {
          0%, 100% {
            opacity: 0.8;
          }
          50% {
            opacity: 1;
          }
        }
        
        @keyframes cloudDrift {
          0% {
            opacity: 0.8;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0.8;
          }
        }
        
        @keyframes twinkle {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};
