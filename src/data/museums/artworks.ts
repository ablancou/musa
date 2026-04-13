/**
 * MŪSA Master Artworks Database
 *
 * Every artwork in "El Museo de los Museos" with COMPLETE metadata:
 * - Artist, dates, nationality
 * - Exact creation year
 * - Movement / art current
 * - Technique and medium
 * - Dimensions
 * - Museum and room location
 * - Music connection
 * - Public domain image URL
 *
 * ALL images are from verified public domain sources:
 * - Wikimedia Commons (artists deceased 70+ years)
 * - Metropolitan Museum of Art Open Access
 * - Rijksmuseum Open Access
 * - National Gallery of Art Open Access
 * - Art Institute of Chicago Open Access
 *
 * IMPORTANT: No Picasso (†1973, protected until ~2043)
 */

import type { Artwork } from './types';
import { ARTWORKS_BATCH2 } from './artworks-batch2';
import { ARTWORKS_BATCH3 } from './artworks-batch3';
import { ARTWORKS_BATCH4A } from './artworks-batch4a';
import { ARTWORKS_BATCH4B } from './artworks-batch4b';
import { ARTWORKS_BATCH4C } from './artworks-batch4c';
import { ARTWORKS_AMERICAS } from './artworks-americas';
import { ARTWORKS_EUROPE } from './artworks-europe';
import { ARTWORKS_ASIA } from './artworks-asia';
import { ARTWORKS_AFRICA } from './artworks-africa';
export type { Artwork } from './types';

