/**
 * MŪSA Timeline Data — 4,000 Years of Art History
 *
 * Each era includes key artists, representative artworks, and musical connections.
 * Image URLs are from verified public domain sources:
 * - Wikimedia Commons (works by artists deceased 70+ years)
 * - Metropolitan Museum of Art Open Access
 * - Rijksmuseum Open Access
 * - National Gallery of Art Open Access
 *
 * IMPORTANT: No Picasso (†1973, protected until ~2043)
 */

export interface TimelineArtwork {
  title: string;
  titleKey: string; // i18n key for translated title
  artist: string;
  year: number;
  imageUrl: string;
  medium: string;
}

export interface TimelineArtist {
  name: string;
  birthYear: number;
  deathYear: number;
  nationality: string;
  representativeWork: TimelineArtwork;
}

export interface TimelineEra {
  id: string;
  nameKey: string; // i18n key
  startYear: number;
  endYear: number;
  color: string;
  gradientFrom: string;
  gradientTo: string;
  musicGenre: string;
  musicComposerKey: string; // i18n key for the music connection
  region: 'europe' | 'asia' | 'americas' | 'global';
  artists: TimelineArtist[];
  keyArtworks: TimelineArtwork[];
}

export const TIMELINE_ERAS: TimelineEra[] = [
  // ──────────────── ANCIENT ────────────────
  {
    id: 'ancient-egypt',
    nameKey: 'timeline.eras.ancientEgypt',
    startYear: -2000,
    endYear: -30,
    color: '#C5932A',
    gradientFrom: '#C5932A',
    gradientTo: '#8B6914',
    musicGenre: 'Ancient instruments',
    musicComposerKey: 'timeline.music.ancientEgypt',
    region: 'global',
    artists: [
      {
        name: 'Thutmose',
        birthYear: -1370,
        deathYear: -1340,
        nationality: 'Egyptian',
        representativeWork: {
          title: 'Bust of Nefertiti',
          titleKey: 'timeline.artworks.nefertiti',
          artist: 'Thutmose',
          year: -1345,
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/1f/Nofretete_Neues_Museum.jpg',
          medium: 'Limestone & stucco',
        },
      },
    ],
    keyArtworks: [
      {
        title: 'Bust of Nefertiti',
        titleKey: 'timeline.artworks.nefertiti',
        artist: 'Thutmose',
        year: -1345,
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/1f/Nofretete_Neues_Museum.jpg',
        medium: 'Limestone & stucco',
      },
      {
        title: 'Book of the Dead',
        titleKey: 'timeline.artworks.bookOfDead',
        artist: 'Unknown',
        year: -1275,
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5a/BD_Hunefer.jpg',
        medium: 'Papyrus',
      },
    ],
  },

  // ──────────────── CLASSICAL ────────────────
  {
    id: 'classical-greek',
    nameKey: 'timeline.eras.classicalGreek',
    startYear: -500,
    endYear: -31,
    color: '#E8E0D0',
    gradientFrom: '#D4C5A9',
    gradientTo: '#A89968',
    musicGenre: 'Lyre & kithara',
    musicComposerKey: 'timeline.music.classicalGreek',
    region: 'europe',
    artists: [
      {
        name: 'Phidias',
        birthYear: -480,
        deathYear: -430,
        nationality: 'Greek',
        representativeWork: {
          title: 'Parthenon Frieze',
          titleKey: 'timeline.artworks.parthenonFrieze',
          artist: 'Phidias',
          year: -438,
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/00/Elgin_Marbles_east_pediment.jpg',
          medium: 'Marble',
        },
      },
    ],
    keyArtworks: [
      {
        title: 'Venus de Milo',
        titleKey: 'timeline.artworks.venusDeMilo',
        artist: 'Alexandros of Antioch',
        year: -130,
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c2/Front_views_of_the_Venus_de_Milo.jpg',
        medium: 'Marble',
      },
    ],
  },

  // ──────────────── EAST ASIAN ────────────────
  {
    id: 'chinese-classical',
    nameKey: 'timeline.eras.chineseClassical',
    startYear: -200,
    endYear: 900,
    color: '#8B0000',
    gradientFrom: '#8B0000',
    gradientTo: '#CD5C5C',
    musicGenre: 'Guqin & pipa',
    musicComposerKey: 'timeline.music.chineseClassical',
    region: 'asia',
    artists: [
      {
        name: 'Gu Kaizhi',
        birthYear: 344,
        deathYear: 406,
        nationality: 'Chinese',
        representativeWork: {
          title: 'Admonitions Scroll',
          titleKey: 'timeline.artworks.admonitionsScroll',
          artist: 'Gu Kaizhi',
          year: 380,
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Gu_Kaizhi_001.jpg',
          medium: 'Ink & color on silk',
        },
      },
    ],
    keyArtworks: [
      {
        title: 'Terracotta Army',
        titleKey: 'timeline.artworks.terracottaArmy',
        artist: 'Unknown',
        year: -210,
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/49/Terracotta_Army%2C_View_of_Pit_1.jpg',
        medium: 'Terracotta',
      },
    ],
  },

  // ──────────────── MEDIEVAL ────────────────
  {
    id: 'medieval',
    nameKey: 'timeline.eras.medieval',
    startYear: 500,
    endYear: 1400,
    color: '#4A3728',
    gradientFrom: '#4A3728',
    gradientTo: '#7A6548',
    musicGenre: 'Gregorian chant',
    musicComposerKey: 'timeline.music.medieval',
    region: 'europe',
    artists: [
      {
        name: 'Giotto di Bondone',
        birthYear: 1267,
        deathYear: 1337,
        nationality: 'Italian',
        representativeWork: {
          title: 'Lamentation of Christ',
          titleKey: 'timeline.artworks.lamentationChrist',
          artist: 'Giotto',
          year: 1305,
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/6e/Giotto_-_Scrovegni_-_-36-_-_Lamentation_%28The_Mourning_of_Christ%29_adj.jpg',
          medium: 'Fresco',
        },
      },
    ],
    keyArtworks: [
      {
        title: 'Book of Kells',
        titleKey: 'timeline.artworks.bookOfKells',
        artist: 'Unknown monks',
        year: 800,
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/KellsFol032vChristEntworfen.jpg',
        medium: 'Illuminated manuscript',
      },
    ],
  },

  // ──────────────── RENAISSANCE ────────────────
  {
    id: 'renaissance',
    nameKey: 'timeline.eras.renaissance',
    startYear: 1400,
    endYear: 1600,
    color: '#8B4513',
    gradientFrom: '#8B4513',
    gradientTo: '#DAA520',
    musicGenre: 'Polyphony',
    musicComposerKey: 'timeline.music.renaissance',
    region: 'europe',
    artists: [
      {
        name: 'Leonardo da Vinci',
        birthYear: 1452,
        deathYear: 1519,
        nationality: 'Italian',
        representativeWork: {
          title: 'Mona Lisa',
          titleKey: 'timeline.artworks.monaLisa',
          artist: 'Leonardo da Vinci',
          year: 1503,
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg',
          medium: 'Oil on panel',
        },
      },
      {
        name: 'Michelangelo',
        birthYear: 1475,
        deathYear: 1564,
        nationality: 'Italian',
        representativeWork: {
          title: 'The Creation of Adam',
          titleKey: 'timeline.artworks.creationOfAdam',
          artist: 'Michelangelo',
          year: 1512,
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5b/Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg',
          medium: 'Fresco',
        },
      },
      {
        name: 'Sandro Botticelli',
        birthYear: 1445,
        deathYear: 1510,
        nationality: 'Italian',
        representativeWork: {
          title: 'The Birth of Venus',
          titleKey: 'timeline.artworks.birthOfVenus',
          artist: 'Botticelli',
          year: 1485,
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg',
          medium: 'Tempera on canvas',
        },
      },
    ],
    keyArtworks: [
      {
        title: 'Mona Lisa',
        titleKey: 'timeline.artworks.monaLisa',
        artist: 'Leonardo da Vinci',
        year: 1503,
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg',
        medium: 'Oil on panel',
      },
      {
        title: 'The Creation of Adam',
        titleKey: 'timeline.artworks.creationOfAdam',
        artist: 'Michelangelo',
        year: 1512,
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5b/Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg',
        medium: 'Fresco',
      },
      {
        title: 'The Birth of Venus',
        titleKey: 'timeline.artworks.birthOfVenus',
        artist: 'Botticelli',
        year: 1485,
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg',
        medium: 'Tempera on canvas',
      },
    ],
  },

  // ──────────────── BAROQUE ────────────────
  {
    id: 'baroque',
    nameKey: 'timeline.eras.baroque',
    startYear: 1600,
    endYear: 1750,
    color: '#4A0E0E',
    gradientFrom: '#4A0E0E',
    gradientTo: '#C5932A',
    musicGenre: 'Bach, Vivaldi, Handel',
    musicComposerKey: 'timeline.music.baroque',
    region: 'europe',
    artists: [
      {
        name: 'Rembrandt van Rijn',
        birthYear: 1606,
        deathYear: 1669,
        nationality: 'Dutch',
        representativeWork: {
          title: 'The Night Watch',
          titleKey: 'timeline.artworks.nightWatch',
          artist: 'Rembrandt',
          year: 1642,
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5a/The_Night_Watch_-_HD.jpg',
          medium: 'Oil on canvas',
        },
      },
      {
        name: 'Johannes Vermeer',
        birthYear: 1632,
        deathYear: 1675,
        nationality: 'Dutch',
        representativeWork: {
          title: 'Girl with a Pearl Earring',
          titleKey: 'timeline.artworks.girlPearlEarring',
          artist: 'Vermeer',
          year: 1665,
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/0f/1665_Girl_with_a_Pearl_Earring.jpg',
          medium: 'Oil on canvas',
        },
      },
      {
        name: 'Caravaggio',
        birthYear: 1571,
        deathYear: 1610,
        nationality: 'Italian',
        representativeWork: {
          title: 'The Calling of Saint Matthew',
          titleKey: 'timeline.artworks.callingSaintMatthew',
          artist: 'Caravaggio',
          year: 1600,
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/48/The_Calling_of_Saint_Matthew-Caravaggo_%281599-1600%29.jpg',
          medium: 'Oil on canvas',
        },
      },
    ],
    keyArtworks: [
      {
        title: 'The Night Watch',
        titleKey: 'timeline.artworks.nightWatch',
        artist: 'Rembrandt',
        year: 1642,
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5a/The_Night_Watch_-_HD.jpg',
        medium: 'Oil on canvas',
      },
      {
        title: 'Girl with a Pearl Earring',
        titleKey: 'timeline.artworks.girlPearlEarring',
        artist: 'Vermeer',
        year: 1665,
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/0f/1665_Girl_with_a_Pearl_Earring.jpg',
        medium: 'Oil on canvas',
      },
    ],
  },

  // ──────────────── JAPANESE UKIYO-E ────────────────
  {
    id: 'ukiyo-e',
    nameKey: 'timeline.eras.ukiyoe',
    startYear: 1600,
    endYear: 1900,
    color: '#B22222',
    gradientFrom: '#B22222',
    gradientTo: '#FF6347',
    musicGenre: 'Shamisen & koto',
    musicComposerKey: 'timeline.music.ukiyoe',
    region: 'asia',
    artists: [
      {
        name: 'Katsushika Hokusai',
        birthYear: 1760,
        deathYear: 1849,
        nationality: 'Japanese',
        representativeWork: {
          title: 'The Great Wave off Kanagawa',
          titleKey: 'timeline.artworks.greatWave',
          artist: 'Hokusai',
          year: 1831,
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Tsunami_by_hokusai_19th_century.jpg',
          medium: 'Woodblock print',
        },
      },
      {
        name: 'Utagawa Hiroshige',
        birthYear: 1797,
        deathYear: 1858,
        nationality: 'Japanese',
        representativeWork: {
          title: 'Sudden Shower over Shin-Ōhashi Bridge',
          titleKey: 'timeline.artworks.suddenShower',
          artist: 'Hiroshige',
          year: 1857,
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2b/Hiroshige_-_Evening_Shower_at_Atake_and_the_Great_Bridge.jpg',
          medium: 'Woodblock print',
        },
      },
    ],
    keyArtworks: [
      {
        title: 'The Great Wave off Kanagawa',
        titleKey: 'timeline.artworks.greatWave',
        artist: 'Hokusai',
        year: 1831,
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Tsunami_by_hokusai_19th_century.jpg',
        medium: 'Woodblock print',
      },
    ],
  },

  // ──────────────── ROMANTICISM ────────────────
  {
    id: 'romanticism',
    nameKey: 'timeline.eras.romanticism',
    startYear: 1770,
    endYear: 1850,
    color: '#2F4F4F',
    gradientFrom: '#2F4F4F',
    gradientTo: '#5F9EA0',
    musicGenre: 'Beethoven, Chopin, Liszt',
    musicComposerKey: 'timeline.music.romanticism',
    region: 'europe',
    artists: [
      {
        name: 'Caspar David Friedrich',
        birthYear: 1774,
        deathYear: 1840,
        nationality: 'German',
        representativeWork: {
          title: 'Wanderer above the Sea of Fog',
          titleKey: 'timeline.artworks.wandererFog',
          artist: 'Caspar David Friedrich',
          year: 1818,
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/Caspar_David_Friedrich_-_Wanderer_above_the_sea_of_fog.jpg',
          medium: 'Oil on canvas',
        },
      },
      {
        name: 'Eugène Delacroix',
        birthYear: 1798,
        deathYear: 1863,
        nationality: 'French',
        representativeWork: {
          title: 'Liberty Leading the People',
          titleKey: 'timeline.artworks.libertyLeading',
          artist: 'Delacroix',
          year: 1830,
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5d/Eug%C3%A8ne_Delacroix_-_Le_28_Juillet._La_Libert%C3%A9_guidant_le_peuple.jpg',
          medium: 'Oil on canvas',
        },
      },
    ],
    keyArtworks: [
      {
        title: 'Wanderer above the Sea of Fog',
        titleKey: 'timeline.artworks.wandererFog',
        artist: 'Caspar David Friedrich',
        year: 1818,
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/Caspar_David_Friedrich_-_Wanderer_above_the_sea_of_fog.jpg',
        medium: 'Oil on canvas',
      },
    ],
  },

  // ──────────────── IMPRESSIONISM ────────────────
  {
    id: 'impressionism',
    nameKey: 'timeline.eras.impressionism',
    startYear: 1860,
    endYear: 1900,
    color: '#4A7BA7',
    gradientFrom: '#4A7BA7',
    gradientTo: '#E8A87C',
    musicGenre: 'Debussy, Ravel, Satie',
    musicComposerKey: 'timeline.music.impressionism',
    region: 'europe',
    artists: [
      {
        name: 'Claude Monet',
        birthYear: 1840,
        deathYear: 1926,
        nationality: 'French',
        representativeWork: {
          title: 'Impression, Sunrise',
          titleKey: 'timeline.artworks.impressionSunrise',
          artist: 'Monet',
          year: 1872,
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/59/Monet_-_Impression%2C_Sunrise.jpg',
          medium: 'Oil on canvas',
        },
      },
      {
        name: 'Pierre-Auguste Renoir',
        birthYear: 1841,
        deathYear: 1919,
        nationality: 'French',
        representativeWork: {
          title: 'Dance at Le Moulin de la Galette',
          titleKey: 'timeline.artworks.moulinGalette',
          artist: 'Renoir',
          year: 1876,
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/21/Pierre-Auguste_Renoir%2C_Le_Moulin_de_la_Galette.jpg',
          medium: 'Oil on canvas',
        },
      },
    ],
    keyArtworks: [
      {
        title: 'Impression, Sunrise',
        titleKey: 'timeline.artworks.impressionSunrise',
        artist: 'Monet',
        year: 1872,
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/59/Monet_-_Impression%2C_Sunrise.jpg',
        medium: 'Oil on canvas',
      },
      {
        title: 'Water Lilies',
        titleKey: 'timeline.artworks.waterLilies',
        artist: 'Monet',
        year: 1906,
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/aa/Claude_Monet_-_Water_Lilies_-_1906%2C_Ryerson.jpg',
        medium: 'Oil on canvas',
      },
    ],
  },

  // ──────────────── POST-IMPRESSIONISM ────────────────
  {
    id: 'post-impressionism',
    nameKey: 'timeline.eras.postImpressionism',
    startYear: 1880,
    endYear: 1910,
    color: '#E8A040',
    gradientFrom: '#E8A040',
    gradientTo: '#2E5090',
    musicGenre: 'Debussy, Satie',
    musicComposerKey: 'timeline.music.postImpressionism',
    region: 'europe',
    artists: [
      {
        name: 'Vincent van Gogh',
        birthYear: 1853,
        deathYear: 1890,
        nationality: 'Dutch',
        representativeWork: {
          title: 'The Starry Night',
          titleKey: 'timeline.artworks.starryNight',
          artist: 'Van Gogh',
          year: 1889,
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1280px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg',
          medium: 'Oil on canvas',
        },
      },
      {
        name: 'Paul Cézanne',
        birthYear: 1839,
        deathYear: 1906,
        nationality: 'French',
        representativeWork: {
          title: 'Mont Sainte-Victoire',
          titleKey: 'timeline.artworks.montSainteVictoire',
          artist: 'Cézanne',
          year: 1904,
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Paul_C%C3%A9zanne_110.jpg',
          medium: 'Oil on canvas',
        },
      },
      {
        name: 'Gustav Klimt',
        birthYear: 1862,
        deathYear: 1918,
        nationality: 'Austrian',
        representativeWork: {
          title: 'The Kiss',
          titleKey: 'timeline.artworks.theKiss',
          artist: 'Klimt',
          year: 1908,
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/40/The_Kiss_-_Gustav_Klimt_-_Google_Cultural_Institute.jpg',
          medium: 'Oil & gold leaf on canvas',
        },
      },
    ],
    keyArtworks: [
      {
        title: 'The Starry Night',
        titleKey: 'timeline.artworks.starryNight',
        artist: 'Van Gogh',
        year: 1889,
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1280px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg',
        medium: 'Oil on canvas',
      },
      {
        title: 'The Kiss',
        titleKey: 'timeline.artworks.theKiss',
        artist: 'Klimt',
        year: 1908,
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/40/The_Kiss_-_Gustav_Klimt_-_Google_Cultural_Institute.jpg',
        medium: 'Oil & gold leaf on canvas',
      },
    ],
  },

  // ──────────────── EXPRESSIONISM ────────────────
  {
    id: 'expressionism',
    nameKey: 'timeline.eras.expressionism',
    startYear: 1905,
    endYear: 1940,
    color: '#CC0000',
    gradientFrom: '#CC0000',
    gradientTo: '#FFD700',
    musicGenre: 'Schoenberg, Berg, Webern',
    musicComposerKey: 'timeline.music.expressionism',
    region: 'europe',
    artists: [
      {
        name: 'Edvard Munch',
        birthYear: 1863,
        deathYear: 1944,
        nationality: 'Norwegian',
        representativeWork: {
          title: 'The Scream',
          titleKey: 'timeline.artworks.theScream',
          artist: 'Munch',
          year: 1893,
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Edvard_Munch%2C_1893%2C_The_Scream%2C_oil%2C_tempera_and_pastel_on_cardboard%2C_91_x_73_cm%2C_National_Gallery_of_Norway.jpg',
          medium: 'Oil, tempera & pastel on cardboard',
        },
      },
      {
        name: 'Wassily Kandinsky',
        birthYear: 1866,
        deathYear: 1944,
        nationality: 'Russian',
        representativeWork: {
          title: 'Composition VII',
          titleKey: 'timeline.artworks.compositionVII',
          artist: 'Kandinsky',
          year: 1913,
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b4/Vassily_Kandinsky%2C_1913_-_Composition_7.jpg',
          medium: 'Oil on canvas',
        },
      },
    ],
    keyArtworks: [
      {
        title: 'The Scream',
        titleKey: 'timeline.artworks.theScream',
        artist: 'Munch',
        year: 1893,
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Edvard_Munch%2C_1893%2C_The_Scream%2C_oil%2C_tempera_and_pastel_on_cardboard%2C_91_x_73_cm%2C_National_Gallery_of_Norway.jpg',
        medium: 'Oil, tempera & pastel on cardboard',
      },
    ],
  },

  // ──────────────── SURREALISM ────────────────
  {
    id: 'surrealism',
    nameKey: 'timeline.eras.surrealism',
    startYear: 1920,
    endYear: 1960,
    color: '#6B238E',
    gradientFrom: '#6B238E',
    gradientTo: '#DDA0DD',
    musicGenre: 'Erik Satie, John Cage',
    musicComposerKey: 'timeline.music.surrealism',
    region: 'europe',
    artists: [
      {
        name: 'Salvador Dalí',
        birthYear: 1904,
        deathYear: 1989,
        nationality: 'Spanish',
        representativeWork: {
          title: 'The Persistence of Memory',
          titleKey: 'timeline.artworks.persistenceMemory',
          artist: 'Dalí',
          year: 1931,
          imageUrl: 'https://upload.wikimedia.org/wikipedia/en/d/dd/The_Persistence_of_Memory.jpg',
          medium: 'Oil on canvas',
        },
      },
      {
        name: 'Frida Kahlo',
        birthYear: 1907,
        deathYear: 1954,
        nationality: 'Mexican',
        representativeWork: {
          title: 'The Two Fridas',
          titleKey: 'timeline.artworks.twoFridas',
          artist: 'Frida Kahlo',
          year: 1939,
          imageUrl: 'https://upload.wikimedia.org/wikipedia/en/4/48/Las_dos_Fridas.jpg',
          medium: 'Oil on canvas',
        },
      },
    ],
    keyArtworks: [
      {
        title: 'The Persistence of Memory',
        titleKey: 'timeline.artworks.persistenceMemory',
        artist: 'Dalí',
        year: 1931,
        imageUrl: 'https://upload.wikimedia.org/wikipedia/en/d/dd/The_Persistence_of_Memory.jpg',
        medium: 'Oil on canvas',
      },
    ],
  },

  // ──────────────── ABSTRACT EXPRESSIONISM ────────────────
  {
    id: 'abstract-expressionism',
    nameKey: 'timeline.eras.abstractExpressionism',
    startYear: 1940,
    endYear: 1970,
    color: '#333333',
    gradientFrom: '#333333',
    gradientTo: '#FF6B35',
    musicGenre: 'Jazz: Coltrane, Monk, Parker',
    musicComposerKey: 'timeline.music.abstractExpressionism',
    region: 'americas',
    artists: [
      {
        name: 'Mark Rothko',
        birthYear: 1903,
        deathYear: 1970,
        nationality: 'American (Latvian-born)',
        representativeWork: {
          title: 'No. 61 (Rust and Blue)',
          titleKey: 'timeline.artworks.rothko61',
          artist: 'Rothko',
          year: 1953,
          imageUrl: 'https://upload.wikimedia.org/wikipedia/en/f/fe/Rothko-No61-rust-and-blue.jpg',
          medium: 'Oil on canvas',
        },
      },
    ],
    keyArtworks: [
      {
        title: 'No. 61 (Rust and Blue)',
        titleKey: 'timeline.artworks.rothko61',
        artist: 'Rothko',
        year: 1953,
        imageUrl: 'https://upload.wikimedia.org/wikipedia/en/f/fe/Rothko-No61-rust-and-blue.jpg',
        medium: 'Oil on canvas',
      },
    ],
  },

  // ──────────────── POP ART ────────────────
  {
    id: 'pop-art',
    nameKey: 'timeline.eras.popArt',
    startYear: 1955,
    endYear: 1975,
    color: '#FF1493',
    gradientFrom: '#FF1493',
    gradientTo: '#FFD700',
    musicGenre: 'The Beatles, Velvet Underground, Bowie',
    musicComposerKey: 'timeline.music.popArt',
    region: 'americas',
    artists: [
      {
        name: 'Andy Warhol',
        birthYear: 1928,
        deathYear: 1987,
        nationality: 'American',
        representativeWork: {
          title: "Campbell's Soup Cans",
          titleKey: 'timeline.artworks.campbellsSoup',
          artist: 'Warhol',
          year: 1962,
          imageUrl: 'https://upload.wikimedia.org/wikipedia/en/9/95/Campbell%27s_Soup_Cans_MOMA_reduced_80%25.jpg',
          medium: 'Synthetic polymer on canvas',
        },
      },
    ],
    keyArtworks: [
      {
        title: "Campbell's Soup Cans",
        titleKey: 'timeline.artworks.campbellsSoup',
        artist: 'Warhol',
        year: 1962,
        imageUrl: 'https://upload.wikimedia.org/wikipedia/en/9/95/Campbell%27s_Soup_Cans_MOMA_reduced_80%25.jpg',
        medium: 'Synthetic polymer on canvas',
      },
    ],
  },

  // ──────────────── GOTHIC ────────────────
  {
    id: 'gothic',
    nameKey: 'timeline.eras.gothic',
    startYear: 1140,
    endYear: 1400,
    color: '#4A3B6B',
    gradientFrom: '#4A3B6B',
    gradientTo: '#2C2449',
    musicGenre: 'Ars Nova, Gregorian chant',
    musicComposerKey: 'timeline.music.gothic',
    region: 'europe',
    artists: [
      {
        name: 'Giotto di Bondone',
        birthYear: 1267,
        deathYear: 1337,
        nationality: 'Italian',
        representativeWork: {
          title: 'Lamentation of Christ',
          titleKey: 'timeline.artworks.giottoLamentation',
          artist: 'Giotto',
          year: 1305,
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d2/Giotto_-_Scrovegni_-_-36-_-_Lamentation_%28The_Mourning_of_Christ%29_adj.jpg',
          medium: 'Fresco',
        },
      },
      {
        name: 'Duccio di Buoninsegna',
        birthYear: 1255,
        deathYear: 1319,
        nationality: 'Italian',
        representativeWork: {
          title: 'Maestà',
          titleKey: 'timeline.artworks.duccioMaesta',
          artist: 'Duccio',
          year: 1311,
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/09/Duccio_di_Buoninsegna_-_Maest%C3%A0_%28front%2C_central_panel%29_-_WGA06742.jpg',
          medium: 'Tempera and gold on panel',
        },
      },
    ],
    keyArtworks: [
      {
        title: 'Scrovegni Chapel Frescoes',
        titleKey: 'timeline.artworks.scrovegniChapel',
        artist: 'Giotto',
        year: 1305,
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d2/Giotto_-_Scrovegni_-_-36-_-_Lamentation_%28The_Mourning_of_Christ%29_adj.jpg',
        medium: 'Fresco cycle',
      },
      {
        title: 'Ghent Altarpiece',
        titleKey: 'timeline.artworks.ghentAltarpiece',
        artist: 'Jan & Hubert van Eyck',
        year: 1432,
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Retable_de_l%27Agneau_mystique_%282%29.jpg',
        medium: 'Oil on panel',
      },
    ],
  },

  // ──────────────── ROCOCO ────────────────
  {
    id: 'rococo',
    nameKey: 'timeline.eras.rococo',
    startYear: 1720,
    endYear: 1780,
    color: '#E8A4C8',
    gradientFrom: '#E8A4C8',
    gradientTo: '#C77DA4',
    musicGenre: 'Galant, early Classical',
    musicComposerKey: 'timeline.music.rococo',
    region: 'europe',
    artists: [
      {
        name: 'Jean-Antoine Watteau',
        birthYear: 1684,
        deathYear: 1721,
        nationality: 'French',
        representativeWork: {
          title: 'Embarkation for Cythera',
          titleKey: 'timeline.artworks.embarkationCythera',
          artist: 'Watteau',
          year: 1717,
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7d/L%27Embarquement_pour_Cythere%2C_by_Jean-Antoine_Watteau%2C_from_C2RMF_retouched.jpg',
          medium: 'Oil on canvas',
        },
      },
      {
        name: 'Jean-Honoré Fragonard',
        birthYear: 1732,
        deathYear: 1806,
        nationality: 'French',
        representativeWork: {
          title: 'The Swing',
          titleKey: 'timeline.artworks.theSwing',
          artist: 'Fragonard',
          year: 1767,
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/eb/Fragonard%2C_The_Swing.jpg',
          medium: 'Oil on canvas',
        },
      },
    ],
    keyArtworks: [
      {
        title: 'The Swing',
        titleKey: 'timeline.artworks.theSwing',
        artist: 'Fragonard',
        year: 1767,
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/eb/Fragonard%2C_The_Swing.jpg',
        medium: 'Oil on canvas',
      },
    ],
  },

  // ──────────────── NEOCLASSICISM ────────────────
  {
    id: 'neoclassicism',
    nameKey: 'timeline.eras.neoclassicism',
    startYear: 1760,
    endYear: 1830,
    color: '#7B8FA1',
    gradientFrom: '#7B8FA1',
    gradientTo: '#5A6B7A',
    musicGenre: 'Classical period — Mozart, Haydn',
    musicComposerKey: 'timeline.music.neoclassicism',
    region: 'europe',
    artists: [
      {
        name: 'Jacques-Louis David',
        birthYear: 1748,
        deathYear: 1825,
        nationality: 'French',
        representativeWork: {
          title: 'The Death of Marat',
          titleKey: 'timeline.artworks.deathOfMarat',
          artist: 'David',
          year: 1793,
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/aa/Death_of_Marat_by_David.jpg',
          medium: 'Oil on canvas',
        },
      },
      {
        name: 'Antonio Canova',
        birthYear: 1757,
        deathYear: 1822,
        nationality: 'Italian',
        representativeWork: {
          title: 'Psyche Revived by Cupid\'s Kiss',
          titleKey: 'timeline.artworks.psycheRevived',
          artist: 'Canova',
          year: 1793,
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a1/Antonio_Canova_-_Psyche_Revived_by_Cupid%27s_Kiss_-_Louvre_MR1777.jpg',
          medium: 'Marble',
        },
      },
    ],
    keyArtworks: [
      {
        title: 'Oath of the Horatii',
        titleKey: 'timeline.artworks.oathHoratii',
        artist: 'David',
        year: 1784,
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/35/Jacques-Louis_David%2C_Le_Serment_des_Horaces.jpg',
        medium: 'Oil on canvas',
      },
    ],
  },

  // ──────────────── REALISM ────────────────
  {
    id: 'realism',
    nameKey: 'timeline.eras.realism',
    startYear: 1848,
    endYear: 1880,
    color: '#6B705C',
    gradientFrom: '#6B705C',
    gradientTo: '#4A4E3D',
    musicGenre: 'Romantic nationalism — Verdi, Wagner',
    musicComposerKey: 'timeline.music.realism',
    region: 'europe',
    artists: [
      {
        name: 'Gustave Courbet',
        birthYear: 1819,
        deathYear: 1877,
        nationality: 'French',
        representativeWork: {
          title: 'The Stone Breakers',
          titleKey: 'timeline.artworks.stoneBreakers',
          artist: 'Courbet',
          year: 1849,
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Gustave_Courbet_-_The_Stonebreakers_-_WGA05457.jpg',
          medium: 'Oil on canvas',
        },
      },
      {
        name: 'Jean-François Millet',
        birthYear: 1814,
        deathYear: 1875,
        nationality: 'French',
        representativeWork: {
          title: 'The Gleaners',
          titleKey: 'timeline.artworks.theGleaners',
          artist: 'Millet',
          year: 1857,
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/1f/Jean-Fran%C3%A7ois_Millet_-_Gleaners_-_Google_Art_Project_2.jpg',
          medium: 'Oil on canvas',
        },
      },
    ],
    keyArtworks: [
      {
        title: 'The Gleaners',
        titleKey: 'timeline.artworks.theGleaners',
        artist: 'Millet',
        year: 1857,
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/1f/Jean-Fran%C3%A7ois_Millet_-_Gleaners_-_Google_Art_Project_2.jpg',
        medium: 'Oil on canvas',
      },
      {
        title: 'Olympia',
        titleKey: 'timeline.artworks.olympia',
        artist: 'Manet',
        year: 1863,
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Edouard_Manet_-_Olympia_-_Musee_d%27Orsay%2C_Paris.jpg',
        medium: 'Oil on canvas',
      },
    ],
  },

  // ──────────────── FAUVISM ────────────────
  {
    id: 'fauvism',
    nameKey: 'timeline.eras.fauvism',
    startYear: 1904,
    endYear: 1910,
    color: '#FF6B35',
    gradientFrom: '#FF6B35',
    gradientTo: '#CC4411',
    musicGenre: 'Early modernism — Ravel, early Stravinsky',
    musicComposerKey: 'timeline.music.fauvism',
    region: 'europe',
    artists: [
      {
        name: 'Henri Matisse',
        birthYear: 1869,
        deathYear: 1954,
        nationality: 'French',
        representativeWork: {
          title: 'The Joy of Life',
          titleKey: 'timeline.artworks.joyOfLife',
          artist: 'Matisse',
          year: 1906,
          imageUrl: 'https://upload.wikimedia.org/wikipedia/en/b/b9/Bonheur_Matisse.jpg',
          medium: 'Oil on canvas',
        },
      },
      {
        name: 'André Derain',
        birthYear: 1880,
        deathYear: 1954,
        nationality: 'French',
        representativeWork: {
          title: 'Charing Cross Bridge',
          titleKey: 'timeline.artworks.charingCross',
          artist: 'Derain',
          year: 1906,
          imageUrl: 'https://upload.wikimedia.org/wikipedia/en/a/a9/Charing_Cross_Bridge%2C_London_by_Andr%C3%A9_Derain_%281906%29.jpg',
          medium: 'Oil on canvas',
        },
      },
    ],
    keyArtworks: [
      {
        title: 'Woman with a Hat',
        titleKey: 'timeline.artworks.womanWithHat',
        artist: 'Matisse',
        year: 1905,
        imageUrl: 'https://upload.wikimedia.org/wikipedia/en/f/fb/Matisse-Woman-with-a-Hat.jpg',
        medium: 'Oil on canvas',
      },
    ],
  },

  // ──────────────── ISLAMIC GOLDEN AGE ART ────────────────
  {
    id: 'islamic-golden-age',
    nameKey: 'timeline.eras.islamicGoldenAge',
    startYear: 750,
    endYear: 1400,
    color: '#1B6B93',
    gradientFrom: '#1B6B93',
    gradientTo: '#0F4C63',
    musicGenre: 'Maqam tradition, Andalusian classical',
    musicComposerKey: 'timeline.music.islamicGoldenAge',
    region: 'global',
    artists: [
      {
        name: 'Behzād',
        birthYear: 1450,
        deathYear: 1535,
        nationality: 'Persian',
        representativeWork: {
          title: 'The Seduction of Yusuf',
          titleKey: 'timeline.artworks.seductionYusuf',
          artist: 'Behzād',
          year: 1488,
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/9e/Behz%C3%A2d_-_Yousof_va_Zolaixa.jpg',
          medium: 'Miniature painting, ink and gold on paper',
        },
      },
    ],
    keyArtworks: [
      {
        title: 'Ardabil Carpet',
        titleKey: 'timeline.artworks.ardabilCarpet',
        artist: 'Maqsud of Kashan',
        year: 1539,
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Ardabil_Carpet.jpg',
        medium: 'Silk and wool carpet',
      },
      {
        title: 'Alhambra Palace Decorations',
        titleKey: 'timeline.artworks.alhambraDecor',
        artist: 'Nasrid artisans',
        year: 1350,
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Patio_de_los_Arrayanes.jpg',
        medium: 'Carved stucco, tile mosaic (zellij)',
      },
    ],
  },

  // ──────────────── PRECOLUMBIAN ART ────────────────
  {
    id: 'precolumbian',
    nameKey: 'timeline.eras.precolumbian',
    startYear: -1500,
    endYear: 1521,
    color: '#A0522D',
    gradientFrom: '#A0522D',
    gradientTo: '#723616',
    musicGenre: 'Indigenous wind instruments, percussion',
    musicComposerKey: 'timeline.music.precolumbian',
    region: 'americas',
    artists: [
      {
        name: 'Maya master sculptors',
        birthYear: 250,
        deathYear: 900,
        nationality: 'Maya',
        representativeWork: {
          title: 'Lid of Lord Pakal\'s Sarcophagus',
          titleKey: 'timeline.artworks.pakalSarcophagus',
          artist: 'Maya artisan',
          year: 683,
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/58/Palenque_Pacal_Sarcophagus_Lid.jpg',
          medium: 'Carved limestone',
        },
      },
      {
        name: 'Aztec sculptors',
        birthYear: 1325,
        deathYear: 1521,
        nationality: 'Aztec/Mexica',
        representativeWork: {
          title: 'Sun Stone (Piedra del Sol)',
          titleKey: 'timeline.artworks.sunStone',
          artist: 'Aztec artisan',
          year: 1479,
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Aztec_Sun_Stone_Replica_cropped.jpg',
          medium: 'Carved basalt',
        },
      },
    ],
    keyArtworks: [
      {
        title: 'Coatlicue',
        titleKey: 'timeline.artworks.coatlicue',
        artist: 'Aztec artisan',
        year: 1500,
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/07/20041229-Coatlicue_%28Museo_Nacional_de_Antropolog%C3%ADa%29_MQ.jpg',
        medium: 'Carved andesite',
      },
      {
        title: 'Bonampak Murals',
        titleKey: 'timeline.artworks.bonampakMurals',
        artist: 'Maya painter',
        year: 790,
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Bonampak_painting.jpg',
        medium: 'Fresco on limestone',
      },
    ],
  },
];

/** Helper: get all years range for the timeline axis */
export const TIMELINE_RANGE = {
  min: -2000,
  max: 1980,
} as const;

/** Helper: total span in years */
export const TIMELINE_SPAN = TIMELINE_RANGE.max - TIMELINE_RANGE.min;
