import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.replace('Onboarding');
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <View>
      <Text>Login</Text>
      {error && <Text>{error}</Text>}
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Login" onPress={login} />
      <Button title="Signup" onPress={() => navigation.navigate('Signup')} />
      <Button title="Reset Password" onPress={() => navigation.navigate('ResetPassword')} />
    </View>
  );
}
