/**
 * MŪSA World Museums Database
 *
 * The greatest museums on Earth, each one a room in "El Museo de los Museos".
 * Coordinates are precise for the 3D globe.
 * Images are public domain or CC0.
 */

import type { Museum } from './types';
export type { Museum } from './types';

export const MUSEUMS: Museum[] = [
  // ═══════════════════════════════════════════
  // EUROPE
  // ═══════════════════════════════════════════

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
  },
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
  },
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
  },
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
  },
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
  },
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
  },
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
  },
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
  },
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

  // ═══════════════════════════════════════════
  // AMERICAS
  // ═══════════════════════════════════════════

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
  },
  {
    id: 'masp',
    nameKey: 'museums.masp',
    city: 'Sao Paulo',
    country: 'Brazil',
    countryCode: 'BR',
    coordinates: { lat: -23.5614, lng: -46.6558 },
    foundedYear: 1947,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5d/MASP_-_S%C3%A3o_Paulo.jpg',
    websiteUrl: 'https://masp.org.br',
    accentColor: '#E63946',
    descriptionKey: 'museums.masp.desc',
  },

  // ═══════════════════════════════════════════
  // ASIA
  // ═══════════════════════════════════════════

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
  },
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
  },

  // ═══════════════════════════════════════════
  // AFRICA / MIDDLE EAST
  // ═══════════════════════════════════════════

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
