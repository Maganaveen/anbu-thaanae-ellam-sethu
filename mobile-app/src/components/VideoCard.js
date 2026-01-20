import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  Dimensions,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { useTranslation } from 'react-i18next';
import { globalStyles, colors } from '../styles/globalStyles';

const { width } = Dimensions.get('window');

const VideoCard = ({ video, onPress }) => {
  const { t } = useTranslation();
  const [showPlayer, setShowPlayer] = useState(false);

  const formatViews = (count) => {
    const num = parseInt(count);
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ta-IN');
  };

  const handlePress = () => {
    if (onPress) {
      onPress(video);
    } else {
      setShowPlayer(true);
    }
  };

  return (
    <>
      <TouchableOpacity style={globalStyles.videoCard} onPress={handlePress}>
        <Image
          source={{
            uri: video.thumbnails?.medium?.url || video.thumbnails?.default?.url,
          }}
          style={globalStyles.videoThumbnail}
          resizeMode="cover"
        />
        <View style={globalStyles.videoInfo}>
          <Text style={globalStyles.videoTitle} numberOfLines={2}>
            {video.title}
          </Text>
          <View style={globalStyles.videoMeta}>
            <Text style={globalStyles.videoMetaText}>
              {formatViews(video.viewCount)} {t('view_count')}
            </Text>
            <Text style={globalStyles.videoMetaText}>
              {formatDate(video.publishedAt)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      <Modal
        visible={showPlayer}
        animationType="slide"
        onRequestClose={() => setShowPlayer(false)}
      >
        <View style={{ flex: 1, backgroundColor: '#000' }}>
          <View style={{ flex: 1 }}>
            <WebView
              source={{
                uri: `https://www.youtube.com/embed/${video.videoId}?autoplay=1`,
              }}
              style={{ flex: 1 }}
              allowsFullscreenVideo
              mediaPlaybackRequiresUserAction={false}
            />
          </View>
          <View style={{ backgroundColor: colors.surface, padding: 15 }}>
            <Text style={globalStyles.videoTitle}>{video.title}</Text>
            <View style={globalStyles.videoMeta}>
              <Text style={globalStyles.videoMetaText}>
                {t('published_on')}: {formatDate(video.publishedAt)}
              </Text>
              <Text style={globalStyles.videoMetaText}>
                {formatViews(video.viewCount)} {t('view_count')}
              </Text>
            </View>
            <TouchableOpacity
              style={[globalStyles.button, { marginTop: 15 }]}
              onPress={() => setShowPlayer(false)}
            >
              <Text style={globalStyles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default VideoCard;