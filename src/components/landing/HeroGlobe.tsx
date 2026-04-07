'use client';

/**
 * HeroGlobe — Cinematic 3D Earth for MŪSA Landing Page
 *
 * A stunning, slowly rotating Earth with:
 * - NASA Blue Marble texture with automatic fallback to procedural canvas
 * - Cloud layer with semi-transparency and independent rotation
 * - Multi-layer atmosphere glow
 * - Golden museum glow sprites
 * - Deep multi-layer star field
 *
 * Non-interactive — purely atmospheric for the hero section.
 *
 * Responsive: Desktop (≥1024px) | Landscape (568-1023px) | Portrait (320-567px)
 */

import { useRef, useEffect, useCallback } from 'react';
import { MUSEUMS } from '@/data/museums/museums';

function latLngToVector3(lat: number, lng: number, radius: number): [number, number, number] {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  return [x, y, z];
}

/**
 * Generate a procedural Earth texture on a Canvas.
 * No external dependencies — draws realistic-looking continents with
 * gradient oceans, terrain colors, and ice caps.
 */
function createEarthCanvas(size: number = 2048): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size / 2;
  const ctx = canvas.getContext('2d')!;

  // Deep ocean base
  const oceanGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
  oceanGrad.addColorStop(0, '#0a1628');
  oceanGrad.addColorStop(0.15, '#0d2040');
  oceanGrad.addColorStop(0.5, '#0f2a4a');
  oceanGrad.addColorStop(0.85, '#0d2040');
  oceanGrad.addColorStop(1, '#0a1628');
  ctx.fillStyle = oceanGrad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw approximate continents using paths
  ctx.fillStyle = '#1a3a20';
  const w = canvas.width;
  const h = canvas.height;

  // Helper: draw an elliptical landmass
  const drawLand = (cx: number, cy: number, rx: number, ry: number, color: string, rotation: number = 0) => {
    ctx.save();
    ctx.translate(cx * w, cy * h);
    ctx.rotate(rotation);
    ctx.beginPath();
    ctx.ellipse(0, 0, rx * w, ry * h, 0, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.restore();
  };

  // Africa
  drawLand(0.53, 0.42, 0.04, 0.08, '#1e4225');
  drawLand(0.535, 0.52, 0.035, 0.1, '#2a4a20');
  drawLand(0.55, 0.35, 0.03, 0.04, '#1e4225'); // North Africa
  drawLand(0.52, 0.6, 0.02, 0.03, '#2a4a20');

  // Europe
  drawLand(0.51, 0.28, 0.04, 0.04, '#1a3820');
  drawLand(0.49, 0.3, 0.03, 0.03, '#1e4225');
  drawLand(0.54, 0.25, 0.02, 0.03, '#1a3820'); // Scandinavia
  drawLand(0.48, 0.32, 0.015, 0.02, '#1e4225'); // Iberia
  drawLand(0.505, 0.32, 0.015, 0.015, '#1e4225'); // Italy

  // Asia
  drawLand(0.62, 0.28, 0.08, 0.06, '#1a3a20');
  drawLand(0.68, 0.35, 0.06, 0.05, '#1e4225'); // China/SE Asia
  drawLand(0.72, 0.32, 0.04, 0.04, '#1a3820');
  drawLand(0.58, 0.25, 0.04, 0.04, '#1e4225'); // Russia west
  drawLand(0.65, 0.22, 0.06, 0.03, '#1a3a20'); // Siberia
  drawLand(0.75, 0.35, 0.015, 0.025, '#1e4225'); // Japan
  drawLand(0.7, 0.42, 0.02, 0.02, '#1e4225'); // SE Asia
  drawLand(0.63, 0.4, 0.03, 0.03, '#2a4a20'); // India

  // North America
  drawLand(0.18, 0.28, 0.06, 0.06, '#1e4225');
  drawLand(0.22, 0.35, 0.04, 0.04, '#1a3820');
  drawLand(0.15, 0.22, 0.04, 0.03, '#1a3a20'); // Canada
  drawLand(0.2, 0.42, 0.02, 0.02, '#2a4a20'); // Mexico
  drawLand(0.12, 0.18, 0.03, 0.02, '#1a3820'); // Alaska

  // South America
  drawLand(0.27, 0.52, 0.03, 0.06, '#1e4225');
  drawLand(0.25, 0.6, 0.025, 0.08, '#2a4a20');
  drawLand(0.28, 0.48, 0.02, 0.03, '#1a3a20');

  // Australia
  drawLand(0.78, 0.58, 0.03, 0.025, '#3a4a20');

  // Antarctica
  drawLand(0.5, 0.95, 0.15, 0.04, '#b8c8d8');

  // Greenland
  drawLand(0.37, 0.16, 0.02, 0.03, '#8aa8b8');

  // Ice caps (Arctic)
  drawLand(0.5, 0.04, 0.12, 0.025, '#a8b8c8');

  // Add subtle desert tones
  drawLand(0.53, 0.38, 0.04, 0.02, '#3a3a1e', 0.1); // Sahara
  drawLand(0.62, 0.35, 0.03, 0.02, '#3a3a1e'); // Middle East

  return canvas;
}

