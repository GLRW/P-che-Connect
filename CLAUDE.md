# Pêche Connect

Application mobile de mise en relation entre pêcheurs professionnels et consommateurs en Martinique. Les pêcheurs publient leurs arrivages (espèces, prix au kilo, quantités, port ou marché, heure limite de retrait). Les clients réservent, paient en ligne et récupèrent leur poisson au port ou au marché communal.

Le porteur du projet n'est pas développeur : explique les choix simplement, en français, et avance par petites étapes testables.

## Modèle économique

- Plateforme lucrative : une petite commission sur chaque vente + des frais de service payés par le client (montants à fixer, notés `[…]` dans les maquettes).
- **Anti-contournement, règle centrale** : le numéro et l'adresse exacte du pêcheur ne sont jamais visibles avant le paiement. Les échanges passent par une messagerie intégrée (numéro relais masqué en option, type Twilio).
- Valeur ajoutée qui retient les utilisateurs : paiement garanti, fin des réservations non honorées, alertes sur les espèces, traçabilité (bateau, zone de pêche), avis, fidélité.

## Paiement

- Place de marché : **Stripe Connect** (disponible en Martinique), comptes vendeurs vérifiés pour les pêcheurs, reversement automatique, commission prélevée au passage. Alternatives : Mangopay, Lemonway.
- Le poids réel n'est connu qu'à la pesée : **empreinte bancaire (capture manuelle)** à la réservation sur un montant max (~+10 %), puis encaissement du montant exact quand le pêcheur valide la pesée. Le reste est libéré.
- Certaines espèces (poisson volant, lambi) peuvent être vendues en lots à prix fixe.
- TVA Martinique : 8,5 % normal, 2,1 % réduit — à confirmer avec un comptable.
- Règles d'annulation à définir : pêcheur en rupture, client absent, délai avant remise en vente.

## Expérience utilisateur

