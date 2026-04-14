'use client';

/**
 * MuseumGlobe — Interactive Photorealistic 3D Earth with Museum Markers
 *
 * A high-fidelity Earth rendered with Three.js where each museum
 * glows as a golden point of light. Click a museum to see details.
 * Drag to rotate, scroll to zoom.
 *
 * Visual features:
 * - NASA Blue Marble texture (public domain) for photorealistic look
 * - Cloud layer with independent rotation
 * - Day/night cycle with city lights on dark side
 * - Multi-layer atmosphere (inner glow + outer halo)
 * - Golden museum markers with pulse animation
 * - Specular ocean reflections
 * - Deep multi-layer star field
 *
 * Responsive Modes:
 * - Desktop (>=1024px): Large globe (60% width), sidebar with museum list
 * - Landscape (568-1023px): Medium globe (55vh), bottom sheet for list
 * - Portrait (320-567px): Smaller globe (45vh), museum list below
 *
 * Tech: Three.js, NASA Blue Marble texture, custom GLSL shaders.
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

// NASA texture URLs with fallback
const EARTH_URLS = [
  'https://unpkg.com/three-globe@2.31.1/example/img/earth-blue-marble.jpg',
  'https://cdn.jsdelivr.net/npm/three-globe@2.31.1/example/img/earth-blue-marble.jpg',
];

/** Procedural Earth canvas fallback */
function createEarthCanvas(size: number = 2048): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size / 2;
  const ctx = canvas.getContext('2d')!;
  const w = canvas.width, h = canvas.height;

  // Ocean
  const oceanGrad = ctx.createLinearGradient(0, 0, 0, h);
  oceanGrad.addColorStop(0, '#0a1628');
  oceanGrad.addColorStop(0.15, '#0d2040');
  oceanGrad.addColorStop(0.5, '#0f2a4a');
  oceanGrad.addColorStop(0.85, '#0d2040');
  oceanGrad.addColorStop(1, '#0a1628');
  ctx.fillStyle = oceanGrad;
  ctx.fillRect(0, 0, w, h);

  const drawLand = (cx: number, cy: number, rx: number, ry: number, color: string, rot: number = 0) => {
    ctx.save(); ctx.translate(cx * w, cy * h); ctx.rotate(rot);
    ctx.beginPath(); ctx.ellipse(0, 0, rx * w, ry * h, 0, 0, Math.PI * 2);
    ctx.fillStyle = color; ctx.fill(); ctx.restore();
  };

  // Africa
  drawLand(0.53, 0.42, 0.04, 0.08, '#1e4225');
  drawLand(0.535, 0.52, 0.035, 0.1, '#2a4a20');
  drawLand(0.55, 0.35, 0.03, 0.04, '#1e4225');
  // Europe
  drawLand(0.51, 0.28, 0.04, 0.04, '#1a3820');
  drawLand(0.49, 0.3, 0.03, 0.03, '#1e4225');
  drawLand(0.54, 0.25, 0.02, 0.03, '#1a3820');
  // Asia
  drawLand(0.62, 0.28, 0.08, 0.06, '#1a3a20');
  drawLand(0.68, 0.35, 0.06, 0.05, '#1e4225');
  drawLand(0.65, 0.22, 0.06, 0.03, '#1a3a20');
  drawLand(0.63, 0.4, 0.03, 0.03, '#2a4a20');
  // Americas
  drawLand(0.18, 0.28, 0.06, 0.06, '#1e4225');
  drawLand(0.22, 0.35, 0.04, 0.04, '#1a3820');
  drawLand(0.15, 0.22, 0.04, 0.03, '#1a3a20');
  drawLand(0.27, 0.52, 0.03, 0.06, '#1e4225');
  drawLand(0.25, 0.6, 0.025, 0.08, '#2a4a20');
  // Australia & ice
  drawLand(0.78, 0.58, 0.03, 0.025, '#3a4a20');
  drawLand(0.5, 0.95, 0.15, 0.04, '#b8c8d8');
  drawLand(0.5, 0.04, 0.12, 0.025, '#a8b8c8');
  drawLand(0.53, 0.38, 0.04, 0.02, '#3a3a1e', 0.1);

  return canvas;
}

