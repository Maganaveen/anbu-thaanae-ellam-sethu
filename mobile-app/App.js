import React, { useEffect } from 'react';
import { StatusBar, SafeAreaView } from 'react-native';
import PushNotification from 'react-native-push-notification';
import AppNavigator from './src/navigation/AppNavigator';
import { globalStyles, colors } from './src/styles/globalStyles';
import './src/utils/i18n';

const App = () => {
  useEffect(() => {
    // Configure push notifications
    PushNotification.configure({
      onNotification: function(notification) {
        console.log('NOTIFICATION:', notification);
      },
      requestPermissions: true,
    });

    // Create notification channel for Android
    PushNotification.createChannel(
      {
        channelId: 'anbu-thaane-channel',
        channelName: 'Anbu Thaane Ellam Sethu',
        channelDescription: 'Notifications for new videos',
        soundName: 'default',
        importance: 4,
        vibrate: true,
      },
      (created) => console.log(`Channel created: ${created}`)
    );
  }, []);

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <StatusBar 
        backgroundColor={colors.primary} 
        barStyle="light-content" 
      />
      <AppNavigator />
    </SafeAreaView>
  );
};

export default App;