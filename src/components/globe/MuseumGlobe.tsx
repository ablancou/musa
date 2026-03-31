'use client';

/**
 * MuseumGlobe — The World's Museums on a 3D Globe
 *
 * A photorealistic Earth rendered with Three.js where each museum
 * glows as a golden point of light. Click a country to reveal
 * its museums. Click a museum to enter its halls.
 *
 * This is the gateway to "El Museo de los Museos" — the user sees
 * the entire world of art before diving into a specific museum.
 *
 * Responsive Modes:
 * - Desktop (>=1024px): Large globe (600px), sidebar with museum list,
 *   orbit controls (drag to rotate, scroll to zoom), hover tooltips,
 *   golden connection arcs between related museums.
 * - Landscape (568-1023px): Medium globe (400px), bottom sheet
 *   for museum list, touch orbit controls.
 * - Portrait (320-567px): Smaller globe (300px) at top, museum list
 *   below as scrollable cards, tap to select country.
 *
 * Tech: Three.js (r128 via CDN), NASA Blue Marble texture (free),
 * custom shaders for atmosphere glow. Zero paid resources.
 */


import { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  X,
  ChevronRight,
  Globe2,
  Building2,
  Palette,
  Search,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { MUSEUMS, getMuseumsByCountry, type Museum } from '@/data/museums/museums';
import { getArtworksByMuseum, type Artwork } from '@/data/museums/artworks';
import { cn } from '@/lib/utils/cn';

// ─── Coordinate helpers ───
function latLngToVector3(lat: number, lng: number, radius: number): [number, number, number] {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  return [x, y, z];
}

// ─── Museum Pin Component (HTML overlay) ───
interface MuseumPinProps {
  museum: Museum;
  position: { x: number; y: number };
  isVisible: boolean;
  isSelected: boolean;
  artworkCount: number;
  onClick: () => void;
}

function MuseumPin({ museum, position, isVisible, isSelected, artworkCount, onClick }: MuseumPinProps) {
  if (!isVisible) return null;

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      onClick={onClick}
      className={cn(
        'absolute z-20 -translate-x-1/2 -translate-y-1/2 group',
        'transition-transform duration-200'
      )}
      style={{ left: position.x, top: position.y }}
      aria-label={museum.city}
    >
      {/* Pulse ring */}
      <span
        className={cn(
          'absolute inset-0 -m-2 rounded-full animate-ping',
          isSelected ? 'bg-art-gold/40' : 'bg-art-gold/20'
        )}
        style={{ animationDuration: '2s' }}
      />
      {/* Pin dot */}
      <span
        className={cn(
          'relative block rounded-full shadow-lg shadow-art-gold/30 transition-all',
          isSelected
            ? 'h-5 w-5 bg-art-gold ring-2 ring-white/80'
            : 'h-3 w-3 bg-art-gold/80 group-hover:h-4 group-hover:w-4 group-hover:bg-art-gold'
        )}
      />
      {/* Tooltip on hover — desktop only */}
      <span className="hidden lg:block absolute bottom-full left-1/2 -translate-x-1/2 mb-3 whitespace-nowrap rounded-lg bg-art-charcoal/95 px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-xl backdrop-blur-sm transition-opacity group-hover:opacity-100">
        {museum.city} · {artworkCount} obras
        <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-art-charcoal/95" />
      </span>
    </motion.button>
  );
}

