export type Role = 'client' | 'pecheur';

export type Preparation = { nom: string; supplementKg: number };

export type Produit = {
  id: string;
  espece: string;
  prixKg: number; // en euros
  dispoKg: number;
  preparations: Preparation[];
};

export type Etal = {
  id: string; // identifiant du pêcheur
  pecheur: string; // prénom affiché
  port: string;
  note: number;
  avis: number;
  bateau: string;
  debarque: number; // minutes depuis minuit
  limiteRetrait: number; // minutes depuis minuit
  produits: Produit[];
  // Adresse exacte : visible seulement après paiement (règle anti-contournement)
  lieu?: string;
  precision?: string;
};

export type LignePanier = { produitId: string; espece: string; kg: number; prixKg: number; preparation: string; supplementKg: number };

export type Panier = { etalId: string; lignes: LignePanier[] } | null;

export type StatutBon = 'reserve' | 'retire' | 'annule';

export type Bon = {
  code: string;
  etalId: string;
  client: string;
  lignes: LignePanier[];
  creneau: string;
  statut: StatutBon;
  montantBloque: number;
  montantPaye?: number;
  creeLe: number;
};

export type Message = {
  id: string;
  auteur: Role | 'systeme';
  texte?: string;
  position?: { libelle: string; lat: number; lon: number };
  heure: number;
};

export type Conversation = { id: string; etalId: string; client: string; bon: string; messages: Message[]; luClient: boolean; luPecheur: boolean };

export type Session = { telephone: string; role: Role; prenom: string; etalId?: string; statutPecheur?: 'en_attente' | 'verifie'; stripePret?: boolean } | null;
