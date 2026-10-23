import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bouton, Chip, EnTete, Feuille, Ligne, T, Vide } from '../src/components/ui';
import { euro, FRAIS_SERVICE, kg, montantBloque, sousTotal } from '../src/format';
import { MODE_DEMO, useApp } from '../src/store';
import { couleurs as c } from '../src/theme';

export default function PanierEcran() {
  const app = useApp();
  const [paiement, setPaiement] = useState(false);
  const [envoi, setEnvoi] = useState(false);
  const p = app.e.panier;
  if (!p) return (
    <SafeAreaView style={{ flex: 1, backgroundColor: c.fond }}>
      <EnTete titre="Mon panier" fermer />
      <Vide titre="Votre panier est vide" texte="Ouvrez un étal et ajoutez des kilos avec +." action="Voir les étals" onAction={() => router.replace('/(client)')} />
    </SafeAreaView>
  );
  const e = app.etal(p.etalId)!;
  const cren = app.creneaux(e);
  const creneau = app.e.creneau && cren.includes(app.e.creneau) ? app.e.creneau : cren[Math.min(1, cren.length - 1)];
  const st = sousTotal(p.lignes), bloque = montantBloque(st);

  const reserver = () => {
    setEnvoi(true);
    // En production : appel à la fonction serveur « creer-reservation » qui crée l'empreinte bancaire Stripe
    setTimeout(() => {
      const code = app.reserver();
      setEnvoi(false);
      if (code) router.replace({ pathname: '/bon/[code]', params: { code } });
    }, MODE_DEMO ? 600 : 0);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: c.fond }}>
      <EnTete titre="Mon panier" sousTitre={'Étal de ' + e.pecheur + ' · ' + e.port} fermer />
      <ScrollView>
        {p.lignes.map((l) => {
          const pr = e.produits.find((x) => x.id === l.produitId)!;
          return (
            <View key={l.produitId} style={{ padding: 16, gap: 8, borderBottomWidth: 1, borderBottomColor: c.ligne }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <T tresGras>{l.espece} · {kg(l.kg)}</T>
                <T tresGras>{euro(l.kg * (l.prixKg + l.supplementKg))}</T>
              </View>
              {pr.preparations.length > 1 ? (
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                  {pr.preparations.map((pp) => <Chip key={pp.nom} titre={pp.nom + (pp.supplementKg ? ' +' + pp.supplementKg + ' €' : '')} actif={l.preparation === pp.nom} onPress={() => app.choisirPreparation(l.produitId, pp.nom)} />)}
                </View>
              ) : <T gris petit>{l.preparation}</T>}
            </View>
          );
        })}
        <View style={{ padding: 16, gap: 12 }}>
          <Pressable onPress={() => router.back()}><T tresGras>+ Ajouter d’autres poissons</T></Pressable>
          <T tresGras style={{ fontSize: 16 }}>Retrait · {e.port}</T>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            {cren.map((x) => (
              <Pressable key={x} onPress={() => app.choisirCreneau(x)} style={{ flex: 1, minHeight: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center', borderWidth: creneau === x ? 2 : 1, borderColor: creneau === x ? c.marine : c.ligne, backgroundColor: creneau === x ? c.doux : '#fff' }}>
                <T gras={creneau !== x} tresGras={creneau === x} petit>{x}</T>
              </Pressable>
            ))}
          </View>
          <Pressable onPress={() => setPaiement(true)} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderWidth: 1, borderColor: c.ligne, borderRadius: 14, padding: 14 }}>
            <View><T tresGras>Paiement</T><T gris petit>{MODE_DEMO ? 'Carte de démonstration (aucun débit)' : 'Carte bancaire ou Apple Pay'}</T></View>
            <T tresGras>Modifier</T>
          </Pressable>
          <View style={{ gap: 6 }}>
            <Ligne2 a="Sous-total estimé" b={euro(st)} />
            <Ligne2 a="Frais de service" b={euro(FRAIS_SERVICE)} />
            <Ligne style={{ marginVertical: 4 }} />
            <Ligne2 a="Montant bloqué sur la carte" b={euro(bloque)} fort />
            <T gris petit>Vous ne payez que le poids réel, pesé devant vous au retrait. Le reste est libéré aussitôt.</T>
          </View>
        </View>
      </ScrollView>
      <View style={{ padding: 16, borderTopWidth: 1, borderTopColor: c.ligne }}>
        <Bouton titre={envoi ? 'Paiement en cours…' : 'Réserver et payer'} desactive={envoi} onPress={() => { app.choisirCreneau(creneau); reserver(); }} />
      </View>
      <Feuille visible={paiement} onFermer={() => setPaiement(false)} titre="Moyen de paiement">
        <T gris style={{ marginBottom: 10 }}>{MODE_DEMO ? 'En mode démo, aucun paiement réel n’est fait.' : 'Le paiement est sécurisé par Stripe.'}</T>
        <Bouton titre="Fermer" onPress={() => setPaiement(false)} />
      </Feuille>
    </SafeAreaView>
  );
}

function Ligne2({ a, b, fort }: { a: string; b: string; fort?: boolean }) {
  return <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}><T tresGras={fort}>{a}</T><T tresGras={fort}>{b}</T></View>;
}
