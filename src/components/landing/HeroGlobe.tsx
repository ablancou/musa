'use client';

/**
 * HeroGlobe — Cinematic 3D Earth for the Landing Page Hero
 *
 * A slowly rotating Earth with golden light beams emanating from
 * each museum location. No user interaction — purely atmospheric.
 * Designed to create a "wow" first impression.
 *
 * Responsive: Desktop (≥1024px) | Landscape (568-1023px) | Portrait (320-567px)
 *
 * Tech: Three.js procedural shaders (no textures), custom light beam geometry,
 * particle stars background. Zero external assets.
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
    camera.position.set(0, 0.3, 3.2);
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

    // ─── Stars Background ───
    const starsGeo = new THREE.BufferGeometry();
    const starsCount = 2000;
    const starPositions = new Float32Array(starsCount * 3);
    const starSizes = new Float32Array(starsCount);
    for (let i = 0; i < starsCount; i++) {
      const r = 50 + Math.random() * 200;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      starPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      starPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      starPositions[i * 3 + 2] = r * Math.cos(phi);
      starSizes[i] = 0.3 + Math.random() * 1.2;
    }
    starsGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starsGeo.setAttribute('size', new THREE.BufferAttribute(starSizes, 1));

    const starsMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.15,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
    });
    scene.add(new THREE.Points(starsGeo, starsMat));

    // ─── Earth with Procedural Shader ───
    const earthGeo = new THREE.SphereGeometry(1, 64, 64);
    const earthMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying vec2 vUv;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying vec2 vUv;

        // Simple procedural continents
        float continent(vec2 uv) {
          float lat = (uv.y - 0.5) * 3.14159;
          float lng = (uv.x - 0.5) * 6.28318;

          float land = 0.0;
          // Europe/Africa
          land += smoothstep(0.08, 0.0, length(vec2(lng - 0.15, lat - 0.7) * vec2(1.0, 0.8)));
          land += smoothstep(0.12, 0.0, length(vec2(lng - 0.1, lat - 0.3) * vec2(0.7, 1.0)));
          land += smoothstep(0.08, 0.0, length(vec2(lng - 0.15, lat + 0.1) * vec2(0.6, 1.0)));
          // Asia
          land += smoothstep(0.18, 0.0, length(vec2(lng - 0.8, lat - 0.6) * vec2(0.6, 0.8)));
          land += smoothstep(0.1, 0.0, length(vec2(lng - 1.2, lat - 0.5) * vec2(0.8, 1.0)));
          // Americas
          land += smoothstep(0.08, 0.0, length(vec2(lng + 1.2, lat - 0.7) * vec2(0.7, 1.0)));
          land += smoothstep(0.15, 0.0, length(vec2(lng + 1.0, lat - 0.2) * vec2(0.5, 1.0)));
          land += smoothstep(0.1, 0.0, length(vec2(lng + 0.8, lat + 0.3) * vec2(0.6, 1.0)));
          // Australia
          land += smoothstep(0.06, 0.0, length(vec2(lng - 1.6, lat + 0.4) * vec2(0.8, 0.7)));

          return clamp(land, 0.0, 1.0);
        }

        void main() {
          vec3 lightDir = normalize(vec3(1.0, 0.8, 0.6));
          float diff = max(dot(vNormal, lightDir), 0.0);
          float ambient = 0.08;

          float landMask = continent(vUv);

          vec3 oceanDeep = vec3(0.02, 0.04, 0.12);
          vec3 oceanLight = vec3(0.04, 0.08, 0.18);
          vec3 ocean = mix(oceanDeep, oceanLight, diff * 0.5);

          vec3 landDark = vec3(0.06, 0.12, 0.06);
          vec3 landLight = vec3(0.1, 0.2, 0.08);
          vec3 landColor = mix(landDark, landLight, diff);

          vec3 baseColor = mix(ocean, landColor, landMask);
          vec3 finalColor = baseColor * (ambient + diff * 0.9);

          // Rim glow (atmosphere)
          float rim = 1.0 - max(dot(vNormal, normalize(-vPosition)), 0.0);
          rim = pow(rim, 3.0);
          finalColor += vec3(0.15, 0.2, 0.4) * rim * 0.6;

          gl_FragColor = vec4(finalColor, 1.0);
        }
      `,
      transparent: false,
    });
    const earth = new THREE.Mesh(earthGeo, earthMat);
    scene.add(earth);

    // ─── Atmosphere Glow ───
    const atmosGeo = new THREE.SphereGeometry(1.08, 64, 64);
    const atmosMat = new THREE.ShaderMaterial({
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
          float glow = pow(rim, 4.0) * 0.8;
          vec3 color = vec3(0.3, 0.5, 1.0) * glow;
          gl_FragColor = vec4(color, glow * 0.5);
        }
      `,
      transparent: true,
      side: THREE.BackSide,
      depthWrite: false,
    });
    scene.add(new THREE.Mesh(atmosGeo, atmosMat));

    // ─── Museum Light Beams ───
    const goldColor = new THREE.Color(0xC4A265);
    const beamGroup = new THREE.Group();
    scene.add(beamGroup);

    MUSEUMS.forEach((museum) => {
      const [x, y, z] = latLngToVector3(
        museum.coordinates.lat,
        museum.coordinates.lng,
        1.0
      );

      // Museum point (glowing dot on the surface)
      const dotGeo = new THREE.SphereGeometry(0.012, 8, 8);
      const dotMat = new THREE.MeshBasicMaterial({ color: goldColor });
      const dot = new THREE.Mesh(dotGeo, dotMat);
      dot.position.set(x, y, z);
      beamGroup.add(dot);

      // Light beam (cylinder from surface outward)
      const beamHeight = 0.15 + Math.random() * 0.2;
      const beamGeo = new THREE.CylinderGeometry(0.003, 0.001, beamHeight, 6);
      const beamMat = new THREE.ShaderMaterial({
        vertexShader: `
          varying float vHeight;
          void main() {
            vHeight = position.y / ${beamHeight.toFixed(2)};
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying float vHeight;
          void main() {
            float alpha = (1.0 - vHeight) * 0.7;
            vec3 gold = vec3(0.769, 0.635, 0.396);
            gl_FragColor = vec4(gold, alpha);
          }
        `,
        transparent: true,
        depthWrite: false,
        side: THREE.DoubleSide,
      });

      const beam = new THREE.Mesh(beamGeo, beamMat);
      // Position beam at surface, pointing outward
      const normal = new THREE.Vector3(x, y, z).normalize();
      beam.position.copy(normal.clone().multiplyScalar(1.0 + beamHeight / 2));
      beam.quaternion.setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        normal
      );
      beamGroup.add(beam);

      // Glow particle at beam tip
      const glowGeo = new THREE.SphereGeometry(0.008, 6, 6);
      const glowMat = new THREE.MeshBasicMaterial({
        color: goldColor,
        transparent: true,
        opacity: 0.6,
      });
      const glow = new THREE.Mesh(glowGeo, glowMat);
      glow.position.copy(normal.clone().multiplyScalar(1.0 + beamHeight));
      beamGroup.add(glow);
    });

    // ─── Animation Loop ───
    let time = 0;
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      time += 0.003;

      // Slow rotation
      earth.rotation.y = time * 0.3;
      beamGroup.rotation.y = time * 0.3;

      // Gentle tilt oscillation
      const tilt = Math.sin(time * 0.5) * 0.05;
      earth.rotation.x = 0.15 + tilt;
      beamGroup.rotation.x = 0.15 + tilt;

      // Pulse the beam tips
      beamGroup.children.forEach((child: any, i: number) => {
        if (child.geometry?.type === 'SphereGeometry' && child.material?.opacity !== undefined) {
          child.material.opacity = 0.3 + Math.sin(time * 2 + i * 0.5) * 0.4;
        }
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
