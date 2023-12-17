import React from 'react';

import { ScrollView } from '@gluestack-ui/themed';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Dimensions } from 'react-native';
import { BarChart, LineChart, ProgressChart } from 'react-native-chart-kit';

import { config } from '../../config/gluestack-ui.config';

type HomeProps = BottomTabScreenProps<PrivateStackParamList, 'Dashboard'>;

const Home: React.FC<HomeProps> = () => {
  const colors = config.tokens.colors;
  const data = {
    labels: ['Swim', 'Bike', 'Run'], // optional
    data: [0.4, 0.6, 0.8],
  };

  const data2 = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
      },
    ],
  };
  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'center',
        paddingVertical: 20,
      }}
    >
      <LineChart
        data={{
          labels: ['January', 'February', 'March', 'April', 'May', 'June'],
          datasets: [
            {
              data: [
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
              ],
            },
          ],
        }}
        width={Dimensions.get('window').width - 50} // from react-native
        height={220}
        yAxisLabel="$"
        yAxisSuffix="k"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: colors.secondary400,
          backgroundGradientFrom: colors.secondary400,
          backgroundGradientTo: colors.secondary400,
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: colors.secondary200,
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />

      <ProgressChart
        data={data}
        width={Dimensions.get('window').width - 50}
        height={220}
        strokeWidth={16}
        radius={32}
        chartConfig={{
          backgroundColor: colors.secondary400,
          backgroundGradientFrom: colors.secondary400,
          backgroundGradientTo: colors.secondary400,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
        hideLegend={false}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />

      <BarChart
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
        data={data2}
        width={Dimensions.get('window').width - 50}
        height={220}
        chartConfig={{
          backgroundColor: colors.secondary400,
          backgroundGradientFrom: colors.secondary400,
          backgroundGradientTo: colors.secondary400,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
        yAxisLabel="$"
        yAxisSuffix="k"
        verticalLabelRotation={30}
      />
    </ScrollView>
  );
};

export default Home;
