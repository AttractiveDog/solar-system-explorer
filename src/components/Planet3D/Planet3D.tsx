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
    camera.position.z = size * 1.4;
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
      
      // Ensure texture wraps correctly if it's meant to be seamless, 
      // though for 2D icons this might not help much.
      // We apply the base color as well to tint/fill gaps if the texture has transparency issues.
      material = new THREE.MeshStandardMaterial({
        map: planetTexture,
        color: new THREE.Color(color), 
        roughness: 0.8,
        metalness: 0.1,
      });
    } else {
      material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(color),
        roughness: 0.7,
        metalness: 0.1,
      });
    }

    // Create black core to ensure opacity (obscures background text)
    const coreMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x000000,
      opacity: 1,
      transparent: false,
      side: THREE.FrontSide
    });
    const core = new THREE.Mesh(geometry, coreMaterial);
    core.scale.setScalar(0.98); // Slightly smaller to avoid z-fighting but large enough to block
    scene.add(core);

    // Create planet mesh
    const planet = new THREE.Mesh(geometry, material);
    planetMeshRef.current = planet;
    scene.add(planet);

    // Atmosphere Halo
    // Create a slightly larger sphere for atmosphere
    const atmosphereGeometry = new THREE.SphereGeometry((size / 2) * 1.2, 64, 64);
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
          // Calculate intensity based on the angle to the camera
          // For BackSide, normal points towards camera at center (dot=1) and perpendicular at edge (dot=0)
          // We want it to be bright near the planet (center-ish) and fade out at the edge (dot=0)
          float intensity = pow(0.6 * dot(vNormal, vec3(0, 0, 1.0)), 2.0);
          gl_FragColor = vec4(glowColor, 1.0) * intensity;
        }
      `,
      uniforms: {
        glowColor: { value: new THREE.Color(glowColor) },
      },
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide, // Render the inside of the larger sphere
      transparent: true,
      depthWrite: false,
    });

    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    scene.add(atmosphere);

    // Add lighting
    // AmbientLight provides base illumination
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4); 
    scene.add(ambientLight);

    // Main Directional Light (Sunlight)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(-5, 3, 5); // From top left front
    scene.add(directionalLight);

    // Fill Light to soften deep shadows
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.8);
    fillLight.position.set(5, 0, 5); // From right front
    scene.add(fillLight);

    // Rim Light (Backlight) for edge highlighting
    const rimLight = new THREE.SpotLight(new THREE.Color(glowColor), 3.0);
    rimLight.position.set(0, 5, -10); // Directly behind and above
    rimLight.lookAt(0, 0, 0);
    scene.add(rimLight);

    // Animation loop
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);

      if (planetMeshRef.current) {
        // Rotate the planet
        planetMeshRef.current.rotation.y += rotationSpeed * 0.005; // Slower, more majestic rotation
        planetMeshRef.current.rotation.x = Math.PI * 0.1; // Slight tilt
      }
      
      // Atmosphere doesn't necessarily need to rotate, but if we wanted moving clouds we'd do it here.

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
      coreMaterial.dispose();
      
      atmosphereGeometry.dispose();
      atmosphereMaterial.dispose();
      
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
        opacity: 1,
      }}
    />
  );
};
