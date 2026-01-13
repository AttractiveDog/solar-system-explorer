import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const Starfield = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const nebulaRef = useRef<THREE.Points>(null);

  // Generate random stars
  const [starPositions, starColors, starSizes] = useMemo(() => {
    const count = 3000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      // Distribute stars in a sphere around the scene
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 50 + Math.random() * 150;
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
      
      // Star colors - mostly white with some blue and yellow tints
      const colorType = Math.random();
      if (colorType < 0.7) {
        // White stars
        colors[i * 3] = 0.9 + Math.random() * 0.1;
        colors[i * 3 + 1] = 0.9 + Math.random() * 0.1;
        colors[i * 3 + 2] = 1;
      } else if (colorType < 0.85) {
        // Blue stars
        colors[i * 3] = 0.6;
        colors[i * 3 + 1] = 0.7;
        colors[i * 3 + 2] = 1;
      } else {
        // Yellow/orange stars
        colors[i * 3] = 1;
        colors[i * 3 + 1] = 0.8;
        colors[i * 3 + 2] = 0.5;
      }
      
      sizes[i] = Math.random() * 2 + 0.5;
    }
    
    return [positions, colors, sizes];
  }, []);

  // Generate nebula particles
  const [nebulaPositions, nebulaColors] = useMemo(() => {
    const count = 500;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      // Create clusters
      const clusterX = (Math.random() - 0.5) * 100;
      const clusterY = (Math.random() - 0.5) * 60;
      const clusterZ = -50 + Math.random() * -50;
      
      positions[i * 3] = clusterX + (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = clusterY + (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = clusterZ + (Math.random() - 0.5) * 30;
      
      // Purple and blue nebula colors
      const hue = Math.random() * 0.2 + 0.6; // Purple to blue range
      colors[i * 3] = hue < 0.7 ? 0.5 : 0.2;
      colors[i * 3 + 1] = 0.1 + Math.random() * 0.2;
      colors[i * 3 + 2] = 0.5 + Math.random() * 0.5;
    }
    
    return [positions, colors];
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (pointsRef.current) {
      pointsRef.current.rotation.y = time * 0.002;
    }
    
    if (nebulaRef.current) {
      nebulaRef.current.rotation.y = time * 0.001;
      nebulaRef.current.rotation.x = Math.sin(time * 0.0005) * 0.02;
    }
  });

  return (
    <>
      {/* Stars */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={starPositions.length / 3}
            array={starPositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={starColors.length / 3}
            array={starColors}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-size"
            count={starSizes.length}
            array={starSizes}
            itemSize={1}
          />
        </bufferGeometry>
        <shaderMaterial
          transparent
          depthWrite={false}
          vertexColors
          uniforms={{
            time: { value: 0 },
          }}
          vertexShader={`
            attribute float size;
            varying vec3 vColor;
            uniform float time;
            void main() {
              vColor = color;
              vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
              float twinkle = sin(time * 3.0 + position.x * 0.1 + position.y * 0.1) * 0.3 + 0.7;
              gl_PointSize = size * twinkle * (300.0 / -mvPosition.z);
              gl_Position = projectionMatrix * mvPosition;
            }
          `}
          fragmentShader={`
            varying vec3 vColor;
            void main() {
              float dist = length(gl_PointCoord - vec2(0.5));
              if (dist > 0.5) discard;
              float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
              gl_FragColor = vec4(vColor, alpha);
            }
          `}
        />
      </points>

      {/* Nebula */}
      <points ref={nebulaRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={nebulaPositions.length / 3}
            array={nebulaPositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={nebulaColors.length / 3}
            array={nebulaColors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={5}
          transparent
          opacity={0.3}
          vertexColors
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </>
  );
};
