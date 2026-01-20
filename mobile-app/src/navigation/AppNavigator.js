import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTranslation } from 'react-i18next';

import HomeScreen from '../screens/HomeScreen';
import VideosScreen from '../screens/VideosScreen';
import AboutScreen from '../screens/AboutScreen';
import DonateScreen from '../screens/DonateScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { colors } from '../styles/globalStyles';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabNavigator = () => {
  const { t } = useTranslation();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Videos') {
            iconName = 'video-library';
          } else if (route.name === 'About') {
            iconName = 'info';
          } else if (route.name === 'Settings') {
            iconName = 'settings';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.secondary,
          borderTopWidth: 2,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ tabBarLabel: t('home') }}
      />
      <Tab.Screen 
        name="Videos" 
        component={VideosScreen}
        options={{ tabBarLabel: t('videos') }}
      />
      <Tab.Screen 
        name="About" 
        component={AboutScreen}
        options={{ tabBarLabel: t('about') }}
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{ tabBarLabel: t('settings') }}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={TabNavigator} />
        <Stack.Screen name="Donate" component={DonateScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;