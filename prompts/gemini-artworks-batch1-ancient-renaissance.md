# PROMPT PARA GEMINI PRO — Lote 1: Arte Antiguo → Renacimiento (obras 1-200)

Necesito que generes **200 obras de arte** en formato JSON TypeScript para la base de datos de MŪSA, una plataforma educativa de Historia del Arte.

## REGLAS ESTRICTAS:
1. **SOLO artistas fallecidos hace más de 70 años** (antes de 1956). NO incluir Picasso (†1973).
2. Cada obra DEBE tener una URL de imagen real de **Wikimedia Commons** (formato: `https://upload.wikimedia.org/wikipedia/commons/...`)
3. Cada obra pertenece a un museo real de nuestra base de datos (lista abajo)
4. Las claves i18n siguen el patrón `artworks.camelCaseId`
5. El `id` es kebab-case del nombre en inglés
6. TODAS las obras deben ser reales e históricamente verificadas

## PERIODOS A CUBRIR EN ESTE LOTE:
- Arte Egipcio Antiguo (~10 obras)
- Arte Griego Antiguo (~10 obras)
- Arte Romano (~10 obras)
- Helenístico (~5 obras)
- Medieval (~15 obras)
- Gótico (~15 obras)
- Renacimiento Temprano (~35 obras)
- Alto Renacimiento (~40 obras)
- Manierismo (~20 obras)
- Barroco (~40 obras)

## MUSEOS DISPONIBLES (usar estos IDs):
louvre, met, british-museum, vatican-museums, uffizi, prado, national-gallery-london, rijksmuseum, hermitage, musee-dorsay, art-institute-chicago, national-gallery-washington, moma, mauritshuis, belvedere, munch-museum, tokyo-national, tate-modern, centre-pompidou, reina-sofia, pinakothek, albertina, kunsthistorisches, galleria-borghese, palazzo-ducale, musee-orangerie, musee-rodin, staatliche-berlin, gemaldegalerie, bargello, national-archaeological-athens, acropolis-museum, mali-lima, mnw-warsaw, museum-fine-arts-budapest, ng-prague

## MOVEMENTS VÁLIDOS (TypeScript union type):
'ancient-egyptian' | 'ancient-greek' | 'ancient-roman' | 'medieval' | 'gothic' | 'early-renaissance' | 'high-renaissance' | 'mannerism' | 'baroque' | 'hellenistic'

## TECHNIQUES VÁLIDAS:
'oil-on-canvas' | 'oil-on-panel' | 'fresco' | 'tempera' | 'watercolor' | 'marble-sculpture' | 'bronze-sculpture' | 'limestone-sculpture' | 'woodblock-print' | 'ink-on-silk' | 'ink-on-paper' | 'pastel' | 'mixed-media' | 'mosaic' | 'stained-glass' | 'engraving' | 'lithography' | 'ceramic' | 'textile'

## FORMATO EXACTO (TypeScript):
```typescript
{
  id: 'kebab-case-name',
  titleKey: 'artworks.camelCaseName',
  titleOriginal: 'Original title in artist language',
  artist: 'Full Artist Name',
  artistBirthYear: 1450,
  artistDeathYear: 1520,
  artistNationality: 'Italian',
  year: 1490,
  yearEnd: 1495,           // OPCIONAL: solo si fue creada durante un periodo
  movement: 'high-renaissance',
  technique: 'oil-on-panel',
  medium: 'Oil on poplar panel',
  dimensions: '77 × 53 cm', // OPCIONAL
  museumId: 'louvre',
  room: 'Room Name',        // OPCIONAL
  imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/...',
  musicConnection: {         // OPCIONAL pero deseable
    composerKey: 'music.composers.composerName',
    pieceKey: 'music.pieces.pieceName',
    youtubeQuery: 'Composer Piece search query',
  },
  hasNarration: false,
  highlights: ['Notable detail 1', 'Notable detail 2'], // OPCIONAL
},
```

## OBRAS EXISTENTES (NO repetir):
mona-lisa, winged-victory, venus-de-milo, liberty-leading-the-people, starry-night, bedroom-arles, sunflowers, cafe-terrace-night, wheatfield-crows, irises, starry-night-rhone, water-lilies-green, luncheon-boating, dance-moulin-galette, bal-moulin-galette, olympia, dejeuner-sur-lherbe, birth-venus, david-michelangelo, sistine-chapel-ceiling, creation-adam, school-athens, last-judgment, transfiguration, night-watch, milkmaid, girl-pearl-earring, jewish-bride, self-portrait-rembrandt, guernica-NOT-INCLUDED, persistence-memory, great-wave, wanderer-sea-fog, kiss-klimt, scream, american-gothic, nighthawks, old-guitarist, les-demoiselles-NOT-INCLUDED, composition-viii, bedroom-van-gogh

## EJEMPLO DE CONEXIÓN MUSICAL POR MOVIMIENTO:
- Ancient: Ancient music reconstruction → 'Ancient Greek lyre music reconstruction'
- Medieval: Gregorian chant, Hildegard von Bingen
- Renaissance: Josquin des Prez, Palestrina, Monteverdi
- Baroque: Bach, Vivaldi, Handel, Purcell

## ENTREGA:
Entrégame las 200 entradas como un array TypeScript listo para copiar/pegar. Agrupa por museo con comentarios separadores.

**IMPORTANTE**: Las URLs de Wikimedia Commons DEBEN ser reales. Si no estás seguro de una URL, usa el formato genérico: `https://upload.wikimedia.org/wikipedia/commons/thumb/[hash]/[filename]` y marca con un comentario `// VERIFY URL`.
