import { useEffect, useState } from 'react';

const planets = [
  {
    name: 'TERRA',
    color: 'hsl(210, 100%, 65%)',
    glowColor: 'hsl(210, 100%, 70%)',
    size: 16,
    orbitRadius: 80,
    orbitDuration: 12,
    rotationDuration: 4,
    discovered: true,
  },
  {
    name: 'EMBER',
    color: 'hsl(20, 100%, 55%)',
    glowColor: 'hsl(20, 100%, 60%)',
    size: 12,
    orbitRadius: 120,
    orbitDuration: 18,
    rotationDuration: 3,
    discovered: true,
  },
  {
    name: 'AZURE',
    color: 'hsl(165, 100%, 42%)',
    glowColor: 'hsl(165, 100%, 50%)',
    size: 22,
    orbitRadius: 170,
    orbitDuration: 26,
    rotationDuration: 2,
    discovered: true,
    hasRings: true,
    ringColor: 'hsl(165, 80%, 60%)',
  },
  {
    name: 'PHANTOM-X',
    color: 'hsl(270, 60%, 25%)',
    glowColor: 'hsl(270, 60%, 40%)',
    size: 18,
    orbitRadius: 230,
    orbitDuration: 35,
    rotationDuration: 6,
    discovered: false,
  },
  {
    name: 'VOID-7',
    color: 'hsl(240, 40%, 12%)',
    glowColor: 'hsl(260, 50%, 30%)',
    size: 28,
    orbitRadius: 300,
    orbitDuration: 50,
    rotationDuration: 8,
    discovered: false,
    hasRings: true,
    ringColor: 'hsl(260, 40%, 25%)',
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
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[30%]">
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
          width: '100px',
          height: '100px',
          background: 'radial-gradient(circle at 30% 30%, hsl(45, 100%, 70%) 0%, hsl(35, 100%, 55%) 40%, hsl(25, 100%, 45%) 100%)',
          boxShadow: '0 0 40px 15px hsla(35, 100%, 50%, 0.6), 0 0 80px 30px hsla(35, 100%, 50%, 0.3)',
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
  index: number;
}

const Planet = ({
  color,
  glowColor,
  size,
  orbitRadius,
  orbitDuration,
  rotationDuration,
  discovered,
  hasRings,
  ringColor,
  index,
}: PlanetProps) => {
  return (
    <div
      className="absolute bottom-0 left-1/2"
      style={{
        width: `${orbitRadius * 2}px`,
        height: `${orbitRadius * 2}px`,
        marginLeft: `-${orbitRadius}px`,
        marginBottom: '-50px',
      }}
    >
      {/* Orbit path */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          border: `1px solid ${discovered ? 'hsla(210, 100%, 60%, 0.2)' : 'hsla(270, 60%, 40%, 0.15)'}`,
        }}
      />
      
      {/* Planet container - orbits around center */}
      <div
        className="absolute inset-0"
        style={{
          animation: `orbit ${orbitDuration}s linear infinite`,
          animationDelay: `${index * -5}s`,
        }}
      >
        {/* Planet positioned at top of orbit */}
        <div
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            top: '0px',
            marginTop: `-${size / 2}px`,
          }}
        >
          {/* Rings (if applicable) */}
          {hasRings && (
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                width: `${size * 2.2}px`,
                height: `${size * 0.6}px`,
                border: `2px solid ${ringColor}`,
                borderRadius: '50%',
                opacity: discovered ? 0.6 : 0.3,
                transform: 'translate(-50%, -50%) rotateX(75deg)',
              }}
            />
          )}
          
          {/* Planet body */}
          <div
            className="rounded-full relative overflow-hidden"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              background: `radial-gradient(circle at 30% 30%, ${color}, ${color}88)`,
              boxShadow: `0 0 ${size / 2}px ${size / 4}px ${glowColor}40, inset -${size / 4}px -${size / 4}px ${size / 2}px rgba(0,0,0,0.4)`,
              opacity: discovered ? 1 : 0.5,
              animation: `spin ${rotationDuration}s linear infinite`,
            }}
          >
            {/* Surface detail */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: discovered
                  ? 'linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%)'
                  : 'linear-gradient(135deg, transparent 40%, rgba(100,50,150,0.2) 50%, transparent 60%)',
              }}
            />
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
        @keyframes orbit {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
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
