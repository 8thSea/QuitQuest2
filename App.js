// App.js
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { UserProvider, useUser } from './src/context/UserContext';
import TabNavigator from './src/navigation/TabNavigator';
import SetupScreen from './src/screens/SetupScreen';
import AuthScreen from './src/screens/AuthScreen';
import UpgradeScreen from './src/screens/UpgradeScreen';
import LoadingSpinner from './src/components/LoadingSpinner';
import { RPG_THEME } from './src/theme/rpgTheme';
import { FirebaseService } from './src/services/firebaseConfig';
import { initializeAdMob } from './src/services/adMobService';

const Stack = createStackNavigator();

// Mock StripeProvider component since we need to install the actual Stripe package
const MockStripeProvider = ({ children }) => children;

const AppContent = () => {
  const { isSetupComplete, isLoading, userData, updateUserData } = useUser();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [needsSetup, setNeedsSetup] = useState(false);

  useEffect(() => {
    // Initialize services
    initializeServices();
    
    // For demo purposes, we'll skip Firebase auth and go straight to setup
    // In production, uncomment the Firebase auth code below
    
    setIsAuthenticated(true);
    setAuthLoading(false);
    
    // Firebase auth code (uncomment for production):
    /*
    const unsubscribe = FirebaseService.auth.onAuthStateChanged(async (user) => {
      if (user) {
        setIsAuthenticated(true);
        updateUserData({ userId: user.uid, email: user.email });
        
        // Check if user has completed setup
        const userDataResult = await FirebaseService.firestore.getUserData(user.uid);
        if (!userDataResult.success || !userDataResult.data?.heroName) {
          setNeedsSetup(true);
        }
      } else {
        setIsAuthenticated(false);
      }
      setAuthLoading(false);
    });

    return unsubscribe;
    */
  }, []);

  const initializeServices = async () => {
    try {
      // Initialize AdMob
      await initializeAdMob();
      console.log('✅ Services initialized');
    } catch (error) {
      console.error('❌ Service initialization failed:', error);
    }
  };

  const handleAuthSuccess = (requiresSetup) => {
    setNeedsSetup(requiresSetup);
  };

  // Show loading while checking auth/data
  if (isLoading || authLoading) {
    return <LoadingSpinner message="Loading your quest..." />;
  }

  // For demo, skip auth screen - uncomment for production
  /*
  if (!isAuthenticated) {
    return (
      <View style={styles.container}>
        <StatusBar style="light" backgroundColor={RPG_THEME.colors.darkBlue} />
        <AuthScreen onAuthSuccess={handleAuthSuccess} />
      </View>
    );
  }
  */

  // Show setup if needed
  if (!isSetupComplete || needsSetup) {
    return (
      <View style={styles.container}>
        <StatusBar style="light" backgroundColor={RPG_THEME.colors.darkBlue} />
        <SetupScreen />
      </View>
    );
  }

  // Show main app with navigation
  return (
    <NavigationContainer>
      <StatusBar style="light" backgroundColor={RPG_THEME.colors.darkBlue} />
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: RPG_THEME.colors.darkBlue,
            borderBottomWidth: 2,
            borderBottomColor: RPG_THEME.colors.lightBlue,
          },
          headerTitleStyle: {
            fontFamily: RPG_THEME.fonts.pixel,
            fontSize: RPG_THEME.fonts.size.medium,
            color: RPG_THEME.colors.white,
            textTransform: 'uppercase',
          },
          headerTintColor: RPG_THEME.colors.gold,
          headerBackTitle: 'Back',
        }}
      >
        <Stack.Screen 
          name="Main" 
          component={TabNavigator} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Upgrade" 
          component={UpgradeScreen}
          options={{ 
            title: 'QUEST MASTER PRO',
            headerBackTitle: 'Back'
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <MockStripeProvider>
      <UserProvider>
        <View style={styles.container}>
          <AppContent />
        </View>
      </UserProvider>
    </MockStripeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: RPG_THEME.colors.darkBlue,
  },
});