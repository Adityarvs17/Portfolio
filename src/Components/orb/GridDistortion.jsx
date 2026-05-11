import { useRef, useEffect } from 'react';
import * as THREE from 'three';

const GridDistortion = ({
  grid = 15,
  mouse = 0.1,
  strength = 0.15,
  relaxation = 0.9,
  imageSrc,
  className = ''
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    renderer.setClearColor(0x000000, 0);
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1000);
    camera.position.z = 1;

    // Shader Uniforms
    const uniforms = {
      uTime: { value: 0 },
      uTexture: { value: null },
      uDataTexture: { value: null },
      uResolution: { value: new THREE.Vector2(container.offsetWidth, container.offsetHeight) }
    };

    // Load Image
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(imageSrc, (texture) => {
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      uniforms.uTexture.value = texture;
    });

    // Data Texture for distortion
    const size = grid;
    const data = new Float32Array(4 * size * size);
    for (let i = 0; i < size * size; i++) {
      data[i * 4] = 0;
      data[i * 4 + 1] = 0;
      data[i * 4 + 2] = 0;
      data[i * 4 + 3] = 0;
    }
    
    const dataTexture = new THREE.DataTexture(data, size, size, THREE.RGBAFormat, THREE.FloatType);
    dataTexture.needsUpdate = true;
    uniforms.uDataTexture.value = dataTexture;

    // Material
    const material = new THREE.ShaderMaterial({
      side: THREE.DoubleSide,
      uniforms,
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D uDataTexture;
        uniform sampler2D uTexture;
        varying vec2 vUv;
        void main() {
          vec2 uv = vUv;
          vec4 offset = texture2D(uDataTexture, vUv);
          // The magic distortion line:
          gl_FragColor = texture2D(uTexture, uv - 0.02 * offset.rg);
        }
      `
    });

    const geometry = new THREE.PlaneGeometry(2, 2, size - 1, size - 1);
    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    // Mouse Interaction
    const mouseState = { x: 0, y: 0, vX: 0, vY: 0 };
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1 - (e.clientY - rect.top) / rect.height;
      
      mouseState.vX = x - mouseState.x;
      mouseState.vY = y - mouseState.y;
      mouseState.x = x;
      mouseState.y = y;
    };
    
    // FIX: Listen to the window, not the container, so it pierces through the Lanyard Canvas
    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Relax the distortion back to 0
      const data = dataTexture.image.data;
      for (let i = 0; i < size * size; i++) {
        data[i * 4] *= relaxation;
        data[i * 4 + 1] *= relaxation;
      }

      // Add mouse influence
      const gridMouseX = size * mouseState.x;
      const gridMouseY = size * mouseState.y;
      const maxDist = size * mouse;

      for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
          const distSq = (gridMouseX - i) ** 2 + (gridMouseY - j) ** 2;
          if (distSq < maxDist ** 2) {
            const index = 4 * (i + size * j);
            const power = maxDist / Math.sqrt(distSq);
            // Apply distortion force
            data[index] += 100 * mouseState.vX * power * strength;
            data[index + 1] -= 100 * mouseState.vY * power * strength;
          }
        }
      }
      dataTexture.needsUpdate = true;
      renderer.render(scene, camera);
    };
    animate();

    // Resize Handler
    const handleResize = () => {
      const width = container.offsetWidth;
      const height = container.offsetHeight;
      renderer.setSize(width, height);
      uniforms.uResolution.value.set(width, height);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      
      // FIX: Ensure we remove from the window to prevent memory leaks
      window.removeEventListener('mousemove', handleMouseMove);
      
      renderer.dispose();
      // Safe cleanup
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [grid, mouse, strength, relaxation, imageSrc]);

  return <div ref={containerRef} className={`w-full h-full ${className}`} />;
};

export default GridDistortion;