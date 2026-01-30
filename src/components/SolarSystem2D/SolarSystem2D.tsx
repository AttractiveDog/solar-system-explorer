import { useEffect, useState, useRef } from 'react';
import { Planet3D } from '../Planet3D';
import { Sun3D } from '../Sun3D/Sun3D';
import { useNavigate } from 'react-router-dom';

const planets = [
  {
    name: 'TERRA',
    color: 'hsl(200, 80%, 55%)',      // Blue ocean
    glowColor: 'hsl(200, 90%, 60%)',  // Blue glow
    size: 180,
    orbitRadius: 300,
    orbitDuration: 30, // Slower
    rotationDuration: 8,
    discovered: true,
    texture: '/planet-terra.png',
    delay: 0, // Starts at 0
  },
  {
    name: 'EMBER',
    color: 'hsl(15, 85%, 45%)',       // Mars red-orange
    glowColor: 'hsl(20, 100%, 55%)',  // Orange-red glow
    size: 160,
    orbitRadius: 400,
    orbitDuration: 45, // Slower to separate
    rotationDuration: 6,
    discovered: true,
    texture: '/planet-ember.jpg',
    delay: -18, // Start almost halfway opposite
  },
  {
    name: 'AZURE',
    color: 'hsl(220, 80%, 50%)',      // Deep blue
    glowColor: 'hsl(210, 100%, 60%)', // Blue glow
    size: 200,
    orbitRadius: 500,
    orbitDuration: 62, // Different speed
    rotationDuration: 4,
    discovered: true,
    texture: '/planet-azure.jpg',
    delay: -12, // Start slightly offset
  },
  {
    name: 'PHANTOM-X',
    color: 'hsl(35, 50%, 55%)',       // Tan/Jupiter bands
    glowColor: 'hsl(30, 80%, 60%)',   // Warm tan-orange glow
    size: 120,
    orbitRadius: 600,
    orbitDuration: 78, // Slower
    rotationDuration: 12,
    discovered: true,
    texture: '/planet-phantom.jpg',
    delay: -40, // Far offset
  },
  {
    name: 'VOID-7',
    color: 'hsl(45, 40%, 50%)',       // Saturn gold/tan
    glowColor: 'hsl(45, 70%, 55%)',   // Golden glow
    size: 90,
    orbitRadius: 650,
    orbitDuration: 95,
    rotationDuration: 16,
    discovered: false,
    texture: '/planet-void.jpg',
    delay: -60, // Very far offset
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

import { User, Calendar, Users, LayoutDashboard, Power, ChevronLeft, ChevronRight, Trophy, X } from 'lucide-react';

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
  onClick?: () => void;
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
  active,
  onClick,
  onMouseEnter,
  onMouseLeave
}: AsteroidProps & { onMouseEnter?: () => void, onMouseLeave?: () => void }) => {
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
        style={{
          overflow: 'visible',
          opacity: active ? 0.2 : 0,
          transition: 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
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
        className="absolute left-0 bottom-0 transition-all ease-out"
        style={{
          transform: active ? `translate(${x}px, ${y}px)` : 'translate(0px, 0px)',
          opacity: active ? 1 : 0,
          transitionDuration: '0.8s',
          transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)', // Smooth bounce effect
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
          onMouseEnter={() => {
            setIsHovered(true);
            onMouseEnter?.();
          }}
          onMouseLeave={() => {
            setIsHovered(false);
            onMouseLeave?.();
          }}
          onClick={onClick}
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
  onOpen: () => void;
  onClose: () => void;
  isMobile: boolean;
}

const Sun = ({ isExpanded, onOpen, onClose, isMobile }: SunProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const sunSize = isMobile ? 400 : 1200;

  const handleMouseEnter = () => {
    if (!isMobile) {
      setIsHovered(true);
      onOpen();
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (!isMobile) {
      onClose();
    }
  };

  const handleClick = () => {
    if (isMobile) {
      onOpen();
    }
  };

  return (
    <div
      className={`absolute z-50 ${isMobile
        ? 'left-0 top-1/2 -translate-y-1/2 -translate-x-[75%]'
        : 'bottom-0 left-1/2 -translate-x-1/2 translate-y-[75%]'
        }`}
      style={{
        width: `${sunSize}px`,
        height: `${sunSize}px`,
        pointerEvents: 'none',
      }}
    >
      {/* Visual sun with rays */}
      <Sun3D size={sunSize} isExpanded={isExpanded} isHovered={isHovered} />
      {/* Invisible circular hover detection area - only covers sun core */}
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full cursor-pointer"
        style={{
          width: `${sunSize * 0.85}px`,
          height: `${sunSize * 0.85}px`,
          pointerEvents: 'auto',
          zIndex: 100,
        }}
        role="button"
        aria-label="Toggle navigation menu"
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
  delay?: number; // Custom start delay
  mobileState?: 'active' | 'enter-right' | 'enter-left' | 'exit-right' | 'exit-left';
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
  delay = 0, // Default delay
  mobileState = 'active',
}: PlanetProps) => {
  // Use fixed size for all planets in mobile, original size in desktop
  const displaySize = isMobile ? 130 : size;
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false); // Track click state for glow

  // Ellipse dimensions: wider than tall
  const ellipseWidth = orbitRadius * 5.5;
  const ellipseHeight = orbitRadius * 1.2;

  // Generate unique animation name for this planet
  const animationName = `ellipseOrbit-${index}`;

  // Calculate keyframe positions for smooth elliptical motion
  // For TERRA (index 0), add delay AFTER going off-screen (not while visible)
  const generateKeyframes = () => {
    const steps = 36;
    let keyframes = '@keyframes ' + animationName + ' {\n';

    // For TERRA: full visible orbit 0-85%, then off-screen pause 85-100%
    const orbitEndPercent = index === 0 ? 85 : 100;

    for (let i = 0; i <= steps; i++) {
      const percent = (i / steps) * orbitEndPercent;
      // Angle from 180deg (left) to 0deg (right) - follows the visible orbit line
      const angle = (180 - (i / steps) * 180) * (Math.PI / 180);

      const x = ellipseWidth / 2 + (ellipseWidth / 2) * Math.cos(angle);
      const y = ellipseHeight - ellipseHeight * Math.sin(angle);

      // Dynamic Z-Index: Objects lower on screen (higher y) should be in front
      // Base z-index 20, plus y-offset. Max y is ellipseHeight.
      // This ensures correct layering when orbits cross.
      const dynamicZ = Math.floor(y) + 20;

      keyframes += `  ${percent.toFixed(1)}% {\n`;
      keyframes += `    left: ${x}px;\n`;
      keyframes += `    top: ${y}px;\n`;
      keyframes += `    z-index: ${dynamicZ};\n`;
      keyframes += `  }\n`;
    }

    // For TERRA, continue past visible area then pause OFF-SCREEN
    if (index === 0) {
      // Continue the orbit curve beyond visible area (going right and down)
      const offAngle1 = -20 * (Math.PI / 180); // Past 0 degrees
      const offX1 = ellipseWidth / 2 + (ellipseWidth / 2) * Math.cos(offAngle1);
      const offY1 = ellipseHeight - ellipseHeight * Math.sin(offAngle1);
      const offZ1 = Math.floor(offY1) + 20;

      // Move off-screen smoothly (86-88%)
      keyframes += `  88% {\n`;
      keyframes += `    left: ${offX1}px;\n`;
      keyframes += `    top: ${offY1}px;\n`;
      keyframes += `    z-index: ${offZ1};\n`;
      keyframes += `  }\n`;

      // Stay off-screen for the pause (88-100% = ~2.9 seconds)
      keyframes += `  100% {\n`;
      keyframes += `    left: ${offX1}px;\n`;
      keyframes += `    top: ${offY1}px;\n`;
      keyframes += `    z-index: ${offZ1};\n`;
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
          // Mobile: center the planet with animation based on mobileState
          position: 'relative',
          zIndex: 10,
          transform: 'translate(0, 0)', // Default position

          // Apply animation based on state
          animation: mobileState === 'enter-right'
            ? 'mobileSlideInRight 1.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards'
            : mobileState === 'enter-left'
              ? 'mobileSlideInLeft 1.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards'
              : mobileState === 'exit-right'
                ? 'mobileSlideOutRight 1.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards'
                : mobileState === 'exit-left'
                  ? 'mobileSlideOutLeft 1.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards'
                  : 'none',
        } : {
          // Desktop: orbital motion
          left: '0',
          top: '0',
          animation: `${animationName} ${orbitDuration}s linear infinite`,
          animationDelay: `${delay}s`, // Use custom delay
          animationPlayState: isHovered ? 'paused' : 'running',
          // zIndex removed from here as it's controllable by keyframes now (except hover)
          zIndex: isHovered ? 1000 : 'auto', // Hover always on top
        }}
      >
        {/* Planet wrapper for centering */}
        <div
          onMouseEnter={() => !isMobile && setIsHovered(true)}
          onMouseLeave={() => !isMobile && setIsHovered(false)}
          onClick={(e) => {
            e.stopPropagation(); // Prevent bubbling issues
            console.log(`Clicked on planet: ${name}`);
            // Toggle clicked state for glow
            setIsClicked(true);
            setTimeout(() => setIsClicked(false), 2000);
          }}
          style={{
            position: 'relative',
            width: `${displaySize}px`,
            height: `${displaySize}px`,
            borderRadius: '50%', // Make hit area circular
            // overflow: 'hidden', // REMOVED to allow glow to spill outside
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
              borderRadius: '50%', // Ensure glow is circular
              // Apply scaling here instead so the visual grows but the hit-box stays the same
              transform: isHovered || isClicked ? 'scale(1.3)' : 'scale(1)',
              filter: isHovered || isClicked
                ? `drop-shadow(0 0 ${displaySize * 0.8}px ${glowColor}) drop-shadow(0 0 ${displaySize * 0.5}px ${glowColor}) drop-shadow(0 0 ${displaySize * 0.3}px ${glowColor}FF)`
                : `drop-shadow(0 0 ${displaySize * 0.15}px ${glowColor}99) drop-shadow(0 0 ${displaySize * 0.08}px ${glowColor}DD)`,
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
              isHovered={isHovered || isClicked}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export const SolarSystem2D = () => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentPlanetIndex, setCurrentPlanetIndex] = useState(0);
  const [outgoingPlanetIndex, setOutgoingPlanetIndex] = useState<number | null>(null);
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

  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleOpen = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsExpanded(true);
  };

  const handleClose = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsExpanded(false);
    }, 300); // Delay closing to allow moving mouse to asteroids
  };

  const nextPlanet = () => {
    if (isOrbiting) return;
    const nextIndex = (currentPlanetIndex + 1) % planets.length;

    setOutgoingPlanetIndex(currentPlanetIndex);
    setCurrentPlanetIndex(nextIndex);
    setIsOrbiting(true);
    setOrbitDirection('left'); // Moving to left (shows next)
    setTimeout(() => {
      setIsOrbiting(false);
      setOrbitDirection(null);
      setOutgoingPlanetIndex(null);
    }, 1500); // Duration of orbit animation
  };

  const prevPlanet = () => {
    if (isOrbiting) return;
    const prevIndex = (currentPlanetIndex - 1 + planets.length) % planets.length;

    setOutgoingPlanetIndex(currentPlanetIndex);
    setCurrentPlanetIndex(prevIndex);
    setIsOrbiting(true);
    setOrbitDirection('right'); // Moving to right (shows prev)

    setTimeout(() => {
      setIsOrbiting(false);
      setOrbitDirection(null);
      setOutgoingPlanetIndex(null);
    }, 1500); // Duration of orbit animation
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

      {/* Background Watermark */}
      <div
        className={`absolute inset-0 flex ${isMobile ? 'items-start pt-32' : 'items-center'} justify-center pointer-events-none select-none overflow-hidden`}
        style={{ zIndex: 0 }}
      >
        <span style={{
          fontFamily: 'Okaluera, sans-serif',
          fontSize: '25vw',
          color: '#FFFFFF',
        }}>
          COMET
        </span>
      </div>

      {/* COMET Logo */}
      <div
        className={`fixed z-50 flex flex-col items-center justify-center transition-transform duration-500 ease-out ${isMobile ? 'top-8' : ''
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
          ㅤㅤㅤㅤㅤㅤㅤㅤㅤ
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
      <Sun isExpanded={isExpanded} onOpen={handleOpen} onClose={handleClose} isMobile={isMobile} />

      {/* Planets Container - Expands/Moves away when Sun is active */}
      <div
        className={`absolute inset-0 transition-all ease-out pointer-events-none ${isMobile ? '' : ''}`}
        style={isMobile ? {} : {
          transform: isExpanded ? 'scale(1.3) translateY(-10%)' : 'scale(1)', // Move planets back/up slightly
          opacity: 1, // Keep planets solid
          filter: isExpanded ? 'blur(1px)' : 'none',
          transformOrigin: '50% 100%',
          transitionDuration: '0.8s',
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <div className="pointer-events-auto">
          {isMobile ? (
            // Mobile: Show current and outgoing planets
            <>
              {/* Outgoing Planet (Animating out) */}
              {outgoingPlanetIndex !== null && (
                <div key={`outgoing-${outgoingPlanetIndex}`} className="absolute inset-0 flex items-center justify-center">
                  <Planet
                    {...planets[outgoingPlanetIndex]}
                    index={outgoingPlanetIndex}
                    isMobile={isMobile}
                    mobileState={orbitDirection === 'left' ? 'exit-left' : 'exit-right'}
                  />
                </div>
              )}

              {/* Current Planet (Animating in or Static) */}
              <div key={`current-${currentPlanetIndex}`} className="absolute inset-0 flex items-center justify-center">
                <Planet
                  {...planets[currentPlanetIndex]}
                  index={currentPlanetIndex}
                  isMobile={isMobile}
                  mobileState={isOrbiting
                    ? (orbitDirection === 'left' ? 'enter-right' : 'enter-left')
                    : 'active'
                  }
                />
              </div>
            </>
          ) : (
            // Desktop: Show all planets
            planets.map((planet, index) => (
              <Planet key={planet.name} {...planet} index={index} isMobile={isMobile} />
            ))
          )}
        </div>
      </div>

      {/* Navigation Menu - Visible when Sun is expanded */}
      <div
        className={`absolute inset-0 transition-all duration-500 ease-out pointer-events-none ${isExpanded ? 'opacity-100' : 'opacity-0'
          }`}
        style={{ zIndex: 60 }}
      >
        {isMobile ? (
          /* Mobile Navigation Menu - Vertical Stack */
          isExpanded && (
            <div className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-black/80 backdrop-blur-md pointer-events-auto p-6 animate-in fade-in duration-300">
              <h2 className="text-2xl font-display text-white mb-8 tracking-widest border-b border-primary/50 pb-2">
                NAVIGATION
              </h2>
              <div className="flex flex-col gap-6 w-full max-w-xs">
                {[
                  { label: "DASHBOARD", icon: LayoutDashboard, path: "/dashboard", color: "hsl(30, 80%, 60%)" },
                  { label: "EVENTS", icon: Calendar, path: "/events", color: "hsl(30, 70%, 50%)" },
                  { label: "PROFILE", icon: User, path: "/profile", color: "hsl(45, 60%, 40%)" },
                  { label: "TEAM", icon: Users, path: "/team", color: "hsl(25, 70%, 45%)" },
                  { label: "LEADERBOARD", icon: Trophy, path: "/leaderboard", color: "hsl(20, 60%, 50%)" },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => navigate(item.path)}
                    className="flex items-center gap-4 w-full p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 active:scale-95 transition-all text-left group"
                  >
                    <div className="p-3 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
                      <item.icon size={24} style={{ color: item.color }} />
                    </div>
                    <span className="text-lg font-bold tracking-widest text-white group-hover:text-primary transition-colors">
                      {item.label}
                    </span>
                    <ChevronRight className="ml-auto text-white/30" />
                  </button>
                ))}
              </div>
              <button
                onClick={handleClose}
                className="mt-12 p-4 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all"
              >
                <X size={24} />
              </button>
            </div>
          )
        ) : (
          /* Desktop Asteroid Belt */
          <div>
            {/* Asteroid 1 - DASHBOARD */}
            <Asteroid
              size={70}
              orbitRadius={200}
              orbitDuration={25}
              startAngle={150}
              color="hsl(30, 40%, 40%)"
              glowColor="hsl(35, 80%, 60%)"
              label="DASHBOARD"
              icon={LayoutDashboard}
              active={isExpanded}
              onClick={() => navigate('/dashboard')}
              onMouseEnter={handleOpen}
              onMouseLeave={handleClose}
            />
            {/* Asteroid 2 - EVENTS */}
            <Asteroid
              size={70}
              orbitRadius={200}
              orbitDuration={30}
              startAngle={120}
              color="hsl(25, 30%, 35%)"
              glowColor="hsl(30, 70%, 50%)"
              label="EVENTS"
              icon={Calendar}
              active={isExpanded}
              onClick={() => navigate('/events')}
              onMouseEnter={handleOpen}
              onMouseLeave={handleClose}
            />
            {/* Asteroid 3 - PROFILE */}
            <Asteroid
              size={70}
              orbitRadius={200}
              orbitDuration={28}
              startAngle={90}
              delay={-5}
              color="hsl(40, 20%, 30%)"
              glowColor="hsl(45, 60%, 40%)"
              label="PROFILE"
              icon={User}
              active={isExpanded}
              onClick={() => navigate('/profile')}
              onMouseEnter={handleOpen}
              onMouseLeave={handleClose}
            />
            {/* Asteroid 4 - TEAM */}
            <Asteroid
              size={70}
              orbitRadius={200}
              orbitDuration={35}
              startAngle={60}
              color="hsl(20, 35%, 25%)"
              glowColor="hsl(25, 70%, 45%)"
              label="TEAM"
              icon={Users}
              active={isExpanded}
              onClick={() => navigate('/team')}
              onMouseEnter={handleOpen}
              onMouseLeave={handleClose}
            />
            {/* Asteroid 5 - LEADERBOARD */}
            <Asteroid
              size={70}
              orbitRadius={200}
              orbitDuration={32}
              startAngle={30}
              color="hsl(15, 25%, 30%)"
              glowColor="hsl(20, 60%, 50%)"
              label="LEADERBOARD"
              icon={Trophy}
              active={isExpanded}
              onClick={() => navigate('/leaderboard')}
              onMouseEnter={handleOpen}
              onMouseLeave={handleClose}
            />
          </div>
        )}
      </div>

      {/* Mobile Navigation Controls */}
      {isMobile && (
        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 flex items-center gap-8">
          <button
            onClick={prevPlanet}
            className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-white/20 active:scale-95 text-white/80"
          >
            <ChevronLeft size={24} />
          </button>

          <div className="flex flex-col items-center min-w-[120px]">
            <span className="text-white text-lg font-bold tracking-wider font-display drop-shadow-md">
              {planets[currentPlanetIndex].name}
            </span>
            <div className="flex gap-1 mt-1">
              {planets.map((_, i) => (
                <div
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${i === currentPlanetIndex ? 'bg-white scale-125' : 'bg-white/30'}`}
                />
              ))}
            </div>
          </div>

          <button
            onClick={nextPlanet}
            className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-white/20 active:scale-95 text-white/80"
          >
            <ChevronRight size={24} />
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
            filter: brightness(1);
          }
          50% {
             filter: brightness(1.1);
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
        
        /* Mobile Slide Animations with Depth */
        @keyframes mobileSlideInRight {
          from { transform: translateX(120%) scale(0.8); opacity: 0; filter: blur(4px); }
          to { transform: translateX(0) scale(1); opacity: 1; filter: blur(0); }
        }
        
        @keyframes mobileSlideInLeft {
          from { transform: translateX(-80vw) scale(0.3); opacity: 1; filter: blur(12px) brightness(0.4); }
          to { transform: translateX(0) scale(1); opacity: 1; filter: blur(0) brightness(1); }
        }
        
        @keyframes mobileSlideOutLeft {
          from { transform: translateX(0) scale(1); opacity: 1; filter: blur(0) brightness(1); }
          to { transform: translateX(-80vw) scale(0.3); opacity: 1; filter: blur(12px) brightness(0.4); }
        }
        
        @keyframes mobileSlideOutRight {
          from { transform: translateX(0) scale(1); opacity: 1; filter: blur(0); }
          to { transform: translateX(120%) scale(0.8); opacity: 0; filter: blur(4px); }
        }
      `}</style>
    </div>
  );
};
