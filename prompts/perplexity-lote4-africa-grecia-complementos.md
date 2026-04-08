# LOTE 4: ÁFRICA, GRECIA Y MUSEOS COMPLEMENTARIOS

## CONTEXTO
Estoy construyendo MŪSA, una plataforma educativa de Historia del Arte. Necesito URLs de imágenes 100% libres de derechos de autor para cada museo. Tu trabajo es buscar en internet la URL directa a cada imagen y verificar que funcione.

## REGLAS LEGALES — OBLIGATORIAS, SIN EXCEPCIÓN

### Dominio público = artista fallecido hace más de 70 años (antes de 1956).
Para artefactos arqueológicos de 500+ años: dominio público por defecto.
La FOTOGRAFÍA también debe ser libre — usar solo Wikimedia Commons (Public domain/CC0), Met Open Access, Rijksmuseum, etc.

### PROHIBIDO:
- ❌ Cualquier artista fallecido después de 1955
- ❌ Getty Images, Alamy, Bridgeman, bancos comerciales
- ❌ "Fair use" o "Non-free" en Wikimedia
- ❌ URLs de páginas — solo URLs directas: `https://upload.wikimedia.org/wikipedia/commons/...`

## FORMATO JSON

```json
{
  "museumId": "id-exacto",
  "artworks": [
    {
      "id": "kebab-case-unico",
      "titleKey": "artworks.camelCaseKey",
      "titleOriginal": "Título original",
      "artist": "Nombre o Unknown",
      "artistBirthYear": 1800,
      "artistDeathYear": 1900,
      "artistNationality": "Nationality",
      "year": 1850,
      "movement": "id-movimiento",
      "technique": "id-tecnica",
      "medium": "Descripción",
      "dimensions": "alto × ancho cm",
      "imageUrl": "URL DIRECTA VERIFICADA",
      "hasNarration": false
    }
  ]
}
```

Para artistas desconocidos: `"artist": "Unknown (culture/period)"`, birthYear/deathYear aproximados de la cultura.

### Movimientos: ancient-egyptian, hellenistic, classical-greek, roman, byzantine, romanesque, gothic, early-renaissance, high-renaissance, mannerism, baroque, rococo, neoclassicism, romanticism, realism, impressionism, post-impressionism, symbolism, art-nouveau, fauvism, expressionism, pre-columbian

### Técnicas: oil-on-canvas, oil-on-panel, fresco, tempera, watercolor, ink-on-paper, ink-on-silk, charcoal, etching, engraving, lithograph, woodcut, marble-sculpture, bronze-sculpture, terracotta, ceramic, mosaic, textile, goldwork, mixed-media, ivory-carving

---

## MUSEOS DE ESTE LOTE

### 1. zeitz-mocaa | Cape Town, South Africa
- Museo de arte contemporáneo africano — la mayoría será post-1955
- Buscar obras de artistas africanos fallecidos antes de 1956 si existen
- Irma Stern (†1966, solo 60 años) ❌
- Gerard Sekoto (†1993) ❌
- Si no hay obras DP, dame 0 y explica

### 2. national-museum-lagos | Lagos, Nigeria
- Bronces de Benín (siglos XV-XVII) — ⭐ PRIORIDAD: dominio público
  - Cabezas conmemorativas de bronce de Oba
  - Placas de bronce del palacio real
  - Máscara de la Reina Idia
- Cabezas de Ife (siglos XII-XIV): bronce y terracota
- Esculturas Nok (500 BCE - 200 CE)
10 obras. Artist: "Unknown (Benin Kingdom)", "Unknown (Ife civilization)", etc.

### 3. national-museum-ghana | Accra, Ghana
- Arte Ashanti: Golden Stool (imagen de referencia), Kente cloth
- Gold weights de los Ashanti (pesas para pesar oro, bronce)
- Esculturas Akuaba (fertilidad)
- Arte Akan
8 obras