- Inspiration : **Uber Eats** (pratique avant tout). Chaque pêcheur = un « étal » présenté comme un restaurant : photo d'ambiance, note, distance, espèces, heure de débarquement.
- Parcours client : Accueil (commune, recherche, filtres espèces, « Arrivé il y a moins d'une heure ») → Étal (poissons avec + / −, prix au kilo, dispo) → Panier (préparation : entier / tranches / filets, créneau de retrait, paiement) → Bon de retrait (code + QR, adresse exacte débloquée, messagerie).
- Parcours pêcheur : publier en moins d'une minute sur téléphone (photo, dictée vocale, + / − sur les kilos, prix de la veille pré-remplis), voir les réservations, valider la pesée, clôturer la vente.
- **Photos** : ports, marchés, yoles, débarcadères **et aussi les arrivages de poisson** (le porteur a envoyé des photos d'étals de poisson : la règle « pas de poisson » est levée). **Retirées de la démo le 23/10/2026 (le porteur n'aime pas le rendu)** : les étals affichent des cadres neutres ; les fichiers sont gardés hors du dépôt. Photos libres de droits (Unsplash, Pexels, Wikimedia Commons avec crédit) ou prises sur place. **Exception (validée par le porteur le 24/10/2026)** : deux photos d'ambiance dans l'appli, `app/assets/ambiance/yoles.jpg` (écran de connexion) et `thon.jpg` (bandeau de l'accueil, recadré sans visage). Provenance à confirmer par le porteur. Les autres photos ne sont pas dans ce dépôt (droits non vérifiés) : elles sont dans la sauvegarde zip du porteur. Avant toute réutilisation : vérifier droits, personnes reconnaissables, plaques d'immatriculation.

## Identité visuelle (validée)

- Esprit **pratique et consommation**, type appli de courses / Uber Eats. Pas d'ambiance « vacances » ni carte postale, pas de rendu « fait par une IA » (pas de pictogrammes : le porteur préfère les logos en lettres).
- **Nom** : Pêche Connect. **Phrase** : « Réservez. Payez. Récupérez. »
- **Logo « le panneau »** : « PÊCHE / CONNECT » sur deux lignes en Bebas Neue bleu `#0057d9`, un trait vertical bleu, puis la phrase en colonne (Figtree 800, noir). Sur fond noir : nom en blanc, trait `#4d8dff`. Petits formats : « PÊCHE CONNECT » sur une ligne. **En-tête de l'appli : « PÊCHE / CONNECT » écrit en entier sur deux lignes (Bebas Neue, couleur du logo) avec un trait vertical à droite** — pas de sigle « PC » dans l'appli (choix du porteur). Icône sur l'écran du téléphone : « PC » en Bebas Neue blanc sur carré de la couleur du logo (trop petit pour le nom entier). Couleur du logo : marine `#12355b` (voir ambiance ci-dessous). Planche : `logos/logo-final.html`.
- **Ambiance retenue (provisoire) : « Marine et gris »**. Bleu marine `#12355b` pour le logo, les boutons d'action et les sélections. Gris `#e5e5e2` (texte noir) à la place de la couleur d'accent : prix au kilo, créneau de retrait, compteur du panier, repères « arrivé il y a moins d'1 h ». Le gris est un remplaçant temporaire : une 2e couleur sera choisie plus tard. Écartés : orange, jaune, bleu lagon, menthe.
- La démo `demo/app-demo/index.html` (en ligne : https://claude.ai/artifact/R2nyZXzogc4etSsZMYCMrM) est la référence la plus à jour : son panneau permet d'essayer logos et couleurs en direct. Les maquettes statiques de `design/maquettes-noir-orange/` sont encore en noir / jaune.
- **Couleurs neutres de l'interface** : texte `#111111`, blanc, gris clair `#f3f3f1` (fonds secondaires), séparateurs `#e5e5e2`, texte secondaire `#62625d`. Statuts : vert `#12805c` (« 22 kg dispo »), rouge-orangé `#c2410c` (« Bientôt épuisé »), toujours avec un mot.
- **Typo** : Figtree pour toute l'interface ; Bebas Neue seulement pour le logo.
- **Bon de retrait** : carte simple et droite sur fond blanc (code + QR, créneau en jaune, adresse, boutons Itinéraire / Message). Le ticket incliné n'est plus utilisé.
- **Itinéraire** : le bouton ouvre un choix Waze / Google Maps / Plans (+ « Copier l'adresse »), via liens profonds. Logos officiels à intégrer au développement selon leurs chartes.
- **Messagerie** : ouverte seulement après la réservation, numéros masqués, réponses rapides (« J'arrive dans 10 min »…), appel via numéro relais.
- **Position du pêcheur** : depuis le chat, le pêcheur envoie sa position — en direct jusqu'à la fin du retrait, une seule fois, ou son point de vente habituel. Le client reçoit une carte dans le chat avec « Y aller » (→ Waze / Google Maps / Plans). Visible uniquement par les clients du jour avec un bon payé.
- **Carte des arrivages** : un repère par port, jaune si débarqué il y a moins d'1 h, noir sinon ; volet du bas avec les étals du port choisi. Dans l'appli réelle : vraie carte (Google Maps ou équivalent).
- `design/charte/` (palette « glace / lagon / vivaneau ») et le bleu lagon `#1e6e78` sont abandonnés.

## Contexte Martinique à respecter

- Ports et lieux : Le Robert, Le François, Case-Pilote, Sainte-Luce, Grand-Rivière, Le Marin, Sainte-Anne, Fort-de-France (marché), etc.
- Noms d'espèces locaux : thazard, coulirou, balaou, colas, chatrou, dorade coryphène, vivaneau, thon jaune, langouste, lambi.
- Réglementation : vente directe par pêcheur professionnel, traçabilité, hygiène pour le nettoyage (à vérifier auprès de la Direction de la Mer et de la DAAF). Zones interdites (chlordécone) et périodes de fermeture (lambi, langouste) : la plateforme pourrait les bloquer.
- Adoption par les pêcheurs = le vrai défi : interface ultra simple, accompagnement à l'inscription Stripe, passer par le comité des pêches et les coopératives.

## Contenu du dossier

- `design/maquettes-noir-orange/` (nom historique, l'accent est désormais jaune) : **les 10 écrans à jour**, HTML statique 390×844 — 1 accueil, 2 étal, 3 panier, 4 bon de retrait, 5 pêcheur publier, 6 carte des arrivages, 7 messagerie, 8 itinéraire, 9 position reçue (client), 10 envoyer ma position (pêcheur). Référence visuelle pour le développement. Captures dans `design/apercus-noir-orange/` (`0-les-8-ecrans.png`).
- `design/logos/` : logo final (`logo-final.html`) et pistes explorées.
- `design/maquettes/` : les 5 écrans d'origine (ancien style bleu lagon), gardés pour mémoire. Les dossiers `maquettes-theme-a/`, `maquettes-etal-noir/`, `maquettes-mix/` sont des essais intermédiaires.
- `design/prototype/prototype-v1.html` : premier prototype fonctionnel (ancien style, données d'exemple, numéro visible — à ne pas reprendre tel quel).
- `design/charte/` : tokens et règles de rédaction de la première charte.

## Prochaines étapes proposées

1. ~~Aligner l'écran pêcheur sur le style des écrans 1 à 3~~ (fait, dans `design/maquettes-noir-orange/`).
2. Ajouter les écrans manquants : bienvenue / connexion, mes bons, espace pêcheur (réservations + pesée). (Carte, messagerie et itinéraire : faits.)
3. Intégrer les photos d'ambiance.
4. Rédiger le cahier des charges.
5. Développer : stack suggérée **React Native (Expo) + Supabase** (comptes, base, temps réel) **+ Stripe Connect** ; lancement pilote sur une ou deux communes.

## Organisation du dépôt (GitHub : GLRW/P-che-Connect)

- `app/` : **la vraie application** (Expo / React Native, TypeScript, une seule base de code pour iPhone, Android et web). Tourne en « mode démo » (données locales) tant que Supabase et Stripe ne sont pas configurés.
  - `app/app/` : écrans (expo-router). `app/src/` : thème, types, données de démo, services.
  - `app/supabase/` : schéma de base de données, règles de sécurité, fonctions serveur (Stripe Connect).
  - Construire la version web : `cd app && npm install && EXPO_OFFLINE=1 npx expo export --platform web` (le service de versions d'Expo est bloqué dans l'environnement cloud : les versions sont fixées à la main pour le SDK 52, `query-string` ajouté explicitement pour expo-router).
- `demo/` : démo HTML fonctionnelle (`demo/app-demo/index.html`, en ligne sur claude.ai) et prototype cliquable.
- `design/` : maquettes, logos, charte, captures (sans photos).
- `docs/` : site GitHub Pages (https://glrw.github.io/P-che-Connect/). `docs/index.html` = la démo HTML ; `docs/app/` = **la vraie appli** (export web d'Expo, `baseUrl` `/P-che-Connect/app` (attention : adresse sensible aux majuscules) dans app.json) ; `docs/404.html` = copie de `docs/app/index.html` pour que les liens profonds de l'appli fonctionnent ; `.nojekyll` obligatoire (dossier `_expo`). Après chaque modif de l'appli : `cd app && npx tsc --noEmit && EXPO_OFFLINE=1 npx expo export --platform web`, puis recopier `app/dist` vers `docs/app` et `docs/404.html`.

## État de l'appli (`app/`)

- **Écrans faits** (mode démo, données sur le téléphone) : connexion par téléphone + code SMS (démo : 123456), choix client / pêcheur ; inscription pêcheur (prénom, port, bateau, immatriculation → vérification → compte de paiement) ; client : accueil (commune, recherche, filtres), carte OSM avec repères, étal (+ / − par 500 g, réglage fin 100 g), panier (préparation, créneau, montant bloqué), bon de retrait (code, QR, itinéraire Waze / Google Maps / Plans), mes bons, messages, chat (numéros masqués, position du pêcheur) ; pêcheur : arrivage (prix et kilos modifiables, ajout d'espèce, mise en vente), réservations, pesée (montant réel ≤ montant bloqué), messages, envoi de position.
- Le « cerveau » est `src/store.tsx` (toutes les actions). Brancher Supabase / Stripe = remplacer le contenu de ces actions par des appels serveur, sans toucher aux écrans.
- **Reste à faire** : étape 2 connexion SMS réelle (Supabase Auth + fournisseur SMS) ; étape 3 base Supabase (tables, règles de sécurité : adresse exacte visible seulement après paiement) ; étape 4 Stripe Connect (empreinte, capture à la pesée, commission, reversement) ; vrai QR signé ; photo / dictée de l'arrivage ; notifications ; carte vivante (react-native-maps) dans l'appli installée.
