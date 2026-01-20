import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { globalStyles } from '../styles/globalStyles';

const AboutScreen = () => {
  const { t } = useTranslation();

  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.header}>
        <Text style={globalStyles.headerTitle}>{t('about')}</Text>
      </View>

      <ScrollView style={{ flex: 1, padding: 20 }}>
        <View style={globalStyles.card}>
          <View style={{ padding: 20 }}>
            <Text style={globalStyles.modalTitle}>{t('about_channel')}</Text>
            <Text style={[globalStyles.centeredText, { marginBottom: 20 }]}>
              {t('about_description')}
            </Text>

            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
              Our Mission
            </Text>
            <Text style={{ marginBottom: 15, lineHeight: 24 }}>
              To spread the message of love, compassion, and spiritual wisdom through Tamil culture. 
              Our channel focuses on devotional content, cultural values, and spiritual guidance 
              that resonates with people of all ages.
            </Text>

            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
              Our Vision
            </Text>
            <Text style={{ marginBottom: 15, lineHeight: 24 }}>
              To create a spiritual community that celebrates Tamil heritage while promoting 
              universal values of love, peace, and harmony.
            </Text>

            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
              Content Focus
            </Text>
            <Text style={{ marginBottom: 5 }}>• Devotional songs and bhajans</Text>
            <Text style={{ marginBottom: 5 }}>• Spiritual discourses and teachings</Text>
            <Text style={{ marginBottom: 5 }}>• Tamil cultural celebrations</Text>
            <Text style={{ marginBottom: 5 }}>• Traditional stories and values</Text>
            <Text>• Community service initiatives</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default AboutScreen;