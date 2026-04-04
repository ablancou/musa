# PROMPT PARA PERPLEXITY PRO — Verificar URLs de Wikimedia Commons

Necesito que verifiques y proporciones las URLs correctas de Wikimedia Commons para las siguientes obras de arte. Cada obra DEBE tener una imagen en dominio público.

## INSTRUCCIONES:
1. Para cada obra, busca la URL exacta en Wikimedia Commons
2. El formato DEBE ser: `https://upload.wikimedia.org/wikipedia/commons/[hash_path]/[filename]`
3. Si la obra no está en Wikimedia, busca en: Met Open Access, Rijksmuseum API, NGA Open Access, Art Institute Chicago API
4. Verifica que la imagen es realmente de dominio público (artista fallecido 70+ años)
5. Entrega en formato: `ID_OBRA | URL_VERIFICADA | FUENTE`

## NOTAS:
- Las URLs de Wikimedia Commons siguen el patrón: /commons/[a-f0-9]/[a-f0-9]{2}/Filename.jpg
- Las URLs de Met Open Access: https://images.metmuseum.org/CRDImages/...
- Para esculturas, busca la mejor foto frontal disponible
- Para obras asiáticas, incluir tanto scroll completo como detalle si está disponible

## FORMATO DE ENTREGA:
```
mona-lisa | https://upload.wikimedia.org/wikipedia/commons/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg | Wikimedia Commons
starry-night | https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1280px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg | Wikimedia Commons
```

## USO:
Este prompt se ejecutará DESPUÉS de recibir cada lote de Gemini Pro. Le pasarás la lista de IDs y nombres de las obras generadas, y Perplexity verificará/corregirá cada URL.

## EJEMPLO DE CONSULTA:
"Verifica las siguientes 50 URLs de Wikimedia Commons para obras de arte. Si alguna URL es incorrecta o no existe, proporciona la URL correcta:"

[Pegar aquí la lista de obras con sus URLs del lote de Gemini]