function createCloudCanvas(size: number = 1024): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size / 2;
  const ctx = canvas.getContext('2d')!;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw soft cloud patches
  for (let i = 0; i < 200; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const r = 10 + Math.random() * 60;
    const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
    grad.addColorStop(0, `rgba(255,255,255,${0.05 + Math.random() * 0.12})`);
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(x - r, y - r, r * 2, r * 2);
  }

  return canvas;
}

// Texture URLs (NASA public domain via CDN)
const EARTH_URLS = [
  'https://unpkg.com/three-globe@2.31.1/example/img/earth-blue-marble.jpg',
  'https://cdn.jsdelivr.net/npm/three-globe@2.31.1/example/img/earth-blue-marble.jpg',
];

export function HeroGlobe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<any>(null);
  const frameRef = useRef<number>(0);

  const initScene = useCallback(async () => {
    if (!containerRef.current) return;

    const THREE = await import('three');
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0.2, 3.0);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x334466, 0.6);
    scene.add(ambientLight);
    const sunLight = new THREE.DirectionalLight(0xffeedd, 1.8);
    sunLight.position.set(5, 3, 5);
    scene.add(sunLight);
    const fillLight = new THREE.DirectionalLight(0x4466aa, 0.2);
    fillLight.position.set(-3, -1, -3);
    scene.add(fillLight);

    // Stars (3 layers for depth)
    const addStars = (count: number, spread: number, size: number, opacity: number) => {
      const geo = new THREE.BufferGeometry();
      const pos = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const r = spread + Math.random() * spread;
        const t = Math.random() * Math.PI * 2;
        const p = Math.acos(2 * Math.random() - 1);
        pos[i * 3] = r * Math.sin(p) * Math.cos(t);
        pos[i * 3 + 1] = r * Math.sin(p) * Math.sin(t);
        pos[i * 3 + 2] = r * Math.cos(p);
      }
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      scene.add(new THREE.Points(geo, new THREE.PointsMaterial({
        color: 0xffffff, size, transparent: true, opacity, sizeAttenuation: true,
      })));
    };
    addStars(4000, 80, 0.08, 0.35);
    addStars(1500, 40, 0.15, 0.55);
    addStars(300, 20, 0.35, 0.85);

    const earthGroup = new THREE.Group();
    scene.add(earthGroup);

    // ── Earth texture: try CDN, fallback to procedural ──
    let earthTexture: any;
    const textureLoader = new THREE.TextureLoader();

    // Create procedural canvas texture as immediate fallback
    const proceduralCanvas = createEarthCanvas();
    const proceduralTexture = new THREE.CanvasTexture(proceduralCanvas);
    earthTexture = proceduralTexture;

    // Try loading NASA texture (non-blocking)
    const tryLoadTexture = (url: string): Promise<any> =>
      new Promise((resolve, reject) => {
        textureLoader.load(url, resolve, undefined, reject);
      });

    // Earth sphere with standard material (works with both textures)
    const earthGeo = new THREE.SphereGeometry(1, 96, 96);
    const earthMaterial = new THREE.MeshPhongMaterial({
      map: earthTexture,
      bumpScale: 0.02,
      specular: new THREE.Color(0x333333),
      shininess: 25,
    });
    const earth = new THREE.Mesh(earthGeo, earthMaterial);
    earthGroup.add(earth);

    // Attempt CDN textures in background — if successful, swap in
    (async () => {
      for (const url of EARTH_URLS) {
        try {
          const tex = await tryLoadTexture(url);
          tex.colorSpace = THREE.SRGBColorSpace;
          earthMaterial.map = tex;
          earthMaterial.needsUpdate = true;
          break;
        } catch {
          // Try next URL
        }
      }
    })();

    // Cloud layer
    const cloudCanvas = createCloudCanvas();
    const cloudTexture = new THREE.CanvasTexture(cloudCanvas);
    const clouds = new THREE.Mesh(
      new THREE.SphereGeometry(1.01, 64, 64),
      new THREE.MeshPhongMaterial({
        map: cloudTexture,
        transparent: true,
        opacity: 0.25,
        depthWrite: false,
        side: THREE.DoubleSide,
      })
    );
    earthGroup.add(clouds);

    // Also try loading cloud texture from CDN
    (async () => {
      const cloudUrls = [
        'https://unpkg.com/three-globe@2.31.1/example/img/earth-clouds.png',
        'https://cdn.jsdelivr.net/npm/three-globe@2.31.1/example/img/earth-clouds.png',
      ];
      for (const url of cloudUrls) {
        try {
          const tex = await tryLoadTexture(url);
          (clouds.material as any).map = tex;
          (clouds.material as any).needsUpdate = true;
          break;
        } catch { /* next */ }
      }
    })();

    // Inner atmosphere
    const innerAtmosMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal; varying vec3 vPosition;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }`,
      fragmentShader: `
        varying vec3 vNormal; varying vec3 vPosition;
        void main() {
          float rim = 1.0 - max(dot(vNormal, normalize(-vPosition)), 0.0);
          float glow = pow(rim, 4.0);
          gl_FragColor = vec4(vec3(0.3, 0.55, 1.0), glow * 0.4);
        }`,
      transparent: true, side: THREE.FrontSide, depthWrite: false,
    });
    earthGroup.add(new THREE.Mesh(new THREE.SphereGeometry(1.025, 64, 64), innerAtmosMat));

    // Outer atmosphere
    const outerAtmosMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal; varying vec3 vPosition;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }`,
      fragmentShader: `
        varying vec3 vNormal; varying vec3 vPosition;
        void main() {
          float rim = 1.0 - max(dot(vNormal, normalize(-vPosition)), 0.0);
          float glow = pow(rim, 5.0);
          gl_FragColor = vec4(vec3(0.2, 0.4, 0.9), glow * 0.25);
        }`,
      transparent: true, side: THREE.BackSide, depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    earthGroup.add(new THREE.Mesh(new THREE.SphereGeometry(1.12, 64, 64), outerAtmosMat));

    // Museum glow sprites
    const glowCanvas = document.createElement('canvas');
    glowCanvas.width = 64;
    glowCanvas.height = 64;
    const glowCtx = glowCanvas.getContext('2d')!;
    const grad = glowCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255, 220, 100, 1.0)');
    grad.addColorStop(0.2, 'rgba(210, 170, 60, 0.7)');
    grad.addColorStop(0.5, 'rgba(197, 147, 42, 0.2)');
    grad.addColorStop(1, 'rgba(197, 147, 42, 0.0)');
    glowCtx.fillStyle = grad;
    glowCtx.fillRect(0, 0, 64, 64);
    const glowTexture = new THREE.CanvasTexture(glowCanvas);

    const museumSprites: { sprite: any; phase: number }[] = [];
    MUSEUMS.forEach((museum, index) => {
      const [x, y, z] = latLngToVector3(museum.coordinates.lat, museum.coordinates.lng, 1.02);
      const spriteMat = new THREE.SpriteMaterial({
        map: glowTexture,
        color: 0xC5932A,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const sprite = new THREE.Sprite(spriteMat);
      sprite.position.set(x, y, z);
      sprite.scale.setScalar(0.04);
      earthGroup.add(sprite);
      museumSprites.push({ sprite, phase: index * 0.3 });
    });

    // Animation
    let time = 0;
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      time += 0.003;

      earthGroup.rotation.y = time * 0.25;
      earthGroup.rotation.x = 0.15 + Math.sin(time * 0.4) * 0.03;
      clouds.rotation.y = time * 0.06;

      museumSprites.forEach(({ sprite, phase }) => {
        const pulse = 0.7 + Math.sin(time * 2.5 + phase) * 0.3;
        sprite.material.opacity = pulse;
        sprite.scale.setScalar(0.035 + Math.sin(time * 2.5 + phase) * 0.008);
      });

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameRef.current);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  useEffect(() => {
    let cleanup: (() => void) | undefined;
    initScene().then((fn) => { cleanup = fn; });
    return () => { cleanup?.(); };
  }, [initScene]);

  return <div ref={containerRef} className="h-full w-full" aria-hidden="true" />;
}