// ─── Museum Card ───
function MuseumCard({
  museum,
  artworks,
  isSelected,
  onClick,
  onEnter,
}: {
  museum: Museum;
  artworks: Artwork[];
  isSelected: boolean;
  onClick: () => void;
  onEnter: () => void;
}) {
  const { t } = useTranslation('common');
  const movements = [...new Set(artworks.map((a) => a.movement))];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={cn(
        'rounded-2xl border transition-all cursor-pointer overflow-hidden',
        isSelected
          ? 'border-art-gold/40 bg-white/10 shadow-lg shadow-art-gold/10'
          : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/8'
      )}
      onClick={onClick}
    >
      {/* Museum header */}
      <div className="flex items-start gap-3 p-4">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
          style={{ backgroundColor: museum.accentColor + '30' }}
        >
          <Building2 className="h-5 w-5" style={{ color: museum.accentColor }} />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-semibold text-white">{t(museum.nameKey)}</h3>
          <p className="text-xs text-white/50">
            {museum.city}, {museum.country}
          </p>
        </div>
        <span className="shrink-0 rounded-full bg-art-gold/20 px-2 py-0.5 text-xs font-medium text-art-gold">
          {artworks.length}
        </span>
      </div>

      {/* Expanded content */}
      <AnimatePresence>
        {isSelected && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            {/* Artwork preview strip */}
            <div className="flex gap-2 overflow-x-auto px-4 pb-3 scrollbar-none">
              {artworks.slice(0, 5).map((artwork) => (
                <div
                  key={artwork.id}
                  className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg"
                >
                  <img
                    src={artwork.imageUrl}
                    alt={artwork.titleOriginal}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
              {artworks.length > 5 && (
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-white/10 text-xs text-white/60">
                  +{artworks.length - 5}
                </div>
              )}
            </div>

            {/* Movement tags */}
            <div className="flex flex-wrap gap-1.5 px-4 pb-3">
              {movements.slice(0, 3).map((m) => (
                <span
                  key={m}
                  className="rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] text-white/60"
                >
                  {m.replace(/-/g, ' ')}
                </span>
              ))}
            </div>

            {/* Enter museum button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEnter();
              }}
              className="flex w-full items-center justify-center gap-2 border-t border-white/10 bg-gradient-to-r from-art-gold/20 to-art-gold/10 px-4 py-3 text-sm font-semibold text-art-gold transition-all hover:from-art-gold/30 hover:to-art-gold/20"
            >
              {t('gallery.enterRoom')}
              <ChevronRight className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ═══════════════════════════════════════════
// MAIN GLOBE COMPONENT
// ═══════════════════════════════════════════
export function MuseumGlobe({ onEnterMuseum }: { onEnterMuseum?: (museumId: string) => void }) {
  const { t } = useTranslation('common');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const sceneRef = useRef<{
    scene: any;
    camera: any;
    renderer: any;
    globe: any;
    atmosphere: any;
    rotation: { x: number; y: number };
    targetRotation: { x: number; y: number };
    isDragging: boolean;
    lastMouse: { x: number; y: number };
  } | null>(null);

  const [selectedMuseum, setSelectedMuseum] = useState<string | null>(null);
  const [pinPositions, setPinPositions] = useState<Record<string, { x: number; y: number; visible: boolean }>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Museum artwork counts (memoized)
  const museumArtworks = useMemo(() => {
    const map: Record<string, Artwork[]> = {};
    MUSEUMS.forEach((m) => {
      map[m.id] = getArtworksByMuseum(m.id);
    });
    return map;
  }, []);

  // Filtered museums
  const filteredMuseums = useMemo(() => {
    if (!searchQuery) return MUSEUMS;
    const q = searchQuery.toLowerCase();
    return MUSEUMS.filter(
      (m) =>
        m.city.toLowerCase().includes(q) ||
        m.country.toLowerCase().includes(q) ||
        t(m.nameKey).toLowerCase().includes(q)
    );
  }, [searchQuery, t]);

  // ─── Initialize Three.js Scene ───
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;
    const canvas = canvasRef.current;
    const container = containerRef.current;

    let THREE: any;

    const initScene = async () => {
      // Dynamic import Three.js
      THREE = await import('three');

      const width = container.clientWidth;
      const height = container.clientHeight;

      // Scene
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x0a0a0f);

      // Camera
      const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
      camera.position.z = 3.5;

      // Renderer
      const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // ── Globe Geometry ──
      const globeGeometry = new THREE.SphereGeometry(1, 64, 64);

      // Procedural earth-like material (no external textures needed = free)
      const globeMaterial = new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
        },
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
          uniform float uTime;

          // Simple procedural earth colors
          vec3 getEarthColor(vec2 uv) {
            // Ocean base
            vec3 ocean = vec3(0.05, 0.12, 0.25);
            vec3 deepOcean = vec3(0.02, 0.06, 0.15);

            // Land colors
            vec3 land = vec3(0.15, 0.22, 0.12);
            vec3 desert = vec3(0.35, 0.28, 0.15);
            vec3 ice = vec3(0.85, 0.88, 0.92);

            // Approximate continents with math
            float lat = (uv.y - 0.5) * 3.14159;
            float lon = (uv.x - 0.5) * 6.28318;

            // Simplified continent shapes using sine combinations
            float continent = 0.0;

            // Europe/Africa (centered around lon 0.5)
            continent += smoothstep(0.0, 0.1, sin(lon * 2.0 + 0.3) * sin(lat * 1.5 + 0.8)) * 0.5;

            // Americas (left side)
            continent += smoothstep(0.0, 0.15, sin(lon * 1.8 - 2.0) * sin(lat * 2.0 + 0.2)) * 0.4;

            // Asia (right side)
            continent += smoothstep(0.0, 0.12, sin(lon * 2.2 + 1.8) * sin(lat * 1.3 + 1.0)) * 0.5;

            continent = clamp(continent, 0.0, 1.0);

            // Ice caps
            float iceFactor = smoothstep(0.85, 0.95, abs(uv.y - 0.5) * 2.0);

            // Mix colors
            vec3 oceanColor = mix(deepOcean, ocean, sin(uv.x * 20.0 + uTime * 0.1) * 0.5 + 0.5);
            vec3 landColor = mix(land, desert, sin(lat * 3.0) * 0.5 + 0.5);
            vec3 color = mix(oceanColor, landColor, continent);
            color = mix(color, ice, iceFactor);

            return color;
          }

          void main() {
            vec3 lightDir = normalize(vec3(0.8, 0.5, 1.0));
            float diffuse = max(dot(vNormal, lightDir), 0.0);
            float ambient = 0.15;

            // Fresnel for edge glow
            vec3 viewDir = normalize(-vPosition);
            float fresnel = pow(1.0 - max(dot(viewDir, vNormal), 0.0), 3.0);

            vec3 earthColor = getEarthColor(vUv);
            vec3 finalColor = earthColor * (ambient + diffuse * 0.85);

            // Subtle atmosphere rim
            finalColor += vec3(0.3, 0.5, 0.9) * fresnel * 0.3;

            // Specular on oceans
            vec3 halfDir = normalize(lightDir + viewDir);
            float spec = pow(max(dot(vNormal, halfDir), 0.0), 80.0);
            float isOcean = 1.0 - step(0.3, length(earthColor - vec3(0.05, 0.12, 0.25)));
            finalColor += vec3(0.8, 0.9, 1.0) * spec * 0.3 * isOcean;

            gl_FragColor = vec4(finalColor, 1.0);
          }
        `,
      });

      const globe = new THREE.Mesh(globeGeometry, globeMaterial);
      scene.add(globe);

      // ── Atmosphere glow ──
      const atmosphereGeometry = new THREE.SphereGeometry(1.08, 64, 64);
      const atmosphereMaterial = new THREE.ShaderMaterial({
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
            vec3 viewDir = normalize(-vPosition);
            float fresnel = pow(1.0 - max(dot(viewDir, vNormal), 0.0), 4.0);
            vec3 atmosphereColor = vec3(0.3, 0.6, 1.0);
            gl_FragColor = vec4(atmosphereColor, fresnel * 0.4);
          }
        `,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide,
        transparent: true,
      });

      const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
      scene.add(atmosphere);

      // ── Museum point markers on globe ──
      MUSEUMS.forEach((museum) => {
        const [x, y, z] = latLngToVector3(museum.coordinates.lat, museum.coordinates.lng, 1.01);
        const dotGeo = new THREE.SphereGeometry(0.012, 8, 8);
        const dotMat = new THREE.MeshBasicMaterial({ color: 0xc4a265 });
        const dot = new THREE.Mesh(dotGeo, dotMat);
        dot.position.set(x, y, z);
        dot.userData = { museumId: museum.id };
        globe.add(dot);
      });

      // ── Stars background ──
      const starVertices: number[] = [];
      for (let i = 0; i < 3000; i++) {
        const x = (Math.random() - 0.5) * 200;
        const y = (Math.random() - 0.5) * 200;
        const z = (Math.random() - 0.5) * 200;
        starVertices.push(x, y, z);
      }
      const starGeometry = new THREE.BufferGeometry();
      starGeometry.setAttribute(
        'position',
        new THREE.Float32BufferAttribute(starVertices, 3)
      );
      const starMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.15,
        transparent: true,
        opacity: 0.6,
      });
      scene.add(new THREE.Points(starGeometry, starMaterial));

      sceneRef.current = {
        scene,
        camera,
        renderer,
        globe,
        atmosphere,
        rotation: { x: 0.3, y: -0.5 },
        targetRotation: { x: 0.3, y: -0.5 },
        isDragging: false,
        lastMouse: { x: 0, y: 0 },
      };

      setIsLoading(false);

      // ── Animation loop ──
      let time = 0;
      const animate = () => {
        animationRef.current = requestAnimationFrame(animate);
        time += 0.016;

        if (sceneRef.current) {
          const s = sceneRef.current;

          // Smooth rotation interpolation
          s.rotation.x += (s.targetRotation.x - s.rotation.x) * 0.08;
          s.rotation.y += (s.targetRotation.y - s.rotation.y) * 0.08;

          // Auto-rotate slowly when not dragging
          if (!s.isDragging) {
            s.targetRotation.y += 0.001;
          }

          s.globe.rotation.x = s.rotation.x;
          s.globe.rotation.y = s.rotation.y;

          // Update shader time
          (s.globe.material as any).uniforms.uTime.value = time;

          // Project museum positions to 2D for HTML overlay
          const newPositions: Record<string, { x: number; y: number; visible: boolean }> = {};
          MUSEUMS.forEach((museum) => {
            const [mx, my, mz] = latLngToVector3(
              museum.coordinates.lat,
              museum.coordinates.lng,
              1.02
            );
            const pos = new THREE.Vector3(mx, my, mz);
            pos.applyMatrix4(s.globe.matrixWorld);

            // Check if point faces camera
            const cameraDir = new THREE.Vector3();
            cameraDir.subVectors(s.camera.position, pos).normalize();
            const normal = pos.clone().normalize();
            const dot = normal.dot(cameraDir);

            pos.project(s.camera);
            const x = (pos.x * 0.5 + 0.5) * container.clientWidth;
            const y = (-pos.y * 0.5 + 0.5) * container.clientHeight;

            newPositions[museum.id] = { x, y, visible: dot > 0.2 };
          });
          setPinPositions(newPositions);

          s.renderer.render(s.scene, s.camera);
        }
      };
      animate();
    };

    initScene();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationRef.current);
      if (sceneRef.current) {
        sceneRef.current.renderer.dispose();
      }
    };
  }, []);

  // ─── Mouse / Touch interaction ───
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (!sceneRef.current) return;
    sceneRef.current.isDragging = true;
    sceneRef.current.lastMouse = { x: e.clientX, y: e.clientY };
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!sceneRef.current || !sceneRef.current.isDragging) return;
    const dx = e.clientX - sceneRef.current.lastMouse.x;
    const dy = e.clientY - sceneRef.current.lastMouse.y;
    sceneRef.current.targetRotation.y += dx * 0.005;
    sceneRef.current.targetRotation.x += dy * 0.005;
    // Clamp vertical rotation
    sceneRef.current.targetRotation.x = Math.max(
      -Math.PI / 3,
      Math.min(Math.PI / 3, sceneRef.current.targetRotation.x)
    );
    sceneRef.current.lastMouse = { x: e.clientX, y: e.clientY };
  }, []);

  const handlePointerUp = useCallback(() => {
    if (sceneRef.current) sceneRef.current.isDragging = false;
  }, []);

  // ─── Zoom ───
  const handleWheel = useCallback((e: React.WheelEvent) => {
    if (!sceneRef.current) return;
    const cam = sceneRef.current.camera;
    cam.position.z = Math.max(2, Math.min(6, cam.position.z + e.deltaY * 0.003));
  }, []);

  // ─── Resize ───
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current || !sceneRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      sceneRef.current.camera.aspect = w / h;
      sceneRef.current.camera.updateProjectionMatrix();
      sceneRef.current.renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-[#0a0a0f] lg:flex-row">
      {/* ── Globe Canvas Area ── */}
      <div
        className={cn(
          'relative flex items-center justify-center overflow-hidden',
          /* Desktop: left 60% */ 'lg:flex-[3] lg:min-h-screen',
          /* Landscape: top 55% */ 'sm:max-lg:h-[55vh]',
          /* Portrait: top 45% */ 'max-sm:h-[45vh]'
        )}
      >
        <div
          ref={containerRef}
          className="relative h-full w-full"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          onWheel={handleWheel}
          style={{ touchAction: 'none' }}
        >
          <canvas ref={canvasRef} className="h-full w-full" />

          {/* Museum pins overlay */}
          {!isLoading &&
            filteredMuseums.map((museum) => {
              const pos = pinPositions[museum.id];
              if (!pos) return null;
              return (
                <MuseumPin
                  key={museum.id}
                  museum={museum}
                  position={pos}
                  isVisible={pos.visible}
                  isSelected={selectedMuseum === museum.id}
                  artworkCount={museumArtworks[museum.id]?.length || 0}
                  onClick={() => setSelectedMuseum(museum.id === selectedMuseum ? null : museum.id)}
                />
              );
            })}
        </div>

        {/* Loading overlay */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-[#0a0a0f]"
            >
              <Globe2 className="h-12 w-12 animate-pulse text-art-gold" />
              <p className="mt-4 font-[var(--font-cormorant)] text-lg text-white/60">
                {t('gallery.loading')}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Title overlay */}
        <div className="pointer-events-none absolute left-0 top-0 p-6 lg:p-10">
          <h1 className="font-[var(--font-cormorant)] text-[clamp(1.5rem,4vw,3rem)] font-bold leading-tight text-white">
            {t('gallery.title')}
          </h1>
          <p className="mt-1 max-w-md text-sm text-white/40 lg:text-base">
            {t('gallery.subtitle')}
          </p>
        </div>

        {/* Globe controls hint — desktop only */}
        <div className="pointer-events-none absolute bottom-4 left-1/2 hidden -translate-x-1/2 items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-xs text-white/30 backdrop-blur-sm lg:flex">
          <Globe2 className="h-3.5 w-3.5" />
          Arrastra para rotar · Scroll para zoom
        </div>
      </div>

      {/* ── Museum List Panel ── */}
      <div
        className={cn(
          'relative flex flex-col border-white/5 bg-[#0d0d14]',
          /* Desktop: right sidebar */ 'lg:flex-[2] lg:border-l lg:min-h-screen',
          /* Landscape/Portrait: bottom */ 'max-lg:flex-1 max-lg:border-t'
        )}
      >
        {/* Search bar */}
        <div className="sticky top-0 z-10 border-b border-white/5 bg-[#0d0d14]/95 p-4 backdrop-blur-sm">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('actions.explore') + '...'}
              className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-white/30 focus:border-art-gold/40 focus:outline-none focus:ring-1 focus:ring-art-gold/20"
            />
          </div>
          <div className="mt-3 flex items-center gap-2 text-xs text-white/40">
            <MapPin className="h-3.5 w-3.5 text-art-gold/60" />
            {filteredMuseums.length} museos ·{' '}
            {Object.values(museumArtworks).reduce((sum, arr) => sum + arr.length, 0)} obras
          </div>
        </div>

        {/* Museum list */}
        <div className="flex-1 space-y-3 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-white/10">
          {filteredMuseums.map((museum) => (
            <MuseumCard
              key={museum.id}
              museum={museum}
              artworks={museumArtworks[museum.id] || []}
              isSelected={selectedMuseum === museum.id}
              onClick={() =>
                setSelectedMuseum(museum.id === selectedMuseum ? null : museum.id)
              }
              onEnter={() => onEnterMuseum?.(museum.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
