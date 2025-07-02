import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { auth, db } from '../firebaseConfig';
import { doc, onSnapshot } from 'firebase/firestore';
import Avatar from '../components/Avatar';
import SavingsChart from '../components/SavingsChart';
import { differenceInDays } from 'date-fns';

export default function DashboardScreen() {
  const [userData, setUserData] = useState(null);
  const [days, setDays] = useState(0);
  const [moneySaved, setMoneySaved] = useState(0);

  useEffect(() => {
    const uid = auth.currentUser.uid;
    const unsub = onSnapshot(doc(db, 'users', uid), (docSnap) => {
      const data = docSnap.data();
      setUserData(data);
      if (data.quitDate) {
        const diff = differenceInDays(new Date(), new Date(data.quitDate));
        setDays(diff);
        const packsNotBought = (diff * data.cigarettesPerDay) / 20;
        setMoneySaved(packsNotBought * data.pricePerPack);
      }
    });
    return unsub;
  }, []);

  if (!userData) return <Text>Loading...</Text>;

  return (
    <View>
      <Text>Days smoke-free: {days}</Text>
      <Text>Money saved: ${moneySaved.toFixed(2)}</Text>
      <Avatar level={days} />
      <SavingsChart days={days} pricePerPack={userData.pricePerPack} cigsPerDay={userData.cigarettesPerDay} />
    </View>
  );
}
