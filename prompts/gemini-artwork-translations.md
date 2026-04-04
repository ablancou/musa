# PROMPT PARA GEMINI PRO — Traducciones de Títulos de Obras de Arte

Necesito que traduzcas los títulos de obras de arte al formato i18n de MŪSA.

## REGLAS:
1. Los títulos deben ser las traducciones OFICIALES aceptadas en cada idioma
2. Si no existe traducción oficial, usa la más utilizada en ese idioma
3. Para obras cuyo título original es en el idioma destino, usa el original
4. Mantén los nombres propios sin traducir (ej: "Venus de Milo" en todos los idiomas)
5. Las keys siguen el patrón `artworks.camelCaseId`

## FORMATO DE ENTRADA (lo que te daré):
```json
{
  "artworks.monaLisa": "La Gioconda",
  "artworks.starryNight": "La noche estrellada",
  "artworks.birthOfVenus": "El nacimiento de Venus"
}
```

## FORMATO DE SALIDA (lo que necesito × 7 idiomas):
```json
// [ES]
{
  "artworks.monaLisa": "La Mona Lisa",
  "artworks.starryNight": "La noche estrellada"
}

// [EN]
{
  "artworks.monaLisa": "Mona Lisa",
  "artworks.starryNight": "The Starry Night"
}

// [IT]
{
  "artworks.monaLisa": "La Gioconda",
  "artworks.starryNight": "Notte stellata"
}

// [PT]
{
  "artworks.monaLisa": "Mona Lisa",
  "artworks.starryNight": "A Noite Estrelada"
}

// [DE]
{
  "artworks.monaLisa": "Mona Lisa",
  "artworks.starryNight": "Sternennacht"
}

// [JA]
{
  "artworks.monaLisa": "モナ・リザ",
  "artworks.starryNight": "星月夜"
}

// [ZH]
{
  "artworks.monaLisa": "蒙娜丽莎",
  "artworks.starryNight": "星夜"
}
```

## USO:
Ejecutar DESPUÉS de integrar cada lote de obras. Le pasarás los titleKeys y títulos originales del lote, y Gemini generará las traducciones para los 7 archivos gallery.json (o artworks namespace).
