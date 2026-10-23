import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bouton, Chip, Logo, T } from '../src/components/ui';
import { PORTS } from '../src/data/demo';
import { MODE_DEMO, useApp } from '../src/store';
import { couleurs as c, polices as f } from '../src/theme';

// Inscription pêcheur : identité professionnelle, vérification, puis compte de paiement (Stripe Connect)
export default function InscriptionPecheur() {
  const app = useApp();
  const { tel } = useLocalSearchParams<{ tel?: string }>();
  const session = app.e.session;
  const [prenom, setPrenom] = useState('');
  const [port, setPort] = useState('Le Robert');
  const [bateau, setBateau] = useState('');
  const [immat, setImmat] = useState('');
  const complet = prenom.trim() && bateau.trim() && immat.trim().length >= 5;

  if (session?.role === 'pecheur') {
    const verifie = session.statutPecheur === 'verifie';
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: c.fond }}>
        <ScrollView contentContainerStyle={{ padding: 24, gap: 18 }}>
          <Logo taille={30} />
          <T tresGras style={{ fontSize: 24 }}>Bonjou {session.prenom}</T>
          <Etape num="1" titre="Dossier envoyé" texte="Vos informations de pêcheur professionnel sont enregistrées." fait />
          <Etape num="2" titre="Vérification" texte={verifie ? 'Votre statut de pêcheur professionnel est vérifié.' : 'Nous vérifions votre immatriculation et votre statut (sous 48 h). Vous recevrez un SMS.'} fait={verifie} />
          <Etape num="3" titre="Compte de paiement" texte={session.stripePret ? 'Votre compte est prêt : l’argent des ventes vous est versé automatiquement.' : 'Pièce d’identité, RIB et SIRET, pour recevoir l’argent de vos ventes. Nous pouvons vous aider à le remplir.'} fait={!!session.stripePret} />
          {MODE_DEMO && !verifie ? <Bouton clair titre="Démo : simuler la vérification" onPress={app.simulerVerification} /> : null}
          {verifie && !session.stripePret ? <Bouton titre="Ouvrir mon compte de paiement" onPress={app.simulerStripe} /> : null}
          {verifie && session.stripePret ? <Bouton titre="Publier mon premier arrivage" onPress={() => router.replace('/(pecheur)/arrivage')} /> : null}
          <Bouton clair titre="Me déconnecter" onPress={() => { app.deconnecter(); router.replace('/connexion'); }} />
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: c.fond }}>
      <ScrollView contentContainerStyle={{ padding: 24, gap: 16 }} keyboardShouldPersistTaps="handled">
        <Logo taille={30} />
        <View style={{ gap: 6 }}>
          <T tresGras style={{ fontSize: 24 }}>Vendre sur Pêche Connect</T>
          <T gris>Réservé aux pêcheurs professionnels. Ces informations servent à vérifier votre statut ; elles ne sont pas montrées aux clients.</T>
        </View>
        <Champ libelle="Votre prénom (affiché aux clients)" valeur={prenom} onChange={setPrenom} exemple="Ex. Jean-Marc" />
        <View style={{ gap: 8 }}>
          <T gras>Votre port ou marché</T>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {Object.keys(PORTS).map((p) => <Chip key={p} titre={p} actif={port === p} onPress={() => setPort(p)} />)}
          </View>
        </View>
        <Champ libelle="Nom de votre bateau" valeur={bateau} onChange={setBateau} exemple="Ex. Yole Bèl Lanmè" />
        <Champ libelle="Immatriculation du bateau" valeur={immat} onChange={(v) => setImmat(v.toUpperCase())} exemple="Ex. FF 890414" />
        <Bouton titre="Envoyer mon dossier" desactive={!complet}
          onPress={() => app.inscrirePecheur({ prenom: prenom.trim(), port, bateau: bateau.trim(), immatriculation: immat.trim(), telephone: tel ?? '' })} />
        <Bouton clair titre="Retour" onPress={() => router.replace('/connexion')} />
      </ScrollView>
    </SafeAreaView>
  );
}

function Champ({ libelle, valeur, onChange, exemple }: { libelle: string; valeur: string; onChange: (v: string) => void; exemple: string }) {
  return (
    <View style={{ gap: 6 }}>
      <T gras>{libelle}</T>
      <TextInput value={valeur} onChangeText={onChange} placeholder={exemple} style={st.champ} />
    </View>
  );
}

function Etape({ num, titre, texte, fait }: { num: string; titre: string; texte: string; fait?: boolean }) {
  return (
    <View style={{ flexDirection: 'row', gap: 12 }}>
      <View style={[st.num, fait && { backgroundColor: c.vert }]}><T tresGras style={{ color: '#fff' }}>{fait ? '✓' : num}</T></View>
      <View style={{ flex: 1, gap: 2 }}><T tresGras>{titre}</T><T gris>{texte}</T></View>
    </View>
  );
}

const st = StyleSheet.create({
  champ: { height: 52, borderRadius: 12, backgroundColor: c.doux, paddingHorizontal: 16, fontSize: 16, fontFamily: f.gras, color: c.texte },
  num: { width: 32, height: 32, borderRadius: 16, backgroundColor: c.marine, alignItems: 'center', justifyContent: 'center' },
});
