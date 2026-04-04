# PROMPT PARA GEMINI PRO — Lote 4: Surrealismo → Contemporáneo + Arte Asiático (obras 651-957)

Necesito que generes **307 obras de arte** en formato JSON TypeScript para MŪSA.

## REGLAS ESTRICTAS:
1. **SOLO artistas fallecidos hace más de 70 años** (antes de 1956). **NO Picasso** (†1973). NO Warhol (†1987). NO Basquiat (†1988). NO Haring (†1990). NO Pollock (†1956 — borderline, INCLUIR).
2. URLs reales de **Wikimedia Commons**
3. Las claves: `artworks.camelCaseId` / `id` kebab-case

## PERIODOS A CUBRIR:

### Arte Occidental Moderno (~150 obras):
- Surrealismo (~40): Dalí (15), Magritte (10), Ernst (8), Miró (7) — **NO Picasso surrealista**
- Expresionismo Abstracto (~35): Pollock (8), Rothko (8), de Kooning (5), Kline (4), Newman (4), Still (3), Gorky (3)
- Pop Art (~25): Lichtenstein (8), Warhol: **SOLO obras pre-1956 o dominio público verificado**, Oldenburg, Johns, Rauschenberg, Hamilton
  **NOTA**: Warhol murió en 1987, sus obras NO son dominio público. Solo incluir si hay imágenes bajo licencia libre verificada en Wikimedia. En caso de duda, OMITIR.
- Minimalism (~15): Judd, Flavin, Andre, LeWitt, Agnes Martin
- Color Field (~10): Frankenthaler, Louis, Noland, Olitski
- Art Brut / Outsider (~10): Dubuffet, Wölfli, Darger
- Constructivismo Ruso (~15): Malevich (5), Rodchenko (3), Tatlin (2), Lissitzky (3), Popova (2)

### Arte Asiático (~100 obras):
- Ukiyo-e Japonés (~30): Hokusai (10), Hiroshige (10), Utamaro (5), Sharaku (5)
- Pintura Clásica China (~30): Paisajes Song/Yuan (10), Ming (10), Qing (10)
- Arte Japonés Clásico (~20): Biombo (byōbu), Scroll painting, Sesshū, Hasegawa Tōhaku
- Arte Coreano / Indio (~20): Cerámica Joseon, miniaturas mogoles, esculturas Gupta, Chola bronzes

### Arte Precolombino y Africano (~57 obras):
- Arte Mesoamericano (~15): Máscaras aztecas, estelas mayas, cerámica mochica, Nazca
- Arte Africano (~15): Bronces de Benín, Nok terracottas, máscaras Fang, textiles Kente
- Arte Oceánico (~7): Moai, máscara papúa, tapa cloth
- Arte Islámico (~20): Caligrafía, azulejos, miniaturas persas, Alhambra patterns

## MOVEMENTS VÁLIDOS:
'surrealism' | 'abstract-expressionism' | 'pop-art' | 'minimalism' | 'ukiyo-e' | 'chinese-classical'

**NOTA**: Para arte que no encaje en los movements existentes, usa el más cercano. Para arte precolombino/africano/islámico, necesitaremos agregar nuevos movements después. Por ahora usa 'ancient-egyptian' como placeholder para arte antiguo no-occidental, y marca con `// TODO: new movement needed`.

## MUSEOS:
met, british-museum, louvre, hermitage, moma, tate-modern, centre-pompidou, reina-sofia, tokyo-national, national-gallery-washington, art-institute-chicago, rijksmuseum, staatliche-berlin, national-museum-indonesia, bangkok-national-museum, vnfam-hanoi, national-museum-lagos, national-museum-ghana, mmvi-rabat, tmoca-tehran, mali-lima, larco-museum, mnba-chile

## FORMATO TypeScript (igual):
```typescript
{
  id: 'kebab-case-name',
  titleKey: 'artworks.camelCaseName',
  titleOriginal: 'Title',
  artist: 'Artist Name',
  artistBirthYear: 1904,
  artistDeathYear: 1989,
  artistNationality: 'Spanish',
  year: 1931,
  movement: 'surrealism',
  technique: 'oil-on-canvas',
  medium: 'Oil on canvas',
  dimensions: '24.1 × 33 cm',
  museumId: 'moma',
  imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/...',
  musicConnection: {
    composerKey: 'music.composers.satie',
    pieceKey: 'music.pieces.gymnopedies',
    youtubeQuery: 'Erik Satie Gymnopédies piano',
  },
  hasNarration: false,
},
```

## CONEXIONES MUSICALES:
- Surrealismo: Satie, early Messiaen, Poulenc
- Expresionismo Abstracto: John Cage, Morton Feldman, Earle Brown
- Pop Art: John Adams, Philip Glass, Steve Reich
- Minimalism: Philip Glass, Steve Reich, La Monte Young, Terry Riley
- Ukiyo-e: Gagaku (Japanese court music), Shakuhachi
- Pintura China: Guqin, Erhu, Pipa
- Arte Islámico: Oud, Qawwali, Sufi music
- Precolombino: Quena, Zampoña, percusión mesoamericana

## ENTREGA:
Array TypeScript de 307 entradas agrupadas por movimiento/región. Marca URLs inciertas con `// VERIFY URL`.
