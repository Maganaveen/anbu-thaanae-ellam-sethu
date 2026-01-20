import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { globalStyles, colors } from '../styles/globalStyles';

const API_BASE_URL = 'http://localhost:5000/api'; // Update with your server URL

const DonateScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    amount: '',
    donorName: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleDonate = async () => {
    if (!formData.amount || !formData.donorName || !formData.email) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/donation/create`, formData);
      
      // In a real app, you would integrate with a payment gateway here
      // For now, we'll just show a success message
      Alert.alert(
        'Success',
        t('thank_you'),
        [
          {
            text: 'OK',
            onPress: () => {
              setFormData({ amount: '', donorName: '', email: '' });
              navigation.goBack();
            },
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to process donation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={[globalStyles.buttonText, { color: colors.accent }]}>
            ← Back
          </Text>
        </TouchableOpacity>
        <Text style={globalStyles.headerTitle}>{t('donate')}</Text>
        <View />
      </View>

      <ScrollView style={{ flex: 1, padding: 20 }}>
        <View style={globalStyles.card}>
          <View style={{ padding: 20 }}>
            <Text style={globalStyles.modalTitle}>Support Our Mission</Text>
            <Text style={[globalStyles.centeredText, { marginBottom: 20 }]}>
              {t('donate_message')}
            </Text>

            <View style={{ marginBottom: 15 }}>
              <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>
                {t('amount')} (₹)
              </Text>
              <TextInput
                style={globalStyles.input}
                value={formData.amount}
                onChangeText={(value) => handleInputChange('amount', value)}
                placeholder="Enter amount"
                keyboardType="numeric"
              />
            </View>

            <View style={{ marginBottom: 15 }}>
              <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>
                {t('donor_name')}
              </Text>
              <TextInput
                style={globalStyles.input}
                value={formData.donorName}
                onChangeText={(value) => handleInputChange('donorName', value)}
                placeholder="Enter your name"
              />
            </View>

            <View style={{ marginBottom: 20 }}>
              <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>
                {t('email')}
              </Text>
              <TextInput
                style={globalStyles.input}
                value={formData.email}
                onChangeText={(value) => handleInputChange('email', value)}
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <TouchableOpacity
              style={[
                globalStyles.button,
                { opacity: loading ? 0.7 : 1 },
              ]}
              onPress={handleDonate}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color={colors.primary} />
              ) : (
                <Text style={globalStyles.buttonText}>{t('donate_now')}</Text>
              )}
            </TouchableOpacity>

            <View style={{ marginTop: 20 }}>
              <Text style={[globalStyles.centeredText, { fontSize: 14 }]}>
                Supported payment methods:
              </Text>
              <Text style={[globalStyles.centeredText, { fontSize: 12, marginTop: 5 }]}>
                UPI • Google Pay • PhonePe • Paytm • Cards • Net Banking
              </Text>
            </View>
          </View>
        </View>

        <View style={globalStyles.card}>
          <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 15, color: colors.primary }}>
              How Your Donation Helps
            </Text>
            
            <View style={{ marginBottom: 15 }}>
              <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>Content Creation</Text>
              <Text style={{ fontSize: 14, color: colors.textSecondary }}>
                Fund new video productions, equipment, and editing
              </Text>
            </View>

            <View style={{ marginBottom: 15 }}>
              <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>Community Outreach</Text>
              <Text style={{ fontSize: 14, color: colors.textSecondary }}>
                Support community events and cultural programs
              </Text>
            </View>

            <View>
              <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>Platform Maintenance</Text>
              <Text style={{ fontSize: 14, color: colors.textSecondary }}>
                Keep our website and mobile app running smoothly
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default DonateScreen;