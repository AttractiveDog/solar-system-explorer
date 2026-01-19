import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Sun3DProps {
  size: number;
  isExpanded: boolean;
  isHovered?: boolean;
}

export const Sun3D = ({ size, isExpanded, isHovered = false }: Sun3DProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sunMeshRef = useRef<THREE.Mesh | null>(null);
  const atmosphereRef = useRef<THREE.Mesh | null>(null);
  const animationFrameRef = useRef<number>(0);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Create camera
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 2000);
    camera.position.z = size * 1.5;

    // Create renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(size, size);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Cap pixel ratio for performance on large sizes
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('/sun-texture.png');
    texture.colorSpace = THREE.SRGBColorSpace;

    // Sun Geometry
    const geometry = new THREE.SphereGeometry(size / 2.2, 64, 64); // Slightly smaller than container to fit glow

    // Sun Material - Emissive for self-illumination
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      color: 0xffddaa, // Tint slightly warm
    });

    const sun = new THREE.Mesh(geometry, material);
    sunMeshRef.current = sun;
    scene.add(sun);

    // Sun Atmosphere (Glow)
    const atmosphereGeometry = new THREE.SphereGeometry((size / 2.2) * 1.2, 64, 64);
    const atmosphereMaterial = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 glowColor;
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.65 - dot(vNormal, vec3(0, 0, 1.0)), 2.5);
          gl_FragColor = vec4(glowColor, 1.0) * intensity * 2.8;
        }
      `,
      uniforms: {
        glowColor: { value: new THREE.Color(0xffaa00) },
      },
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
      depthWrite: false,
    });

    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    atmosphereRef.current = atmosphere;
    scene.add(atmosphere);

    // Add extra "Core" glow sprite for intense center brightness
    const spriteMaterial = new THREE.SpriteMaterial({
      map: new THREE.TextureLoader().load('/sun-texture.png'), // Reuse texture or just a gradient blob if we had one
      color: 0xffaa00,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.5,
    });
    const glowSprite = new THREE.Sprite(spriteMaterial);
    glowSprite.scale.set(size * 1.5, size * 1.5, 1);
    // scene.add(glowSprite); // Optional: might be too heavy or texture-y

    // Animation Loop
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);

      if (sunMeshRef.current) {
        sunMeshRef.current.rotation.y -= 0.001; // Slow rotation
        sunMeshRef.current.rotation.x = 0.05;
      }

      if (atmosphereRef.current) {
        // Atmosphere could pulsate slightly?
        // atmosphereRef.current.rotation.y -= 0.0005;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      atmosphereGeometry.dispose();
      atmosphereMaterial.dispose();
      renderer.dispose();
    };
  }, [size]);

  return (
    <div
      ref={containerRef}
      style={{
        width: size,
        height: size,
        // Add a CSS glow as well for the far-reaching light
        filter: isExpanded
          ? 'drop-shadow(0 0 60px rgba(255, 140, 0, 0.8)) drop-shadow(0 0 120px rgba(255, 100, 0, 0.5))'
          : isHovered
            ? 'drop-shadow(0 0 50px rgba(255, 140, 0, 0.9)) drop-shadow(0 0 80px rgba(255, 120, 0, 0.6)) brightness(1.1)'
            : 'drop-shadow(0 0 40px rgba(255, 140, 0, 0.6))',
        transition: 'filter 0.3s ease-in-out, transform 0.3s ease-in-out',
        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
      }}
    />
  );
};