function createCloudCanvas(size: number = 1024): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = size; canvas.height = size / 2;
  const ctx = canvas.getContext('2d')!;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < 200; i++) {
    const x = Math.random() * canvas.width, y = Math.random() * canvas.height;
    const r = 10 + Math.random() * 60;
    const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
    grad.addColorStop(0, `rgba(255,255,255,${0.05 + Math.random() * 0.12})`);
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = grad; ctx.fillRect(x - r, y - r, r * 2, r * 2);
  }
  return canvas;
}

// ─── Museum Pin Component (HTML overlay) ───
interface MuseumPinProps {
  museum: Museum;
  position: { x: number; y: number };
  isVisible: boolean;
  isSelected: boolean;
  isHovered: boolean;
  artworkCount: number;
  onClick: () => void;
  onHover: (hovering: boolean) => void;
  onEnter?: () => void;
  t: (key: string) => string;
}

function MuseumPin({ museum, position, isVisible, isSelected, isHovered, artworkCount, onClick, onHover, onEnter, t }: MuseumPinProps) {
  if (!isVisible) return null;

  return (
    <div
      className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
      style={{ left: position.x, top: position.y }}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
    >
      {/* Clickable dot */}
      <button
        onClick={onClick}
        className="group relative flex items-center justify-center"
        aria-label={museum.city}
      >
        {/* Pulse ring */}
        <span
          className={cn(
            'absolute inset-0 -m-2 rounded-full animate-ping',
            isSelected || isHovered ? 'bg-art-gold/40' : 'bg-art-gold/20'
          )}
          style={{ animationDuration: '2s' }}
        />
        {/* Pin dot */}
        <span
          className={cn(
            'relative block rounded-full shadow-lg shadow-art-gold/30 transition-all',
            isSelected || isHovered
              ? 'h-5 w-5 bg-art-gold ring-2 ring-white/80'
              : 'h-3 w-3 bg-art-gold/80'
          )}
        />
      </button>

      {/* Hover Card — appears on hover, desktop only */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 hidden w-56 lg:block"
          >
            <div className="rounded-xl bg-[#12121f]/95 p-3 shadow-2xl ring-1 ring-white/10 backdrop-blur-xl">
              <h4 className="truncate text-sm font-semibold text-white">
                {t(`museums:${museum.nameKey}`)}
              </h4>
              <p className="mt-0.5 text-xs text-white/50">
                {museum.city}, {museum.country}
              </p>
              <div className="mt-2 flex items-center justify-between">
                <span className="flex items-center gap-1 text-xs text-art-gold/80">
                  <Palette className="h-3 w-3" />
                  {artworkCount} {artworkCount === 1 ? 'obra' : 'obras'}
                </span>
                {onEnter && (
                  <button
                    onClick={(e) => { e.stopPropagation(); onEnter(); }}
                    className="flex items-center gap-1 rounded-lg bg-art-gold/20 px-2.5 py-1 text-xs font-medium text-art-gold transition-colors hover:bg-art-gold/30"
                  >
                    {t('gallery.enterRoom')}
                    <ChevronRight className="h-3 w-3" />
                  </button>
                )}
              </div>
              {/* Arrow */}
              <div className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 bg-[#12121f]/95 ring-1 ring-white/10" style={{ clipPath: 'polygon(0% 100%, 100% 100%, 100% 0%)' }} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
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
  const { t } = useTranslation(['common', 'museums']);
  const movements = [...new Set(artworks.map((a) => a.movement))];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={cn(
        'group rounded-2xl border transition-all cursor-pointer overflow-hidden',
        isSelected
          ? 'border-art-gold/40 bg-white/10 shadow-lg shadow-art-gold/10'
          : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/8'
      )}
      onClick={onClick}
    >
      <div className="flex items-start gap-3 p-4">
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl">
          <img
            src={museum.imageUrl}
            alt={t(`museums:${museum.nameKey}`)}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.parentElement!.classList.add('bg-white/10', 'flex', 'items-center', 'justify-center');
              const icon = document.createElement('span');
              icon.innerHTML = '🏛️';
              icon.className = 'text-xl';
              e.currentTarget.parentElement!.appendChild(icon);
            }}
          />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-semibold text-white">{t(`museums:${museum.nameKey}`)}</h3>
          <p className="text-xs text-white/50">
            {museum.city}, {museum.country}
          </p>
        </div>
        <span className="shrink-0 rounded-full bg-art-gold/20 px-2 py-0.5 text-xs font-medium text-art-gold">
          {artworks.length}
        </span>
      </div>

      <AnimatePresence>
        {isSelected && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="flex gap-2 overflow-x-auto px-4 pb-3 scrollbar-none">
              {artworks.slice(0, 5).map((artwork) => (
                <div key={artwork.id} className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg">
                  <img
                    src={artwork.imageUrl}
                    alt={artwork.titleOriginal}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ))}
              {artworks.length > 5 && (
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-white/10 text-xs text-white/60">
                  +{artworks.length - 5}
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-1.5 px-4 pb-3">
              {movements.slice(0, 3).map((m) => (
                <span key={m} className="rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] text-white/60">
                  {m.replace(/-/g, ' ')}
                </span>
              ))}
            </div>

            <button
              onClick={(e) => { e.stopPropagation(); onEnter(); }}
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
  const { t } = useTranslation(['common', 'museums']);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const hoveredMuseumRef = useRef<string | null>(null);
  const sceneRef = useRef<{
    scene: any;
    camera: any;
    renderer: any;
    earthGroup: any;
    clouds: any;
    rotation: { x: number; y: number };
    targetRotation: { x: number; y: number };
    isDragging: boolean;
    lastMouse: { x: number; y: number };
  } | null>(null);

  const [selectedMuseum, setSelectedMuseum] = useState<string | null>(null);
  const [hoveredMuseum, setHoveredMuseum] = useState<string | null>(null);
  const [pinPositions, setPinPositions] = useState<Record<string, { x: number; y: number; visible: boolean }>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const museumArtworks = useMemo(() => {
    const map: Record<string, Artwork[]> = {};
    MUSEUMS.forEach((m) => { map[m.id] = getArtworksByMuseum(m.id); });
    return map;
  }, []);

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

  // Sync hoveredMuseum state with ref for use in animation loop
  useEffect(() => {
    hoveredMuseumRef.current = hoveredMuseum;
  }, [hoveredMuseum]);

  // ─── Initialize Three.js Scene ───
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;
    const canvas = canvasRef.current;
    const container = containerRef.current;

    let THREE: any;

    const initScene = async () => {
      THREE = await import('three');
      const textureLoader = new THREE.TextureLoader();

      const width = container.clientWidth;
      const height = container.clientHeight;

      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x060610);

      const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
      // Zoom out significantly so globe is fully visible on load — not cut off
      // Zoom out so globe fits completely visible with space around it
      camera.position.z = width < 768 ? 3.8 : 3.2;

      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // Lighting — brighter ambient so dark side isn't pitch black
      const ambientLight = new THREE.AmbientLight(0x667799, 1.2);
      scene.add(ambientLight);
      const sunLight = new THREE.DirectionalLight(0xffeedd, 1.4);
      sunLight.position.set(5, 3, 5);
      scene.add(sunLight);
      const fillLight = new THREE.DirectionalLight(0x6688bb, 0.6);
      fillLight.position.set(-5, -2, -4);
      scene.add(fillLight);
      const backLight = new THREE.DirectionalLight(0x445577, 0.4);
      backLight.position.set(0, 1, -5);
      scene.add(backLight);

      // Stars (3 layers)
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
        scene.add(new THREE.Points(geo, new THREE.PointsMaterial({ color: 0xffffff, size, transparent: true, opacity, sizeAttenuation: true })));
      };
      addStars(4000, 80, 0.08, 0.35);
      addStars(1500, 40, 0.15, 0.55);
      addStars(300, 20, 0.35, 0.85);

      // Earth Group
      const earthGroup = new THREE.Group();
      scene.add(earthGroup);

      // Procedural canvas as immediate texture
      const proceduralTexture = new THREE.CanvasTexture(createEarthCanvas());
      const earthGeo = new THREE.SphereGeometry(1, 96, 96);
      const earthMaterial = new THREE.MeshPhongMaterial({
        map: proceduralTexture,
        bumpScale: 0.02,
        specular: new THREE.Color(0x333333),
        shininess: 25,
      });
      earthGroup.add(new THREE.Mesh(earthGeo, earthMaterial));

      // Try loading NASA texture in background
      const tryLoad = (url: string): Promise<any> =>
        new Promise((resolve, reject) => { textureLoader.load(url, resolve, undefined, reject); });
      (async () => {
        for (const url of EARTH_URLS) {
          try {
            const tex = await tryLoad(url);
            tex.colorSpace = THREE.SRGBColorSpace;
            earthMaterial.map = tex;
            earthMaterial.needsUpdate = true;
            break;
          } catch { /* next */ }
        }
      })();

      // Clouds (procedural canvas + CDN fallback)
      const cloudCanvas = createCloudCanvas();
      const cloudMat = new THREE.MeshPhongMaterial({
        map: new THREE.CanvasTexture(cloudCanvas),
        transparent: true,
        opacity: 0.25,
        depthWrite: false,
        side: THREE.DoubleSide,
      });
      const clouds = new THREE.Mesh(new THREE.SphereGeometry(1.01, 64, 64), cloudMat);
      earthGroup.add(clouds);
      (async () => {
        const urls = [
          'https://unpkg.com/three-globe@2.31.1/example/img/earth-clouds.png',
          'https://cdn.jsdelivr.net/npm/three-globe@2.31.1/example/img/earth-clouds.png',
        ];
        for (const url of urls) {
          try { const t = await tryLoad(url); cloudMat.map = t; cloudMat.needsUpdate = true; break; } catch { /* next */ }
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
          }
        `,
        fragmentShader: `
          varying vec3 vNormal; varying vec3 vPosition;
          void main() {
            float rim = 1.0 - max(dot(vNormal, normalize(-vPosition)), 0.0);
            float glow = pow(rim, 5.0);
            gl_FragColor = vec4(vec3(0.3, 0.55, 1.0), glow * 0.35);
          }
        `,
        transparent: true, side: THREE.FrontSide, depthWrite: false,
      });
      earthGroup.add(new THREE.Mesh(new THREE.SphereGeometry(1.02, 96, 96), innerAtmosMat));

      // Outer atmosphere
      const outerAtmosMat = new THREE.ShaderMaterial({
        vertexShader: `
          varying vec3 vNormal; varying vec3 vPosition;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec3 vNormal; varying vec3 vPosition;
          void main() {
            float rim = 1.0 - max(dot(vNormal, normalize(-vPosition)), 0.0);
            float glow = pow(rim, 6.0);
            gl_FragColor = vec4(vec3(0.2, 0.4, 0.9), glow * 0.2);
          }
        `,
        transparent: true, side: THREE.BackSide, depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      earthGroup.add(new THREE.Mesh(new THREE.SphereGeometry(1.15, 64, 64), outerAtmosMat));

      // Museum glow sprites (elegant dots with soft halo)
      const glowCanvas = document.createElement('canvas');
      glowCanvas.width = 64;
      glowCanvas.height = 64;
      const glowCtx = glowCanvas.getContext('2d')!;
      const gradient = glowCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, 'rgba(255, 215, 100, 1.0)');
      gradient.addColorStop(0.15, 'rgba(210, 170, 60, 0.8)');
      gradient.addColorStop(0.4, 'rgba(197, 147, 42, 0.3)');
      gradient.addColorStop(1, 'rgba(197, 147, 42, 0.0)');
      glowCtx.fillStyle = gradient;
      glowCtx.fillRect(0, 0, 64, 64);
      const glowTexture = new THREE.CanvasTexture(glowCanvas);

      MUSEUMS.forEach((museum) => {
        const [x, y, z] = latLngToVector3(museum.coordinates.lat, museum.coordinates.lng, 1.015);
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
        sprite.userData = { museumId: museum.id };
        earthGroup.add(sprite);
      });

      sceneRef.current = {
        scene, camera, renderer, earthGroup, clouds,
        rotation: { x: 0.3, y: -0.5 },
        targetRotation: { x: 0.3, y: -0.5 },
        isDragging: false,
        lastMouse: { x: 0, y: 0 },
      };

      setIsLoading(false);

      // Animation loop
      let time = 0;
      const animate = () => {
        animationRef.current = requestAnimationFrame(animate);
        time += 0.016;

        if (sceneRef.current) {
          const s = sceneRef.current;

          s.rotation.x += (s.targetRotation.x - s.rotation.x) * 0.08;
          s.rotation.y += (s.targetRotation.y - s.rotation.y) * 0.08;

          // Pause auto-rotation when dragging or hovering a museum
          if (!s.isDragging && !hoveredMuseumRef.current) {
            s.targetRotation.y += 0.0003;
          }

          s.earthGroup.rotation.x = s.rotation.x;
          s.earthGroup.rotation.y = s.rotation.y;

          // Clouds drift independently
          s.clouds.rotation.y += 0.00015;

          // Project museum pins to 2D
          const newPositions: Record<string, { x: number; y: number; visible: boolean }> = {};
          MUSEUMS.forEach((museum) => {
            const [mx, my, mz] = latLngToVector3(museum.coordinates.lat, museum.coordinates.lng, 1.02);
            const pos = new THREE.Vector3(mx, my, mz);
            pos.applyMatrix4(s.earthGroup.matrixWorld);

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

    return () => {
      cancelAnimationFrame(animationRef.current);
      if (sceneRef.current) {
        sceneRef.current.renderer.dispose();
      }
    };
  }, []);

  // Mouse / Touch interaction
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
    sceneRef.current.targetRotation.x = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, sceneRef.current.targetRotation.x));
    sceneRef.current.lastMouse = { x: e.clientX, y: e.clientY };
  }, []);

  const handlePointerUp = useCallback(() => {
    if (sceneRef.current) sceneRef.current.isDragging = false;
  }, []);

  // Zoom disabled — page scroll should work normally.
  // Pinch-to-zoom on touch is also disabled via touchAction: 'none' on the container.

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
    <div className="flex min-h-screen flex-col bg-[#060610] pt-16 lg:flex-row lg:pt-20">
      {/* Globe Canvas — constrained height so globe fits completely on screen */}
      <div
        className={cn(
          'relative flex items-center justify-center overflow-hidden',
          'lg:flex-[3] lg:h-[calc(100vh-80px)]',
          'sm:max-lg:h-[45vh]',
          'max-sm:h-[35vh]'
        )}
      >
        <div
          ref={containerRef}
          className="relative h-full w-full"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          style={{ touchAction: 'pan-y' }}
        >
          <canvas ref={canvasRef} className="h-full w-full" />

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
                  isHovered={hoveredMuseum === museum.id}
                  artworkCount={museumArtworks[museum.id]?.length || 0}
                  onClick={() => setSelectedMuseum(museum.id === selectedMuseum ? null : museum.id)}
                  onHover={(h) => setHoveredMuseum(h ? museum.id : null)}
                  onEnter={() => onEnterMuseum?.(museum.id)}
                  t={t}
                />
              );
            })}
        </div>

        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-[#060610]"
            >
              <Globe2 className="h-12 w-12 animate-pulse text-art-gold" />
              <p className="mt-4 font-[var(--font-cormorant)] text-lg text-white/60">
                {t('gallery.loading')}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hint — bottom of globe area, clickable on all screens */}
        <a
          href="/explore"
          className="pointer-events-auto absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full bg-black/40 px-4 py-2 text-xs text-white/50 backdrop-blur-sm transition-all hover:bg-art-gold/20 hover:text-art-gold sm:bottom-6"
        >
          <Globe2 className="h-3.5 w-3.5" />
          {t('gallery.subtitle')}
        </a>
      </div>

      {/* Museum List Panel */}
      <div
        className={cn(
          'relative flex flex-col border-white/5 bg-[#0a0a14]',
          'lg:flex-[2] lg:border-l lg:h-[calc(100vh-80px)]',
          'max-lg:flex-1 max-lg:border-t'
        )}
      >
        <div className="sticky top-0 z-10 border-b border-white/5 bg-[#0a0a14]/95 p-4 pt-5 backdrop-blur-sm lg:pt-6">
          {/* Title in the panel, not overlapping the globe */}
          <h1 className="mb-3 font-[var(--font-cormorant)] text-xl font-bold text-white lg:text-2xl">
            {t('gallery.title')}
          </h1>
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

        <div className="flex-1 space-y-3 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-white/10">
          {filteredMuseums.map((museum) => (
            <MuseumCard
              key={museum.id}
              museum={museum}
              artworks={museumArtworks[museum.id] || []}
              isSelected={selectedMuseum === museum.id}
              onClick={() => setSelectedMuseum(museum.id === selectedMuseum ? null : museum.id)}
              onEnter={() => onEnterMuseum?.(museum.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
