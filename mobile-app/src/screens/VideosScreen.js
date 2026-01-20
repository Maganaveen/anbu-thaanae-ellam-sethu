import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import VideoCard from '../components/VideoCard';
import { globalStyles, colors } from '../styles/globalStyles';

const API_BASE_URL = 'http://localhost:5000/api';

const VideosScreen = () => {
  const { t } = useTranslation();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async (pageNum = 1) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/videos?page=${pageNum}&limit=10`);
      if (pageNum === 1) {
        setVideos(response.data.videos);
      } else {
        setVideos(prev => [...prev, ...response.data.videos]);
      }
    } catch (error) {
      console.error('Error fetching videos:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    setPage(1);
    fetchVideos(1);
  };

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchVideos(nextPage);
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
        <Text style={globalStyles.headerTitle}>{t('videos')}</Text>
      </View>

      <FlatList
        data={videos}
        renderItem={({ item }) => <VideoCard video={item} />}
        keyExtractor={(item) => item.videoId}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        contentContainerStyle={{ padding: 10 }}
      />
    </View>
  );
};

export default VideosScreen;