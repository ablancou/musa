# PROMPT PARA GEMINI PRO — Lote 2: Rococó → Romanticismo (obras 201-400)

Necesito que generes **200 obras de arte** en formato JSON TypeScript para MŪSA.

## REGLAS ESTRICTAS:
1. **SOLO artistas fallecidos hace más de 70 años** (antes de 1956). NO incluir Picasso.
2. URLs de imagen de **Wikimedia Commons** reales
3. Cada obra pertenece a un museo de nuestra base de datos
4. Las claves i18n: `artworks.camelCaseId`, el `id` es kebab-case

## PERIODOS A CUBRIR:
- Rococó (~30 obras): Watteau, Fragonard, Boucher, Tiepolo, Canaletto
- Neoclasicismo (~35 obras): David, Ingres, Canova, Kauffman, West
- Romanticismo (~60 obras): Delacroix, Turner, Friedrich, Géricault, Goya, Constable, Cole, Church, Bierstadt
- Realismo (~40 obras): Courbet, Millet, Daumier, Corot, Eakins, Homer
- Pre-Rafaelitas / Simbolismo (~35 obras): Rossetti, Millais, Hunt, Waterhouse, Moreau, Redon, Böcklin

## MOVEMENTS VÁLIDOS:
'rococo' | 'neoclassicism' | 'romanticism' | 'realism' | 'symbolism'

## TECHNIQUES VÁLIDAS:
'oil-on-canvas' | 'oil-on-panel' | 'fresco' | 'tempera' | 'watercolor' | 'marble-sculpture' | 'bronze-sculpture' | 'pastel' | 'engraving' | 'lithography'

## MUSEOS DISPONIBLES:
louvre, met, british-museum, prado, national-gallery-london, rijksmuseum, hermitage, musee-dorsay, art-institute-chicago, national-gallery-washington, tate-modern, centre-pompidou, pinakothek, albertina, kunsthistorisches, galleria-borghese, musee-rodin, staatliche-berlin, gemaldegalerie, mnw-warsaw, museum-fine-arts-budapest, ng-prague

## FORMATO EXACTO:
```typescript
{
  id: 'kebab-case-name',
  titleKey: 'artworks.camelCaseName',
  titleOriginal: 'Original title',
  artist: 'Full Name',
  artistBirthYear: 1780,
  artistDeathYear: 1867,
  artistNationality: 'French',
  year: 1830,
  movement: 'romanticism',
  technique: 'oil-on-canvas',
  medium: 'Oil on canvas',
  dimensions: '260 × 325 cm',
  museumId: 'louvre',
  imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/...',
  musicConnection: {
    composerKey: 'music.composers.berlioz',
    pieceKey: 'music.pieces.symphonyFantastique',
    youtubeQuery: 'Berlioz Symphonie Fantastique',
  },
  hasNarration: false,
},
```

## CONEXIONES MUSICALES SUGERIDAS:
- Rococó: Mozart, Haydn, C.P.E. Bach, Boccherini
- Neoclasicismo: Beethoven (temprano), Gluck, Cherubini
- Romanticismo: Beethoven, Chopin, Berlioz, Schubert, Schumann, Liszt, Wagner
- Realismo: Brahms, Dvořák, Mussorgsky, Verdi
- Simbolismo: Debussy (temprano), Fauré, Scriabin, Satie

## ENTREGA:
Array TypeScript de 200 entradas agrupadas por movimiento. Marca URLs inciertas con `// VERIFY URL`.
