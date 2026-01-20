import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import VideoCard from '../components/VideoCard';
import { globalStyles, colors } from '../styles/globalStyles';

const API_BASE_URL = 'http://localhost:5000/api'; // Update with your server URL

const HomeScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const [videos, setVideos] = useState({
    latest: [],
    featured: [],
    popular: [],
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const [latest, featured, popular] = await Promise.all([
        axios.get(`${API_BASE_URL}/videos?type=latest&limit=6`),
        axios.get(`${API_BASE_URL}/videos?type=featured&limit=3`),
        axios.get(`${API_BASE_URL}/videos?type=popular&limit=6`),
      ]);

      setVideos({
        latest: latest.data.videos,
        featured: featured.data.videos,
        popular: popular.data.videos,
      });
    } catch (error) {
      console.error('Error fetching videos:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchVideos();
  };

  const renderVideoSection = (title, videoList) => {
    if (videoList.length === 0) return null;

    return (
      <View style={{ marginVertical: 10 }}>
        <Text style={globalStyles.sectionTitle}>{title}</Text>
        <FlatList
          data={videoList}
          renderItem={({ item }) => <VideoCard video={item} />}
          keyExtractor={(item) => item.videoId}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 10 }}
        />
      </View>
    );
  };

  if (loading) {
    return (
      <View style={globalStyles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={globalStyles.loadingText}>{t('loading')}</Text>
      </View>
    );
  }

  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.header}>
        <Text style={globalStyles.headerTitle}>{t('about_channel')}</Text>
        <TouchableOpacity
          style={globalStyles.button}
          onPress={() => navigation.navigate('Donate')}
        >
          <Text style={globalStyles.buttonText}>{t('donate')}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Hero Section */}
        <View style={{ padding: 20, alignItems: 'center' }}>
          <Text
            style={[
              globalStyles.sectionTitle,
              { fontSize: 28, marginBottom: 10 },
            ]}
          >
            {t('about_channel')}
          </Text>
          <Text style={[globalStyles.centeredText, { marginBottom: 20 }]}>
            {t('about_description')}
          </Text>
        </View>

        {/* Video Sections */}
        {renderVideoSection(t('featured_videos'), videos.featured)}
        {renderVideoSection(t('latest_videos'), videos.latest)}
        {renderVideoSection(t('popular_videos'), videos.popular)}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;