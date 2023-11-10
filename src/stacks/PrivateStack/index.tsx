import React from 'react';

import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { config } from '../../config/gluestack-ui.config';
import { useAuth } from '../../contexts/Auth';
import AdminConfig from '../../screens/AdminConfig';
import Animals from '../../screens/Animals';
import Home from '../../screens/Home';
import Profile from '../../screens/Profile';
import { EnclosureStack } from './EnclosureStack';

const BottomTab = createBottomTabNavigator<PrivateStackParamList>();

export const PrivateStack = () => {
  const { colors, fontWeights } = config.tokens;
  const { appConfig } = useAuth();
  return (
    <BottomTab.Navigator
      screenOptions={({ navigation }) => ({
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: colors.secondary500,
        tabBarInactiveTintColor: colors.green700,
        tabBarLabelStyle: {
          color: navigation.isFocused() ? colors.primary700 : colors.green700,
          fontFamily: navigation.isFocused()
            ? fontWeights.extrabold
            : fontWeights.normal,
        },
        headerStyle: {
          backgroundColor: colors.primary500,
        },
        headerTintColor: colors.textDark0,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      {appConfig && (
        <BottomTab.Screen
          name={'AdminConfig'}
          component={AdminConfig}
          options={{
            title: 'Selecionar fazenda',
            tabBarStyle: { display: 'none' },
          }}
        />
      )}
      <BottomTab.Screen
        name="Dashboard"
        component={Home}
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color }) => (
            <AntDesign name="dashboard" size={24} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="EnclosureStack"
        component={EnclosureStack}
        options={{
          title: 'Recinto',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={24} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Animal"
        component={Animals}
        options={{
          title: 'Animais',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="cow" size={24} color={color} />
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
