import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const signup = async () => {
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, 'users', cred.user.uid), {
        quitDate: null,
        cigarettesPerDay: 0,
        pricePerPack: 0,
        achievements: [],
        subscriptionStatus: 'free'
      });
      navigation.replace('Onboarding');
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <View>
      <Text>Signup</Text>
      {error && <Text>{error}</Text>}
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Signup" onPress={signup} />
    </View>
  );
}
