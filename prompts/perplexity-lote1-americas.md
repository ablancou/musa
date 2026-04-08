# LOTE 1: AMÉRICAS (México, Brasil, Argentina, Colombia, Perú, Chile, Canadá, EE.UU.)

## CONTEXTO
Estoy construyendo MŪSA, una plataforma educativa de Historia del Arte. Necesito URLs de imágenes 100% libres de derechos de autor para cada museo. Tu trabajo es buscar en internet la URL directa a cada imagen y verificar que funcione.

## REGLAS LEGALES — OBLIGATORIAS, SIN EXCEPCIÓN

### ¿Qué es dominio público?
Una obra es dominio público cuando el artista falleció hace **más de 70 años** (antes de 1956, ya que estamos en 2026). La FOTOGRAFÍA de la obra también debe ser libre — usar solo estas fuentes:

### Fuentes de imágenes PERMITIDAS (en orden de preferencia):
1. **Wikimedia Commons** — buscar archivos marcados como "Public domain" o "CC0"
2. **Met Museum Open Access** (metmuseum.org) — marcados con OA (Open Access)
3. **Art Institute of Chicago** — su API de imágenes abiertas
4. **Rijksmuseum** — Rijksstudio open access
5. **National Gallery of Art** (Washington) — open access
6. **Fotografías propias del museo** que estén publicadas bajo licencia libre

### PROHIBIDO — NO usar bajo ninguna circunstancia:
- ❌ Picasso (†1973) — protegido hasta ~2043
- ❌ Dalí (†1989) — protegido hasta ~2059
- ❌ Warhol (†1987) — protegido hasta ~2057
- ❌ Siqueiros (†1974), Tamayo (†1991), O'Keeffe (†1986)
- ❌ Diego Rivera (†1957) — 69 años, AÚN NO es dominio público
- ❌ Tarsila do Amaral (†1973) — protegida
- ❌ CUALQUIER artista fallecido después de 1955
- ❌ Imágenes de Getty Images, Alamy, Bridgeman, o cualquier banco de imágenes comercial
- ❌ Imágenes de Wikipedia/Wikimedia marcadas como "Fair use" o "Non-free"
- ❌ URLs de páginas web (solo URLs directas a archivos de imagen .jpg/.png)

### Formato de URL correcto:
- ✅ `https://upload.wikimedia.org/wikipedia/commons/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci.jpg`
- ❌ `https://en.wikipedia.org/wiki/Mona_Lisa`
- ❌ `https://commons.wikimedia.org/wiki/File:Mona_Lisa.jpg`

### Cómo obtener la URL directa en Wikimedia:
1. Ir a la página del archivo en Wikimedia Commons
2. Click en la imagen para verla en tamaño completo
3. Copiar la URL de la barra del navegador — debe empezar con `https://upload.wikimedia.org/`

## FORMATO DE RESPUESTA

Para cada museo, un bloque JSON. Dame **8-12 obras** por museo:

```json
{
  "museumId": "el-id-exacto",
  "artworks": [
    {
      "id": "kebab-case-unico",
      "titleKey": "artworks.camelCaseKey",
      "titleOriginal": "Título en idioma original del artista",
      "artist": "Nombre completo",
      "artistBirthYear": 1800,
      "artistDeathYear": 1900,
      "artistNationality": "Nationality",
      "year": 1850,
      "movement": "id-del-movimiento",
      "technique": "id-de-tecnica",
      "medium": "Descripción legible del medio",
      "dimensions": "alto × ancho cm",
      "imageUrl": "URL DIRECTA VERIFICADA",
      "hasNarration": false
    }
  ]
}
```

### Movimientos válidos (usar exactamente estos IDs):
ancient-egyptian, hellenistic, classical-greek, roman, byzantine, romanesque, gothic, early-renaissance, high-renaissance, mannerism, baroque, rococo, neoclassicism, romanticism, realism, impressionism, post-impressionism, symbolism, art-nouveau, fauvism, expressionism, cubism, futurism, dada, surrealism, abstract-expressionism, pop-art, minimalism, ukiyo-e, pre-columbian, mexican-muralism

### Técnicas válidas (usar exactamente estos IDs):
oil-on-canvas, oil-on-panel, oil-on-wood, fresco, tempera, watercolor, pastel, ink-on-paper, ink-on-silk, graphite, charcoal, etching, engraving, lithograph, woodcut, marble-sculpture, bronze-sculpture, terracotta, ceramic, mosaic, textile, goldwork, mixed-media

---

## LOS MUSEOS DE ESTE LOTE

### 1. museo-nacional-antropologia | Ciudad de México, Mexico
Obras prehispánicas de dominio público (artefactos arqueológicos, 500+ años de antigüedad):
- Piedra del Sol (Calendario Azteca)
- Coatlicue
- Máscara de Malinaltepec
- Cabeza Olmeca
- Chac Mool
- Disco de la Muerte
- Tláloc monolito
- Vasija con forma de mono (cultura maya)
Movimiento: pre-columbian. Técnicas: marble-sculpture, ceramic, mosaic, goldwork

### 2. palacio-bellas-artes | Ciudad de México, Mexico
SOLO murales de artistas fallecidos 70+ años:
- José Clemente Orozco (†1949 ✅): "Katharsis", "El hombre en llamas"
- NO Rivera (†1957, solo 69 años) ❌
- NO Siqueiros (†1974) ❌
- NO Tamayo (†1991) ❌
- Buscar también: obras de la colección permanente de artistas mexicanos pre-1955
Movimiento: mexican-muralism. Técnica: fresco

