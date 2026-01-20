import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReactPlayer from 'react-player/youtube';
import { VideoCard, VideoThumbnail, VideoInfo, VideoTitle, VideoMeta, Modal, ModalContent } from '../styles/styled';

const VideoCardComponent = ({ video }) => {
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

  return (
    <>
      <VideoCard>
        <VideoThumbnail
          src={video.thumbnails?.medium?.url || video.thumbnails?.default?.url}
          onClick={() => setShowPlayer(true)}
        />
        <VideoInfo>
          <VideoTitle>{video.title}</VideoTitle>
          <VideoMeta>
            <span>{formatViews(video.viewCount)} {t('view_count')}</span>
            <span>{formatDate(video.publishedAt)}</span>
          </VideoMeta>
        </VideoInfo>
      </VideoCard>

      {showPlayer && (
        <Modal onClick={() => setShowPlayer(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${video.videoId}`}
                width="100%"
                height="100%"
                style={{ position: 'absolute', top: 0, left: 0 }}
                controls
                playing
              />
            </div>
            <div style={{ marginTop: '1rem' }}>
              <h3>{video.title}</h3>
              <p style={{ marginTop: '0.5rem', color: '#666' }}>
                {t('published_on')}: {formatDate(video.publishedAt)} | 
                {formatViews(video.viewCount)} {t('view_count')}
              </p>
              {video.description && (
                <p style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
                  {video.description.substring(0, 200)}...
                </p>
              )}
            </div>
            <button
              onClick={() => setShowPlayer(false)}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: 'rgba(0,0,0,0.7)',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '30px',
                height: '30px',
                cursor: 'pointer'
              }}
            >
              ×
            </button>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default VideoCardComponent;