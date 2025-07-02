import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { auth, db } from '../firebaseConfig';
import { doc, updateDoc } from 'firebase/firestore';
import { format } from 'date-fns';

export default function OnboardingScreen({ navigation }) {
  const [quitDate, setQuitDate] = useState('');
  const [cigsPerDay, setCigsPerDay] = useState('');
  const [pricePerPack, setPricePerPack] = useState('');

  const save = async () => {
    const user = auth.currentUser;
    if (!user) return;
    await updateDoc(doc(db, 'users', user.uid), {
      quitDate,
      cigarettesPerDay: parseInt(cigsPerDay, 10),
      pricePerPack: parseFloat(pricePerPack)
    });
    navigation.replace('Main');
  };

  return (
    <View>
      <Text>Onboarding</Text>
      <TextInput placeholder="Quit Date (YYYY-MM-DD)" value={quitDate} onChangeText={setQuitDate} />
      <TextInput placeholder="Cigarettes Per Day" value={cigsPerDay} onChangeText={setCigsPerDay} keyboardType="numeric" />
      <TextInput placeholder="Price Per Pack" value={pricePerPack} onChangeText={setPricePerPack} keyboardType="numeric" />
      <Button title="Save" onPress={save} />
    </View>
  );
}
