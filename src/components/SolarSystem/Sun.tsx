import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const Sun = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const coronaRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.05;
    }
    
    if (glowRef.current) {
      glowRef.current.scale.setScalar(1 + Math.sin(time * 2) * 0.03);
    }
    
    if (coronaRef.current) {
      coronaRef.current.rotation.z = time * 0.02;
      coronaRef.current.scale.setScalar(1.2 + Math.sin(time * 1.5) * 0.08);
    }
  });

  return (
    <group position={[0, -20, 0]}>
      {/* Main sun sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[10, 64, 64]} />
        <meshBasicMaterial color="#ff8800" />
      </mesh>
      
      {/* Hot core glow */}
      <mesh>
        <sphereGeometry args={[9.5, 32, 32]} />
        <meshBasicMaterial color="#ffcc00" />
      </mesh>
      
      {/* Inner glow layer 1 */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[11, 32, 32]} />
        <meshBasicMaterial
          color="#ff6600"
          transparent
          opacity={0.5}
          side={THREE.BackSide}
        />
      </mesh>
      
      {/* Outer corona layer */}
      <mesh ref={coronaRef}>
        <sphereGeometry args={[14, 32, 32]} />
        <meshBasicMaterial
          color="#ff4400"
          transparent
          opacity={0.2}
          side={THREE.BackSide}
        />
      </mesh>
      
      {/* Outer atmosphere */}
      <mesh>
        <sphereGeometry args={[18, 32, 32]} />
        <meshBasicMaterial
          color="#ff2200"
          transparent
          opacity={0.08}
          side={THREE.BackSide}
        />
      </mesh>
      
      {/* Point lights for illumination */}
      <pointLight color="#ff8c00" intensity={100} distance={150} decay={1.5} />
      <pointLight color="#ffaa00" intensity={50} distance={100} decay={2} />
    </group>
  );
};
