import React from 'react';

import { AntDesign } from '@expo/vector-icons';
import { useToken } from '@gluestack-ui/themed';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { config } from '../../config/gluestack-ui.config';
import { useAuth } from '../../contexts/Auth';
import AdminConfig from '../../screens/AdminConfig';
import Home from '../../screens/Home';
import Profile from '../../screens/Profile';

const BottomTab = createBottomTabNavigator<PrivateStackParamList>();

export const PrivateStack = () => {
  const colors = config.tokens.colors;
  const { appConfig } = useAuth();
  return (
    <BottomTab.Navigator
      screenOptions={({ navigation }) => ({
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: colors.secondary500,
        tabBarInactiveTintColor: colors.green700,
        tabBarLabelStyle: {
          color: navigation.isFocused() ? colors.primary500 : colors.green700,
          fontFamily: navigation.isFocused()
            ? useToken('fontWeights', 'extrabold')
            : useToken('fontWeights', 'normal'),
        },
        headerStyle: {
          backgroundColor: colors.primary400,
        },
        headerTintColor: colors.textDark0,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      {appConfig ? (
        <BottomTab.Screen
          name={'AdminConfig'}
          component={AdminConfig}
          options={{
            title: 'Selecionar fazenda',
            tabBarStyle: { display: 'none' },
          }}
        />
      ) : null}
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