### 4. mmvi-rabat | Rabat, Morocco
Mohammed VI Museum:
- Caligrafía islámica clásica
- Zellige (mosaico geométrico marroquí)
- Arte bereber
- Jacques Majorelle (†1962, solo 64 años) ❌
- Buscar arte islámico/marroquí antiguo
8 obras. Técnicas: ceramic, mosaic, textile, goldwork

### 5. national-archaeological-athens | Athens, Greece
Museo Arqueológico Nacional:
- Máscara de Agamenón (siglo XVI BCE) — ⭐ icónica
- Poseidón/Zeus del Cabo Artemisio (bronce, 460 BCE)
- Kouros de Sounion (600 BCE)
- Mecanismo de Anticitera
- Fresco de los boxeadores (de Akrotiri/Thera)
- Jockey de Artemisio
- Anfora Dipylon
10 obras. Movimiento: classical-greek o hellenistic

### 6. acropolis-museum | Athens, Greece
Ya tiene 3, agregar más:
- Cariátides del Erecteion
- Frisos del Partenón (procesión de las Panateneas)
- Kore (esculturas de doncellas arcaicas)
- Moscóforo (el portador del ternero)
- Atenea Pensativa (relieve)
6 obras adicionales

### 7. egyptian-museum | Cairo, Egypt
Ya tiene 6, pero agregar las más icónicas si faltan:
- Máscara de Tutankamón — ⚠️ verificar si la FOTO es dominio público
- Escriba sentado
- Paleta de Narmer
- Estatua de Khafre
- Nefertiti (está en Berlín, no aquí — verificar qué tiene el Museo Egipcio)
5 obras adicionales

---

## SEGUNDA PARTE: VERIFICACIÓN DE IMÁGENES EXISTENTES

Además de los museos nuevos, necesito que VERIFIQUES que estas URLs de imágenes que ya tenemos son funcionales. Accede a cada una y dime si funciona (✅) o está rota (❌ + alternativa):

### Monet (prioridad ⭐):
1. `https://upload.wikimedia.org/wikipedia/commons/5/59/Monet_-_Impression%2C_Sunrise.jpg`
2. `https://upload.wikimedia.org/wikipedia/commons/a/aa/Claude_Monet_-_Water_Lilies_-_1906%2C_Ryerson.jpg`
3. `https://upload.wikimedia.org/wikipedia/commons/4/42/Claude_Monet_-_Rouen_Cathedral%2C_West_Fa%C3%A7ade%2C_Sunlight.jpg`
4. `https://upload.wikimedia.org/wikipedia/commons/7/7e/Claude_Monet_-_Poppy_Field_-_Google_Art_Project.jpg`

### Van Gogh (prioridad ⭐):
5. `https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1280px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg`
6. `https://upload.wikimedia.org/wikipedia/commons/4/46/Vincent_Willem_van_Gogh_127.jpg`
7. `https://upload.wikimedia.org/wikipedia/commons/7/76/Vincent_van_Gogh_-_De_slaapkamer_-_Google_Art_Project.jpg`
8. `https://upload.wikimedia.org/wikipedia/commons/b/b2/Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project.jpg`
9. `https://upload.wikimedia.org/wikipedia/commons/6/68/Vincent_van_Gogh_-_Almond_blossom_-_Google_Art_Project.jpg`

### Otros artistas clave:
10. `https://upload.wikimedia.org/wikipedia/commons/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg`
11. `https://upload.wikimedia.org/wikipedia/commons/5/5f/Nike_of_Samothrake_Louvre_Ma2369_n4.jpg`
12. `https://upload.wikimedia.org/wikipedia/commons/1/1f/Nofretete_Neues_Museum.jpg`

Para cada URL rota, dame la URL correcta actualizada.

---

## RECORDATORIO FINAL
- VERIFICA cada URL accediendo al enlace
- Para artefactos arqueológicos milenarios, claramente dominio público
- Para museos contemporáneos africanos con pocas obras DP, dar menos o 0
- Total esperado nuevas obras: ~50-60
- Total verificaciones: 12 URLs
