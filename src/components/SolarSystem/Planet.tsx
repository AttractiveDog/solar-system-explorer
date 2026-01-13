import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Text, Billboard } from '@react-three/drei';

interface PlanetProps {
  name: string;
  color: string;
  size: number;
  orbitRadius: number;
  orbitSpeed: number;
  rotationSpeed: number;
  discovered: boolean;
  orbitOffset?: number;
  hasRings?: boolean;
  ringColor?: string;
  glowColor?: string;
  surfaceDetail?: 'rocky' | 'gaseous' | 'mysterious';
}

export const Planet = ({
  name,
  color,
  size,
  orbitRadius,
  orbitSpeed,
  rotationSpeed,
  discovered,
  orbitOffset = 0,
  hasRings = false,
  ringColor = '#888888',
  glowColor,
}: PlanetProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const planetRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (groupRef.current) {
      // Orbital motion around sun (positioned at bottom)
      const angle = time * orbitSpeed + orbitOffset;
      groupRef.current.position.x = Math.sin(angle) * orbitRadius;
      groupRef.current.position.z = Math.cos(angle) * orbitRadius * 0.5;
      groupRef.current.position.y = -5 + Math.cos(angle) * orbitRadius * 0.25;
    }
    
    if (planetRef.current) {
      // Axial rotation
      planetRef.current.rotation.y = time * rotationSpeed;
    }
    
    if (ringRef.current) {
      ringRef.current.rotation.z = time * 0.1;
    }
    
    if (atmosphereRef.current) {
      atmosphereRef.current.scale.setScalar(1 + Math.sin(time * 2) * 0.03);
    }
  });

  const effectiveGlow = glowColor || color;

  return (
    <group ref={groupRef}>
      {/* Planet core */}
      <mesh ref={planetRef}>
        <sphereGeometry args={[size, 64, 64]} />
        <meshStandardMaterial
          color={color}
          roughness={discovered ? 0.7 : 0.3}
          metalness={discovered ? 0.1 : 0.5}
          emissive={discovered ? '#000000' : color}
          emissiveIntensity={discovered ? 0 : 0.2}
        />
      </mesh>
      
      {/* Atmosphere glow */}
      <mesh ref={atmosphereRef}>
        <sphereGeometry args={[size * 1.15, 32, 32]} />
        <meshBasicMaterial
          color={effectiveGlow}
          transparent
          opacity={discovered ? 0.2 : 0.35}
          side={THREE.BackSide}
        />
      </mesh>
      
      {/* Rings for gas giants */}
      {hasRings && (
        <mesh ref={ringRef} rotation={[Math.PI / 2.2, 0, 0]}>
          <ringGeometry args={[size * 1.5, size * 2.3, 64]} />
          <meshBasicMaterial
            color={ringColor}
            transparent
            opacity={0.7}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
      
      {/* Planet label */}
      <Billboard position={[0, size + 1.5, 0]}>
        <Text
          fontSize={0.5}
          color={discovered ? "#ffffff" : "#9977cc"}
          anchorX="center"
          anchorY="middle"
        >
          {discovered ? name : "???"}
        </Text>
        {!discovered && (
          <Text
            fontSize={0.25}
            color="#7755aa"
            anchorX="center"
            anchorY="middle"
            position={[0, -0.45, 0]}
          >
            UNDISCOVERED
          </Text>
        )}
      </Billboard>
      
      {/* Point light for glow effect */}
      <pointLight 
        color={effectiveGlow} 
        intensity={discovered ? 3 : 5} 
        distance={15} 
        decay={2} 
      />
    </group>
  );
};
