import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Platform, Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IcCompte, IcMicro, IcPhoto } from '../../src/components/icones';
import { Bouton, Chip, Feuille, Logo, Rond, Stepper, T } from '../../src/components/ui';
import { ESPECES } from '../../src/data/demo';
import { euro, heure, kg } from '../../src/format';
import { useApp } from '../../src/store';
import { couleurs as c } from '../../src/theme';

type L = { espece: string; prixKg: number; dispoKg: number; preparations: { nom: string; supplementKg: number }[] };

// Publier l'arrivage en moins d'une minute : prix et quantités d'hier pré-remplis
export default function Arrivage() {
  const app = useApp();
  const s = app.e.session!;
  const e = app.etal(s.etalId)!;
  const [lignes, setLignes] = useState<L[]>([]);
  const [ajout, setAjout] = useState(false);
  const [publie, setPublie] = useState(false);
  useEffect(() => { setLignes(e.produits.map((p) => ({ espece: p.espece, prixKg: p.prixKg, dispoKg: p.dispoKg, preparations: p.preparations }))); }, [e.id]);
  const total = lignes.reduce((t, l) => t + l.dispoKg, 0);
  const aPreparer = app.bonsPecheur(s.etalId).filter((b) => b.statut === 'reserve').length;
  const maj = (i: number, f: (l: L) => L) => setLignes((ls) => ls.map((l, j) => (j === i ? f(l) : l)));
  const bientot = (quoi: string) => (Platform.OS === 'web' ? undefined : Alert.alert(quoi, 'Bientôt disponible.'));

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: c.fond }}>
      <View style={{ paddingHorizontal: 16, paddingTop: 10, gap: 10 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}><Logo /><T gris>Bonjou {s.prenom}</T></View>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <Chip titre={aPreparer + ' à préparer'} onPress={() => router.navigate('/(pecheur)/reservations')} style={{ backgroundColor: c.accent, minHeight: 34 }} />
            <Rond label="Mon compte" onPress={() => router.push('/compte')}><IcCompte /></Rond>
          </View>
        </View>
        <T tresGras style={{ fontSize: 26 }}>Votre arrivage du jour</T>
        <T gris>{e.port} · retrait jusqu’à <T tresGras>{heure(e.limiteRetrait)}</T></T>
      </View>
      <ScrollView contentContainerStyle={{ padding: 16, gap: 4 }}>
        <View style={{ flexDirection: 'row', gap: 10, marginBottom: 6 }}>
          <Pressable onPress={() => bientot('Photo de la pêche')} style={{ flex: 1, minHeight: 70, borderRadius: 14, backgroundColor: c.doux, alignItems: 'center', justifyContent: 'center', gap: 6 }}><IcPhoto /><T gras>Photo de la pêche</T></Pressable>
          <Pressable onPress={() => bientot('Dicter l’arrivage')} style={{ flex: 1, minHeight: 70, borderRadius: 14, backgroundColor: c.doux, alignItems: 'center', justifyContent: 'center', gap: 6 }}><IcMicro /><T gras>Dicter l’arrivage</T></Pressable>
        </View>
        {lignes.map((l, i) => (
          <View key={l.espece} style={{ flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: c.ligne }}>
            <View style={{ flex: 1, gap: 6 }}>
              <T tresGras style={{ fontSize: 16 }}>{l.espece}</T>
              <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', borderWidth: 1, borderColor: c.ligne, borderRadius: 8, padding: 2, gap: 4 }}>
                <Pressable accessibilityLabel="Baisser le prix" onPress={() => maj(i, (x) => ({ ...x, prixKg: Math.max(1, x.prixKg - 0.5) }))} style={{ width: 26, height: 26, borderRadius: 6, backgroundColor: c.doux, alignItems: 'center', justifyContent: 'center' }}><T tresGras>−</T></Pressable>
                <T tresGras style={{ minWidth: 76, textAlign: 'center' }}>{euro(l.prixKg)}/kg</T>
                <Pressable accessibilityLabel="Monter le prix" onPress={() => maj(i, (x) => ({ ...x, prixKg: x.prixKg + 0.5 }))} style={{ width: 26, height: 26, borderRadius: 6, backgroundColor: c.doux, alignItems: 'center', justifyContent: 'center' }}><T tresGras>+</T></Pressable>
              </View>
            </View>
            <Stepper valeur={kg(l.dispoKg)} onMoins={() => maj(i, (x) => ({ ...x, dispoKg: Math.max(0, x.dispoKg - 1) }))} onPlus={() => maj(i, (x) => ({ ...x, dispoKg: x.dispoKg + 1 }))} />
          </View>
        ))}
        <Pressable onPress={() => setAjout(true)} style={{ paddingVertical: 14 }}><T tresGras>+ Ajouter une espèce</T></Pressable>
        <View style={{ backgroundColor: c.doux, borderRadius: 12, padding: 12 }}><T gris>Vos prix et quantités d’hier sont déjà remplis.</T></View>
        {publie ? <T gras style={{ color: c.vert, marginTop: 8 }}>Arrivage publié : les clients le voient tout de suite.</T> : null}
      </ScrollView>
      <View style={{ padding: 16, borderTopWidth: 1, borderTopColor: c.ligne }}>
        <Bouton titre="Mettre en vente" desactive={!total} droite={<T gras style={{ color: '#fff', opacity: 0.8 }}>{kg(total)} · {lignes.length} espèce{lignes.length > 1 ? 's' : ''}</T>}
          onPress={() => { app.publierArrivage(e.id, lignes); setPublie(true); }} />
      </View>
      <Feuille visible={ajout} onFermer={() => setAjout(false)} titre="Ajouter une espèce">
        {ESPECES.filter((x) => !lignes.some((l) => l.espece === x)).map((x) => (
          <Pressable key={x} onPress={() => { setLignes((ls) => [...ls, { espece: x, prixKg: 12, dispoKg: 5, preparations: [{ nom: 'Entier', supplementKg: 0 }] }]); setAjout(false); }}
            style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: c.ligne }}>
            <T tresGras>{x}</T><T tresGras>+</T>
          </Pressable>
        ))}
      </Feuille>
    </SafeAreaView>
  );
}
