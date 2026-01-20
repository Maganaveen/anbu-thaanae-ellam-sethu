import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';
import Layout from '../components/Layout';
import { Container, Section, SectionTitle } from '../styles/styled';

const About = () => {
  const { t } = useTranslation();
  const [pageContent, setPageContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPageContent();
  }, []);

  const fetchPageContent = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/pages/about`);
      setPageContent(response.data);
    } catch (error) {
      console.error('Error fetching page content:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <Section>
          <Container>
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <h2 style={{ color: '#8B0000' }}>Loading...</h2>
            </div>
          </Container>
        </Section>
      </Layout>
    );
  }

  return (
    <Layout>
      <Section>
        <Container>
          <SectionTitle>{pageContent?.title || t('about')}</SectionTitle>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{
              display: 'inline-block',
              padding: '2rem',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '20px',
              backdropFilter: 'blur(10px)',
              border: '2px solid rgba(255, 215, 0, 0.3)',
              marginBottom: '2rem'
            }}>
              <img 
                src="/images/anbu_thane_ellam_sethu.JPEG" 
                alt="Channel Logo" 
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '3px solid #FFD700',
                  marginBottom: '1rem'
                }}
              />
              <h2 style={{ color: '#8B0000', marginBottom: '1rem' }}>
                {t('about_channel')}
              </h2>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ background: 'rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '10px' }}>
                <h3 style={{ color: '#DAA520', fontSize: '2rem', margin: '0' }}>550K</h3>
                <p style={{ color: '#2F1B14', margin: '0' }}>Subscribers</p>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '10px' }}>
                <h3 style={{ color: '#DAA520', fontSize: '2rem', margin: '0' }}>1,725</h3>
                <p style={{ color: '#2F1B14', margin: '0' }}>Videos</p>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '10px' }}>
                <h3 style={{ color: '#DAA520', fontSize: '2rem', margin: '0' }}>205M</h3>
                <p style={{ color: '#2F1B14', margin: '0' }}>Views</p>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '10px' }}>
                <h3 style={{ color: '#DAA520', fontSize: '2rem', margin: '0' }}>2022</h3>
                <p style={{ color: '#2F1B14', margin: '0' }}>Since</p>
              </div>
            </div>
            
            {pageContent?.content ? (
              <div style={{ 
                fontSize: '1.2rem', 
                lineHeight: '1.8', 
                marginBottom: '2rem',
                whiteSpace: 'pre-wrap'
              }}>
                {pageContent.content}
              </div>
            ) : (
              <>
                <p style={{ fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '2rem' }}>
                  {t('about_description')}
                </p>
                <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#666' }}>
                  Love is common to all living things, let's share that love with everyone, love is everything. 
                  Join our family of 550K+ subscribers on this spiritual journey.
                </p>
              </>
            )}
            
            <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(255,255,255,0.1)', borderRadius: '10px' }}>
              <p style={{ color: '#8B0000', fontWeight: 'bold', marginBottom: '0.5rem' }}>Follow us on Instagram:</p>
              <a 
                href="https://instagram.com/anbu_thane_ellam_sethu/" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ color: '#DAA520', textDecoration: 'none', fontWeight: '500' }}
              >
                @anbu_thane_ellam_sethu
              </a>
            </div>
          </div>
        </Container>
      </Section>
    </Layout>
  );
};

export default About;