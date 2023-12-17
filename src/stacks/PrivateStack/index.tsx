import React from 'react';

import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { config } from '../../config/gluestack-ui.config';
import { useAuth } from '../../contexts/Auth';
import AdminConfig from '../../screens/AdminConfig';
import CreateFarm from '../../screens/CreateFarm';
import Home from '../../screens/Home';
import Profile from '../../screens/Profile';
import { ERole } from '../../utils/Enums';
import { AnimalStack } from './AnimalsStack';
import { BatchStack } from './BatchStack';
import { EnclosureStack } from './EnclosureStack';

const BottomTab = createBottomTabNavigator<PrivateStackParamList>();

export const PrivateStack = () => {
  const { colors, fontWeights } = config.tokens;
  const { userInfo, appConfig } = useAuth();

  return (
    <BottomTab.Navigator
      screenOptions={({ navigation }) => ({
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: colors.secondary500,
        tabBarInactiveTintColor: colors.trueGray400,
        tabBarLabelStyle: {
          color: navigation.isFocused()
            ? colors.primary500
            : colors.trueGray400,
          fontWeight: navigation.isFocused()
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
      {userInfo?.role === ERole.ADMIN && !appConfig?.farm && (
        <>
          <BottomTab.Screen
            name={'AdminConfig'}
            component={AdminConfig}
            options={{
              title: 'Selecionar fazenda',
              tabBarStyle: { display: 'none' },
            }}
          />
          <BottomTab.Screen
            name="CreateFarm"
            component={CreateFarm}
            options={{
              title: 'Criar fazenda',
              tabBarStyle: { display: 'none' },
            }}
          />
        </>
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
        name="BatchStack"
        component={BatchStack}
        options={{
          title: 'Lote',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="fence" size={24} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="AnimalStack"
        component={AnimalStack}
        options={{
          title: 'Animais',
          headerShown: false,
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
