import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bouton, EnTete, Ligne, Stepper, T, Vide } from '../../src/components/ui';
import { euro, FRAIS_SERVICE, kg, sousTotal } from '../../src/format';
import { useApp } from '../../src/store';
import { couleurs as c } from '../../src/theme';

// Pesée devant le client : seul le poids réel est encaissé (capture Stripe en production)
export default function Pesee() {
  const { code } = useLocalSearchParams<{ code: string }>();
  const app = useApp();
  const b = app.e.bons.find((x) => x.code === code);
  const [poids, setPoids] = useState<number[]>(b ? b.lignes.map((l) => l.kg) : []);
  if (!b) return <SafeAreaView style={{ flex: 1 }}><EnTete titre="Pesée" /><Vide titre="Bon introuvable" texte="Revenez aux réservations." /></SafeAreaView>;
  const lignesPesees = b.lignes.map((l, i) => ({ ...l, kg: poids[i] }));
  const montant = Math.round((sousTotal(lignesPesees) + FRAIS_SERVICE) * 100) / 100;
  const trop = montant > b.montantBloque + 0.001;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: c.fond }}>
      <EnTete titre={'Pesée · ' + b.code} sousTitre={(b.client === 'Vous' ? 'Client démo' : b.client) + ' · ' + b.creneau} />
      <ScrollView>
        {b.statut === 'retire' ? (
          <Vide titre="Vente clôturée" texte={'Encaissé : ' + euro(b.montantPaye ?? 0) + '. Le reste de l’empreinte a été libéré.'} />
        ) : (
          <>
            {b.lignes.map((l, i) => (
              <View key={l.produitId} style={{ flexDirection: 'row', alignItems: 'center', gap: 12, padding: 16, borderBottomWidth: 1, borderBottomColor: c.ligne }}>
                <View style={{ flex: 1 }}><T tresGras style={{ fontSize: 16 }}>{l.espece}</T><T gris petit>Réservé {kg(l.kg)} · {l.preparation.toLowerCase()} · {euro(l.prixKg + l.supplementKg)}/kg</T></View>
                <Stepper valeur={kg(poids[i])} onMoins={() => setPoids((p) => p.map((x, j) => (j === i ? Math.max(0, Math.round((x - 0.1) * 10) / 10) : x)))} onPlus={() => setPoids((p) => p.map((x, j) => (j === i ? Math.round((x + 0.1) * 10) / 10 : x)))} />
              </View>
            ))}
            <View style={{ padding: 16, gap: 8 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}><T>Montant bloqué (max)</T><T>{euro(b.montantBloque)}</T></View>
              <Ligne />
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}><T tresGras>À encaisser (poids réel + frais)</T><T tresGras>{euro(montant)}</T></View>
              {trop ? <T gras style={{ color: c.alerte }}>Au-delà du montant bloqué : retirez un peu de poisson ou demandez au client de valider le supplément.</T> : <T gris petit>Le client voit le poids et le montant s’afficher sur son bon.</T>}
            </View>
          </>
        )}
      </ScrollView>
      {b.statut === 'retire' ? null : (
        <View style={{ padding: 16, borderTopWidth: 1, borderTopColor: c.ligne }}>
          <Bouton titre={'Valider la pesée · ' + euro(montant)} desactive={trop} onPress={() => { app.validerPesee(b.code, poids); router.back(); }} />
        </View>
      )}
    </SafeAreaView>
  );
}
