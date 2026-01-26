import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Planet3DProps {
  size: number;
  color: string;
  glowColor: string;
  texture?: string;
  rotationSpeed: number;
  discovered: boolean;
  showGlow?: boolean; // Control atmosphere glow effect
  isHovered?: boolean; // Boost glow on hover
}

export const Planet3D = ({
  size,
  color,
  glowColor,
  texture,
  rotationSpeed,
  discovered,
  showGlow = true, // Default to showing glow
  isHovered = false,
}: Planet3DProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const planetMeshRef = useRef<THREE.Mesh | null>(null);
  const atmosphereMeshRef = useRef<THREE.Mesh | null>(null);
  const animationFrameRef = useRef<number>(0);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Create camera with better perspective
    const camera = new THREE.PerspectiveCamera(
      45, // Slightly narrower FOV for better detail
      1,
      0.1,
      1000
    );
    camera.position.z = size * 1.5;
    cameraRef.current = camera;

    // Create HD renderer with enhanced settings
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
      precision: 'highp', // High precision for HD quality
    });
    renderer.setSize(size, size);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Cap at 2x for performance
    renderer.toneMapping = THREE.ACESFilmicToneMapping; // Cinematic tone mapping
    renderer.toneMappingExposure = 1.2;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    rendererRef.current = renderer;
    containerRef.current.appendChild(renderer.domElement);

    // HD Sphere geometry with more segments for smoother surface
    const geometry = new THREE.SphereGeometry(
      size / 2,
      128,  // Increased segments for HD quality
      128,
      0,
      Math.PI * 2,
      0,
      Math.PI
    );
    geometry.computeVertexNormals();

    // Create material
    let material: THREE.Material;

    if (texture) {
      const textureLoader = new THREE.TextureLoader();
      const planetTexture = textureLoader.load(texture);
      planetTexture.colorSpace = THREE.SRGBColorSpace;

      // HD texture settings
      planetTexture.wrapS = THREE.RepeatWrapping;
      planetTexture.wrapT = THREE.RepeatWrapping;
      planetTexture.repeat.set(1, 1);
      planetTexture.offset.set(0, 0);

      // HD filtering with anisotropy for sharp textures at angles
      planetTexture.minFilter = THREE.LinearMipMapLinearFilter;
      planetTexture.magFilter = THREE.LinearFilter;
      planetTexture.generateMipmaps = true;
      planetTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
      planetTexture.needsUpdate = true;

      // Use MeshStandardMaterial for realistic lighting and detail
      material = new THREE.MeshStandardMaterial({
        map: planetTexture,
        roughness: 0.6,
        metalness: 0.1,
        envMapIntensity: 0.5,
      });
    } else {
      material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(color),
        emissive: new THREE.Color(color),
        emissiveIntensity: 0.6,
        roughness: 0.5,
        metalness: 0.2,
      });
    }

    // Create planet mesh
    const planet = new THREE.Mesh(geometry, material);
    planet.rotation.x = Math.PI * 0.1; // Slight tilt for visual interest
    planetMeshRef.current = planet;
    scene.add(planet);

    // Conditional atmosphere glow (only if showGlow is true) - SUBTLE
    if (showGlow) {
      // Inner atmosphere (close to planet surface) - More subtle
      const innerAtmoGeometry = new THREE.SphereGeometry((size / 2) * 1.04, 64, 64);
      const innerAtmoMaterial = new THREE.ShaderMaterial({
        vertexShader: `
          varying vec3 vNormal;
          varying vec3 vPosition;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            vPosition = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 glowColor;
          uniform float intensity;
          varying vec3 vNormal;
          void main() {
            float strength = pow(0.7 - dot(vNormal, vec3(0, 0, 1.0)), 2.0);
            vec3 glow = glowColor * strength * intensity;
            gl_FragColor = vec4(glow, strength * 0.6);
          }
        `,
        uniforms: {
          glowColor: { value: new THREE.Color(glowColor) },
          intensity: { value: isHovered ? 2.5 : 1.2 }, // Strong boost
        },
        blending: THREE.AdditiveBlending,
        side: THREE.FrontSide,
        transparent: true,
        depthWrite: false,
      });
      const innerAtmosphere = new THREE.Mesh(innerAtmoGeometry, innerAtmoMaterial);
      scene.add(innerAtmosphere);

      // Outer atmosphere (dramatic glow halo) - More subtle
      const outerAtmoGeometry = new THREE.SphereGeometry((size / 2) * 1.15, 64, 64);
      const outerAtmoMaterial = new THREE.ShaderMaterial({
        vertexShader: `
          varying vec3 vNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 glowColor;
          uniform float intensity;
          varying vec3 vNormal;
          void main() {
            float strength = pow(0.7 - dot(vNormal, vec3(0, 0, 1.0)), 2.8);
            vec3 glow = glowColor * strength * intensity;
            gl_FragColor = vec4(glow, strength * 0.5);
          }
        `,
        uniforms: {
          glowColor: { value: new THREE.Color(glowColor) },
          intensity: { value: isHovered ? 4.0 : 1.8 }, // Massive boost
        },
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide,
        transparent: true,
        depthWrite: false,
      });
      const outerAtmosphere = new THREE.Mesh(outerAtmoGeometry, outerAtmoMaterial);
      atmosphereMeshRef.current = outerAtmosphere;
      scene.add(outerAtmosphere);
    }

    // Enhanced lighting for cinematic look
    // Soft ambient for base illumination
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    // Key light (main sun-like illumination)
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.0);
    keyLight.position.set(-3, 2, 4);
    scene.add(keyLight);

    // Fill light (soften shadows)
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.8);
    fillLight.position.set(3, 0, 3);
    scene.add(fillLight);

    // Rim light (edge highlight with glow color)
    const rimLight = new THREE.DirectionalLight(new THREE.Color(glowColor), 1.2);
    rimLight.position.set(0, 2, -4);
    scene.add(rimLight);

    // Back fill (prevent pure black shadows)
    const backFill = new THREE.DirectionalLight(0xffffff, 0.3);
    backFill.position.set(0, -2, -3);
    scene.add(backFill);

    // Animation loop with smooth rotation
    let time = 0;
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      time += 0.016; // ~60fps time delta

      if (planetMeshRef.current) {
        // Smooth planet rotation
        planetMeshRef.current.rotation.y += rotationSpeed * 0.02;
        // Subtle wobble for realism
        planetMeshRef.current.rotation.x = Math.PI * 0.1 + Math.sin(time * 0.5) * 0.02;
      }

      // Subtle atmosphere pulse for glow effect
      if (atmosphereMeshRef.current) {
        const pulseScale = 1 + Math.sin(time * 2) * 0.01;
        atmosphereMeshRef.current.scale.setScalar(pulseScale);
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
  }, [size, color, glowColor, texture, rotationSpeed, showGlow, isHovered]);

  return (
    <div
      ref={containerRef}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        // Conditional glow effect via CSS - More subtle
        filter: showGlow ? `
          drop-shadow(0 0 ${size * 0.06}px ${glowColor}BB)
          drop-shadow(0 0 ${size * 0.12}px ${glowColor}77)
        ` : 'none',
        opacity: 1,
        pointerEvents: 'none',
      }}
    />
  );
};
