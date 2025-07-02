import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebaseConfig';

export default function ResetPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);

  const reset = async () => {
    await sendPasswordResetEmail(auth, email);
    setMessage('Email sent');
  };

  return (
    <View>
      <Text>Reset Password</Text>
      {message && <Text>{message}</Text>}
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <Button title="Send" onPress={reset} />
    </View>
  );
}
