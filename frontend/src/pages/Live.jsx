import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import Layout from '../components/Layout';
import VideoCard from '../components/VideoCard';
import { Container, Section, SectionTitle, VideoGrid } from '../styles/styled';

const Live = () => {
  const { t } = useTranslation();
  const [liveVideos, setLiveVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchLiveVideos();
  }, [page]);

  const fetchLiveVideos = async () => {
    try {
      const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
      const response = await axios.get(`${baseURL}/videos?type=live&page=${page}&limit=24`);
      
      setLiveVideos(response.data.videos || []);
      setTotalPages(response.data.totalPages || 1);
    } catch (error) {
      console.error('Error fetching live videos:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <Container>
          <div style={{ textAlign: 'center', padding: '4rem 0', color: '#8B0000' }}>
            <h2>Loading live videos...</h2>
          </div>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Section>
        <Container>
          <SectionTitle>{t('live')}</SectionTitle>
          
          {liveVideos.length > 0 ? (
            <>
              <VideoGrid>
                {liveVideos.map(video => (
                  <VideoCard key={video.videoId} video={video} />
                ))}
              </VideoGrid>
              
              {totalPages > 1 && (
                <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                  <button 
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    style={{
                      padding: '0.5rem 1rem',
                      margin: '0 0.5rem',
                      background: page === 1 ? '#ccc' : '#DAA520',
                      color: 'white',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: page === 1 ? 'not-allowed' : 'pointer'
                    }}
                  >
                    Previous
                  </button>
                  
                  <span style={{ margin: '0 1rem', color: '#8B0000', fontWeight: 'bold' }}>
                    Page {page} of {totalPages}
                  </span>
                  
                  <button 
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    style={{
                      padding: '0.5rem 1rem',
                      margin: '0 0.5rem',
                      background: page === totalPages ? '#ccc' : '#DAA520',
                      color: 'white',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: page === totalPages ? 'not-allowed' : 'pointer'
                    }}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <p style={{ color: '#666', fontSize: '1.1rem' }}>
                No live videos available. Live streams will appear here once available.
              </p>
            </div>
          )}
        </Container>
      </Section>
    </Layout>
  );
};

export default Live;