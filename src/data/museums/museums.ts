/**
 * MŪSA World Museums Database — Expanded Edition
 *
 * 75+ of the greatest museums on Earth, each one a room in "El Museo de los Museos".
 * Coordinates are precise for the 3D globe.
 * Images are public domain or CC0.
 *
 * Organized by region → country → city
 */

import type { Museum } from './types';
export type { Museum } from './types';

export const MUSEUMS: Museum[] = [
  // ╔═══════════════════════════════════════════════════╗
  // ║  MEXICO — El corazón de MŪSA                     ║
  // ╚═══════════════════════════════════════════════════╝

  {
    id: 'museo-nacional-antropologia',
    nameKey: 'museums.museoNacionalAntropologia',
    city: 'Ciudad de México',
    country: 'Mexico',
    countryCode: 'MX',
    coordinates: { lat: 19.4260, lng: -99.1861 },
    foundedYear: 1964,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/12/Museo_Nacional_de_Antropolog%C3%ADa_%282023%29_02.jpg',
    websiteUrl: 'https://www.mna.inah.gob.mx',
    accentColor: '#8B4513',
    descriptionKey: 'museums.museoNacionalAntropologia.desc',
    virtualTourUrl: 'https://artsandculture.google.com/partner/museo-nacional-de-antropologia',
    onlineCollectionUrl: 'https://www.mna.inah.gob.mx/',
  },
  {
    id: 'palacio-bellas-artes',
    nameKey: 'museums.palacioBellasArtes',
    city: 'Ciudad de México',
    country: 'Mexico',
    countryCode: 'MX',
    coordinates: { lat: 19.4352, lng: -99.1412 },
    foundedYear: 1934,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/06/Palacio_de_Bellas_Artes_-_Ciudad_de_Mexico.jpg',
    websiteUrl: 'https://museopalaciodebellasartes.gob.mx',
    accentColor: '#D4A574',
    descriptionKey: 'museums.palacioBellasArtes.desc',
  },
  {
    id: 'museo-tamayo',
    nameKey: 'museums.museoTamayo',
    city: 'Ciudad de México',
    country: 'Mexico',
    countryCode: 'MX',
    coordinates: { lat: 19.4265, lng: -99.1803 },
    foundedYear: 1981,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Museo_Tamayo_Arte_Contempor%C3%A1neo_01.jpg',
    websiteUrl: 'https://museotamayo.org',
    accentColor: '#4A0E4A',
    descriptionKey: 'museums.museoTamayo.desc',
  },
  {
    id: 'museo-frida-kahlo',
    nameKey: 'museums.museoFridaKahlo',
    city: 'Ciudad de México',
    country: 'Mexico',
    countryCode: 'MX',
    coordinates: { lat: 19.3550, lng: -99.1626 },
    foundedYear: 1958,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Casa_Azul_Museo_Frida_Kahlo.jpg',
    websiteUrl: 'https://www.museofridakahlo.org.mx',
    accentColor: '#003DA5',
    descriptionKey: 'museums.museoFridaKahlo.desc',
    virtualTourUrl: 'https://artsandculture.google.com/partner/museo-frida-kahlo',
    onlineCollectionUrl: 'https://www.museofridakahlo.org.mx/',
  },
  {
    id: 'museo-soumaya',
    nameKey: 'museums.museoSoumaya',
    city: 'Ciudad de México',
    country: 'Mexico',
    countryCode: 'MX',
    coordinates: { lat: 19.4402, lng: -99.2056 },
    foundedYear: 1994,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Soumaya_Museum_Plaza.jpg',
    websiteUrl: 'https://www.museosoumaya.org',
    accentColor: '#C0C0C0',
    descriptionKey: 'museums.museoSoumaya.desc',
  },
  {
    id: 'munal',
    nameKey: 'museums.munal',
    city: 'Ciudad de México',
    country: 'Mexico',
    countryCode: 'MX',
    coordinates: { lat: 19.4361, lng: -99.1393 },
    foundedYear: 1982,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/55/Munal_01.JPG',
    websiteUrl: 'https://www.munal.com.mx',
    accentColor: '#6B4226',
    descriptionKey: 'museums.munal.desc',
    virtualTourUrl: 'https://artsandculture.google.com/partner/munal',
    onlineCollectionUrl: 'https://munal.mx/en/collections',
  },
  {
    id: 'museo-arte-moderno',
    nameKey: 'museums.museoArteModerno',
    city: 'Ciudad de México',
    country: 'Mexico',
    countryCode: 'MX',
    coordinates: { lat: 19.4244, lng: -99.1819 },
    foundedYear: 1964,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/MAM_01.JPG',
    websiteUrl: 'https://mam.inba.gob.mx',
    accentColor: '#2E8B57',
    descriptionKey: 'museums.museoArteModerno.desc',
  },
  {
    id: 'museo-dolores-olmedo',
    nameKey: 'museums.museoDoloresOlmedo',
    city: 'Ciudad de México',
    country: 'Mexico',
    countryCode: 'MX',
    coordinates: { lat: 19.2553, lng: -99.0938 },
    foundedYear: 1994,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/83/Museo_Dolores_Olmedo_06.jpg',
    websiteUrl: 'https://www.museodoloresolmedo.org.mx',
    accentColor: '#E06666',
    descriptionKey: 'museums.museoDoloresOlmedo.desc',
  },
  {
    id: 'muac',
    nameKey: 'museums.muac',
    city: 'Ciudad de México',
    country: 'Mexico',
    countryCode: 'MX',
    coordinates: { lat: 19.3326, lng: -99.1859 },
    foundedYear: 2008,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/MUAC_UNAM_01.jpg',
    websiteUrl: 'https://muac.unam.mx',
    accentColor: '#1A1A1A',
    descriptionKey: 'museums.muac.desc',
  },
  {
    id: 'museo-jose-luis-cuevas',
    nameKey: 'museums.museoJoseLuisCuevas',
    city: 'Ciudad de México',
    country: 'Mexico',
    countryCode: 'MX',
    coordinates: { lat: 19.4310, lng: -99.1289 },
    foundedYear: 1992,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/09/MJLC_Exterior.JPG',
    websiteUrl: 'https://museojoseluiscuevas.com.mx',
    accentColor: '#8B0000',
    descriptionKey: 'museums.museoJoseLuisCuevas.desc',
  },

  // ╔═══════════════════════════════════════════════════╗
  // ║  FRANCE                                           ║
  // ╚═══════════════════════════════════════════════════╝

  {
    id: 'louvre',
    nameKey: 'museums.louvre',
    city: 'Paris',
    country: 'France',
    countryCode: 'FR',
    coordinates: { lat: 48.8606, lng: 2.3376 },
    foundedYear: 1793,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/66/Louvre_Museum_Wikimedia_Commons.jpg',
    websiteUrl: 'https://www.louvre.fr',
    accentColor: '#C5A55A',
    descriptionKey: 'museums.louvre.desc',
    virtualTourUrl: 'https://www.louvre.fr/en/online-tours',
    onlineCollectionUrl: 'https://collections.louvre.fr/en/',
  },
  {
    id: 'musee-dorsay',
    nameKey: 'museums.museeDOrsay',
    city: 'Paris',
    country: 'France',
    countryCode: 'FR',
    coordinates: { lat: 48.8600, lng: 2.3266 },
    foundedYear: 1986,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Mus%C3%A9e_d%27Orsay%2C_North-West_view%2C_Paris_7e_140402.jpg',
    websiteUrl: 'https://www.musee-orsay.fr',
    accentColor: '#D4A574',
    descriptionKey: 'museums.museeDOrsay.desc',
    virtualTourUrl: 'https://artsandculture.google.com/partner/musee-dorsay-paris',
    onlineCollectionUrl: 'https://www.musee-orsay.fr/en/collections',
  },
  {
    id: 'centre-pompidou',
    nameKey: 'museums.centrePompidou',
    city: 'Paris',
    country: 'France',
    countryCode: 'FR',
    coordinates: { lat: 48.8607, lng: 2.3524 },
    foundedYear: 1977,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/10/Centre_Georges-Pompidou_36%2C_Paris_2010.jpg',
    websiteUrl: 'https://www.centrepompidou.fr',
    accentColor: '#E63946',
    descriptionKey: 'museums.centrePompidou.desc',
    virtualTourUrl: 'https://artsandculture.google.com/partner/centre-pompidou',
    onlineCollectionUrl: 'https://www.centrepompidou.fr/en/collections',
  },
  {
    id: 'musee-orangerie',
    nameKey: 'museums.museeOrangerie',
    city: 'Paris',
    country: 'France',
    countryCode: 'FR',
    coordinates: { lat: 48.8638, lng: 2.3225 },
    foundedYear: 1927,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/71/P1000747_Paris_I_Mus%C3%A9e_de_l%27Orangerie_reductwk.JPG',
    websiteUrl: 'https://www.musee-orangerie.fr',
    accentColor: '#87CEEB',
    descriptionKey: 'museums.museeOrangerie.desc',
    virtualTourUrl: 'https://artsandculture.google.com/partner/musee-de-lorangerie',
    onlineCollectionUrl: 'https://www.musee-orangerie.fr/en/collections',
  },
  {
    id: 'musee-rodin',
    nameKey: 'museums.museeRodin',
    city: 'Paris',
    country: 'France',
    countryCode: 'FR',
    coordinates: { lat: 48.8554, lng: 2.3158 },
    foundedYear: 1919,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/32/Mus%C3%A9e_Rodin_1.jpg',
    websiteUrl: 'https://www.musee-rodin.fr',
    accentColor: '#556B2F',
    descriptionKey: 'museums.museeRodin.desc',
    virtualTourUrl: 'https://artsandculture.google.com/partner/musee-rodin',
    onlineCollectionUrl: 'https://www.musee-rodin.fr/en/collections',
  },

  // ╔═══════════════════════════════════════════════════╗
  // ║  ITALY                                            ║
  // ╚═══════════════════════════════════════════════════╝

  {
    id: 'uffizi',
    nameKey: 'museums.uffizi',
    city: 'Florence',
    country: 'Italy',
    countryCode: 'IT',
    coordinates: { lat: 43.7677, lng: 11.2553 },
    foundedYear: 1581,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/82/Uffizi_Gallery%2C_Florence.jpg',
    websiteUrl: 'https://www.uffizi.it',
    accentColor: '#8B4513',
    descriptionKey: 'museums.uffizi.desc',
    virtualTourUrl: 'https://artsandculture.google.com/partner/uffizi-gallery',
    onlineCollectionUrl: 'https://www.uffizi.it/en/online-exhibitions',
  },
  {
    id: 'vatican-museums',
    nameKey: 'museums.vatican',
    city: 'Vatican City',
    country: 'Vatican City',
    countryCode: 'VA',
    coordinates: { lat: 41.9065, lng: 12.4536 },
    foundedYear: 1506,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/00/Vatican_Museums_Spiral_Staircase_2012.jpg',
    websiteUrl: 'https://www.museivaticani.va',
    accentColor: '#1A1B4B',
    descriptionKey: 'museums.vatican.desc',
    virtualTourUrl: 'https://www.museivaticani.va/content/museivaticani/en/collezioni/musei/tour-virtuali-elenco.html',
    onlineCollectionUrl: 'https://artsandculture.google.com/partner/vatican-museums',
  },
  {
    id: 'galleria-accademia',
    nameKey: 'museums.galleriaAccademia',
    city: 'Florence',
    country: 'Italy',
    countryCode: 'IT',
    coordinates: { lat: 43.7768, lng: 11.2588 },
    foundedYear: 1784,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/24/%27David%27_by_Michelangelo_JBU0001.JPG',
    websiteUrl: 'https://www.galleriaaccademiafirenze.it',
    accentColor: '#CD853F',
    descriptionKey: 'museums.galleriaAccademia.desc',
    virtualTourUrl: 'https://artsandculture.google.com/partner/accademia-gallery',
    onlineCollectionUrl: 'https://www.galleriaaccademiafirenze.it/en/artworks/',
  },
  {
    id: 'galleria-borghese',
    nameKey: 'museums.galleriaBorghese',
    city: 'Rome',
    country: 'Italy',
    countryCode: 'IT',
    coordinates: { lat: 41.9142, lng: 12.4922 },
    foundedYear: 1903,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5b/Galleria_borghese_facade.jpg',
    websiteUrl: 'https://galleriaborghese.beniculturali.it',
    accentColor: '#2F4F4F',
    descriptionKey: 'museums.galleriaBorghese.desc',
    virtualTourUrl: 'https://artsandculture.google.com/partner/galleria-borghese',
    onlineCollectionUrl: 'https://galleriaborghese.beniculturali.it/en/',
  },
  {
    id: 'pinacoteca-brera',
    nameKey: 'museums.pinacotecaBrera',
    city: 'Milan',
    country: 'Italy',
    countryCode: 'IT',
    coordinates: { lat: 45.4719, lng: 9.1878 },
    foundedYear: 1809,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/05/IMG_5765_-_Brera_-_Cortile_-_Foto_Giovanni_Dall%27Orto_-_19-jan_2007.jpg',
    websiteUrl: 'https://pinacotecabrera.org',
    accentColor: '#4A0E0E',
    descriptionKey: 'museums.pinacotecaBrera.desc',
    virtualTourUrl: 'https://artsandculture.google.com/partner/pinacoteca-di-brera',
    onlineCollectionUrl: 'https://pinacotecabrera.org/en/collection/',
  },

  // ╔═══════════════════════════════════════════════════╗
  // ║  SPAIN                                            ║
  // ╚═══════════════════════════════════════════════════╝

  {
    id: 'prado',
    nameKey: 'museums.prado',
    city: 'Madrid',
    country: 'Spain',
    countryCode: 'ES',
    coordinates: { lat: 40.4138, lng: -3.6921 },
    foundedYear: 1819,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/68/Museo_del_Prado_2016_%2825185969599%29.jpg',
    websiteUrl: 'https://www.museodelprado.es',
    accentColor: '#722F37',
    descriptionKey: 'museums.prado.desc',
    virtualTourUrl: 'https://www.museodelprado.es/en/the-collection',
    onlineCollectionUrl: 'https://www.museodelprado.es/en/the-collection',
  },
  {
    id: 'reina-sofia',
    nameKey: 'museums.reinaSofia',
    city: 'Madrid',
    country: 'Spain',
    countryCode: 'ES',
    coordinates: { lat: 40.4087, lng: -3.6945 },
    foundedYear: 1992,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Museo_Nacional_Centro_de_Arte_Reina_Sof%C3%ADa_%28Madrid%29_06.jpg',
    websiteUrl: 'https://www.museoreinasofia.es',
    accentColor: '#CC0000',
    descriptionKey: 'museums.reinaSofia.desc',
    virtualTourUrl: 'https://artsandculture.google.com/partner/museo-reina-sofia',
    onlineCollectionUrl: 'https://www.museoreinasofia.es/en/collection',
  },
  {
    id: 'thyssen-bornemisza',
    nameKey: 'museums.thyssenBornemisza',
    city: 'Madrid',
    country: 'Spain',
    countryCode: 'ES',
    coordinates: { lat: 40.4160, lng: -3.6947 },
    foundedYear: 1992,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b0/Museo_Thyssen-Bornemisza_%28Madrid%29_07.jpg',
    websiteUrl: 'https://www.museothyssen.org',
    accentColor: '#E8A87C',
    descriptionKey: 'museums.thyssenBornemisza.desc',
    virtualTourUrl: 'https://artsandculture.google.com/partner/museo-thyssen-bornemisza',
    onlineCollectionUrl: 'https://www.museothyssen.org/en/collection',
  },
  {
    id: 'guggenheim-bilbao',
    nameKey: 'museums.guggenheimBilbao',
    city: 'Bilbao',
    country: 'Spain',
    countryCode: 'ES',
    coordinates: { lat: 43.2687, lng: -2.9340 },
    foundedYear: 1997,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Guggenheim-bilbao-jan05.jpg',
    websiteUrl: 'https://www.guggenheim-bilbao.eus',
    accentColor: '#B8B8B8',
    descriptionKey: 'museums.guggenheimBilbao.desc',
  },
  {
    id: 'teatro-museo-dali',
    nameKey: 'museums.teatroMuseoDali',
    city: 'Figueres',
    country: 'Spain',
    countryCode: 'ES',
    coordinates: { lat: 42.2670, lng: 2.9586 },
    foundedYear: 1974,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Figueres_-_Teatre-Museu_Dal%C3%AD.jpg',
    websiteUrl: 'https://www.salvador-dali.org',
    accentColor: '#FFD700',
    descriptionKey: 'museums.teatroMuseoDali.desc',
  },

  // ╔═══════════════════════════════════════════════════╗
  // ║  UNITED KINGDOM                                   ║
  // ╚═══════════════════════════════════════════════════╝

  {
    id: 'national-gallery-london',
    nameKey: 'museums.nationalGalleryLondon',
    city: 'London',
    country: 'United Kingdom',
    countryCode: 'GB',
    coordinates: { lat: 51.5089, lng: -0.1283 },
    foundedYear: 1824,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/42/National_Gallery_London_2013_March.jpg',
    websiteUrl: 'https://www.nationalgallery.org.uk',
    accentColor: '#3D5A80',
    descriptionKey: 'museums.nationalGalleryLondon.desc',
    virtualTourUrl: 'https://artsandculture.google.com/partner/the-national-gallery-london',
    onlineCollectionUrl: 'https://www.nationalgallery.org.uk/paintings',
  },
  {
    id: 'tate-modern',
    nameKey: 'museums.tateModern',
    city: 'London',
    country: 'United Kingdom',
    countryCode: 'GB',
    coordinates: { lat: 51.5076, lng: -0.0994 },
    foundedYear: 2000,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c4/Tate_Modern_-_Bankside_Power_Station.jpg',
    websiteUrl: 'https://www.tate.org.uk/visit/tate-modern',
    accentColor: '#1A1A1A',
    descriptionKey: 'museums.tateModern.desc',
    virtualTourUrl: 'https://artsandculture.google.com/partner/tate-modern',
    onlineCollectionUrl: 'https://www.tate.org.uk/art',
  },
  {
    id: 'tate-britain',
    nameKey: 'museums.tateBritain',
    city: 'London',
    country: 'United Kingdom',
    countryCode: 'GB',
    coordinates: { lat: 51.4911, lng: -0.1278 },
    foundedYear: 1897,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Tate_Britain_%28front%29.jpg',
    websiteUrl: 'https://www.tate.org.uk/visit/tate-britain',
    accentColor: '#006400',
    descriptionKey: 'museums.tateBritain.desc',
    virtualTourUrl: 'https://artsandculture.google.com/partner/tate-britain',
    onlineCollectionUrl: 'https://www.tate.org.uk/art',
  },
  {
    id: 'british-museum',
    nameKey: 'museums.britishMuseum',
    city: 'London',
    country: 'United Kingdom',
    countryCode: 'GB',
    coordinates: { lat: 51.5194, lng: -0.1270 },
    foundedYear: 1753,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/British_Museum_from_NE_2.JPG',
    websiteUrl: 'https://www.britishmuseum.org',
    accentColor: '#2C3E50',
    descriptionKey: 'museums.britishMuseum.desc',
    virtualTourUrl: 'https://artsandculture.google.com/partner/the-british-museum',
    onlineCollectionUrl: 'https://www.britishmuseum.org/collection',
  },
  {
    id: 'va-museum',
    nameKey: 'museums.vaMuseum',
    city: 'London',
    country: 'United Kingdom',
    countryCode: 'GB',
    coordinates: { lat: 51.4966, lng: -0.1722 },
    foundedYear: 1852,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/32/Victoria_%26_Albert_Museum_Entrance.jpg',
    websiteUrl: 'https://www.vam.ac.uk',
    accentColor: '#800020',
    descriptionKey: 'museums.vaMuseum.desc',
    virtualTourUrl: 'https://artsandculture.google.com/partner/victoria-and-albert-museum',
    onlineCollectionUrl: 'https://collections.vam.ac.uk/',
  },

  // ╔═══════════════════════════════════════════════════╗
  // ║  NETHERLANDS                                      ║
  // ╚═══════════════════════════════════════════════════╝

  {
    id: 'rijksmuseum',
    nameKey: 'museums.rijksmuseum',
    city: 'Amsterdam',
    country: 'Netherlands',
    countryCode: 'NL',
    coordinates: { lat: 52.3600, lng: 4.8852 },
    foundedYear: 1800,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/67/Rijksmuseum_2013.jpg',
    websiteUrl: 'https://www.rijksmuseum.nl',
    accentColor: '#2C3E50',
    descriptionKey: 'museums.rijksmuseum.desc',
    virtualTourUrl: 'https://artsandculture.google.com/partner/rijksmuseum',
    onlineCollectionUrl: 'https://www.rijksmuseum.nl/en/rijksstudio',
  },
  {
    id: 'mauritshuis',
    nameKey: 'museums.mauritshuis',
    city: 'The Hague',
    country: 'Netherlands',
    countryCode: 'NL',
    coordinates: { lat: 52.0804, lng: 4.3142 },
    foundedYear: 1822,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f0/Mauritshuis_den_Haag.jpg',
    websiteUrl: 'https://www.mauritshuis.nl',
    accentColor: '#B8860B',
    descriptionKey: 'museums.mauritshuis.desc',
  },
  {
    id: 'van-gogh-museum',
    nameKey: 'museums.vanGoghMuseum',
    city: 'Amsterdam',
    country: 'Netherlands',
    countryCode: 'NL',
    coordinates: { lat: 52.3584, lng: 4.8811 },
    foundedYear: 1973,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Van_Gogh_Museum_Amsterdam.jpg',
    websiteUrl: 'https://www.vangoghmuseum.nl',
    accentColor: '#F4D03F',
    descriptionKey: 'museums.vanGoghMuseum.desc',
    virtualTourUrl: 'https://artsandculture.google.com/partner/van-gogh-museum',
    onlineCollectionUrl: 'https://www.vangoghmuseum.nl/en/collection',
  },

  // ╔═══════════════════════════════════════════════════╗
  // ║  GERMANY                                          ║
  // ╚═══════════════════════════════════════════════════╝

  {
    id: 'alte-pinakothek',
    nameKey: 'museums.altePinakothek',
    city: 'Munich',
    country: 'Germany',
    countryCode: 'DE',
    coordinates: { lat: 48.1482, lng: 11.5700 },
    foundedYear: 1836,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/Alte_Pinakothek_%28Muenchen%29.jpg',
    websiteUrl: 'https://www.pinakothek.de',
    accentColor: '#4A5568',
    descriptionKey: 'museums.altePinakothek.desc',
    virtualTourUrl: 'https://artsandculture.google.com/partner/alte-pinakothek',
    onlineCollectionUrl: 'https://www.sammlung.pinakothek.de/en',
  },
  {
    id: 'pergamon-museum',
    nameKey: 'museums.pergamonMuseum',
    city: 'Berlin',
    country: 'Germany',
    countryCode: 'DE',
    coordinates: { lat: 52.5212, lng: 13.3966 },
    foundedYear: 1930,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Pergamonmuseum_2014.jpg',
    websiteUrl: 'https://www.smb.museum/museen-einrichtungen/pergamonmuseum',
    accentColor: '#5D6D7E',
    descriptionKey: 'museums.pergamonMuseum.desc',
    virtualTourUrl: 'https://artsandculture.google.com/partner/pergamonmuseum-staatliche-museen-zu-berlin',
    onlineCollectionUrl: 'https://www.smb.museum/en/museums-institutions/pergamonmuseum/',
  },
  {
    id: 'gemaldegalerie-berlin',
    nameKey: 'museums.gemaldegalerieBerlin',
    city: 'Berlin',
    country: 'Germany',
    countryCode: 'DE',
    coordinates: { lat: 52.5087, lng: 13.3649 },
    foundedYear: 1830,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/Gem%C3%A4ldegalerie_Berlin_2019.jpg',
    websiteUrl: 'https://www.smb.museum/museen-einrichtungen/gemaeldegalerie',
    accentColor: '#34495E',
    descriptionKey: 'museums.gemaldegalerieBerlin.desc',
    virtualTourUrl: 'https://artsandculture.google.com/partner/gemaldegalerie-staatliche-museen-zu-berlin',
    onlineCollectionUrl: 'https://www.smb.museum/en/museums-institutions/gemaldegalerie/',
  },

  // ╔═══════════════════════════════════════════════════╗
  // ║  AUSTRIA                                          ║
  // ╚═══════════════════════════════════════════════════╝

  {
    id: 'belvedere',
    nameKey: 'museums.belvedere',
    city: 'Vienna',
    country: 'Austria',
    countryCode: 'AT',
    coordinates: { lat: 48.1915, lng: 16.3808 },
    foundedYear: 1903,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/Belvedere_bei_Nacht.jpg',
    websiteUrl: 'https://www.belvedere.at',
    accentColor: '#C4A265',
    descriptionKey: 'museums.belvedere.desc',
    virtualTourUrl: 'https://artsandculture.google.com/partner/belvedere',
    onlineCollectionUrl: 'https://www.belvedere.at/en/collection',
  },
  {
    id: 'kunsthistorisches-museum',
    nameKey: 'museums.kunsthistorischesMuseum',
    city: 'Vienna',
    country: 'Austria',
    countryCode: 'AT',
    coordinates: { lat: 48.2034, lng: 16.3614 },
    foundedYear: 1891,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/8f/KHM_Wien_2015.jpg',
    websiteUrl: 'https://www.khm.at',
    accentColor: '#8B6914',
    descriptionKey: 'museums.kunsthistorischesMuseum.desc',
    virtualTourUrl: 'https://artsandculture.google.com/partner/kunsthistorisches-museum-vienna',
    onlineCollectionUrl: 'https://www.khm.at/en/objectdb/',
  },

  // ╔═══════════════════════════════════════════════════╗
  // ║  SCANDINAVIA                                      ║
  // ╚═══════════════════════════════════════════════════╝

  {
    id: 'munch-museum',
    nameKey: 'museums.munchMuseum',
    city: 'Oslo',
    country: 'Norway',
    countryCode: 'NO',
    coordinates: { lat: 59.9054, lng: 10.7541 },
    foundedYear: 1963,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Munchmuseet_%282022%29.jpg',
    websiteUrl: 'https://www.munchmuseet.no',
    accentColor: '#5B2C6F',
    descriptionKey: 'museums.munchMuseum.desc',
    virtualTourUrl: 'https://artsandculture.google.com/partner/munchmuseet',
    onlineCollectionUrl: 'https://www.munchmuseet.no/en/collection/',
  },

  // ╔═══════════════════════════════════════════════════╗
  // ║  RUSSIA                                           ║
  // ╚═══════════════════════════════════════════════════╝

  {
    id: 'hermitage',
    nameKey: 'museums.hermitage',
    city: 'St. Petersburg',
    country: 'Russia',
    countryCode: 'RU',
    coordinates: { lat: 59.9398, lng: 30.3146 },
    foundedYear: 1764,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/52/Hermitage_museum_Saint-Petersburg_winter_palace.jpg',
    websiteUrl: 'https://www.hermitagemuseum.org',
    accentColor: '#2E8B57',
    descriptionKey: 'museums.hermitage.desc',
    virtualTourUrl: 'https://artsandculture.google.com/partner/the-state-hermitage-museum',
    onlineCollectionUrl: 'https://www.hermitagemuseum.org/wps/portal/hermitage/explore/collections',
  },
  {
    id: 'tretyakov-gallery',
    nameKey: 'museums.tretyakovGallery',
    city: 'Moscow',
    country: 'Russia',
    countryCode: 'RU',
    coordinates: { lat: 55.7415, lng: 37.6208 },
    foundedYear: 1856,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/0d/Tretyakov_Gallery%2C_Moscow.jpg',
    websiteUrl: 'https://www.tretyakovgallery.ru',
    accentColor: '#8B0000',
    descriptionKey: 'museums.tretyakovGallery.desc',
    virtualTourUrl: 'https://artsandculture.google.com/partner/the-state-tretyakov-gallery',
    onlineCollectionUrl: 'https://www.tretyakovgallery.ru/en/collection/',
  },

  // ╔═══════════════════════════════════════════════════╗
  // ║  UNITED STATES                                    ║
  // ╚═══════════════════════════════════════════════════╝

  {
    id: 'met',
    nameKey: 'museums.met',
    city: 'New York',
    country: 'United States',
    countryCode: 'US',
    coordinates: { lat: 40.7794, lng: -73.9632 },
    foundedYear: 1870,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/30/Metropolitan_Museum_of_Art_%28The_Met%29_-_Central_Park%2C_NYC.jpg',
    websiteUrl: 'https://www.metmuseum.org',
    accentColor: '#E74C3C',
    descriptionKey: 'museums.met.desc',
    virtualTourUrl: 'https://artsandculture.google.com/partner/the-metropolitan-museum-of-art',
    onlineCollectionUrl: 'https://www.metmuseum.org/art/collection',
  },
  {
    id: 'moma',
    nameKey: 'museums.moma',
    city: 'New York',
    country: 'United States',
    countryCode: 'US',
    coordinates: { lat: 40.7614, lng: -73.9776 },
    foundedYear: 1929,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/MOMA_NY2.jpg',
    websiteUrl: 'https://www.moma.org',
    accentColor: '#000000',
    descriptionKey: 'museums.moma.desc',
    virtualTourUrl: 'https://artsandculture.google.com/partner/moma-the-museum-of-modern-art',
    onlineCollectionUrl: 'https://www.moma.org/collection/',
  },
  {
    id: 'national-gallery-washington',
    nameKey: 'museums.nationalGalleryWashington',
    city: 'Washington D.C.',
    country: 'United States',
    countryCode: 'US',
    coordinates: { lat: 38.8913, lng: -77.0199 },
    foundedYear: 1937,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/GallijNGA.jpg',
    websiteUrl: 'https://www.nga.gov',
    accentColor: '#1E3A5F',
    descriptionKey: 'museums.nationalGalleryWashington.desc',
    virtualTourUrl: 'https://artsandculture.google.com/partner/national-gallery-of-art-washington-dc',
    onlineCollectionUrl: 'https://www.nga.gov/collection.html',
  },
  {
    id: 'art-institute-chicago',
    nameKey: 'museums.artInstituteChicago',
    city: 'Chicago',
    country: 'United States',
    countryCode: 'US',
    coordinates: { lat: 41.8796, lng: -87.6237 },
    foundedYear: 1879,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/eb/Art_Institute_of_Chicago_%2851575570710%29.jpg',
    websiteUrl: 'https://www.artic.edu',
    accentColor: '#2F4F4F',
    descriptionKey: 'museums.artInstituteChicago.desc',
    virtualTourUrl: 'https://artsandculture.google.com/partner/the-art-institute-of-chicago',
    onlineCollectionUrl: 'https://www.artic.edu/collection',
  },
  {
    id: 'guggenheim-nyc',
    nameKey: 'museums.guggenheimNYC',
    city: 'New York',
    country: 'United States',
    countryCode: 'US',
    coordinates: { lat: 40.7830, lng: -73.9590 },
    foundedYear: 1939,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/ff/Guggenheim_museum_exterior.jpg',
    websiteUrl: 'https://www.guggenheim.org',
    accentColor: '#FFFDF0',
    descriptionKey: 'museums.guggenheimNYC.desc',
    virtualTourUrl: 'https://artsandculture.google.com/partner/solomon-r-guggenheim-museum',
    onlineCollectionUrl: 'https://www.guggenheim.org/collection-online',
  },
  {
    id: 'getty-museum',
    nameKey: 'museums.gettyMuseum',
    city: 'Los Angeles',
    country: 'United States',
    countryCode: 'US',
    coordinates: { lat: 34.0780, lng: -118.4741 },
    foundedYear: 1974,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/J._Paul_Getty_Museum.jpg',
    websiteUrl: 'https://www.getty.edu/museum',
    accentColor: '#F5F5DC',
    descriptionKey: 'museums.gettyMuseum.desc',
    virtualTourUrl: 'https://artsandculture.google.com/partner/the-j-paul-getty-museum',
    onlineCollectionUrl: 'https://www.getty.edu/art/collection/',
  },
  {
    id: 'lacma',
    nameKey: 'museums.lacma',
    city: 'Los Angeles',
    country: 'United States',
    countryCode: 'US',
    coordinates: { lat: 34.0639, lng: -118.3592 },
    foundedYear: 1965,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/24/LACMA_entrance.jpg',
    websiteUrl: 'https://www.lacma.org',
    accentColor: '#FF6B35',
    descriptionKey: 'museums.lacma.desc',
  },
  {
    id: 'whitney-museum',
    nameKey: 'museums.whitneyMuseum',
    city: 'New York',
    country: 'United States',
    countryCode: 'US',
    coordinates: { lat: 40.7396, lng: -74.0089 },
    foundedYear: 1930,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b0/Whitney_Museum_of_American_Art.jpg',
    websiteUrl: 'https://whitney.org',
    accentColor: '#333333',
    descriptionKey: 'museums.whitneyMuseum.desc',
  },

  // ╔═══════════════════════════════════════════════════╗
  // ║  SOUTH AMERICA                                    ║
  // ╚═══════════════════════════════════════════════════╝

  {
    id: 'masp',
    nameKey: 'museums.masp',
    city: 'São Paulo',
    country: 'Brazil',
    countryCode: 'BR',
    coordinates: { lat: -23.5614, lng: -46.6558 },
    foundedYear: 1947,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5d/MASP_-_S%C3%A3o_Paulo.jpg',
    websiteUrl: 'https://masp.org.br',
    accentColor: '#E63946',
    descriptionKey: 'museums.masp.desc',
    virtualTourUrl: 'https://artsandculture.google.com/partner/masp',
    onlineCollectionUrl: 'https://masp.org.br/en/collection',
  },
  {
    id: 'pinacoteca-sao-paulo',
    nameKey: 'museums.pinacotecaSaoPaulo',
    city: 'São Paulo',
    country: 'Brazil',
    countryCode: 'BR',
    coordinates: { lat: -23.5342, lng: -46.6337 },
    foundedYear: 1905,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e9/Pinacoteca_S%C3%A3o_Paulo.jpg',
    websiteUrl: 'https://pinacoteca.org.br',
    accentColor: '#C41E3A',
    descriptionKey: 'museums.pinacotecaSaoPaulo.desc',
  },
  {
    id: 'malba',
    nameKey: 'museums.malba',
    city: 'Buenos Aires',
    country: 'Argentina',
    countryCode: 'AR',
    coordinates: { lat: -34.5877, lng: -58.4034 },
    foundedYear: 2001,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b7/MALBA_%28Buenos_Aires%29.jpg',
    websiteUrl: 'https://www.malba.org.ar',
    accentColor: '#F0E68C',
    descriptionKey: 'museums.malba.desc',
  },
  {
    id: 'mnba-buenos-aires',
    nameKey: 'museums.mnbaBuenosAires',
    city: 'Buenos Aires',
    country: 'Argentina',
    countryCode: 'AR',
    coordinates: { lat: -34.5844, lng: -58.3937 },
    foundedYear: 1896,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Museo_Nacional_de_Bellas_Artes_%28Buenos_Aires%29.jpg',
    websiteUrl: 'https://www.bellasartes.gob.ar',
    accentColor: '#D2691E',
    descriptionKey: 'museums.mnbaBuenosAires.desc',
  },
  {
    id: 'museo-nacional-colombia',
    nameKey: 'museums.museoNacionalColombia',
    city: 'Bogotá',
    country: 'Colombia',
    countryCode: 'CO',
    coordinates: { lat: 4.6155, lng: -74.0692 },
    foundedYear: 1823,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Museo_Nacional_de_Colombia.JPG',
    websiteUrl: 'https://www.museonacional.gov.co',
    accentColor: '#FFD700',
    descriptionKey: 'museums.museoNacionalColombia.desc',
  },

  // ╔═══════════════════════════════════════════════════╗
  // ║  JAPAN                                            ║
  // ╚═══════════════════════════════════════════════════╝

  {
    id: 'tokyo-national',
    nameKey: 'museums.tokyoNational',
    city: 'Tokyo',
    country: 'Japan',
    countryCode: 'JP',
    coordinates: { lat: 35.7189, lng: 139.7745 },
    foundedYear: 1872,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Tokyo_National_Museum%2C_Honkan_2010.jpg',
    websiteUrl: 'https://www.tnm.jp',
    accentColor: '#8B0000',
    descriptionKey: 'museums.tokyoNational.desc',
    virtualTourUrl: 'https://artsandculture.google.com/partner/tokyo-national-museum',
    onlineCollectionUrl: 'https://www.tnm.jp/modules/r_collection/',
  },
  {
    id: 'nmwa-tokyo',
    nameKey: 'museums.nmwaTokyo',
    city: 'Tokyo',
    country: 'Japan',
    countryCode: 'JP',
    coordinates: { lat: 35.7153, lng: 139.7759 },
    foundedYear: 1959,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/National_museum_of_western_art05s3200.jpg',
    websiteUrl: 'https://www.nmwa.go.jp',
    accentColor: '#4682B4',
    descriptionKey: 'museums.nmwaTokyo.desc',
  },
  {
    id: 'mori-art-museum',
    nameKey: 'museums.moriArtMuseum',
    city: 'Tokyo',
    country: 'Japan',
    countryCode: 'JP',
    coordinates: { lat: 35.6604, lng: 139.7292 },
    foundedYear: 2003,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/81/Roppongi_Hills_from_Tokyo_Tower.jpg',
    websiteUrl: 'https://www.mori.art.museum',
    accentColor: '#191970',
    descriptionKey: 'museums.moriArtMuseum.desc',
  },

  // ╔═══════════════════════════════════════════════════╗
  // ║  CHINA                                            ║
  // ╚═══════════════════════════════════════════════════╝

  {
    id: 'palace-museum',
    nameKey: 'museums.palaceMuseum',
    city: 'Beijing',
    country: 'China',
    countryCode: 'CN',
    coordinates: { lat: 39.9163, lng: 116.3972 },
    foundedYear: 1925,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Forbidden_city_07.jpg',
    websiteUrl: 'https://www.dpm.org.cn',
    accentColor: '#B22222',
    descriptionKey: 'museums.palaceMuseum.desc',
    virtualTourUrl: 'https://artsandculture.google.com/partner/the-palace-museum-beijing',
    onlineCollectionUrl: 'https://en.dpm.org.cn/collections/',
  },
  {
    id: 'shanghai-museum',
    nameKey: 'museums.shanghaiMuseum',
    city: 'Shanghai',
    country: 'China',
    countryCode: 'CN',
    coordinates: { lat: 31.2292, lng: 121.4734 },
    foundedYear: 1952,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e1/Shanghai_Museum_exterior_1.jpg',
    websiteUrl: 'https://www.shanghaimuseum.net',
    accentColor: '#8B6914',
    descriptionKey: 'museums.shanghaiMuseum.desc',
    virtualTourUrl: 'https://artsandculture.google.com/partner/shanghai-museum',
    onlineCollectionUrl: 'https://www.shanghaimuseum.net/en/',
  },
  {
    id: 'national-art-museum-china',
    nameKey: 'museums.nationalArtMuseumChina',
    city: 'Beijing',
    country: 'China',
    countryCode: 'CN',
    coordinates: { lat: 39.9283, lng: 116.4064 },
    foundedYear: 1963,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/China_national_art_museum.JPG',
    websiteUrl: 'https://www.namoc.org',
    accentColor: '#CD5C5C',
    descriptionKey: 'museums.nationalArtMuseumChina.desc',
  },

  // ╔═══════════════════════════════════════════════════╗
  // ║  SOUTH KOREA                                      ║
  // ╚═══════════════════════════════════════════════════╝

  {
    id: 'national-museum-korea',
    nameKey: 'museums.nationalMuseumKorea',
    city: 'Seoul',
    country: 'South Korea',
    countryCode: 'KR',
    coordinates: { lat: 37.5238, lng: 126.9802 },
    foundedYear: 1945,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/49/National_Museum_of_Korea.jpg',
    websiteUrl: 'https://www.museum.go.kr',
    accentColor: '#003366',
    descriptionKey: 'museums.nationalMuseumKorea.desc',
    virtualTourUrl: 'https://artsandculture.google.com/partner/national-museum-of-korea',
    onlineCollectionUrl: 'https://www.museum.go.kr/site/eng/collection/list',
  },

  // ╔═══════════════════════════════════════════════════╗
  // ║  INDIA                                            ║
  // ╚═══════════════════════════════════════════════════╝

  {
    id: 'ngma-delhi',
    nameKey: 'museums.ngmaDelhi',
    city: 'New Delhi',
    country: 'India',
    countryCode: 'IN',
    coordinates: { lat: 28.5970, lng: 77.1797 },
    foundedYear: 1954,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/0d/National_Gallery_of_Modern_Art%2C_New_Delhi.jpg',
    websiteUrl: 'https://ngmaindia.gov.in',
    accentColor: '#FF6600',
    descriptionKey: 'museums.ngmaDelhi.desc',
  },

  // ╔═══════════════════════════════════════════════════╗
  // ║  TURKEY                                           ║
  // ╚═══════════════════════════════════════════════════╝

  {
    id: 'istanbul-modern',
    nameKey: 'museums.istanbulModern',
    city: 'Istanbul',
    country: 'Turkey',
    countryCode: 'TR',
    coordinates: { lat: 41.0256, lng: 28.9835 },
    foundedYear: 2004,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Istanbul_Modern_Museum.jpg',
    websiteUrl: 'https://www.istanbulmodern.org',
    accentColor: '#DC143C',
    descriptionKey: 'museums.istanbulModern.desc',
  },

  // ╔═══════════════════════════════════════════════════╗
  // ║  CANADA                                           ║
  // ╚═══════════════════════════════════════════════════╝

  {
    id: 'ago-toronto',
    nameKey: 'museums.agoToronto',
    city: 'Toronto',
    country: 'Canada',
    countryCode: 'CA',
    coordinates: { lat: 43.6536, lng: -79.3925 },
    foundedYear: 1900,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/94/Art_Gallery_of_Ontario_-_new_wing.jpg',
    websiteUrl: 'https://ago.ca',
    accentColor: '#4169E1',
    descriptionKey: 'museums.agoToronto.desc',
  },

  // ╔═══════════════════════════════════════════════════╗
  // ║  AUSTRALIA                                        ║
  // ╚═══════════════════════════════════════════════════╝

  {
    id: 'ngv-melbourne',
    nameKey: 'museums.ngvMelbourne',
    city: 'Melbourne',
    country: 'Australia',
    countryCode: 'AU',
    coordinates: { lat: -37.8226, lng: 144.9689 },
    foundedYear: 1861,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/24/National_Gallery_of_Victoria.jpg',
    websiteUrl: 'https://www.ngv.vic.gov.au',
    accentColor: '#0047AB',
    descriptionKey: 'museums.ngvMelbourne.desc',
  },

  // ╔═══════════════════════════════════════════════════╗
  // ║  AFRICA / MIDDLE EAST                             ║
  // ╚═══════════════════════════════════════════════════╝

  {
    id: 'egyptian-museum',
    nameKey: 'museums.egyptianMuseum',
    city: 'Cairo',
    country: 'Egypt',
    countryCode: 'EG',
    coordinates: { lat: 30.0478, lng: 31.2336 },
    foundedYear: 1902,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/GD-EG-Caire-Mus%C3%A9e007.JPG',
    websiteUrl: 'https://egyptianmuseum.org',
    accentColor: '#C5932A',
    descriptionKey: 'museums.egyptianMuseum.desc',
    virtualTourUrl: 'https://artsandculture.google.com/partner/the-egyptian-museum',
    onlineCollectionUrl: 'https://egyptianmuseumcairo.eg/',
  },
  {
    id: 'zeitz-mocaa',
    nameKey: 'museums.zeitzMOCAA',
    city: 'Cape Town',
    country: 'South Africa',
    countryCode: 'ZA',
    coordinates: { lat: -33.9083, lng: 18.4174 },
    foundedYear: 2017,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/Zeitz_MOCAA.jpg',
    websiteUrl: 'https://www.zeitzmocaa.museum',
    accentColor: '#2C2C2C',
    descriptionKey: 'museums.zeitzMOCAA.desc',
  },

  // ═══════════════════════════════════════════════════════
  // GREECE — Ελλάδα
  // ═══════════════════════════════════════════════════════
  {
    id: 'national-archaeological-athens',
    nameKey: 'museums.nationalArchaeologicalAthens',
    city: 'Athens',
    country: 'Greece',
    countryCode: 'GR',
    coordinates: { lat: 37.9892, lng: 23.7322 },
    foundedYear: 1829,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/National_Archeological_Museum_Athens.jpg',
    websiteUrl: 'https://www.namuseum.gr/en',
    accentColor: '#B8860B',
    descriptionKey: 'museums.nationalArchaeologicalAthens.desc',
  },
  {
    id: 'acropolis-museum',
    nameKey: 'museums.acropolisMuseum',
    city: 'Athens',
    country: 'Greece',
    countryCode: 'GR',
    coordinates: { lat: 37.9686, lng: 23.7278 },
    foundedYear: 2009,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/10/Acropolis_Museum_%28front%29.jpg',
    websiteUrl: 'https://www.theacropolismuseum.gr/en',
    accentColor: '#C8A26A',
    descriptionKey: 'museums.acropolisMuseum.desc',
    virtualTourUrl: 'https://artsandculture.google.com/partner/acropolis-museum',
    onlineCollectionUrl: 'https://www.theacropolismuseum.gr/en/collection',
  },

  // ═══════════════════════════════════════════════════════
  // PERU — Perú
  // ═══════════════════════════════════════════════════════
  {
    id: 'mali-lima',
    nameKey: 'museums.maliLima',
    city: 'Lima',
    country: 'Peru',
    countryCode: 'PE',
    coordinates: { lat: -12.0612, lng: -77.0311 },
    foundedYear: 1961,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/80/Palacio_de_la_Exposici%C3%B3n.jpg',
    websiteUrl: 'https://www.mali.pe',
    accentColor: '#8B4513',
    descriptionKey: 'museums.maliLima.desc',
  },
  {
    id: 'larco-museum',
    nameKey: 'museums.larcoMuseum',
    city: 'Lima',
    country: 'Peru',
    countryCode: 'PE',
    coordinates: { lat: -12.0700, lng: -77.0692 },
    foundedYear: 1926,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/dc/Larco_Museum.jpg',
    websiteUrl: 'https://www.larcomuseum.org',
    accentColor: '#8B0000',
    descriptionKey: 'museums.larcoMuseum.desc',
  },

  // ═══════════════════════════════════════════════════════
  // CHILE
  // ═══════════════════════════════════════════════════════
  {
    id: 'mnba-chile',
    nameKey: 'museums.mnbaChile',
    city: 'Santiago',
    country: 'Chile',
    countryCode: 'CL',
    coordinates: { lat: -33.4345, lng: -70.6395 },
    foundedYear: 1880,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Museo_Nacional_de_Bellas_Artes_Chile.jpg',
    websiteUrl: 'https://www.mnba.gob.cl',
    accentColor: '#2E8B57',
    descriptionKey: 'museums.mnbaChile.desc',
  },

  // ═══════════════════════════════════════════════════════
  // THAILAND — ไทย
  // ═══════════════════════════════════════════════════════
  {
    id: 'bangkok-national-museum',
    nameKey: 'museums.bangkokNationalMuseum',
    city: 'Bangkok',
    country: 'Thailand',
    countryCode: 'TH',
    coordinates: { lat: 13.7578, lng: 100.4923 },
    foundedYear: 1874,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b0/Bangkok_National_Museum.jpg',
    websiteUrl: 'https://www.finearts.go.th',
    accentColor: '#DAA520',
    descriptionKey: 'museums.bangkokNationalMuseum.desc',
  },

  // ═══════════════════════════════════════════════════════
  // INDONESIA
  // ═══════════════════════════════════════════════════════
  {
    id: 'national-museum-indonesia',
    nameKey: 'museums.nationalMuseumIndonesia',
    city: 'Jakarta',
    country: 'Indonesia',
    countryCode: 'ID',
    coordinates: { lat: -6.1761, lng: 106.8217 },
    foundedYear: 1778,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/09/National_Museum_of_Indonesia.jpg',
    websiteUrl: 'https://www.museumnasional.or.id',
    accentColor: '#CD853F',
    descriptionKey: 'museums.nationalMuseumIndonesia.desc',
  },

  // ═══════════════════════════════════════════════════════
  // VIETNAM — Việt Nam
  // ═══════════════════════════════════════════════════════
  {
    id: 'vnfam-hanoi',
    nameKey: 'museums.vnfamHanoi',
    city: 'Hanoi',
    country: 'Vietnam',
    countryCode: 'VN',
    coordinates: { lat: 21.0306, lng: 105.8370 },
    foundedYear: 1966,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Vietnam_Fine_Arts_Museum.jpg',
    websiteUrl: 'https://vnfam.vn',
    accentColor: '#C41E3A',
    descriptionKey: 'museums.vnfamHanoi.desc',
  },

  // ═══════════════════════════════════════════════════════
  // MOROCCO — المغرب
  // ═══════════════════════════════════════════════════════
  {
    id: 'mmvi-rabat',
    nameKey: 'museums.mmviRabat',
    city: 'Rabat',
    country: 'Morocco',
    countryCode: 'MA',
    coordinates: { lat: 34.0153, lng: -6.8328 },
    foundedYear: 2014,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5d/MMVI_Rabat.jpg',
    websiteUrl: 'https://www.museemohammed6.ma',
    accentColor: '#006400',
    descriptionKey: 'museums.mmviRabat.desc',
  },

  // ═══════════════════════════════════════════════════════
  // NIGERIA
  // ═══════════════════════════════════════════════════════
  {
    id: 'national-museum-lagos',
    nameKey: 'museums.nationalMuseumLagos',
    city: 'Lagos',
    country: 'Nigeria',
    countryCode: 'NG',
    coordinates: { lat: 6.4392, lng: 3.4235 },
    foundedYear: 1957,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f2/National_Museum_Lagos.jpg',
    websiteUrl: 'https://ncmm.gov.ng',
    accentColor: '#228B22',
    descriptionKey: 'museums.nationalMuseumLagos.desc',
  },

  // ═══════════════════════════════════════════════════════
  // GHANA
  // ═══════════════════════════════════════════════════════
  {
    id: 'national-museum-ghana',
    nameKey: 'museums.nationalMuseumGhana',
    city: 'Accra',
    country: 'Ghana',
    countryCode: 'GH',
    coordinates: { lat: 5.5604, lng: -0.2064 },
    foundedYear: 1957,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5a/National_Museum_of_Ghana.jpg',
    websiteUrl: 'https://www.ghanamuseums.org',
    accentColor: '#FFD700',
    descriptionKey: 'museums.nationalMuseumGhana.desc',
  },

  // ═══════════════════════════════════════════════════════
  // POLAND — Polska
  // ═══════════════════════════════════════════════════════
  {
    id: 'mnw-warsaw',
    nameKey: 'museums.mnwWarsaw',
    city: 'Warsaw',
    country: 'Poland',
    countryCode: 'PL',
    coordinates: { lat: 52.2317, lng: 21.0247 },
    foundedYear: 1862,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e3/National_Museum_in_Warsaw.jpg',
    websiteUrl: 'https://www.mnw.art.pl/en',
    accentColor: '#DC143C',
    descriptionKey: 'museums.mnwWarsaw.desc',
  },

  // ═══════════════════════════════════════════════════════
  // HUNGARY — Magyarország
  // ═══════════════════════════════════════════════════════
  {
    id: 'museum-fine-arts-budapest',
    nameKey: 'museums.museumFineArtsBudapest',
    city: 'Budapest',
    country: 'Hungary',
    countryCode: 'HU',
    coordinates: { lat: 47.5159, lng: 19.0768 },
    foundedYear: 1906,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/16/Museum_of_Fine_Arts_Budapest.jpg',
    websiteUrl: 'https://www.szepmuveszeti.hu',
    accentColor: '#800000',
    descriptionKey: 'museums.museumFineArtsBudapest.desc',
  },

  // ═══════════════════════════════════════════════════════
  // CZECH REPUBLIC — Česko
  // ═══════════════════════════════════════════════════════
  {
    id: 'ng-prague',
    nameKey: 'museums.ngPrague',
    city: 'Prague',
    country: 'Czech Republic',
    countryCode: 'CZ',
    coordinates: { lat: 50.1011, lng: 14.4325 },
    foundedYear: 1796,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Veletr%C5%BEn%C3%AD_pal%C3%A1c.jpg',
    websiteUrl: 'https://www.ngprague.cz/en',
    accentColor: '#4B0082',
    descriptionKey: 'museums.ngPrague.desc',
  },

  // ═══════════════════════════════════════════════════════
  // IRAN — ایران
  // ═══════════════════════════════════════════════════════
  {
    id: 'tmoca-tehran',
    nameKey: 'museums.tmocaTehran',
    city: 'Tehran',
    country: 'Iran',
    countryCode: 'IR',
    coordinates: { lat: 35.7114, lng: 51.3906 },
    foundedYear: 1977,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Tehran_Museum_of_Contemporary_Art.jpg',
    websiteUrl: 'https://www.tmoca.com',
    accentColor: '#2F4F4F',
    descriptionKey: 'museums.tmocaTehran.desc',
  },
];

/** Get a museum by ID */
export function getMuseum(id: string): Museum | undefined {
  return MUSEUMS.find((m) => m.id === id);
}

/** Get all museums in a country */
export function getMuseumsByCountry(countryCode: string): Museum[] {
  return MUSEUMS.filter((m) => m.countryCode === countryCode);
}

/** Get unique countries that have museums */
export function getMuseumCountries(): string[] {
  return [...new Set(MUSEUMS.map((m) => m.countryCode))];
}

/** Get total museum count */
export function getMuseumCount(): number {
  return MUSEUMS.length;
}

/** Search museums by name, city, or country */
export function searchMuseums(query: string): Museum[] {
  const q = query.toLowerCase();
  return MUSEUMS.filter(
    (m) =>
      m.city.toLowerCase().includes(q) ||
      m.country.toLowerCase().includes(q) ||
      m.id.toLowerCase().includes(q)
  );
}
