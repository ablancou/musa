/**
 * MŪSA Museum & Artwork Type Definitions
 *
 * The core data model for "El Museo de los Museos".
 * Every artwork lives inside a real museum, every museum
 * sits on the globe, every piece carries full metadata.
 */

// ─── Art Movements / Corrientes ───
export type ArtMovement =
  | 'ancient-egyptian'
  | 'ancient-greek'
  | 'classical-greek'
  | 'ancient-roman'
  | 'byzantine'
  | 'medieval'
  | 'gothic'
  | 'roman'
  | 'romanesque'
  | 'early-renaissance'
  | 'high-renaissance'
  | 'mannerism'
  | 'baroque'
  | 'rococo'
  | 'neoclassicism'
  | 'romanticism'
  | 'realism'
  | 'impressionism'
  | 'post-impressionism'
  | 'symbolism'
  | 'art-nouveau'
  | 'fauvism'
  | 'expressionism'
  | 'cubism'
  | 'futurism'
  | 'dada'
  | 'surrealism'
  | 'abstract-expressionism'
  | 'pop-art'
  | 'minimalism'
  | 'ukiyo-e'
  | 'chinese-classical'
  | 'hellenistic'
  | 'pre-columbian'
  | 'mexican-muralism';

// ─── Artwork Technique ───
export type ArtTechnique =
  | 'oil-on-canvas'
  | 'oil-on-panel'
  | 'fresco'
  | 'tempera'
  | 'watercolor'
  | 'marble-sculpture'
  | 'bronze-sculpture'
  | 'limestone-sculpture'
  | 'ivory-carving'
  | 'woodblock-print'
  | 'ink-on-silk'
  | 'ink-on-paper'
  | 'pastel'
  | 'mixed-media'
  | 'mosaic'
  | 'stained-glass'
  | 'engraving'
  | 'lithography'
  | 'ceramic'
  | 'terracotta'
  | 'textile'
  | 'goldwork'
  | 'graphite';

// ─── Museum ───
export interface Museum {
  id: string;
  nameKey: string; // i18n key
  city: string;
  country: string;
  countryCode: string; // ISO 3166-1 alpha-2
  coordinates: { lat: number; lng: number };
  foundedYear: number;
  imageUrl: string; // Public domain image of the museum building
  websiteUrl: string;
  /** Atmosphere color for the room antechamber */
  accentColor: string;
  /** Short description key for i18n */
  descriptionKey: string;
  /** Virtual tour URL (Google Arts & Culture, museum's own tour, etc.) */
  virtualTourUrl?: string;
  /** Online collection URL for browsing all works digitally */
  onlineCollectionUrl?: string;
}

// ─── Artwork (expanded with full metadata) ───
export interface Artwork {
  id: string;
  titleKey: string; // i18n key for translated title
  titleOriginal: string; // Original title (in artist's language)
  artist: string;
  artistBirthYear: number;
  artistDeathYear: number;
  artistNationality: string;
  year: number; // Creation year (negative for BCE)
  yearEnd?: number; // If created over a period
  movement: ArtMovement;
  technique: ArtTechnique;
  medium: string; // Human-readable medium description
  dimensions?: string; // e.g. "77 × 53 cm"
  museumId: string; // References Museum.id
  room?: string; // Specific room/gallery in the museum
  imageUrl: string; // Public domain image URL
  /** Music connection for the immersive experience */
  musicConnection?: {
    composerKey: string; // i18n key
    pieceKey: string; // i18n key
    youtubeQuery: string; // Free search query
  };
  /** Whether this artwork has a cinematic narration */
  hasNarration: boolean;
  /** Highlights / notable details for comparisons */
  highlights?: string[];
}

// ─── Convenience types for filtering ───
export interface ArtistSummary {
  name: string;
  birthYear: number;
  deathYear: number;
  nationality: string;
  movements: ArtMovement[];
  artworkCount: number;
}

export interface MovementInfo {
  id: ArtMovement;
  nameKey: string;
  startYear: number;
  endYear: number;
  descriptionKey: string;
  color: string;
}
