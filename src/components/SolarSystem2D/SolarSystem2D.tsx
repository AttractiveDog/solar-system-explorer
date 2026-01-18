import { useEffect, useState } from 'react';

const planets = [
  {
    name: 'TERRA',
    color: 'hsl(210, 100%, 65%)',
    glowColor: 'hsl(210, 100%, 70%)',
    size: 120,
    orbitRadius: 200,
    orbitDuration: 12,
    rotationDuration: 4,
    discovered: true,
    texture: '/planet-terra.png',
  },
  {
    name: 'EMBER',
    color: 'hsl(0, 80%, 50%)',
    glowColor: 'hsl(0, 100%, 60%)',
    size: 120,
    orbitRadius: 300,
    orbitDuration: 18,
    rotationDuration: 3,
    discovered: true,
    texture: '/planet-ember.png',
  },
  {
    name: 'AZURE',
    color: 'hsl(165, 100%, 42%)',
    glowColor: 'hsl(165, 100%, 50%)',
    size: 110,
    orbitRadius: 400,
    orbitDuration: 26,
    rotationDuration: 2,
    discovered: true,
    hasRings: true,
    ringColor: 'hsl(165, 80%, 60%)',
    texture: '/planet-azure.png',
  },
  {
    name: 'PHANTOM-X',
    color: 'hsl(320, 100%, 70%)',
    glowColor: 'hsl(320, 100%, 80%)',
    size: 60,
    orbitRadius: 500,
    orbitDuration: 35,
    rotationDuration: 6,
    discovered: true,
    texture: '/planet-phantom.png',
  },
  {
    name: 'VOID-7',
    color: 'hsl(240, 40%, 12%)',
    glowColor: 'hsl(260, 50%, 30%)',
    size: 55,
    orbitRadius: 550,
    orbitDuration: 50,
    rotationDuration: 8,
    discovered: false,
    hasRings: true,
    ringColor: 'hsl(260, 40%, 25%)',
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

import { User, Search, LayoutDashboard, LogIn, Power } from 'lucide-react';

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
}

const Sun = ({ isExpanded, onToggle }: SunProps) => {
  return (
    <div
      onClick={onToggle}
      className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[90%] cursor-pointer"
      role="button"
      aria-label="Toggle navigation menu"
    >

      {/* Sun core - Visual Representation */}
      <div
        className="relative rounded-full transition-all duration-700 ease-in-out group"
        style={{
          width: '1200px',
          height: '1200px',
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
}: PlanetProps) => {
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
      className="absolute bottom-0 left-1/2"
      style={{
        width: `${ellipseWidth}px`,
        height: `${ellipseHeight}px`,
        marginLeft: `-${ellipseWidth / 2}px`,
        marginBottom: '0px',
      }}
    >
      {/* Elliptical orbit path using SVG */}
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

      {/* Inject keyframes for this planet */}
      <style>{generateKeyframes()}</style>

      {/* Planet container - orbits along ellipse */}
      <div
        className="absolute"
        style={{
          left: '0',
          top: '0',
          animation: `${animationName} ${orbitDuration}s linear infinite`,
          animationDelay: `${index * -5}s`,
          animationPlayState: isHovered ? 'paused' : 'running',
          zIndex: 10,
        }}
      >
        {/* Planet wrapper for centering */}
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => {
            console.log(`Clicked on planet: ${name}`);
            // Add your planet click logic here
          }}
          style={{
            position: 'relative',
            width: `${size}px`,
            height: `${size}px`,
            transform: `translate(-50%, -50%) scale(${isHovered ? 1.3 : 1})`,
            transition: 'transform 0.3s ease-in-out',
            cursor: 'pointer',
          }}
        >
          {/* Glow effect wrapper */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              filter: isHovered
                ? `drop-shadow(0 0 ${size * 1.5}px ${glowColor}) drop-shadow(0 0 ${size * 0.9}px ${glowColor}) drop-shadow(0 0 ${size * 2.4}px ${glowColor}88)`
                : `drop-shadow(0 0 ${size * 0.5}px ${glowColor}) drop-shadow(0 0 ${size * 0.3}px ${glowColor}) drop-shadow(0 0 ${size * 0.8}px ${glowColor}88)`,
              animation: 'planetGlow 3s ease-in-out infinite',
              transition: 'filter 0.3s ease-in-out',
            }}
          >
            {/* Rings (if applicable) - rendered behind */}
            {hasRings && (
              <div
                className="absolute"
                style={{
                  left: '50%',
                  top: '50%',
                  width: `${size * 2.2}px`,
                  height: `${size * 0.6}px`,
                  border: `3px solid ${ringColor}`,
                  borderRadius: '50%',
                  opacity: discovered ? 0.7 : 0.4,
                  transform: 'translate(-50%, -50%) rotateX(75deg)',
                  zIndex: -1,
                }}
              />
            )}

            {/* Planet body - main sphere */}
            <div
              className="rounded-full relative overflow-hidden"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                backgroundImage: texture ? `url(${texture})` : `radial-gradient(circle at 35% 30%, ${color}, ${color}dd 50%, ${color}88 100%)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                boxShadow: isHovered
                  ? `
                  0 0 ${size * 2.4}px ${size * 1.6}px ${glowColor}80,
                  0 0 ${size * 1.6}px ${size * 1.0}px ${glowColor},
                  0 0 ${size * 0.8}px ${size * 0.4}px ${glowColor}ff,
                  inset -${size * 0.2}px -${size * 0.2}px ${size * 0.4}px rgba(0,0,0,0.6),
                  inset ${size * 0.15}px ${size * 0.15}px ${size * 0.3}px rgba(255,255,255,0.1)
                `
                  : `
                  0 0 ${size * 1.2}px ${size * 0.8}px ${glowColor}80,
                  0 0 ${size * 0.8}px ${size * 0.5}px ${glowColor},
                  0 0 ${size * 0.4}px ${size * 0.2}px ${glowColor}ff,
                  inset -${size * 0.2}px -${size * 0.2}px ${size * 0.4}px rgba(0,0,0,0.6),
                  inset ${size * 0.15}px ${size * 0.15}px ${size * 0.3}px rgba(255,255,255,0.1)
                `,
                opacity: discovered ? 1 : 0.6,
                animation: `spin ${rotationDuration}s linear infinite`,
                animationPlayState: isHovered ? 'paused' : 'running',
                position: 'relative',
                zIndex: 1,
                transition: 'box-shadow 0.3s ease-in-out',
              }}
            >
              {/* Highlight for 3D sphere effect */}
              <div
                className="absolute rounded-full"
                style={{
                  top: '10%',
                  left: '15%',
                  width: '35%',
                  height: '35%',
                  background: 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.15) 40%, transparent 70%)',
                  filter: 'blur(8px)',
                }}
              />

              {/* Rim lighting on the edge */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: `radial-gradient(circle, transparent 60%, ${glowColor}22 85%, transparent 100%)`,
                }}
              />

              {/* Shadow terminator (day/night line) */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'linear-gradient(110deg, transparent 35%, rgba(0,0,0,0.25) 60%, rgba(0,0,0,0.5) 85%)',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const SolarSystem2D = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleToggle = () => {
    setIsAnimating(true);
    setIsExpanded(!isExpanded);
    setTimeout(() => setIsAnimating(false), 1000); // Match transition duration
  };

  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-[hsl(240,50%,5%)] via-[hsl(250,40%,4%)] to-[hsl(260,50%,8%)]">
      <Stars />

      {/* COMET Logo Button - Clickable to toggle asteroids */}
      <div
        onClick={handleToggle}
        className="fixed z-50 flex flex-col items-center justify-center transition-transform duration-500 ease-out cursor-pointer hover:scale-105"
        style={{
          bottom: 'calc(7% - 50px)',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <h1
          className="font-display font-bold tracking-widest transition-all duration-500"
          style={{
            fontSize: isExpanded ? '2.4rem' : '2.8rem',
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
          COMET
        </h1>
        <p
          className="tracking-widest uppercase font-semibold transition-opacity duration-500"
          style={{
            fontSize: '0.55rem',
            color: 'rgba(255, 200, 100, 0.8)',
            letterSpacing: '0.8em',
            marginTop: '-5px',
            opacity: isExpanded ? 0 : 1,
            textShadow: '0 0 10px rgba(255, 100, 0, 0.5)',
          }}
        >
          System Explorer
        </p>
      </div>

      {/* Sun Component with State Control */}
      <Sun isExpanded={isExpanded} onToggle={handleToggle} />

      {/* Planets Container - Expands/Moves away when Sun is active */}
      <div
        className="absolute inset-0 transition-transform duration-1000 ease-in-out pointer-events-none"
        style={{
          transform: isExpanded ? 'scale(1.3) translateY(-10%)' : 'scale(1)', // Move planets back/up slightly
          opacity: isExpanded ? 0.6 : 1, // Fade them out slightly to focus on asteroids
          filter: isExpanded ? 'blur(1px)' : 'none',
          transformOrigin: '50% 100%'
        }}
      >
        <div className="pointer-events-auto">
          {planets.map((planet, index) => (
            <Planet key={planet.name} {...planet} index={index} />
          ))}
        </div>
      </div>

      {/* New Asteroid Belt - Appears only when Sun is expanded */}
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
