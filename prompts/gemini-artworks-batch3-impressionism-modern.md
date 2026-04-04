# PROMPT PARA GEMINI PRO — Lote 3: Impresionismo → Modernismo Temprano (obras 401-650)

Necesito que generes **250 obras de arte** en formato JSON TypeScript para MŪSA.

## REGLAS ESTRICTAS:
1. **SOLO artistas fallecidos hace más de 70 años** (antes de 1956). **NO Picasso** (†1973).
2. URLs reales de **Wikimedia Commons**
3. Cada obra pertenece a un museo de nuestra base de datos
4. Las claves: `artworks.camelCaseId` / `id` kebab-case

## PERIODOS A CUBRIR:
- Impresionismo (~60 obras): Monet (al menos 15), Renoir, Degas, Pissarro, Sisley, Caillebotte, Morisot, Cassatt, Bazille
- Post-Impresionismo (~50 obras): Van Gogh (ya hay 8, agregar 10 más), Cézanne (15), Gauguin (10), Toulouse-Lautrec (8), Seurat (7)
- Art Nouveau (~20 obras): Klimt (ya hay 1, agregar 5), Mucha, Gaudí (esculturas), Lalique
- Fauvismo (~25 obras): Matisse (15), Derain, Vlaminck, Dufy, Braque (temprano)
- Expresionismo (~35 obras): Munch (ya hay 1, agregar 5), Kirchner, Kandinsky (temprano), Schiele, Kokoschka, Nolde, Marc, Beckmann
- Cubismo (~30 obras): Braque (12), Léger (8), Gris (6), Delaunay (4) — **NO PICASSO**
- Futurismo (~15 obras): Boccioni, Balla, Severini, Carrà, Russolo
- Dadá (~15 obras): Duchamp, Arp, Schwitters, Höch, Man Ray, Hausmann

## MOVEMENTS VÁLIDOS:
'impressionism' | 'post-impressionism' | 'art-nouveau' | 'fauvism' | 'expressionism' | 'cubism' | 'futurism' | 'dada'

## TECHNIQUES VÁLIDAS:
'oil-on-canvas' | 'oil-on-panel' | 'watercolor' | 'pastel' | 'mixed-media' | 'bronze-sculpture' | 'marble-sculpture' | 'engraving' | 'lithography' | 'tempera'

## MUSEOS:
louvre, met, musee-dorsay, art-institute-chicago, national-gallery-washington, moma, tate-modern, centre-pompidou, hermitage, national-gallery-london, rijksmuseum, pinakothek, albertina, kunsthistorisches, belvedere, munch-museum, musee-orangerie, musee-rodin, staatliche-berlin, gemaldegalerie, reina-sofia

## FORMATO (igual que lotes anteriores):
```typescript
{
  id: 'kebab-case-name',
  titleKey: 'artworks.camelCaseName',
  titleOriginal: 'Title original',
  artist: 'Artist Name',
  artistBirthYear: 1840,
  artistDeathYear: 1926,
  artistNationality: 'French',
  year: 1872,
  movement: 'impressionism',
  technique: 'oil-on-canvas',
  medium: 'Oil on canvas',
  dimensions: '48 × 63 cm',
  museumId: 'musee-dorsay',
  imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/...',
  musicConnection: {
    composerKey: 'music.composers.debussy',
    pieceKey: 'music.pieces.clairDeLune',
    youtubeQuery: 'Debussy Clair de Lune piano',
  },
  hasNarration: false,
},
```

## OBRAS EXISTENTES VAN GOGH (NO repetir):
starry-night, bedroom-arles, sunflowers, cafe-terrace-night, wheatfield-crows, irises, starry-night-rhone, bedroom-van-gogh

## CONEXIONES MUSICALES:
- Impresionismo: Debussy, Ravel, Fauré, Satie
- Post-Impresionismo: Debussy, Ravel, early Stravinsky, Saint-Saëns
- Art Nouveau: Scriabin, Richard Strauss, Mahler
- Fauvismo: Ravel, Stravinsky (Le Sacre), Prokofiev
- Expresionismo: Schoenberg, Berg, Webern, Bartók
- Cubismo: Stravinsky, Satie, Les Six
- Futurismo: Russolo (Intonarumori), Varèse, Antheil
- Dadá: Satie (Vexations), John Cage (early), Kurt Schwitters (Ursonate)

## ENTREGA:
Array TypeScript de 250 entradas agrupadas por movimiento. Marca URLs inciertas con `// VERIFY URL`.
