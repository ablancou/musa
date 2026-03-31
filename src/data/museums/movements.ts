/**
 * Art Movements / Corrientes Artísticas
 * Complete metadata for the multifaceted search system
 */

import type { MovementInfo } from './types';

export const ART_MOVEMENTS: MovementInfo[] = [
  { id: 'ancient-egyptian', nameKey: 'movements.ancientEgyptian', startYear: -3000, endYear: -30, descriptionKey: 'movements.ancientEgyptian.desc', color: '#C5932A' },
  { id: 'ancient-greek', nameKey: 'movements.ancientGreek', startYear: -800, endYear: -31, descriptionKey: 'movements.ancientGreek.desc', color: '#7B8D8E' },
  { id: 'ancient-roman', nameKey: 'movements.ancientRoman', startYear: -500, endYear: 476, descriptionKey: 'movements.ancientRoman.desc', color: '#8B4513' },
  { id: 'hellenistic', nameKey: 'movements.hellenistic', startYear: -323, endYear: -31, descriptionKey: 'movements.hellenistic.desc', color: '#9B7653' },
  { id: 'medieval', nameKey: 'movements.medieval', startYear: 500, endYear: 1400, descriptionKey: 'movements.medieval.desc', color: '#5C3A1E' },
  { id: 'gothic', nameKey: 'movements.gothic', startYear: 1140, endYear: 1500, descriptionKey: 'movements.gothic.desc', color: '#2F1B41' },
  { id: 'early-renaissance', nameKey: 'movements.earlyRenaissance', startYear: 1400, endYear: 1495, descriptionKey: 'movements.earlyRenaissance.desc', color: '#6B8E4E' },
  { id: 'high-renaissance', nameKey: 'movements.highRenaissance', startYear: 1495, endYear: 1527, descriptionKey: 'movements.highRenaissance.desc', color: '#8B6914' },
  { id: 'mannerism', nameKey: 'movements.mannerism', startYear: 1520, endYear: 1600, descriptionKey: 'movements.mannerism.desc', color: '#6A5ACD' },
  { id: 'baroque', nameKey: 'movements.baroque', startYear: 1600, endYear: 1750, descriptionKey: 'movements.baroque.desc', color: '#722F37' },
  { id: 'rococo', nameKey: 'movements.rococo', startYear: 1720, endYear: 1780, descriptionKey: 'movements.rococo.desc', color: '#DDA0DD' },
  { id: 'neoclassicism', nameKey: 'movements.neoclassicism', startYear: 1760, endYear: 1850, descriptionKey: 'movements.neoclassicism.desc', color: '#4682B4' },
  { id: 'romanticism', nameKey: 'movements.romanticism', startYear: 1790, endYear: 1880, descriptionKey: 'movements.romanticism.desc', color: '#B22222' },
  { id: 'realism', nameKey: 'movements.realism', startYear: 1840, endYear: 1900, descriptionKey: 'movements.realism.desc', color: '#556B2F' },
  { id: 'impressionism', nameKey: 'movements.impressionism', startYear: 1860, endYear: 1900, descriptionKey: 'movements.impressionism.desc', color: '#87CEEB' },
  { id: 'post-impressionism', nameKey: 'movements.postImpressionism', startYear: 1880, endYear: 1910, descriptionKey: 'movements.postImpressionism.desc', color: '#FFD700' },
  { id: 'symbolism', nameKey: 'movements.symbolism', startYear: 1880, endYear: 1910, descriptionKey: 'movements.symbolism.desc', color: '#4B0082' },
  { id: 'art-nouveau', nameKey: 'movements.artNouveau', startYear: 1890, endYear: 1910, descriptionKey: 'movements.artNouveau.desc', color: '#C4A265' },
  { id: 'fauvism', nameKey: 'movements.fauvism', startYear: 1904, endYear: 1910, descriptionKey: 'movements.fauvism.desc', color: '#FF4500' },
  { id: 'expressionism', nameKey: 'movements.expressionism', startYear: 1905, endYear: 1933, descriptionKey: 'movements.expressionism.desc', color: '#DC143C' },
  { id: 'cubism', nameKey: 'movements.cubism', startYear: 1907, endYear: 1925, descriptionKey: 'movements.cubism.desc', color: '#808080' },
  { id: 'futurism', nameKey: 'movements.futurism', startYear: 1909, endYear: 1944, descriptionKey: 'movements.futurism.desc', color: '#FF6347' },
  { id: 'dada', nameKey: 'movements.dada', startYear: 1916, endYear: 1924, descriptionKey: 'movements.dada.desc', color: '#000000' },
  { id: 'surrealism', nameKey: 'movements.surrealism', startYear: 1924, endYear: 1966, descriptionKey: 'movements.surrealism.desc', color: '#9370DB' },
  { id: 'abstract-expressionism', nameKey: 'movements.abstractExpressionism', startYear: 1943, endYear: 1965, descriptionKey: 'movements.abstractExpressionism.desc', color: '#1E90FF' },
  { id: 'pop-art', nameKey: 'movements.popArt', startYear: 1955, endYear: 1975, descriptionKey: 'movements.popArt.desc', color: '#FF1493' },
  { id: 'minimalism', nameKey: 'movements.minimalism', startYear: 1960, endYear: 1975, descriptionKey: 'movements.minimalism.desc', color: '#F5F5F5' },
  { id: 'ukiyo-e', nameKey: 'movements.ukiyoE', startYear: 1615, endYear: 1912, descriptionKey: 'movements.ukiyoE.desc', color: '#C41E3A' },
  { id: 'chinese-classical', nameKey: 'movements.chineseClassical', startYear: -1600, endYear: 1912, descriptionKey: 'movements.chineseClassical.desc', color: '#8B0000' },
];

/** Get a movement by ID */
export function getMovement(id: string): MovementInfo | undefined {
  return ART_MOVEMENTS.find((m) => m.id === id);
}

/** Get movements active during a specific year */
export function getMovementsByYear(year: number): MovementInfo[] {
  return ART_MOVEMENTS.filter((m) => year >= m.startYear && year <= m.endYear);
}
