# LOTE 3: ASIA, MEDIO ORIENTE Y OCEANÍA (Japón, China, Corea, India, Turquía, Irán, Tailandia, Indonesia, Vietnam, Australia)

## CONTEXTO
Estoy construyendo MŪSA, una plataforma educativa de Historia del Arte. Necesito URLs de imágenes 100% libres de derechos de autor para cada museo. Tu trabajo es buscar en internet la URL directa a cada imagen y verificar que funcione.

## REGLAS LEGALES — OBLIGATORIAS, SIN EXCEPCIÓN

### ¿Qué es dominio público?
Una obra es dominio público cuando el artista falleció hace **más de 70 años** (antes de 1956). Para obras antiguas/arqueológicas (500+ años), son dominio público por defecto. La FOTOGRAFÍA también debe ser libre.

### Fuentes PERMITIDAS:
1. **Wikimedia Commons** — "Public domain" o "CC0"
2. **Met Museum Open Access**, **Rijksmuseum**, **Art Institute of Chicago**, **National Gallery of Art**
3. **Tokyo National Museum** open access images
4. **Palace Museum (Beijing)** digitized collections
5. Fotografías de museos bajo licencia libre

### PROHIBIDO:
- ❌ Cualquier artista fallecido después de 1955
- ❌ Getty Images, Alamy, Bridgeman, bancos comerciales
- ❌ "Fair use" o "Non-free" en Wikimedia
- ❌ URLs de páginas web — solo URLs directas a .jpg/.png

### URL correcta:
- ✅ `https://upload.wikimedia.org/wikipedia/commons/...archivo.jpg`
- ❌ `https://commons.wikimedia.org/wiki/File:...`

## FORMATO JSON

