'use client';

/**
 * HeroGlobe — Cinematic Photorealistic 3D Earth for MŪSA Landing Page
 *
 * A stunning, slowly rotating Earth with:
 * - NASA Blue Marble texture (public domain) for photorealistic continents/oceans
 * - Cloud layer with semi-transparency and independent rotation
 * - Multi-layer atmosphere with Rayleigh scattering simulation
 * - Golden museum beams emanating from each museum location
 * - Pulsing glow tips on each beam
 * - Deep star field with varying sizes/brightness
 * - Night-side city lights simulation
 * - Specular ocean reflections
 *
 * Non-interactive — purely atmospheric for the hero section.
 *
 * Responsive: Desktop (≥1024px) | Landscape (568-1023px) | Portrait (320-567px)
 *
 * Textures: NASA Blue Marble (public domain), hosted on CDN.
 */

import { useRef, useEffect, useCallback } from 'react';
import { MUSEUMS } from '@/data/museums/museums';

// ─── Coordinate helpers ───
function latLngToVector3(lat: number, lng: number, radius: number): [number, number, number] {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  return [x, y, z];
}

// NASA / public domain texture URLs
const EARTH_TEXTURE_URL = 'https://unpkg.com/three-globe@2.31.1/example/img/earth-blue-marble.jpg';
const EARTH_NIGHT_URL = 'https://unpkg.com/three-globe@2.31.1/example/img/earth-night.jpg';
const CLOUD_TEXTURE_URL = 'https://unpkg.com/three-globe@2.31.1/example/img/earth-clouds.png';
const EARTH_BUMP_URL = 'https://unpkg.com/three-globe@2.31.1/example/img/earth-topology.png';

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

    // ─── Scene Setup ───
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
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const textureLoader = new THREE.TextureLoader();

    // ─── Ambient + Directional Light ───
    const ambientLight = new THREE.AmbientLight(0x333355, 0.4);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffeedd, 2.0);
    sunLight.position.set(5, 3, 5);
    scene.add(sunLight);

    // Subtle blue fill from opposite side
    const fillLight = new THREE.DirectionalLight(0x4466aa, 0.3);
    fillLight.position.set(-3, -1, -3);
    scene.add(fillLight);

    // ─── Stars Background (multi-layer) ───
    const createStarField = (count: number, spread: number, size: number, opacity: number) => {
      const geo = new THREE.BufferGeometry();
      const positions = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const r = spread + Math.random() * spread;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = r * Math.cos(phi);
      }
      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const mat = new THREE.PointsMaterial({
        color: 0xffffff,
        size,
        transparent: true,
        opacity,
        sizeAttenuation: true,
      });
      return new THREE.Points(geo, mat);
    };

    // Distant dim stars
    scene.add(createStarField(4000, 80, 0.08, 0.4));
    // Medium stars
    scene.add(createStarField(1500, 40, 0.15, 0.6));
    // Near bright stars
    scene.add(createStarField(300, 20, 0.35, 0.9));

    // ─── Earth Group (rotates together) ───
    const earthGroup = new THREE.Group();
    scene.add(earthGroup);

    // ─── Earth — Photorealistic with NASA Texture ───
    const earthGeo = new THREE.SphereGeometry(1, 128, 128);

    // Load textures
    const earthTexture = textureLoader.load(EARTH_TEXTURE_URL);
    earthTexture.colorSpace = THREE.SRGBColorSpace;

    const nightTexture = textureLoader.load(EARTH_NIGHT_URL);
    nightTexture.colorSpace = THREE.SRGBColorSpace;

    const bumpTexture = textureLoader.load(EARTH_BUMP_URL);

    // Custom shader for day/night blending with specular oceans
    const earthMat = new THREE.ShaderMaterial({
      uniforms: {
        dayTexture: { value: earthTexture },
        nightTexture: { value: nightTexture },
        bumpMap: { value: bumpTexture },
        sunDirection: { value: new THREE.Vector3(1, 0.5, 1).normalize() },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying vec2 vUv;
        varying vec3 vWorldNormal;
        varying vec3 vWorldPosition;

        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
          vUv = uv;
          vWorldNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
          vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D dayTexture;
        uniform sampler2D nightTexture;
        uniform sampler2D bumpMap;
        uniform vec3 sunDirection;

        varying vec3 vNormal;
        varying vec3 vPosition;
        varying vec2 vUv;
        varying vec3 vWorldNormal;
        varying vec3 vWorldPosition;

        void main() {
          vec3 normal = normalize(vNormal);
          vec3 worldNormal = normalize(vWorldNormal);

          // Day/night factor based on sun angle
          float sunDot = dot(worldNormal, sunDirection);
          float dayFactor = smoothstep(-0.15, 0.25, sunDot);

          // Sample textures
          vec3 dayColor = texture2D(dayTexture, vUv).rgb;
          vec3 nightColor = texture2D(nightTexture, vUv).rgb;

          // Boost night lights (city lights glow gold-warm)
          nightColor *= 1.8;
          nightColor = mix(nightColor, nightColor * vec3(1.2, 1.0, 0.7), 0.5);

          // Blend day and night
          vec3 baseColor = mix(nightColor, dayColor, dayFactor);

          // Diffuse lighting on day side
          float diffuse = max(dot(normal, normalize(vec3(1.0, 0.5, 1.0))), 0.0);
          baseColor *= (0.3 + diffuse * 0.7);

          // Specular highlight (ocean glint)
          vec3 viewDir = normalize(-vPosition);
          vec3 halfDir = normalize(normalize(vec3(1.0, 0.5, 1.0)) + viewDir);
          float spec = pow(max(dot(normal, halfDir), 0.0), 120.0);

          // Ocean areas are darker in the bump map
          float bumpVal = texture2D(bumpMap, vUv).r;
          float isOcean = 1.0 - smoothstep(0.0, 0.15, bumpVal);
          baseColor += vec3(0.9, 0.95, 1.0) * spec * 0.4 * isOcean * dayFactor;

          // Atmosphere rim on lit side
          float rim = 1.0 - max(dot(normal, viewDir), 0.0);
          rim = pow(rim, 3.5);
          baseColor += vec3(0.25, 0.4, 0.8) * rim * 0.5 * dayFactor;

          // Subtle warm rim on terminator
          float terminatorRim = smoothstep(0.0, 0.2, abs(sunDot)) * (1.0 - smoothstep(0.2, 0.5, abs(sunDot)));
          baseColor += vec3(0.6, 0.3, 0.1) * terminatorRim * rim * 0.3;

          gl_FragColor = vec4(baseColor, 1.0);
        }
      `,
    });

    const earth = new THREE.Mesh(earthGeo, earthMat);
    earthGroup.add(earth);

    // ─── Cloud Layer ───
    const cloudTexture = textureLoader.load(CLOUD_TEXTURE_URL);
    const cloudGeo = new THREE.SphereGeometry(1.012, 96, 96);
    const cloudMat = new THREE.MeshPhongMaterial({
      map: cloudTexture,
      transparent: true,
      opacity: 0.35,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    const clouds = new THREE.Mesh(cloudGeo, cloudMat);
    earthGroup.add(clouds);

    // ─── Inner Atmosphere Glow ───
    const innerAtmosGeo = new THREE.SphereGeometry(1.02, 96, 96);
    const innerAtmosMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          float rim = 1.0 - max(dot(vNormal, normalize(-vPosition)), 0.0);
          float glow = pow(rim, 5.0);
          vec3 color = vec3(0.3, 0.55, 1.0);
          gl_FragColor = vec4(color, glow * 0.35);
        }
      `,
      transparent: true,
      side: THREE.FrontSide,
      depthWrite: false,
    });
    earthGroup.add(new THREE.Mesh(innerAtmosGeo, innerAtmosMat));

    // ─── Outer Atmosphere Halo ───
    const outerAtmosGeo = new THREE.SphereGeometry(1.15, 64, 64);
    const outerAtmosMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          float rim = 1.0 - max(dot(vNormal, normalize(-vPosition)), 0.0);
          float glow = pow(rim, 6.0);
          vec3 color = vec3(0.2, 0.4, 0.9);
          gl_FragColor = vec4(color, glow * 0.2);
        }
      `,
      transparent: true,
      side: THREE.BackSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    earthGroup.add(new THREE.Mesh(outerAtmosGeo, outerAtmosMat));

    // ─── Museum Golden Beams ───
    const goldColor = new THREE.Color(0xC5932A);
    const beamGroup = new THREE.Group();
    earthGroup.add(beamGroup);

    const glowTips: { mesh: any; baseOpacity: number; phase: number }[] = [];

    MUSEUMS.forEach((museum, index) => {
      const [x, y, z] = latLngToVector3(
        museum.coordinates.lat,
        museum.coordinates.lng,
        1.0
      );
      const normal = new THREE.Vector3(x, y, z).normalize();

      // Museum surface dot
      const dotGeo = new THREE.SphereGeometry(0.008, 8, 8);
      const dotMat = new THREE.MeshBasicMaterial({ color: goldColor });
      const dot = new THREE.Mesh(dotGeo, dotMat);
      dot.position.set(x, y, z);
      beamGroup.add(dot);

      // Light beam
      const beamHeight = 0.08 + Math.random() * 0.12;
      const beamGeo = new THREE.CylinderGeometry(0.003, 0.0008, beamHeight, 6);
      const beamMat = new THREE.ShaderMaterial({
        vertexShader: `
          varying float vHeight;
          void main() {
            vHeight = (position.y + ${(beamHeight / 2).toFixed(4)}) / ${beamHeight.toFixed(4)};
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying float vHeight;
          void main() {
            float alpha = (1.0 - vHeight * 0.7) * 0.8;
            vec3 gold = vec3(0.773, 0.576, 0.165);
            vec3 white = vec3(1.0, 0.95, 0.85);
            vec3 color = mix(gold, white, vHeight * 0.5);
            gl_FragColor = vec4(color, alpha);
          }
        `,
        transparent: true,
        depthWrite: false,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
      });

      const beam = new THREE.Mesh(beamGeo, beamMat);
      beam.position.copy(normal.clone().multiplyScalar(1.0 + beamHeight / 2));
      beam.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), normal);
      beamGroup.add(beam);

      // Glow tip
      const glowGeo = new THREE.SphereGeometry(0.006, 8, 8);
      const glowMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(0xFFD700),
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending,
      });
      const glow = new THREE.Mesh(glowGeo, glowMat);
      glow.position.copy(normal.clone().multiplyScalar(1.0 + beamHeight));
      beamGroup.add(glow);

      glowTips.push({
        mesh: glow,
        baseOpacity: 0.5 + Math.random() * 0.3,
        phase: index * 0.4,
      });
    });

    // ─── Animation Loop ───
    let time = 0;
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      time += 0.003;

      // Earth slow rotation
      earthGroup.rotation.y = time * 0.25;

      // Gentle tilt
      earthGroup.rotation.x = 0.15 + Math.sin(time * 0.4) * 0.03;

      // Clouds rotate slightly faster than earth
      clouds.rotation.y = time * 0.06;

      // Pulse beam tips
      glowTips.forEach(({ mesh, baseOpacity, phase }) => {
        mesh.material.opacity = baseOpacity + Math.sin(time * 3 + phase) * 0.25;
        const scale = 1.0 + Math.sin(time * 3 + phase) * 0.3;
        mesh.scale.setScalar(scale);
      });

      renderer.render(scene, camera);
    };
    animate();

    // ─── Resize Handler ───
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

  return (
    <div
      ref={containerRef}
      className="h-full w-full"
      aria-hidden="true"
    />
  );
}
