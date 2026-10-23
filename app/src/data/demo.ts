import type { Etal } from '../types';

// Ports couverts et coordonnées (pour la carte et les distances)
export const PORTS: Record<string, { lat: number; lon: number }> = {
  'Grand-Rivière': { lat: 14.872, lon: -61.178 },
  'Saint-Pierre': { lat: 14.743, lon: -61.176 },
  'Belle-Fontaine': { lat: 14.672, lon: -61.159 },
  'Case-Pilote': { lat: 14.64, lon: -61.138 },
  'Fort-de-France': { lat: 14.603, lon: -61.07 },
  'Le Robert': { lat: 14.678, lon: -60.94 },
  'Le François': { lat: 14.616, lon: -60.903 },
  'Le Diamant': { lat: 14.477, lon: -61.029 },
  'Sainte-Luce': { lat: 14.468, lon: -60.925 },
  'Le Marin': { lat: 14.47, lon: -60.868 },
};

export const FILTRES = ['Tout', 'Moins d’1 h', 'Thon', 'Vivaneau', 'Dorade', 'Thazard', 'Colas', 'Langouste', 'Lambi'];

export const ESPECES = ['Thon jaune', 'Bonite', 'Dorade coryphène', 'Balaou', 'Vivaneau', 'Colas', 'Coulirou', 'Thazard', 'Chatrou', 'Langouste', 'Lambi'];

const p = (id: string, espece: string, prixKg: number, dispoKg: number, preps: [string, number][]) => ({
  id, espece, prixKg, dispoKg, preparations: preps.map(([nom, supplementKg]) => ({ nom, supplementKg })),
});

