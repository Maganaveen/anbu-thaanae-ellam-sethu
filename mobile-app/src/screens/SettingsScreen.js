import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  ScrollView,
  Alert,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotification from 'react-native-push-notification';
import { globalStyles, colors } from '../styles/globalStyles';

const SettingsScreen = () => {
  const { t, i18n } = useTranslation();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const toggleLanguage = async () => {
    const newLang = i18n.language === 'ta' ? 'en' : 'ta';
    await i18n.changeLanguage(newLang);
    await AsyncStorage.setItem('language', newLang);
  };

  const toggleNotifications = async (value) => {
    setNotificationsEnabled(value);
    await AsyncStorage.setItem('notifications', value.toString());
    
    if (value) {
      PushNotification.requestPermissions();
    } else {
      PushNotification.abandonPermissions();
    }
  };

  const clearCache = () => {
    Alert.alert(
      'Clear Cache',
      'Are you sure you want to clear the app cache?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          onPress: () => {
            // Clear cache logic here
            Alert.alert('Success', 'Cache cleared successfully');
          },
        },
      ]
    );
  };

  const SettingItem = ({ title, onPress, rightComponent }) => (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
      }}
      onPress={onPress}
    >
      <Text style={{ fontSize: 16, color: colors.text }}>{title}</Text>
      {rightComponent}
    </TouchableOpacity>
  );

  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.header}>
        <Text style={globalStyles.headerTitle}>{t('settings')}</Text>
      </View>

      <ScrollView style={{ flex: 1 }}>
        <View style={[globalStyles.card, { margin: 20 }]}>
          <SettingItem
            title={t('language')}
            onPress={toggleLanguage}
            rightComponent={
              <Text style={{ color: colors.secondary, fontWeight: 'bold' }}>
                {i18n.language === 'ta' ? 'தமிழ்' : 'English'}
              </Text>
            }
          />

          <SettingItem
            title={t('notifications')}
            rightComponent={
              <Switch
                value={notificationsEnabled}
                onValueChange={toggleNotifications}
                trackColor={{ false: '#767577', true: colors.secondary }}
                thumbColor={notificationsEnabled ? colors.primary : '#f4f3f4'}
              />
            }
          />

          <SettingItem
            title="Clear Cache"
            onPress={clearCache}
            rightComponent={
              <Text style={{ color: colors.textSecondary }}>→</Text>
            }
          />
        </View>

        <View style={[globalStyles.card, { margin: 20 }]}>
          <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 15, color: colors.primary }}>
              About This App
            </Text>
            <Text style={{ marginBottom: 10 }}>Version: 1.0.0</Text>
            <Text style={{ marginBottom: 10 }}>
              Developed with ❤️ for Tamil culture and spirituality
            </Text>
            <Text style={{ fontSize: 12, color: colors.textSecondary }}>
              © 2024 Anbu Thaane Ellam Sethu. All rights reserved.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default SettingsScreen;