import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { auth, db } from '../firebaseConfig';
import { doc, onSnapshot, updateDoc, arrayUnion } from 'firebase/firestore';
import { AdMobInterstitial } from 'expo-ads-admob';

const ACHIEVEMENTS = [1, 7, 30, 100];

export default function AchievementsScreen() {
  const [badges, setBadges] = useState([]);
  const [days, setDays] = useState(0);

  useEffect(() => {
    const uid = auth.currentUser.uid;
    const unsub = onSnapshot(doc(db, 'users', uid), async (docSnap) => {
      const data = docSnap.data();
      setBadges(data.achievements || []);
      if (data.quitDate) {
        const diff = Math.floor((Date.now() - new Date(data.quitDate)) / (1000 * 60 * 60 * 24));
        setDays(diff);
        ACHIEVEMENTS.forEach(async (d) => {
          if (diff >= d && !data.achievements?.includes(d)) {
            await updateDoc(doc(db, 'users', uid), {
              achievements: arrayUnion(d)
            });
            await AdMobInterstitial.setAdUnitID('ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyy');
            await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true });
            await AdMobInterstitial.showAdAsync();
          }
        });
      }
    });
    return unsub;
  }, []);

  return (
    <View>
      <Text>Achievements</Text>
      <FlatList
        data={ACHIEVEMENTS}
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => (
          <Text>{badges.includes(item) ? `Unlocked ${item} days` : `${item} days`}</Text>
        )}
      />
    </View>
  );
}