// Données d'exemple du mode démo (remplacées par Supabase en production)
export const ETALS_DEMO: Etal[] = [
  { id: 'jm', pecheur: 'Jean-Marc', port: 'Le Robert', note: 4.8, avis: 32, bateau: 'Yole Bèl Lanmè · DCP', debarque: 7 * 60 + 10, limiteRetrait: 12 * 60 + 30,
    lieu: 'Ponton du front de mer, Le Robert', precision: 'yole Bèl Lanmè, à droite de la cale',
    produits: [p('jm1', 'Thon jaune', 14, 22, [['Entier', 0], ['En tranches', 2]]), p('jm2', 'Dorade coryphène', 13, 9, [['Entière', 0], ['En filets', 3]]), p('jm3', 'Balaou', 10, 4, [['Vendu entier', 0]])] },
  { id: 'sy', pecheur: 'Sylvio', port: 'Le François', note: 4.7, avis: 18, bateau: 'Yole Ti Kaz · côtière', debarque: 7 * 60 + 35, limiteRetrait: 12 * 60,
    lieu: 'Marché du François', precision: 'premier étal à gauche en entrant',
    produits: [p('sy1', 'Vivaneau', 18, 12, [['Entier', 0], ['Écaillé et vidé', 1]]), p('sy2', 'Colas', 15, 8, [['Entier', 0], ['Écaillé et vidé', 1]]), p('sy3', 'Chatrou', 16, 5, [['Entier', 0], ['Nettoyé', 2]])] },
  { id: 'sp', pecheur: 'Didier', port: 'Saint-Pierre', note: 4.9, avis: 36, bateau: 'Yole Montagne Pelée · DCP', debarque: 7 * 60 + 30, limiteRetrait: 12 * 60,
    lieu: 'Débarcadère de Saint-Pierre', precision: 'sous le carbet bleu, face à la mer',
    produits: [p('sp1', 'Thon jaune', 13, 25, [['Entier', 0], ['En tranches', 2]]), p('sp2', 'Bonite', 10, 12, [['Entière', 0], ['En tranches', 2]]), p('sp3', 'Dorade coryphène', 13, 6, [['Entière', 0], ['En filets', 3]])] },
  { id: 'jo', pecheur: 'Josette', port: 'Sainte-Luce', note: 4.9, avis: 41, bateau: 'Yole Fanm Doubout · DCP', debarque: 7 * 60 + 50, limiteRetrait: 11 * 60 + 30,
    lieu: 'Débarcadère de Sainte-Luce', precision: 'sous le carbet des pêcheurs',
    produits: [p('jo1', 'Thazard', 15, 14, [['Entier', 0], ['En tranches', 2]]), p('jo2', 'Lambi', 25, 6, [['Nettoyé', 0]])] },
  { id: 'di', pecheur: 'Yannick', port: 'Le Diamant', note: 4.7, avis: 21, bateau: 'Yole Rocher Diamant · côtière', debarque: 7 * 60 + 15, limiteRetrait: 12 * 60,
    lieu: 'Plage du Diamant, devant le bourg', precision: 'à côté de l’église, glacière blanche',
    produits: [p('di1', 'Colas', 15, 7, [['Entier', 0], ['Écaillé et vidé', 1]]), p('di2', 'Vivaneau', 17, 5, [['Entier', 0], ['Écaillé et vidé', 1]]), p('di3', 'Coulirou', 9, 10, [['Entier', 0]])] },
  { id: 'ro', pecheur: 'Rodrigue', port: 'Le Robert', note: 4.6, avis: 12, bateau: 'Yole Lavi Bel · côtière', debarque: 6 * 60 + 20, limiteRetrait: 12 * 60,
    lieu: 'Ponton du front de mer, Le Robert', precision: 'au bout du ponton, glacière bleue',
    produits: [p('ro1', 'Coulirou', 9, 15, [['Entier', 0]]), p('ro2', 'Colas', 14, 6, [['Entier', 0], ['Écaillé et vidé', 1]])] },
  { id: 'bf', pecheur: 'Christian', port: 'Belle-Fontaine', note: 4.8, avis: 19, bateau: 'Yole Ti Pwason · DCP', debarque: 7 * 60 + 40, limiteRetrait: 12 * 60,
    lieu: 'Marché Michel-Mourtialon, Belle-Fontaine', precision: 'étal 3, côté mer',
    produits: [p('bf1', 'Thon jaune', 14, 18, [['Entier', 0], ['En tranches', 2]]), p('bf2', 'Dorade coryphène', 13, 10, [['Entière', 0], ['En filets', 3]]), p('bf3', 'Balaou', 9, 8, [['Vendu entier', 0]])] },
  { id: 'ml', pecheur: 'Marie-Line', port: 'Case-Pilote', note: 4.9, avis: 27, bateau: 'Yole Bon Vent · fond', debarque: 5 * 60 + 50, limiteRetrait: 11 * 60,
    lieu: 'Port de Case-Pilote', precision: 'à côté de l’église, sur la plage',
    produits: [p('ml1', 'Vivaneau', 17, 3, [['Entier', 0], ['Écaillé et vidé', 1]]), p('ml2', 'Colas', 14, 2, [['Entier', 0]])] },
  { id: 'fa', pecheur: 'Fabrice', port: 'Grand-Rivière', note: 4.8, avis: 22, bateau: 'Yole Nord Atlantique · DCP', debarque: 6 * 60, limiteRetrait: 11 * 60,
    lieu: 'Port de Grand-Rivière', precision: 'devant la coopérative',
    produits: [p('fa1', 'Thon jaune', 13, 30, [['Entier', 0], ['En tranches', 2]]), p('fa2', 'Langouste', 38, 6, [['Vivante', 0]])] },
  { id: 'ge', pecheur: 'Gérard', port: 'Fort-de-France', note: 4.5, avis: 54, bateau: 'Yole Madinina · côtière', debarque: 6 * 60 + 30, limiteRetrait: 13 * 60,
    lieu: 'Marché aux poissons, Fort-de-France', precision: 'allée centrale, étal 12',
    produits: [p('ge1', 'Thazard', 14, 10, [['Entier', 0], ['En tranches', 2]]), p('ge2', 'Balaou', 9, 12, [['Vendu entier', 0]])] },
  { id: 'na', pecheur: 'Nadège', port: 'Le Marin', note: 4.7, avis: 15, bateau: 'Yole Sud Sauvage · DCP', debarque: 6 * 60 + 40, limiteRetrait: 12 * 60,
    lieu: 'Marché aux poissons du Marin', precision: 'sous la tente, à droite de l’entrée',
    produits: [p('na1', 'Dorade coryphène', 12, 11, [['Entière', 0], ['En filets', 3]]), p('na2', 'Thazard', 15, 7, [['Entier', 0], ['En tranches', 2]])] },
];
