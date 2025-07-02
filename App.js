import React from 'react';
import { StatusBar } from 'expo-status-bar';
import Navigation from './navigation';
import { withStripeProvider } from './services/stripeService';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

export default function App() {
  const [fontsLoaded] = useFonts({
    PressStart2P: require('./assets/16bit/fonts/PressStart2P.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return withStripeProvider(
    <>
      <Navigation />
      <StatusBar style="auto" />
    </>
  );
}
