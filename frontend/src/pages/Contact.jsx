import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import toast from 'react-hot-toast';
import { API_BASE_URL } from '../config/api';
import Layout from '../components/Layout';
import { 
  HeroContainer, GlassCard, ModernTitle, 
  FloatingElements, KolamWrapper, Container,
  Form, Input, TextArea, CTAButton 
} from '../styles/styled';

const Contact = () => {
  const { t } = useTranslation();
  const [pageContent, setPageContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchPageContent();
  }, []);

  const fetchPageContent = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/pages/contact`);
      setPageContent(response.data);
    } catch (error) {
      console.error('Error fetching page content:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await axios.post(`${API_BASE_URL}/contact`, formData);
      toast.success(t('thank_you') || 'Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      toast.error('Failed to send message');
    } finally {
      setSubmitting(false);
    }
  };

  const contactInfo = pageContent?.metadata || {
    email: 'contact@anbuthane.com',
    phone: '+91 93427 32720',
    location: 'Thanjavur'
  };

  return (
    <Layout>
      <HeroContainer style={{ minHeight: 'auto', padding: '100px 20px' }}>
        <FloatingElements>
          <div className="blob" style={{ width: '400px', height: '400px', top: '-10%', left: '-10%' }} />
          <div className="blob" style={{ width: '300px', height: '300px', bottom: '10%', right: '-5%', background: 'linear-gradient(135deg, rgba(255,100,0,0.1) 0%, rgba(255,200,0,0.1) 100%)' }} />
        </FloatingElements>

        <KolamWrapper style={{ top: '40px', left: '40px', opacity: 0.15 }} />
        <KolamWrapper style={{ top: '40px', right: '40px', opacity: 0.15, transform: 'scaleX(-1)' }} />

        <Container>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <ModernTitle>
              <span>{pageContent?.title || t('connect_with_us')}</span>
              {t('to_contact')}
            </ModernTitle>
            {pageContent?.content ? (
              <div style={{
                fontSize: '1.4rem',
                color: '#5d4037',
                maxWidth: '700px',
                margin: '0 auto',
                lineHeight: '1.8',
                fontFamily: "'Crimson Text', serif",
                fontStyle: 'italic',
                whiteSpace: 'pre-wrap'
              }}>
                {pageContent.content}
              </div>
            ) : (
              <p style={{
                fontSize: '1.4rem',
                color: '#5d4037',
                maxWidth: '700px',
                margin: '0 auto',
                lineHeight: '1.8',
                fontFamily: "'Crimson Text', serif",
                fontStyle: 'italic'
              }}>
                "{t('contact_desc')}"
              </p>
            )}
          </div>

          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <GlassCard style={{ padding: '3rem' }}>
              <Form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <Input
                    type="text"
                    name="name"
                    placeholder={t('your_name')}
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    type="email"
                    name="email"
                    placeholder={t('your_email')}
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <TextArea
                  name="message"
                  placeholder={t('your_message')}
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
                <div style={{ textAlign: 'center' }}>
                  <CTAButton type="submit" disabled={submitting} style={{ marginTop: '1rem' }}>
                    {submitting ? t('sending') : t('send_message')}
                  </CTAButton>
                </div>
              </Form>
            </GlassCard>
            
            <div style={{ 
              marginTop: '4rem', 
              display: 'flex', 
              justifyContent: 'center', 
              gap: '50px', 
              flexWrap: 'wrap',
              textAlign: 'center' 
            }}>
              <div>
                <h4 style={{ color: '#8b4513', marginBottom: '10px', fontSize: '1.2rem' }}>📧 {t('email')}</h4>
                <p style={{ color: '#3e2723', fontSize: '1.1rem' }}>{contactInfo.email}</p>
              </div>
              <div>
                <h4 style={{ color: '#8b4513', marginBottom: '10px', fontSize: '1.2rem' }}>📞 {t('phone')}</h4>
                <p style={{ color: '#3e2723', fontSize: '1.1rem' }}>{contactInfo.phone}</p>
              </div>
              <div>
                <h4 style={{ color: '#8b4513', marginBottom: '10px', fontSize: '1.2rem' }}>📍 {t('location')}</h4>
                <p style={{ color: '#3e2723', fontSize: '1.1rem' }}>{contactInfo.location || t('thanjavur')}</p>
              </div>
            </div>
          </div>
        </Container>
      </HeroContainer>
    </Layout>
  );
};

export default Contact;