```json
{
  "museumId": "id-exacto",
  "artworks": [
    {
      "id": "kebab-case-unico",
      "titleKey": "artworks.camelCaseKey",
      "titleOriginal": "Título en idioma original",
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

### Movimientos: ancient-egyptian, hellenistic, classical-greek, roman, byzantine, romanesque, gothic, early-renaissance, high-renaissance, mannerism, baroque, rococo, neoclassicism, romanticism, realism, impressionism, post-impressionism, symbolism, art-nouveau, fauvism, expressionism, cubism, ukiyo-e, pre-columbian

### Técnicas: oil-on-canvas, oil-on-panel, oil-on-wood, fresco, tempera, watercolor, pastel, ink-on-paper, ink-on-silk, graphite, charcoal, etching, engraving, lithograph, woodcut, marble-sculpture, bronze-sculpture, terracotta, ceramic, mosaic, textile, goldwork, mixed-media

---

## MUSEOS DE ESTE LOTE

### 1. nmwa-tokyo | Tokyo, Japan
National Museum of Western Art — colección Matsukata:
- Monet (†1926 ✅) — ⭐ PRIORIDAD: Water Lilies (tienen versiones), Poplars, etc.
- Rodin (†1917 ✅): The Gates of Hell (réplica autorizada), The Thinker
- Renoir (†1919 ✅)
- Courbet (†1877 ✅)
- Rubens (†1640 ✅)
10 obras, priorizar Monet

### 2. mori-art-museum | Tokyo, Japan
- Principalmente arte contemporáneo
- Buscar obras de exhibiciones permanentes de artistas pre-1956
- Si es casi todo contemporáneo, dame solo 3-5 piezas históricas si existen
- Es válido dar 0 si todo está protegido

### 3. palace-museum | Beijing, China
Forbidden City — obras antiguas/imperiales:
- Caligrafía clásica china (dinastías Tang, Song, Ming)
- Pinturas de paisaje (shanshui): Guo Xi, Fan Kuan, Ma Yuan
- Porcelana imperial (Ming, Qing temprano)
- Jade y bronces rituales
- Along the River During the Qingming Festival (Zhang Zeduan, siglo XII)
10 obras. Para artistas antiguos chinos, usa year negativo o siglo aproximado.

### 4. national-art-museum-china | Beijing, China
- Xu Beihong (†1953 ✅): Galloping Horses, Running Horse
- Qi Baishi (†1957, 69 años) ❌ — NO usar
- Lin Fengmian (†1991) ❌
- Buscar arte clásico chino pre-moderno en su colección
8 obras

### 5. shanghai-museum | Shanghai, China
- Bronzes rituales Shang y Zhou (3000+ años)
- Cerámica: celadón, porcelana Song/Ming
- Caligrafía y pinturas: dinastías Yuan, Ming
- Jade tallado
10 obras. Movimiento: usar "classical-greek" equivalente... no hay movimiento chino. Usa "roman" para arte antiguo o déjalo como el más cercano.

⚠️ NOTA: Para arte chino antiguo sin movimiento occidental equivalente, usa estos:
- Arte Shang/Zhou/Han: movement = "roman" (contemporáneo cronológicamente)
- Paisaje Song: movement = "romanesque" o "gothic" (contemporáneo)
- Arte Ming/Qing: movement = "baroque" o "rococo" (contemporáneo)

### 6. national-museum-korea | Seoul, South Korea
- Cerámica celadón Goryeo (siglos X-XIV)
- Coronas de oro de Silla (siglos V-VI)
- Pinturas de la dinastía Joseon
- Budas de bronce
- Buncheong ware
10 obras

### 7. ngma-delhi | New Delhi, India
National Gallery of Modern Art:
- Abanindranath Tagore (†1951 ✅): Bharat Mata, The Passing of Shah Jahan
- Raja Ravi Varma (†1906 ✅): pinturas mitológicas hindúes
- Amrita Sher-Gil (†1941 ✅): Three Girls, Bride's Toilet
- Miniaturas mogoles (siglos XVI-XVIII): dominio público
- Esculturas Chola (bronces, 1000+ años)
10 obras

### 8. istanbul-modern | Istanbul, Turkey
- Osman Hamdi Bey (†1910 ✅): The Tortoise Trainer, Man Reading
- İbrahim Çallı (†1960, solo 66 años) ❌
- Buscar arte otomano clásico en la colección
- Miniaturas otomanas (siglos XV-XVII): dominio público
8 obras

### 9. bangkok-national-museum | Bangkok, Thailand
- Esculturas budistas de Sukhothai (siglos XIII-XV)
- Cabeza de Buda estilo Ayutthaya
- Arte Khmer (Angkor)
- Manuscritos ilustrados tailandeses
- Arte de Dvaravati (siglos VII-XI)
8 obras. Técnicas: bronze-sculpture, goldwork, tempera

### 10. national-museum-indonesia | Jakarta, Indonesia
- Relieves de Borobudur (siglo IX): dominio público
- Arte javanés hindú-budista
- Batik histórico
- Esculturas de Majapahit
- Keris (dagas ornamentales)
8 obras

### 11. vnfam-hanoi | Hanoi, Vietnam
Vietnam National Fine Arts Museum:
- Pinturas en laca vietnamitas (técnica única)
- Pinturas en seda
- Arte de la dinastía Lý/Trần
- Esculturas Champa (siglos VII-XV)
- Nguyen Phan Chanh (†1984) ❌
- Buscar artistas vietnamitas fallecidos antes de 1956
8 obras

### 12. tmoca-tehran | Tehran, Iran
Tehran Museum of Contemporary Art — tiene una colección occidental famosa:
- Monet (†1926 ✅) — ⭐ verificar si tienen alguno
- Van Gogh (†1890 ✅) — ⭐ verificar si tienen alguno
- Renoir (†1919 ✅)
- Toulouse-Lautrec (†1901 ✅)
- Gauguin (†1903 ✅)
- Caligrafía persa clásica
⚠️ IMPORTANTE: este museo tiene obras impresionistas REALES, verificar cuáles
8 obras, priorizar Monet y Van Gogh si los tienen

### 13. ngv-melbourne | Melbourne, Australia
National Gallery of Victoria:
- Tom Roberts (†1931 ✅): Shearing the Rams
- Arthur Streeton (†1943 ✅): Golden Summer
- Frederick McCubbin (†1917 ✅)
- Arte aborigen australiano (tradición milenaria, dominio público)
- Obras europeas de la colección: Tiepolo, Rembrandt
10 obras

---

## RECORDATORIO FINAL
- VERIFICA cada URL accediendo al enlace
- Para arte asiático antiguo: la mayoría son artefactos de 500+ años, claramente dominio público
- Para museos contemporáneos con pocas obras DP, es válido dar menos de 8
- Priorizar MONET y VAN GOGH en todo museo que los tenga
- Total esperado: ~100-110 obras
