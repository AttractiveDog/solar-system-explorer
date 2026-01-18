import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Planet3DProps {
  size: number;
  color: string;
  glowColor: string;
  texture?: string;
  rotationSpeed: number;
  discovered: boolean;
}

export const Planet3D = ({
  size,
  color,
  glowColor,
  texture,
  rotationSpeed,
  discovered,
}: Planet3DProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const planetMeshRef = useRef<THREE.Mesh | null>(null);
  const animationFrameRef = useRef<number>(0);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Create camera
    const camera = new THREE.PerspectiveCamera(
      50,
      1, // aspect ratio (will be square)
      0.1,
      1000
    );
    camera.position.z = size * 2.5;
    cameraRef.current = camera;

    // Create renderer
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(size, size);
    renderer.setPixelRatio(window.devicePixelRatio);
    rendererRef.current = renderer;
    containerRef.current.appendChild(renderer.domElement);

    // Create sphere geometry
    const geometry = new THREE.SphereGeometry(size / 2, 64, 64);

    // Create material
    let material: THREE.Material;
    
    if (texture) {
      const textureLoader = new THREE.TextureLoader();
      const planetTexture = textureLoader.load(texture);
      planetTexture.colorSpace = THREE.SRGBColorSpace;
      
      material = new THREE.MeshStandardMaterial({
        map: planetTexture,
        roughness: 0.7,
        metalness: 0.1,
      });
    } else {
      material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(color),
        roughness: 0.7,
        metalness: 0.1,
      });
    }

    // Create mesh
    const planet = new THREE.Mesh(geometry, material);
    planetMeshRef.current = planet;
    scene.add(planet);

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(-5, 3, 5);
    scene.add(directionalLight);

    // Add point light for glow effect
    const glowLight = new THREE.PointLight(new THREE.Color(glowColor), 0.5, size * 3);
    glowLight.position.set(0, 0, 0);
    scene.add(glowLight);

    // Animation loop
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);

      if (planetMeshRef.current) {
        // Rotate the planet
        planetMeshRef.current.rotation.y += rotationSpeed * 0.01;
        planetMeshRef.current.rotation.x = Math.PI * 0.1; // Slight tilt
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      geometry.dispose();
      if (material) material.dispose();
      renderer.dispose();
    };
  }, [size, color, glowColor, texture, rotationSpeed]);

  return (
    <div
      ref={containerRef}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        filter: `drop-shadow(0 0 ${size * 0.5}px ${glowColor})`,
        opacity: discovered ? 1 : 0.6,
      }}
    />
  );
};
