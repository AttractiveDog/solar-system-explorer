import { useMemo } from 'react';
import * as THREE from 'three';

interface OrbitPathProps {
  radius: number;
  color?: string;
  opacity?: number;
}

export const OrbitPath = ({ radius, color = '#ffffff', opacity = 0.15 }: OrbitPathProps) => {
  const points = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const segments = 128;
    
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      pts.push(new THREE.Vector3(
        Math.sin(angle) * radius,
        -8 + Math.cos(angle) * radius * 0.3,
        Math.cos(angle) * radius * 0.4
      ));
    }
    
    return pts;
  }, [radius]);

  const lineGeometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [points]);

  return (
    <line>
      <bufferGeometry attach="geometry" {...lineGeometry} />
      <lineBasicMaterial
        attach="material"
        color={color}
        transparent
        opacity={opacity}
        linewidth={1}
      />
    </line>
  );
};