### 3. museo-frida-kahlo | Ciudad de México, Mexico
Frida Kahlo †1954 (72 años en 2026 ✅):
- Las Dos Fridas (1939) — en Museo de Arte Moderno, pero Frida sí es DP
- Autorretrato con Collar de Espinas
- La Columna Rota
- Viva la Vida (1954)
- Henry Ford Hospital
- Lo que el Agua me Dio
⚠️ VERIFICAR: que las fotografías específicas en Wikimedia estén marcadas como dominio público, no "fair use"
NO incluir Diego Rivera (†1957) ❌

### 4. museo-soumaya | Ciudad de México, Mexico
Colección Carlos Slim — buscar obras de dominio público:
- Auguste Rodin (†1917 ✅): El Pensador, esculturas
- Esculturas europeas clásicas
- Arte virreinal mexicano
- NO Dalí ❌

### 5. museo-arte-moderno | Ciudad de México, Mexico
- Frida Kahlo ✅ (obras de su colección)
- Orozco ✅
- Dr. Atl (†1964 ✅, 62 años... ❌ NO, solo 62)
- Buscar artistas mexicanos fallecidos antes de 1956

### 6. museo-tamayo | Ciudad de México, Mexico
- Tamayo (†1991) ❌ — NO usar al propio Tamayo
- Buscar obras de la colección internacional de artistas clásicos pre-1955

### 7. muac | Ciudad de México, Mexico
- Museo de arte contemporáneo — la mayoría será post-1955
- Buscar piezas históricas de la colección si existen
- Si no hay suficientes obras de dominio público, dame solo 3-5

### 8. museo-jose-luis-cuevas | Ciudad de México, Mexico
- Cuevas (†2017) ❌
- Buscar grabados y obras de otros artistas en la colección
- Si no hay suficientes obras DP, dame solo 3-5

### 9. getty-museum | Los Angeles, United States
- Van Gogh: Irises (1889) — PRIORIDAD
- Monet: obras en su colección — PRIORIDAD
- Rembrandt (†1669 ✅)
- Renoir (†1919 ✅)
- Cézanne (†1906 ✅)
- J.M.W. Turner (†1851 ✅)
- Manet (†1883 ✅)
12 obras, priorizando Van Gogh y Monet

### 10. whitney-museum | New York, United States
- Edward Hopper (†1967, 59 años... ❌ NO, solo 59)
- Buscar artistas americanos fallecidos antes de 1956
- Alexander Calder (†1976) ❌
- Stuart Davis (†1964) ❌
- Marsden Hartley (†1943 ✅)
- Charles Demuth (†1935 ✅)

### 11. masp | São Paulo, Brazil
Colección europea fuerte:
- Raphael (†1520 ✅)
- Renoir (†1919 ✅)
- Monet (†1926 ✅) — PRIORIDAD
- Van Gogh (†1890 ✅) — PRIORIDAD
- Degas (†1917 ✅)
- Toulouse-Lautrec (†1901 ✅)
- El Greco (†1614 ✅)
12 obras

### 12. pinacoteca-sao-paulo | São Paulo, Brazil
Arte brasileño clásico:
- Almeida Júnior (†1899 ✅)
- Pedro Américo (†1905 ✅)
- Victor Meirelles (†1903 ✅)
8 obras

### 13. malba | Buenos Aires, Argentina
- Frida Kahlo ✅ (Autorretrato con chango y loro, 1942)
- Buscar obras de artistas latinoamericanos pre-1956
- Xul Solar (†1963) ❌
8 obras

### 14. mnba-buenos-aires | Buenos Aires, Argentina
- Impresionistas europeos: Monet, Degas, Renoir — PRIORIZAR MONET
- Rodin esculturas
- Prilidiano Pueyrredón (†1870 ✅)
- Eduardo Sívori (†1918 ✅)
10 obras

### 15. museo-nacional-colombia | Bogotá, Colombia
- Gregorio Vásquez de Arce y Ceballos (†1711 ✅)
- Arte colonial
- Piezas prehispánicas (gold work, cerámica)
8 obras

### 16. ago-toronto | Toronto, Canada
- Tom Thomson (†1917 ✅)
- Lawren Harris (†1970, 56 años... ❌)
- A.Y. Jackson (†1974) ❌
- J.E.H. MacDonald (†1932 ✅)
- Cornelius Krieghoff (†1872 ✅)
- Paul Kane (†1871 ✅)
8 obras

### 17. mali-lima | Lima, Peru
- Escuela cusqueña colonial (siglos XVII-XVIII)
- Arte virreinal peruano
- Marcos Zapata (†~1773 ✅)
8 obras

### 18. larco-museum | Lima, Peru
- Cerámica mochica (pre-columbian, 1500+ años)
- Textiles pre-incas
- Orfebrería precolombina
8 obras, movimiento: pre-columbian

### 19. mnba-chile | Santiago, Chile
- Pedro Lira (†1912 ✅)
- Juan Francisco González (†1933 ✅)
- Alberto Valenzuela Llanos (†1925 ✅)
8 obras

---

## RECORDATORIO FINAL
- VERIFICA cada URL accediendo al enlace antes de incluirla
- Si una imagen no tiene URL de dominio público verificable, NO la incluyas — busca otra obra del mismo museo
- Para Van Gogh y Monet, incluye la mayor cantidad posible
- Total esperado este lote: ~120-140 obras
