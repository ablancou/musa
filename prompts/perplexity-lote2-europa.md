# LOTE 2: EUROPA (España, Países Bajos, Reino Unido, Noruega, Polonia, Hungría, Chequia, Austria)

## CONTEXTO
Estoy construyendo MŪSA, una plataforma educativa de Historia del Arte. Necesito URLs de imágenes 100% libres de derechos de autor para cada museo. Tu trabajo es buscar en internet la URL directa a cada imagen y verificar que funcione.

## REGLAS LEGALES — OBLIGATORIAS, SIN EXCEPCIÓN

### ¿Qué es dominio público?
Una obra es dominio público cuando el artista falleció hace **más de 70 años** (antes de 1956, ya que estamos en 2026). La FOTOGRAFÍA de la obra también debe ser libre.

### Fuentes de imágenes PERMITIDAS:
1. **Wikimedia Commons** — archivos marcados como "Public domain" o "CC0"
2. **Met Museum Open Access**, **Rijksmuseum**, **Art Institute of Chicago**, **National Gallery of Art** (Washington)
3. Fotografías de museos publicadas bajo licencia libre

### PROHIBIDO:
- ❌ Picasso (†1973), Dalí (†1989), Warhol (†1987), Miró (†1983), Chagall (†1985)
- ❌ CUALQUIER artista fallecido después de 1955
- ❌ Imágenes de Getty Images, Alamy, Bridgeman, bancos comerciales
- ❌ Imágenes marcadas como "Fair use" o "Non-free" en Wikimedia
- ❌ URLs de páginas web — solo URLs directas a archivos .jpg/.png

### URL correcta:
- ✅ `https://upload.wikimedia.org/wikipedia/commons/...archivo.jpg`
- ❌ `https://commons.wikimedia.org/wiki/File:...`
- ❌ `https://en.wikipedia.org/wiki/...`

## FORMATO JSON

```json
{
  "museumId": "id-exacto",
  "artworks": [
    {
      "id": "kebab-case-unico",
      "titleKey": "artworks.camelCaseKey",
      "titleOriginal": "Título original",
      "artist": "Nombre completo",
      "artistBirthYear": 1800,
      "artistDeathYear": 1900,
      "artistNationality": "Nationality",
      "year": 1850,
      "movement": "id-movimiento",
      "technique": "id-tecnica",
      "medium": "Descripción del medio",
      "dimensions": "alto × ancho cm",
      "imageUrl": "URL DIRECTA VERIFICADA",
      "hasNarration": false
    }
  ]
}
```

### Movimientos: ancient-egyptian, hellenistic, classical-greek, roman, byzantine, romanesque, gothic, early-renaissance, high-renaissance, mannerism, baroque, rococo, neoclassicism, romanticism, realism, impressionism, post-impressionism, symbolism, art-nouveau, fauvism, expressionism, cubism, futurism, dada, surrealism, abstract-expressionism, minimalism, ukiyo-e, pre-columbian, mexican-muralism

### Técnicas: oil-on-canvas, oil-on-panel, oil-on-wood, fresco, tempera, watercolor, pastel, ink-on-paper, graphite, charcoal, etching, engraving, lithograph, woodcut, marble-sculpture, bronze-sculpture, terracotta, ceramic, mosaic, textile, goldwork, mixed-media

---

## MUSEOS DE ESTE LOTE

### 1. van-gogh-museum | Amsterdam, Netherlands — ⭐ MÁXIMA PRIORIDAD
Van Gogh †1890 (136 años ✅). Dame **15 obras** — las más icónicas de su colección:
- Sunflowers (la versión de Amsterdam)
- Bedroom in Arles
- Almond Blossom
- Wheatfield with Crows
- Self-Portrait as a Painter
- The Potato Eaters
- Skull of a Skeleton with Burning Cigarette
- The Yellow House
- Wheatfield Under Thunderclouds
- Self-Portrait with Grey Felt Hat
- The Harvest
- Starry Night Over the Rhône (puede estar en Orsay, verificar)
- Irises (puede estar en Getty, verificar)
- View of Arles with Irises in the Foreground
- The Sower

### 2. reina-sofia | Madrid, Spain
- Guernica (Picasso) ❌ — NO se puede usar
- Dalí ❌, Miró ❌
- Buscar obras pre-1955 de artistas DP:
  - Juan Gris (†1927 ✅)
  - María Blanchard (†1932 ✅)
  - Julio González (†1942 ✅)
  - Ángeles Santos (†2013 ❌)
  - Joaquín Sorolla (†1923 ✅) si tiene obras aquí
