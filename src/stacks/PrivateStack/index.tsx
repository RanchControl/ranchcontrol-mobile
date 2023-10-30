import React from 'react';

import { AntDesign } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from 'native-base';

import Home from '../../screens/Home';
import Profile from '../../screens/Profile';

const BottomTab = createBottomTabNavigator<PrivateStackParamList>();

export const PrivateStack = () => {
  const theme = useTheme();

  return (
    <BottomTab.Navigator
      screenOptions={({ navigation }) => ({
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: theme.colors.secondary[500],
        tabBarInactiveTintColor: theme.colors.gray[500],
        tabBarLabelStyle: {
          color: navigation.isFocused()
            ? theme.colors.primary[500]
            : theme.colors.gray[500],
          fontFamily: navigation.isFocused()
            ? theme.fontWeights.extrabold.toString()
            : theme.fontWeights.normal.toString(),
        },
      })}
    >
      <BottomTab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={24} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          title: 'Perfil',
          tabBarIcon: ({ color }) => (
            <AntDesign name="setting" size={24} color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};
