import React from 'react';

import { AntDesign } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from 'styled-components';

import Home from '../../screens/Home';

const BottomTab = createBottomTabNavigator<PrivateStackParamList>();

export const PrivateStack = () => {
  const theme = useTheme();

  return (
    <BottomTab.Navigator
      screenOptions={({ navigation }) => ({
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: theme.colors.secondary,
        tabBarInactiveTintColor: theme.colors.gray.four,
        tabBarLabelStyle: {
          color: navigation.isFocused()
            ? theme.colors.primary
            : theme.colors.gray.four,
          fontFamily: navigation.isFocused()
            ? theme.font.bold
            : theme.font.medium,
        },
      })}
    >
      <BottomTab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          title: 'Home',
          tabBarIcon: () => <AntDesign name="home" size={24} color="black" />,
        }}
      />
    </BottomTab.Navigator>
  );
};