8-10 obras

### 3. guggenheim-bilbao | Bilbao, Spain
- Colección mayoritariamente contemporánea
- Buscar obras históricas de préstamo o colección permanente
- Kandinsky (†1944 ✅) si tiene obras
- Si no hay suficientes DP, dame solo 3-5

### 4. teatro-museo-dali | Figueres, Spain
- Dalí (†1989) ❌ — NO se puede usar
- Buscar otras obras en la colección si existen
- Si es casi todo Dalí, dame 0 y explica por qué
- El Greco (†1614 ✅) si tiene alguna obra

### 5. va-museum | London, United Kingdom
Victoria & Albert Museum — artes decorativas y esculturas:
- William Morris (†1896 ✅): textiles, diseños
- Raphael Cartoons (†1520 ✅)
- Esculturas renacentistas
- Constable (†1837 ✅)
- Canova (†1822 ✅): Three Graces
10 obras

### 6. munch-museum | Oslo, Norway
Edvard Munch †1944 (82 años ✅). Agregar a la 1 obra existente:
- The Scream (versión tempera/cartón 1910)
- Madonna (1894)
- The Sick Child (1886)
- Puberty (1894-95)
- The Dance of Life (1899-1900)
- Vampire (1895)
- Ashes (1894)
8 obras adicionales

### 7. mnw-warsaw | Warsaw, Poland
- Jan Matejko (†1893 ✅): Battle of Grunwald, Stańczyk
- Józef Chełmoński (†1914 ✅)
- Aleksander Gierymski (†1901 ✅)
8 obras

### 8. museum-fine-arts-budapest | Budapest, Hungary
- El Greco (†1614 ✅): Penitent Magdalene
- Raphael (†1520 ✅)
- Murillo (†1682 ✅)
- Goya (†1828 ✅)
- Lucas Cranach (†1553 ✅)
10 obras

### 9. ng-prague | Prague, Czech Republic
- Alphonse Mucha (†1939 ✅): The Slav Epic series, carteles Art Nouveau
- Karel Škréta (†1674 ✅)
- arte bohemio medieval y barroco
8 obras

### 10. musee-orangerie | Paris, France — agregar obras (solo tiene 1)
- Monet Water Lilies — ⭐ PRIORIDAD: los 8 paneles de Nymphéas
- Renoir (†1919 ✅)
- Cézanne (†1906 ✅)
- Modigliani (†1920 ✅)
- Henri Rousseau (†1910 ✅)
8 obras adicionales, PRIORIZAR MONET

### 11. musee-rodin | Paris, France — agregar obras (tiene 3)
Auguste Rodin †1917 (109 años ✅):
- The Kiss
- The Gates of Hell
- Monument to Balzac
- The Walking Man
- The Cathedral (Las Manos)
- Ugolino
6 obras adicionales

### 12. centre-pompidou | Paris, France — agregar obras (tiene 1)
- Matisse (†1954 ✅): obras fauvistas
- Kandinsky (†1944 ✅): composiciones abstractas
- Fernand Léger (†1955 ✅): Contraste de formas
- Georges Braque (†1963 ✅): paisajes cubistas — ⚠️ verificar: 63 años, NO es DP aún ❌
- Robert Delaunay (†1941 ✅): Rythme series
- Amedeo Modigliani (†1920 ✅)
8 obras adicionales

### 13. thyssen-bornemisza | Madrid, Spain — agregar obras (tiene 1)
- Jan van Eyck (†1441 ✅): The Annunciation Diptych
- Caravaggio (†1610 ✅): Saint Catherine of Alexandria
- Ghirlandaio (†1494 ✅): Portrait of Giovanna Tornabuoni
- Degas (†1917 ✅)
- Monet (†1926 ✅) — PRIORIDAD
6 obras adicionales

### 14. lacma | Los Angeles, United States — agregar obras (tiene 1)
- Monet (†1926 ✅) — PRIORIDAD: buscar qué Monets tienen
- Rembrandt (†1669 ✅)
- Rivera murales ❌ (†1957)
- Buscar colección precolombina
6 obras adicionales

---

## RECORDATORIO FINAL
- VERIFICA cada URL accediendo al enlace
- Para Van Gogh Museum: necesito las 15 obras más importantes con URLs verificadas
- Para museos que resulten ser casi todo arte contemporáneo protegido, es válido dar menos obras
- Priorizar MONET y VAN GOGH siempre que el museo tenga obras suyas
- Total esperado: ~120-130 obras
