import { router } from 'expo-router';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bouton, EnTete, T } from '../src/components/ui';
import { MODE_DEMO, useApp } from '../src/store';
import { couleurs as c } from '../src/theme';

export default function Compte() {
  const app = useApp();
  const s = app.e.session;
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: c.fond }}>
      <EnTete titre="Mon compte" fermer />
      <ScrollView contentContainerStyle={{ padding: 16, gap: 14 }}>
        <View style={{ gap: 2 }}>
          <T tresGras style={{ fontSize: 22 }}>{s?.prenom}</T>
          <T gris>{s?.role === 'pecheur' ? 'Pêcheur professionnel' : 'Client'} · numéro terminant par {s?.telephone.slice(-2)}</T>
        </View>
        {MODE_DEMO ? <T gris petit>Mode démo : les données restent sur ce téléphone, aucun paiement réel.</T> : null}
        <Bouton titre="Me déconnecter" onPress={() => { app.deconnecter(); router.replace('/connexion'); }} />
        {MODE_DEMO ? <Bouton clair titre="Recommencer la démo (tout effacer)" onPress={() => { app.reinitialiser(); router.replace('/connexion'); }} /> : null}
      </ScrollView>
    </SafeAreaView>
  );
}