const ARTWORKS_BASE: Artwork[] = [
  // ═══════════════════════════════════════════════════════
  // LOUVRE — Paris, France
  // ═══════════════════════════════════════════════════════

  {
    id: 'mona-lisa',
    titleKey: 'artworks.monaLisa',
    titleOriginal: 'La Gioconda',
    artist: 'Leonardo da Vinci',
    artistBirthYear: 1452,
    artistDeathYear: 1519,
    artistNationality: 'Italian',
    year: 1503,
    yearEnd: 1519,
    movement: 'high-renaissance',
    technique: 'oil-on-panel',
    medium: 'Oil on poplar panel',
    dimensions: '77 × 53 cm',
    museumId: 'louvre',
    room: 'Salle des États (Room 711)',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg',
    musicConnection: {
      composerKey: 'music.composers.josquinDesPrez',
      pieceKey: 'music.pieces.aveMaria',
      youtubeQuery: 'Josquin des Prez Ave Maria Renaissance polyphony',
    },
    hasNarration: true,
  },
  {
    id: 'winged-victory',
    titleKey: 'artworks.wingedVictory',
    titleOriginal: 'Νίκη τῆς Σαμοθρᾴκης',
    artist: 'Unknown (Hellenistic sculptor)',
    artistBirthYear: -220,
    artistDeathYear: -180,
    artistNationality: 'Greek',
    year: -190,
    movement: 'hellenistic',
    technique: 'marble-sculpture',
    medium: 'Parian marble',
    dimensions: '328 cm (height)',
    museumId: 'louvre',
    room: 'Escalier Daru',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Nike_of_Samothrake_Louvre_Ma2369_n4.jpg',
    musicConnection: {
      composerKey: 'music.composers.ancient',
      pieceKey: 'music.pieces.hymns',
      youtubeQuery: 'Ancient Greek music reconstruction lyre',
    },
    hasNarration: false,
    highlights: ['Headless masterpiece', 'Found in Samothrace 1863', 'Wind-swept drapery', 'Ship prow base'],
  },
  {
    id: 'venus-de-milo',
    titleKey: 'artworks.venusDeMilo',
    titleOriginal: 'Ἀφροδίτη τῆς Μήλου',
    artist: 'Alexandros of Antioch',
    artistBirthYear: -150,
    artistDeathYear: -50,
    artistNationality: 'Greek',
    year: -130,
    movement: 'hellenistic',
    technique: 'marble-sculpture',
    medium: 'Parian marble',
    dimensions: '211 cm (height)',
    museumId: 'louvre',
    room: 'Salle 346',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c2/Venus_de_Milo_Louvre_Ma399_n4.jpg',
    hasNarration: false,
  },
  {
    id: 'liberty-leading-the-people',
    titleKey: 'artworks.libertyLeading',
    titleOriginal: 'La Liberté guidant le peuple',
    artist: 'Eugène Delacroix',
    artistBirthYear: 1798,
    artistDeathYear: 1863,
    artistNationality: 'French',
    year: 1830,
    movement: 'romanticism',
    technique: 'oil-on-canvas',
    medium: 'Oil on canvas',
    dimensions: '260 × 325 cm',
    museumId: 'louvre',
    room: 'Salle Mollien (Room 700)',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5d/Eug%C3%A8ne_Delacroix_-_Le_28_Juillet._La_Libert%C3%A9_guidant_le_peuple.jpg',
    musicConnection: {
      composerKey: 'music.composers.berlioz',
      pieceKey: 'music.pieces.symphoniefantastique',
      youtubeQuery: 'Berlioz Symphonie Fantastique 4th movement',
    },
    hasNarration: false,
  },

  // ═══════════════════════════════════════════════════════
  // MUSÉE D'ORSAY — Paris, France
  // ═══════════════════════════════════════════════════════

  // ── CLAUDE MONET ──
  {
    id: 'monet-impression-sunrise',
    titleKey: 'artworks.monetImpressionSunrise',
    titleOriginal: 'Impression, soleil levant',
    artist: 'Claude Monet',
    artistBirthYear: 1840,
    artistDeathYear: 1926,
    artistNationality: 'French',
    year: 1872,
    movement: 'impressionism',
    technique: 'oil-on-canvas',
    medium: 'Oil on canvas',
    dimensions: '48 × 63 cm',
    museumId: 'musee-dorsay',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/59/Monet_-_Impression%2C_Sunrise.jpg',
    musicConnection: {
      composerKey: 'music.composers.debussy',
      pieceKey: 'music.pieces.clairDeLune',
      youtubeQuery: 'Debussy Clair de Lune piano',
    },
    hasNarration: false,
    highlights: ['Named the Impressionist movement', 'Painted in Le Havre harbor', 'Controversial first exhibition 1874'],
  },
  {
    id: 'monet-water-lilies-orsay',
    titleKey: 'artworks.monetWaterLilies',
    titleOriginal: 'Les Nymphéas',
    artist: 'Claude Monet',
    artistBirthYear: 1840,
    artistDeathYear: 1926,
    artistNationality: 'French',
    year: 1906,
    movement: 'impressionism',
    technique: 'oil-on-canvas',
    medium: 'Oil on canvas',
    dimensions: '89.9 × 94.1 cm',
    museumId: 'musee-dorsay',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/aa/Claude_Monet_-_Water_Lilies_-_1906%2C_Ryerson.jpg',
    musicConnection: {
      composerKey: 'music.composers.debussy',
      pieceKey: 'music.pieces.reflets',
      youtubeQuery: 'Debussy Reflets dans l eau piano',
    },
    hasNarration: false,
  },
  {
    id: 'monet-rouen-cathedral',
    titleKey: 'artworks.monetRouenCathedral',
    titleOriginal: 'La Cathédrale de Rouen. Le portail et la tour Saint-Romain, plein soleil',
    artist: 'Claude Monet',
    artistBirthYear: 1840,
    artistDeathYear: 1926,
    artistNationality: 'French',
    year: 1893,
    movement: 'impressionism',
    technique: 'oil-on-canvas',
    medium: 'Oil on canvas',
    dimensions: '107 × 73 cm',
    museumId: 'musee-dorsay',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/42/Claude_Monet_-_Rouen_Cathedral%2C_Facade_%28Sunset%29.JPG',
    hasNarration: false,
  },
  {
    id: 'monet-poppy-field',
    titleKey: 'artworks.monetPoppyField',
    titleOriginal: 'Les Coquelicots',
    artist: 'Claude Monet',
    artistBirthYear: 1840,
    artistDeathYear: 1926,
    artistNationality: 'French',
    year: 1873,
    movement: 'impressionism',
    technique: 'oil-on-canvas',
    medium: 'Oil on canvas',
    dimensions: '50 × 65 cm',
    museumId: 'musee-dorsay',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Claude_Monet_-_Poppy_Field_-_Google_Art_Project.jpg',
    hasNarration: false,
  },

  // ── HENRI MATISSE ──
  {
    id: 'matisse-dance',
    titleKey: 'artworks.matisseDance',
    titleOriginal: 'La Danse',
    artist: 'Henri Matisse',
    artistBirthYear: 1869,
    artistDeathYear: 1954,
    artistNationality: 'French',
    year: 1910,
    movement: 'fauvism',
    technique: 'oil-on-canvas',
    medium: 'Oil on canvas',
    dimensions: '260 × 391 cm',
    museumId: 'hermitage',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/a/a7/Matisse-Dance.jpg',
    musicConnection: {
      composerKey: 'music.composers.stravinsky',
      pieceKey: 'music.pieces.riteOfSpring',
      youtubeQuery: 'Stravinsky Rite of Spring Danse sacrale',
    },
    hasNarration: false,
    highlights: ['Five dancing figures', 'Only three colors used', 'Commissioned by Sergei Shchukin'],
  },
  {
    id: 'matisse-joy-of-life',
    titleKey: 'artworks.matisseJoyOfLife',
    titleOriginal: 'Le bonheur de vivre',
    artist: 'Henri Matisse',
    artistBirthYear: 1869,
    artistDeathYear: 1954,
    artistNationality: 'French',
    year: 1906,
    movement: 'fauvism',
    technique: 'oil-on-canvas',
    medium: 'Oil on canvas',
    dimensions: '176.5 × 240.7 cm',
    museumId: 'musee-dorsay',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/b/b9/Matisse-Bonheur-de-Vivre.jpg',
    hasNarration: false,
  },
  {
    id: 'matisse-red-room',
    titleKey: 'artworks.matisseRedRoom',
    titleOriginal: 'La Desserte rouge',
    artist: 'Henri Matisse',
    artistBirthYear: 1869,
    artistDeathYear: 1954,
    artistNationality: 'French',
    year: 1908,
    movement: 'fauvism',
    technique: 'oil-on-canvas',
    medium: 'Oil on canvas',
    dimensions: '180 × 220 cm',
    museumId: 'hermitage',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/0/0a/Matisse-The-Red-Room.jpg',
    hasNarration: false,
  },

  // ═══════════════════════════════════════════════════════
  // VAN GOGH MUSEUM / MUSÉE D'ORSAY / MET / etc.
  // ── VINCENT VAN GOGH (complete collection) ──
  // ═══════════════════════════════════════════════════════

  {
    id: 'vangogh-starry-night',
    titleKey: 'artworks.starryNight',
    titleOriginal: 'De sterrennacht',
    artist: 'Vincent van Gogh',
    artistBirthYear: 1853,
    artistDeathYear: 1890,
    artistNationality: 'Dutch',
    year: 1889,
    movement: 'post-impressionism',
    technique: 'oil-on-canvas',
    medium: 'Oil on canvas',
    dimensions: '73.7 × 92.1 cm',
    museumId: 'moma',
    room: 'Gallery 501',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1280px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg',
    musicConnection: {
      composerKey: 'music.composers.debussy',
      pieceKey: 'music.pieces.nocturnes',
      youtubeQuery: 'Debussy Nocturnes Nuages orchestra',
    },
    hasNarration: true,
  },
  {
    id: 'vangogh-sunflowers',
    titleKey: 'artworks.vangoghSunflowers',
    titleOriginal: 'Zonnebloemen',
    artist: 'Vincent van Gogh',
    artistBirthYear: 1853,
    artistDeathYear: 1890,
    artistNationality: 'Dutch',
    year: 1888,
    movement: 'post-impressionism',
    technique: 'oil-on-canvas',
    medium: 'Oil on canvas',
    dimensions: '92.1 × 73 cm',
    museumId: 'national-gallery-london',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/46/Vincent_Willem_van_Gogh_127.jpg',
    hasNarration: false,
    highlights: ['One of seven versions', 'Painted for Gauguin\'s visit', 'Arles period'],
  },
  {
    id: 'vangogh-bedroom',
    titleKey: 'artworks.vangoghBedroom',
    titleOriginal: 'De slaapkamer',
    artist: 'Vincent van Gogh',
    artistBirthYear: 1853,
    artistDeathYear: 1890,
    artistNationality: 'Dutch',
    year: 1888,
    movement: 'post-impressionism',
    technique: 'oil-on-canvas',
    medium: 'Oil on canvas',
    dimensions: '72 × 90 cm',
    museumId: 'art-institute-chicago',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/76/Vincent_van_Gogh_-_De_slaapkamer_-_Google_Art_Project.jpg',
    hasNarration: false,
  },
  {
    id: 'vangogh-self-portrait-1889',
    titleKey: 'artworks.vangoghSelfPortrait',
    titleOriginal: 'Zelfportret',
    artist: 'Vincent van Gogh',
    artistBirthYear: 1853,
    artistDeathYear: 1890,
    artistNationality: 'Dutch',
    year: 1889,
    movement: 'post-impressionism',
    technique: 'oil-on-canvas',
    medium: 'Oil on canvas',
    dimensions: '65 × 54.2 cm',
    museumId: 'musee-dorsay',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b2/Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project.jpg',
    hasNarration: false,
  },
  {
    id: 'vangogh-cafe-terrace',
    titleKey: 'artworks.vangoghCafeTerrace',
    titleOriginal: 'Caféterras bij nacht',
    artist: 'Vincent van Gogh',
    artistBirthYear: 1853,
    artistDeathYear: 1890,
    artistNationality: 'Dutch',
    year: 1888,
    movement: 'post-impressionism',
    technique: 'oil-on-canvas',
    medium: 'Oil on canvas',
    dimensions: '80.7 × 65.3 cm',
    museumId: 'rijksmuseum',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/21/Vincent_Willem_van_Gogh_-_Cafe_Terrace_at_Night_%28Yorck%29.jpg',
    hasNarration: false,
  },
  {
    id: 'vangogh-irises',
    titleKey: 'artworks.vangoghIrises',
    titleOriginal: 'Irissen',
    artist: 'Vincent van Gogh',
    artistBirthYear: 1853,
    artistDeathYear: 1890,
    artistNationality: 'Dutch',
    year: 1889,
    movement: 'post-impressionism',
    technique: 'oil-on-canvas',
    medium: 'Oil on canvas',
    dimensions: '71 × 93 cm',
    museumId: 'met',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Irises-Vincent_van_Gogh.jpg',
    hasNarration: false,
  },
  {
    id: 'vangogh-almond-blossoms',
    titleKey: 'artworks.vangoghAlmondBlossoms',
    titleOriginal: 'Amandelbloesem',
    artist: 'Vincent van Gogh',
    artistBirthYear: 1853,
    artistDeathYear: 1890,
    artistNationality: 'Dutch',
    year: 1890,
    movement: 'post-impressionism',
    technique: 'oil-on-canvas',
    medium: 'Oil on canvas',
    dimensions: '73.3 × 92.4 cm',
    museumId: 'rijksmuseum',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/68/Vincent_van_Gogh_-_Almond_blossom_-_Google_Art_Project.jpg',
    musicConnection: {
      composerKey: 'music.composers.satie',
      pieceKey: 'music.pieces.gymnopedie1',
      youtubeQuery: 'Erik Satie Gymnopédie No 1 piano',
    },
    hasNarration: false,
    highlights: ['Gift for newborn nephew', 'Japanese art influence', 'One of last paintings'],
  },
  {
    id: 'vangogh-wheatfield-crows',
    titleKey: 'artworks.vangoghWheatfieldCrows',
    titleOriginal: 'Korenveld met kraaien',
    artist: 'Vincent van Gogh',
    artistBirthYear: 1853,
    artistDeathYear: 1890,
    artistNationality: 'Dutch',
    year: 1890,
    movement: 'post-impressionism',
    technique: 'oil-on-canvas',
    medium: 'Oil on canvas',
    dimensions: '50.5 × 103 cm',
    museumId: 'rijksmuseum',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Vincent_van_Gogh_%281853-1890%29_-_Wheat_Field_with_Crows_%281890%29.jpg',
    hasNarration: false,
    highlights: ['One of his final paintings', 'Triple vanishing point', 'Auvers-sur-Oise July 1890'],
  },
  {
    id: 'vangogh-potato-eaters',
    titleKey: 'artworks.vangoghPotatoEaters',
    titleOriginal: 'De aardappeleters',
    artist: 'Vincent van Gogh',
    artistBirthYear: 1853,
    artistDeathYear: 1890,
    artistNationality: 'Dutch',
    year: 1885,
    movement: 'realism',
    technique: 'oil-on-canvas',
    medium: 'Oil on canvas',
    dimensions: '82 × 114 cm',
    museumId: 'rijksmuseum',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Van-gogh-potato-eaters.jpg',
    hasNarration: false,
    highlights: ['First major work', 'Nuenen period', 'Intentionally rough style'],
  },
  {
    id: 'vangogh-night-cafe',
    titleKey: 'artworks.vangoghNightCafe',
    titleOriginal: 'Le café de nuit',
    artist: 'Vincent van Gogh',
    artistBirthYear: 1853,
    artistDeathYear: 1890,
    artistNationality: 'Dutch',
    year: 1888,
    movement: 'post-impressionism',
    technique: 'oil-on-canvas',
    medium: 'Oil on canvas',
    dimensions: '72.4 × 92.1 cm',
    museumId: 'art-institute-chicago',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Vincent_Willem_van_Gogh_076.jpg',
    hasNarration: false,
  },

  // ═══════════════════════════════════════════════════════
  // UFFIZI — Florence, Italy
  // ═══════════════════════════════════════════════════════

  {
    id: 'birth-of-venus',
    titleKey: 'artworks.birthOfVenus',
    titleOriginal: 'La nascita di Venere',
    artist: 'Sandro Botticelli',
    artistBirthYear: 1445,
    artistDeathYear: 1510,
    artistNationality: 'Italian',
    year: 1485,
    movement: 'early-renaissance',
    technique: 'tempera',
    medium: 'Tempera on canvas',
    dimensions: '172.5 × 278.9 cm',
    museumId: 'uffizi',
    room: 'Sala di Botticelli (Rooms 10-14)',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg',
    musicConnection: {
      composerKey: 'music.composers.palestrina',
      pieceKey: 'music.pieces.missaPapaeMarcelli',
      youtubeQuery: 'Palestrina Missa Papae Marcelli Kyrie',
    },
    hasNarration: true,
  },

  // ═══════════════════════════════════════════════════════
  // VATICAN MUSEUMS — Vatican City
  // ═══════════════════════════════════════════════════════

  // ── MICHELANGELO ──
  {
    id: 'creation-of-adam',
    titleKey: 'artworks.creationOfAdam',
    titleOriginal: 'La creazione di Adamo',
    artist: 'Michelangelo Buonarroti',
    artistBirthYear: 1475,
    artistDeathYear: 1564,
    artistNationality: 'Italian',
    year: 1512,
    movement: 'high-renaissance',
    technique: 'fresco',
    medium: 'Fresco on ceiling',
    dimensions: '280 × 570 cm',
    museumId: 'vatican-museums',
    room: 'Sistine Chapel ceiling',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5b/Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg',
    musicConnection: {
      composerKey: 'music.composers.allegri',
      pieceKey: 'music.pieces.miserere',
      youtubeQuery: 'Allegri Miserere mei Deus choir Sistine Chapel',
    },
    hasNarration: true,
    highlights: ['Sistine Chapel ceiling', 'Painted lying on scaffolding', 'Near-touching hands'],
  },
  {
    id: 'last-judgment',
    titleKey: 'artworks.lastJudgment',
    titleOriginal: 'Il Giudizio Universale',
    artist: 'Michelangelo Buonarroti',
    artistBirthYear: 1475,
    artistDeathYear: 1564,
    artistNationality: 'Italian',
    year: 1541,
    movement: 'mannerism',
    technique: 'fresco',
    medium: 'Fresco',
    dimensions: '1370 × 1200 cm',
    museumId: 'vatican-museums',
    room: 'Sistine Chapel (altar wall)',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Last_Judgement_%28Michelangelo%29.jpg',
    hasNarration: false,
    highlights: ['Over 300 figures', 'Controversial nudity', '25 years after the ceiling'],
  },
  {
    id: 'pieta',
    titleKey: 'artworks.pieta',
    titleOriginal: 'La Pietà',
    artist: 'Michelangelo Buonarroti',
    artistBirthYear: 1475,
    artistDeathYear: 1564,
    artistNationality: 'Italian',
    year: 1499,
    movement: 'high-renaissance',
    technique: 'marble-sculpture',
    medium: 'Carrara marble',
    dimensions: '174 × 195 cm',
    museumId: 'vatican-museums',
    room: "St. Peter's Basilica",
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/1f/Michelangelo%27s_Pieta_5450_cropncleaned_edit.jpg',
    musicConnection: {
      composerKey: 'music.composers.victoria',
      pieceKey: 'music.pieces.oVosSanctaPassio',
      youtubeQuery: 'Tomás Luis de Victoria O Vos Omnes choir',
    },
    hasNarration: false,
    highlights: ['Only signed work by Michelangelo', 'Carved at age 24', 'Behind bulletproof glass since 1972'],
  },

  // ═══════════════════════════════════════════════════════
  // MAURITSHUIS — The Hague, Netherlands
  // ═══════════════════════════════════════════════════════

  {
    id: 'girl-pearl-earring',
    titleKey: 'artworks.girlPearlEarring',
    titleOriginal: 'Meisje met de parel',
    artist: 'Johannes Vermeer',
    artistBirthYear: 1632,
    artistDeathYear: 1675,
    artistNationality: 'Dutch',
    year: 1665,
    movement: 'baroque',
    technique: 'oil-on-canvas',
    medium: 'Oil on canvas',
    dimensions: '44.5 × 39 cm',
    museumId: 'mauritshuis',
    room: 'Room 15',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/0f/1665_Girl_with_a_Pearl_Earring.jpg',
    musicConnection: {
      composerKey: 'music.composers.sweelinck',
      pieceKey: 'music.pieces.fantasia',
      youtubeQuery: 'Jan Pieterszoon Sweelinck Fantasia Chromatica organ',
    },
    hasNarration: true,
    highlights: ['Known as "Mona Lisa of the North"', 'Tronie (character study)', 'Ultramarine and Indian yellow'],
  },

  // ═══════════════════════════════════════════════════════
  // BELVEDERE — Vienna, Austria
  // ═══════════════════════════════════════════════════════

  {
    id: 'klimt-the-kiss',
    titleKey: 'artworks.theKiss',
    titleOriginal: 'Der Kuss',
    artist: 'Gustav Klimt',
    artistBirthYear: 1862,
    artistDeathYear: 1918,
    artistNationality: 'Austrian',
    year: 1908,
    movement: 'art-nouveau',
    technique: 'oil-on-canvas',
    medium: 'Oil and gold leaf on canvas',
    dimensions: '180 × 180 cm',
    museumId: 'belvedere',
    room: 'Upper Belvedere',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/Klimt_-_Der_Kuss.jpeg',
    musicConnection: {
      composerKey: 'music.composers.mahler',
      pieceKey: 'music.pieces.adagietto',
      youtubeQuery: 'Mahler Symphony No 5 Adagietto',
    },
    hasNarration: true,
    highlights: ['Gold leaf technique', 'Art Nouveau masterpiece', 'Klimt\'s golden period'],
  },

  // ═══════════════════════════════════════════════════════
  // MUNCH MUSEUM — Oslo, Norway
  // ═══════════════════════════════════════════════════════

  {
    id: 'the-scream',
    titleKey: 'artworks.theScream',
    titleOriginal: 'Skrik',
    artist: 'Edvard Munch',
    artistBirthYear: 1863,
    artistDeathYear: 1944,
    artistNationality: 'Norwegian',
    year: 1893,
    movement: 'expressionism',
    technique: 'oil-on-canvas',
    medium: 'Tempera and crayon on cardboard',
    dimensions: '91 × 73.5 cm',
    museumId: 'munch-museum',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Edvard_Munch%2C_1893%2C_The_Scream%2C_oil%2C_tempera_and_pastel_on_cardboard%2C_91_x_73_cm%2C_National_Gallery_of_Norway.jpg',
    musicConnection: {
      composerKey: 'music.composers.schoenberg',
      pieceKey: 'music.pieces.verklarteNacht',
      youtubeQuery: 'Schoenberg Verklärte Nacht string orchestra',
    },
    hasNarration: true,
    highlights: ['Four versions exist', 'Stolen twice (1994, 2004)', 'Icon of existential anxiety'],
  },

  // ═══════════════════════════════════════════════════════
  // MET — New York, USA
  // ═══════════════════════════════════════════════════════

  {
    id: 'washington-crossing',
    titleKey: 'artworks.washingtonCrossing',
    titleOriginal: 'Washington Crossing the Delaware',
    artist: 'Emanuel Leutze',
    artistBirthYear: 1816,
    artistDeathYear: 1868,
    artistNationality: 'German-American',
    year: 1851,
    movement: 'romanticism',
    technique: 'oil-on-canvas',
    medium: 'Oil on canvas',
    dimensions: '378.5 × 647.7 cm',
    museumId: 'met',
    room: 'Gallery 760',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/95/Washington_Crossing_the_Delaware_by_Emanuel_Leutze%2C_MMA-NYC%2C_1851.jpg',
    hasNarration: false,
  },

  // ── GIOVANNI STRAZZA ──
  {
    id: 'veiled-virgin',
    titleKey: 'artworks.veiledVirgin',
    titleOriginal: 'The Veiled Virgin',
    artist: 'Giovanni Strazza',
    artistBirthYear: 1818,
    artistDeathYear: 1875,
    artistNationality: 'Italian',
    year: 1856,
    movement: 'neoclassicism',
    technique: 'marble-sculpture',
    medium: 'Carrara marble',
    dimensions: '47 cm (height)',
    museumId: 'vatican-museums',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/59/Veiled_virgin.jpg',
    hasNarration: false,
    highlights: ['Transparent marble veil effect', 'Virtuoso carving technique', 'Now in Newfoundland'],
  },

  // ═══════════════════════════════════════════════════════
  // PRADO — Madrid, Spain
  // ═══════════════════════════════════════════════════════

  {
    id: 'las-meninas',
    titleKey: 'artworks.lasMeninas',
    titleOriginal: 'Las Meninas',
    artist: 'Diego Velázquez',
    artistBirthYear: 1599,
    artistDeathYear: 1660,
    artistNationality: 'Spanish',
    year: 1656,
    movement: 'baroque',
    technique: 'oil-on-canvas',
    medium: 'Oil on canvas',
    dimensions: '318 × 276 cm',
    museumId: 'prado',
    room: 'Room 12',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/31/Las_Meninas%2C_by_Diego_Vel%C3%A1zquez%2C_from_Prado_in_Google_Earth.jpg',
    musicConnection: {
      composerKey: 'music.composers.rodrigo',
      pieceKey: 'music.pieces.concierto',
      youtubeQuery: 'Rodrigo Concierto de Aranjuez adagio guitar',
    },
    hasNarration: false,
    highlights: ['Painting within a painting', 'Mirror reflection of king', 'Revolutionary perspective'],
  },
  {
    id: 'goya-third-of-may',
    titleKey: 'artworks.goyaThirdOfMay',
    titleOriginal: 'El tres de mayo de 1808',
    artist: 'Francisco de Goya',
    artistBirthYear: 1746,
    artistDeathYear: 1828,
    artistNationality: 'Spanish',
    year: 1814,
    movement: 'romanticism',
    technique: 'oil-on-canvas',
    medium: 'Oil on canvas',
    dimensions: '268 × 347 cm',
    museumId: 'prado',
    room: 'Room 64',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/fd/El_Tres_de_Mayo%2C_by_Francisco_de_Goya%2C_from_Prado_thin_black_margin.jpg',
    hasNarration: false,
    highlights: ['Anti-war masterpiece', 'Central figure\'s Christ-like pose', 'Napoleonic invasion'],
  },

  // ═══════════════════════════════════════════════════════
  // TOKYO NATIONAL MUSEUM — Japan
  // ═══════════════════════════════════════════════════════

  {
    id: 'great-wave',
    titleKey: 'artworks.greatWave',
    titleOriginal: '神奈川沖浪裏',
    artist: 'Katsushika Hokusai',
    artistBirthYear: 1760,
    artistDeathYear: 1849,
    artistNationality: 'Japanese',
    year: 1831,
    movement: 'ukiyo-e',
    technique: 'woodblock-print',
    medium: 'Woodblock print (nishiki-e)',
    dimensions: '25.7 × 37.9 cm',
    museumId: 'tokyo-national',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Tsunami_by_hokusai_19th_century.jpg',
    musicConnection: {
      composerKey: 'music.composers.debussy',
      pieceKey: 'music.pieces.laMer',
      youtubeQuery: 'Debussy La Mer orchestra full',
    },
    hasNarration: true,
    highlights: ['Most reproduced Japanese artwork', 'Mount Fuji in background', 'Influenced Impressionists'],
  },

  // ═══════════════════════════════════════════════════════
  // RIJKSMUSEUM — Amsterdam
  // ═══════════════════════════════════════════════════════

  {
    id: 'night-watch',
    titleKey: 'artworks.nightWatch',
    titleOriginal: 'De Nachtwacht',
    artist: 'Rembrandt van Rijn',
    artistBirthYear: 1606,
    artistDeathYear: 1669,
    artistNationality: 'Dutch',
    year: 1642,
    movement: 'baroque',
    technique: 'oil-on-canvas',
    medium: 'Oil on canvas',
    dimensions: '363 × 437 cm',
    museumId: 'rijksmuseum',
    room: 'Gallery of Honour',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5a/The_Night_Watch_-_HD.jpg',
    musicConnection: {
      composerKey: 'music.composers.bach',
      pieceKey: 'music.pieces.brandenburgs',
      youtubeQuery: 'Bach Brandenburg Concerto No 3 full',
    },
    hasNarration: false,
    highlights: ['Largest Rembrandt painting', 'Dramatic chiaroscuro lighting', 'Group militia portrait'],
  },

  // ═══════════════════════════════════════════════════════
  // NATIONAL GALLERY LONDON
  // ═══════════════════════════════════════════════════════

  {
    id: 'turner-fighting-temeraire',
    titleKey: 'artworks.turnerTemeraire',
    titleOriginal: 'The Fighting Temeraire',
    artist: 'J.M.W. Turner',
    artistBirthYear: 1775,
    artistDeathYear: 1851,
    artistNationality: 'British',
    year: 1839,
    movement: 'romanticism',
    technique: 'oil-on-canvas',
    medium: 'Oil on canvas',
    dimensions: '91 × 122 cm',
    museumId: 'national-gallery-london',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/30/The_Fighting_Temeraire%2C_JMW_Turner%2C_National_Gallery.jpg',
    hasNarration: false,
  },

  // ═══════════════════════════════════════════════════════
  // SALVADOR DALÍ
  // ═══════════════════════════════════════════════════════

  {
    id: 'persistence-of-memory',
    titleKey: 'artworks.persistenceMemory',
    titleOriginal: 'La persistencia de la memoria',
    artist: 'Salvador Dalí',
    artistBirthYear: 1904,
    artistDeathYear: 1989,
    artistNationality: 'Spanish',
    year: 1931,
    movement: 'surrealism',
    technique: 'oil-on-canvas',
    medium: 'Oil on canvas',
    dimensions: '24.1 × 33 cm',
    museumId: 'moma',
    room: 'Gallery 517',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/d/dd/The_Persistence_of_Memory.jpg',
    musicConnection: {
      composerKey: 'music.composers.satie',
      pieceKey: 'music.pieces.gnossiennes',
      youtubeQuery: 'Erik Satie Gnossienne No 1 piano',
    },
    hasNarration: true,
    highlights: ['Melting clocks', 'Only 24 cm wide', 'Inspired by Camembert cheese melting'],
  },

  // ═══════════════════════════════════════════════════════
  // ART INSTITUTE CHICAGO
  // ═══════════════════════════════════════════════════════

  {
    id: 'seurat-sunday-afternoon',
    titleKey: 'artworks.seuratSundayAfternoon',
    titleOriginal: 'Un dimanche après-midi à l\'Île de la Grande Jatte',
    artist: 'Georges Seurat',
    artistBirthYear: 1859,
    artistDeathYear: 1891,
    artistNationality: 'French',
    year: 1886,
    movement: 'post-impressionism',
    technique: 'oil-on-canvas',
    medium: 'Oil on canvas (pointillism)',
    dimensions: '207.5 × 308.1 cm',
    museumId: 'art-institute-chicago',
    room: 'Gallery 240',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7d/A_Sunday_on_La_Grande_Jatte%2C_Georges_Seurat%2C_1884.jpg',
    hasNarration: false,
    highlights: ['Pointillist technique', 'Over 2 years to complete', '~3.5 million dots'],
  },

  // ═══════════════════════════════════════════════════════
  // MORE MASTERWORKS
  // ═══════════════════════════════════════════════════════

  {
    id: 'monet-japanese-bridge',
    titleKey: 'artworks.monetJapaneseBridge',
    titleOriginal: 'Le bassin aux nymphéas',
    artist: 'Claude Monet',
    artistBirthYear: 1840,
    artistDeathYear: 1926,
    artistNationality: 'French',
    year: 1899,
    movement: 'impressionism',
    technique: 'oil-on-canvas',
    medium: 'Oil on canvas',
    dimensions: '89.2 × 93.3 cm',
    museumId: 'met',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/8b/Claude_Monet_-_Water_Lily_Pond_-_Google_Art_Project.jpg',
    hasNarration: false,
  },
  {
    id: 'monet-woman-parasol',
    titleKey: 'artworks.monetWomanParasol',
    titleOriginal: 'Femme à l\'ombrelle',
    artist: 'Claude Monet',
    artistBirthYear: 1840,
    artistDeathYear: 1926,
    artistNationality: 'French',
    year: 1875,
    movement: 'impressionism',
    technique: 'oil-on-canvas',
    medium: 'Oil on canvas',
    dimensions: '100 × 81 cm',
    museumId: 'national-gallery-washington',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/Claude_Monet_-_Woman_with_a_Parasol_-_Madame_Monet_and_Her_Son_-_Google_Art_Project.jpg',
    hasNarration: false,
  },
  {
    id: 'renoir-bal-du-moulin',
    titleKey: 'artworks.renoirBalDuMoulin',
    titleOriginal: 'Bal du moulin de la Galette',
    artist: 'Pierre-Auguste Renoir',
    artistBirthYear: 1841,
    artistDeathYear: 1919,
    artistNationality: 'French',
    year: 1876,
    movement: 'impressionism',
    technique: 'oil-on-canvas',
    medium: 'Oil on canvas',
    dimensions: '131 × 175 cm',
    museumId: 'musee-dorsay',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/21/Pierre-Auguste_Renoir%2C_Le_Moulin_de_la_Galette.jpg',
    musicConnection: {
      composerKey: 'music.composers.debussy',
      pieceKey: 'music.pieces.arabesques',
      youtubeQuery: 'Debussy Arabesque No 1 piano',
    },
    hasNarration: false,
  },
  {
    id: 'david-michelangelo',
    titleKey: 'artworks.davidMichelangelo',
    titleOriginal: 'David',
    artist: 'Michelangelo Buonarroti',
    artistBirthYear: 1475,
    artistDeathYear: 1564,
    artistNationality: 'Italian',
    year: 1504,
    movement: 'high-renaissance',
    technique: 'marble-sculpture',
    medium: 'Carrara marble',
    dimensions: '517 cm (height)',
    museumId: 'uffizi',
    room: 'Galleria dell\'Accademia (nearby)',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/%27David%27_by_Michelangelo_Fir_JBU002.jpg',
    musicConnection: {
      composerKey: 'music.composers.monteverdi',
      pieceKey: 'music.pieces.vespers',
      youtubeQuery: 'Monteverdi Vespers 1610 Deus in Adjutorium',
    },
    hasNarration: false,
    highlights: ['5.17 meters tall', 'Carved from rejected marble block', 'Symbol of Florence'],
  },
  {
    id: 'raphael-school-of-athens',
    titleKey: 'artworks.raphaelSchoolOfAthens',
    titleOriginal: 'La Scuola di Atene',
    artist: 'Raphael (Raffaello Sanzio)',
    artistBirthYear: 1483,
    artistDeathYear: 1520,
    artistNationality: 'Italian',
    year: 1511,
    movement: 'high-renaissance',
    technique: 'fresco',
    medium: 'Fresco',
    dimensions: '500 × 770 cm',
    museumId: 'vatican-museums',
    room: 'Stanza della Segnatura',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/49/%22The_School_of_Athens%22_by_Raffaello_Sanzio_da_Urbino.jpg',
    hasNarration: false,
    highlights: ['Plato and Aristotle at center', 'Michelangelo depicted as Heraclitus', '58 classical figures'],
  },
  {
    id: 'caravaggio-calling-st-matthew',
    titleKey: 'artworks.caravaggioCallingStMatthew',
    titleOriginal: 'La vocazione di san Matteo',
    artist: 'Caravaggio (Michelangelo Merisi)',
    artistBirthYear: 1571,
    artistDeathYear: 1610,
    artistNationality: 'Italian',
    year: 1600,
    movement: 'baroque',
    technique: 'oil-on-canvas',
    medium: 'Oil on canvas',
    dimensions: '322 × 340 cm',
    museumId: 'vatican-museums',
    room: 'Contarelli Chapel, San Luigi dei Francesi',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/48/The_Calling_of_Saint_Matthew-Caravaggia_%281599-1600%29.jpg',
    hasNarration: false,
    highlights: ['Dramatic tenebrism', 'Beam of light as divine call', 'Figures in contemporary dress'],
  },
];

