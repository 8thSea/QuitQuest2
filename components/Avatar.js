import React from 'react';
import { View, Text } from 'react-native';

export default function Avatar({ level }) {
  return (
    <View>
      <Text>Knight Level {Math.floor(level / 7)}</Text>
    </View>
  );
}
