Pêche Connect relie les pêcheurs de Martinique aux consommateurs : on voit les arrivages du jour au prix du kilo, on réserve, on paie en ligne et on récupère son poisson au port ou au marché. L'identité évoque l'étal de port : la glace, le bleu-vert du large, le rouge du vivaneau.

## Principes

- **La fraîcheur d'abord.** L'heure de débarquement, la commune et le prix au kilo se lisent avant tout le reste.
- **Simple pour le pêcheur.** Publier un arrivage doit prendre moins d'une minute sur téléphone, avec de grandes zones tactiles et peu de champs.
- **Tout passe par la plateforme.** Le numéro du pêcheur n'apparaît jamais avant le paiement. Les échanges passent par la messagerie intégrée.

## Ton et rédaction

- Vouvoyer le client (« Réservez votre poisson »). Dans l'espace pêcheur, rester direct et court (« Publier l'arrivage », « Valider la pesée »).
- Employer les noms d'espèces utilisés en Martinique : thazard, coulirou, balaou, colas, chatrou, dorade coryphène.
- Écrire les prix au format français : `14,00 €/kg`. Les poids : `12,5 kg`. Les heures : `12 h 30`.
- Les boutons disent exactement ce qui se passe (« Réserver », « Clôturer la vente »), et le message de confirmation reprend le même verbe (« Réservation envoyée au pêcheur »).
- Pas d'emoji dans l'interface.

## Couleurs

- Fond de page en `glace`, cartes et feuilles en `surface`, séparées par des bordures `ligne`.
- Texte en `encre` ; informations secondaires en `encre-douce`.
- `lagon` est la couleur de marque : liens, onglet actif, anneau de focus, puces d'information sur `lagon-clair`.
- `vivaneau` est réservé au prix au kilo et à l'action principale « Réserver », avec du texte `sur-vivaneau`. Une seule action vivaneau par écran.
- `succes` et `alerte` signalent un statut et s'accompagnent toujours d'un mot (« Retirée », « Stock bas »), jamais de la couleur seule.

## Typographie

- Titres en Archivo (famille `display`), graisse 800, légèrement condensée : `titre-xl` pour l'écran, `titre` pour la commune d'une carte, `sous-titre` pour les sections.
- Texte en Atkinson Hyperlegible (famille `texte`), choisie pour sa lisibilité en plein soleil et sur petit écran : `corps`, `note`, `etiquette` en capitales espacées.
- Chiffres en JetBrains Mono (famille `chiffres`) avec chiffres tabulaires : `prix` en `vivaneau`, `donnee` pour les poids, heures et immatriculations.
- Les trois polices viennent de Google Fonts.

## Espacements et formes

- Marge latérale de page `espace-3` sur mobile ; padding de carte `espace-3` ; feuille modale `espace-4`.
- Cartes et panneaux arrondis `rayon-m`, boutons et champs `rayon-s`, puces et onglets `rayon-pilule`.
- Pas d'ombres : les cartes se détachent par leur fond `surface` et une bordure `ligne`.

## Iconographie

Pas encore de logo : le nom s'écrit en Archivo 800, « Pêche » en `encre` et « Connect » en `vivaneau`. Pas encore de jeu d'icônes ; en attendant, utiliser des libellés texte.
