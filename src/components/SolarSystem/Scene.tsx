import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Stars } from '@react-three/drei';
import { Suspense } from 'react';
import { Sun } from './Sun';
import { Planet } from './Planet';
import { OrbitPath } from './OrbitPath';

const planets = [
  {
    name: 'Codex',
    color: '#4a9eff',
    size: 1.2,
    orbitRadius: 15,
    orbitSpeed: 0.3,
    rotationSpeed: 1,
    discovered: true,
    orbitOffset: 0,
    glowColor: '#66bbff',
    surfaceDetail: 'rocky' as const,
  },
  {
    name: 'Cube',
    color: '#ff6b35',
    size: 0.9,
    orbitRadius: 20,
    orbitSpeed: 0.22,
    rotationSpeed: 0.8,
    discovered: true,
    orbitOffset: 2,
    glowColor: '#ff8855',
    surfaceDetail: 'rocky' as const,
  },
  {
    name: 'Finamics',
    color: '#00d4aa',
    size: 1.8,
    orbitRadius: 26,
    orbitSpeed: 0.15,
    rotationSpeed: 1.5,
    discovered: true,
    orbitOffset: 4,
    hasRings: true,
    ringColor: '#88ffdd',
    glowColor: '#44ffcc',
    surfaceDetail: 'gaseous' as const,
  },
  {
    name: 'unknown-1',
    color: '#4a1a6b',
    size: 1.4,
    orbitRadius: 33,
    orbitSpeed: 0.1,
    rotationSpeed: 0.5,
    discovered: false,
    orbitOffset: 1.5,
    glowColor: '#8844aa',
    surfaceDetail: 'mysterious' as const,
  },
  {
    name: 'unknown-2',
    color: '#1a1a3a',
    size: 2.2,
    orbitRadius: 42,
    orbitSpeed: 0.06,
    rotationSpeed: 0.3,
    discovered: false,
    orbitOffset: 3.5,
    hasRings: true,
    ringColor: '#332255',
    glowColor: '#5533aa',
    surfaceDetail: 'mysterious' as const,
  },
];

export const Scene = () => {
  return (
    <Canvas
      gl={{ antialias: true, alpha: false }}
      dpr={[1, 2]}
      style={{ background: 'linear-gradient(180deg, #0a0a15 0%, #050510 40%, #080412 100%)' }}
    >
      <Suspense fallback={null}>
        <PerspectiveCamera makeDefault position={[0, 8, 40]} fov={60} />
        <OrbitControls
          enablePan={false}
          minDistance={20}
          maxDistance={80}
          minPolarAngle={Math.PI * 0.2}
          maxPolarAngle={Math.PI * 0.65}
          autoRotate
          autoRotateSpeed={0.15}
        />

        {/* Ambient and directional lighting */}
        <ambientLight intensity={0.15} />
        <directionalLight position={[0, -10, 0]} intensity={0.3} color="#ff8800" />

        {/* Stars background using drei */}
        <Stars radius={200} depth={100} count={5000} factor={4} saturation={0.3} fade speed={0.5} />

        {/* Sun at bottom */}
        <Sun />

        {/* Orbit paths */}
        {planets.map((planet) => (
          <OrbitPath
            key={`orbit-${planet.name}`}
            radius={planet.orbitRadius}
            color={planet.discovered ? '#4488ff' : '#6633aa'}
            opacity={planet.discovered ? 0.2 : 0.1}
          />
        ))}

        {/* Planets */}
        {planets.map((planet) => (
          <Planet key={planet.name} {...planet} />
        ))}

        {/* Fog for depth */}
        <fog attach="fog" args={['#0a0a15', 60, 180]} />
      </Suspense>
    </Canvas>
  );
};
