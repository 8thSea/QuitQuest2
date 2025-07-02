import React from 'react';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

export default function SavingsChart({ days, cigsPerDay, pricePerPack }) {
  const data = Array.from({ length: days + 1 }, (_, i) => ((i * cigsPerDay) / 20) * pricePerPack);
  return (
    <LineChart
      data={{ labels: data.map((_, i) => i.toString()), datasets: [{ data }] }}
      width={Dimensions.get('window').width - 16}
      height={220}
      chartConfig={{ color: () => `rgba(0,0,0,0.5)` }}
    />
  );
}