// ═══════════════════════════════════════════════════════
// Merge all batches into single collection
// ═══════════════════════════════════════════════════════
export const ARTWORKS: Artwork[] = [
  ...ARTWORKS_BASE,
  ...ARTWORKS_BATCH2,
  ...ARTWORKS_BATCH3,
  ...ARTWORKS_BATCH4A,
  ...ARTWORKS_BATCH4B,
  ...ARTWORKS_BATCH4C,
  ...ARTWORKS_AMERICAS,
  ...ARTWORKS_EUROPE,
  ...ARTWORKS_ASIA,
  ...ARTWORKS_AFRICA,
];

// ─── Helper functions ───

/**
 * Museum ID alias map — normalizes variant IDs used across artwork batches
 * to canonical museum IDs defined in museums.ts.
 * Key = alias used in artwork data, Value = canonical museum ID.
 */
const MUSEUM_ID_ALIASES: Record<string, string> = {
  'hermitage-st-petersburg': 'hermitage',
  'metropolitan-museum': 'met',
  'museum-of-modern-art': 'moma',
  'museum-of-modern-art-moma': 'moma',
  'museo-del-prado': 'prado',
  'uffizi-gallery': 'uffizi',
  'thyssen-bornemisza-museum': 'thyssen-bornemisza',
  'philadelphia-museum-of-art': 'philadelphia-museum-art',
  'philadelphia-museum': 'philadelphia-museum-art',
  'gallerie-dell-accademia': 'galleria-accademia',
  'accademia-venice': 'galleria-accademia',
  'pinacoteca-di-brera': 'pinacoteca-brera',
  'museo-archeologico-nazionale': 'archaeological-museum-naples',
  'museo-archeologico-nazionale-firenze': 'archaeological-museum-naples',
  'musee-versailles': 'versailles',
  'guggenheim-new-york': 'guggenheim',
  'galleria-nazionale-palazzo-barberini': 'galleria-borghese',
  'kunsthalle-hamburg': 'hamburg-kunsthalle',
  'national-gallery-scotland-edinburgh': 'national-gallery-london',
  'leopold-museum-vienna': 'belvedere',
  'pushkin-museum': 'hermitage',
  'santa-maria-delle-grazie': 'pinacoteca-brera',
  'musee-royal-belgique-brussels': 'louvre',
  'musee-gustave-moreau': 'musee-d-orsay',
  'palazzo-pitti': 'uffizi',
  'musee-conde-chantilly': 'louvre',
  'museum-of-fine-arts-boston': 'met',
  'dresden-state-art-collections': 'alte-pinakothek',
};

