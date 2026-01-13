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

const Sun = () => {
  return (
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[90%]">
      {/* Sun glow layers */}
      <div
        className="absolute rounded-full animate-pulse"
        style={{
          width: '300px',
          height: '300px',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, hsla(35, 100%, 60%, 0.2) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          width: '200px',
          height: '200px',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, hsla(35, 100%, 55%, 0.4) 0%, transparent 60%)',
        }}
      />
      {/* Sun core */}
      <div
        className="relative rounded-full"
        style={{
          width: '1200px',
          height: '1200px',
          background: 'radial-gradient(circle at 30% 30%, hsl(45, 100%, 70%) 0%, hsl(35, 100%, 55%) 40%, hsl(25, 100%, 45%) 100%)',
          boxShadow: '0 0 60px 25px hsla(35, 100%, 50%, 0.6), 0 0 120px 50px hsla(35, 100%, 50%, 0.3)',
        }}
      >
        {/* Sun surface details */}
        <div
          className="absolute inset-0 rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle at 70% 60%, transparent 20%, hsla(20, 100%, 40%, 0.3) 100%)',
          }}
        />
      </div>
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
  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-[hsl(240,50%,5%)] via-[hsl(250,40%,4%)] to-[hsl(260,50%,8%)]">
      <Stars />
      <Sun />
      {planets.map((planet, index) => (
        <Planet key={planet.name} {...planet} index={index} />
      ))}
      
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
