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

export type InfosPro = { raison: string; type: 'Restaurant' | 'Poissonnerie' | 'Revendeur' | 'Traiteur'; siret: string; commune: string; adresse?: string };

// Livraison par un chauffeur Pêche Connect, réservée aux grosses quantités des pros
export type Livraison = { adresse: string; frais: number };

// Demande d'achat publiée par un professionnel ; un pêcheur peut y répondre
export type Demande = { id: string; pro: InfosPro; auteur: 'Vous' | string; espece: string; kg: number; prixMaxKg: number; pour: 'Aujourd’hui' | 'Demain'; note?: string; livraison?: Livraison; statut: 'ouverte' | 'acceptee' | 'annulee'; etalId?: string; bon?: string; creeLe: number };

export type Bon = {
  code: string;
  pro?: InfosPro; // commande passée par un professionnel (facture HT / TVA / TTC)
  livraison?: Livraison;
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

export type Session = { telephone: string; role: Role; prenom: string; pro?: InfosPro; etalId?: string; statutPecheur?: 'en_attente' | 'verifie'; stripePret?: boolean } | null;