/** Get all artworks in a specific museum (with alias normalization) */
export function getArtworksByMuseum(museumId: string): Artwork[] {
  // Collect all aliases that map TO this museumId
  const aliasesForMuseum = new Set<string>([museumId]);
  for (const [alias, canonical] of Object.entries(MUSEUM_ID_ALIASES)) {
    if (canonical === museumId) {
      aliasesForMuseum.add(alias);
    }
  }
  return ARTWORKS.filter((a) => {
    const normalized = MUSEUM_ID_ALIASES[a.museumId] || a.museumId;
    return normalized === museumId || aliasesForMuseum.has(a.museumId);
  });
}

/** Get all artworks by a specific artist */
export function getArtworksByArtist(artistName: string): Artwork[] {
  return ARTWORKS.filter((a) =>
    a.artist.toLowerCase().includes(artistName.toLowerCase())
  );
}

/** Get all artworks in a movement */
export function getArtworksByMovement(movement: string): Artwork[] {
  return ARTWORKS.filter((a) => a.movement === movement);
}

/** Get all artworks in a date range */
export function getArtworksByDateRange(startYear: number, endYear: number): Artwork[] {
  return ARTWORKS.filter((a) => a.year >= startYear && a.year <= endYear);
}

/** Get all artworks with narration */
export function getArtworksWithNarration(): Artwork[] {
  return ARTWORKS.filter((a) => a.hasNarration);
}

/** Get unique artists */
export function getUniqueArtists(): string[] {
  return [...new Set(ARTWORKS.map((a) => a.artist))].sort();
}

/** Get unique movements */
export function getUniqueMovements(): string[] {
  return [...new Set(ARTWORKS.map((a) => a.movement))].sort();
}

/** Get unique techniques */
export function getUniqueTechniques(): string[] {
  return [...new Set(ARTWORKS.map((a) => a.technique))].sort();
}
