import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import toast from 'react-hot-toast';
import { API_BASE_URL } from '../config/api';
import Layout from '../components/Layout';
import { Container, Section, SectionTitle, CTAButton, Input, TextArea } from '../styles/styled';

const AdminPageManager = () => {
  const { t } = useTranslation();
  const [pages, setPages] = useState({});
  const [activeTab, setActiveTab] = useState('about');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    metadata: {}
  });

  useEffect(() => {
    fetchPages();
  }, []);

  useEffect(() => {
    if (pages[activeTab]) {
      setFormData({
        title: pages[activeTab].title || '',
        content: pages[activeTab].content || '',
        metadata: pages[activeTab].metadata || {}
      });
    } else {
      setFormData({ title: '', content: '', metadata: {} });
    }
  }, [activeTab, pages]);

  const fetchPages = async () => {
    try {
      const token = localStorage.getItem('token');
      const [aboutRes, contactRes, postsRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/admin/pages/about`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get(`${API_BASE_URL}/admin/pages/contact`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get(`${API_BASE_URL}/admin/pages/posts`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      setPages({
        about: aboutRes.data,
        contact: contactRes.data,
        posts: postsRes.data
      });
    } catch (error) {
      console.error('Error fetching pages:', error);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${API_BASE_URL}/admin/pages/${activeTab}`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      toast.success(`${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} page updated successfully!`);
      fetchPages();
    } catch (error) {
      toast.error('Failed to update page');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const tabs = [
    { key: 'about', label: 'About Us', icon: '📖' },
    { key: 'contact', label: 'Contact', icon: '📞' },
    { key: 'posts', label: 'Posts', icon: '📝' }
  ];

  return (
    <Layout>
      <Section>
        <Container>
          <SectionTitle>🛠️ Page Management</SectionTitle>
          
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            marginBottom: '2rem',
            gap: '1rem',
            flexWrap: 'wrap'
          }}>
            {tabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                style={{
                  padding: '12px 24px',
                  border: 'none',
                  borderRadius: '25px',
                  background: activeTab === tab.key ? '#8B0000' : 'rgba(255,255,255,0.2)',
                  color: activeTab === tab.key ? 'white' : '#8B0000',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: '500',
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(10px)',
                  border: '2px solid rgba(139,0,0,0.3)'
                }}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            background: 'rgba(255,255,255,0.9)',
            borderRadius: '20px',
            padding: '2rem',
            backdropFilter: 'blur(10px)',
            border: '2px solid rgba(218,165,32,0.3)'
          }}>
            <h3 style={{ 
              color: '#8B0000', 
              marginBottom: '1.5rem',
              textAlign: 'center'
            }}>
              Edit {tabs.find(t => t.key === activeTab)?.label} Page
            </h3>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '0.5rem', 
                color: '#8B0000',
                fontWeight: '500'
              }}>
                Page Title
              </label>
              <Input
                type="text"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder={`Enter ${activeTab} page title`}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '0.5rem', 
                color: '#8B0000',
                fontWeight: '500'
              }}>
                Page Content
              </label>
              <TextArea
                value={formData.content}
                onChange={(e) => handleChange('content', e.target.value)}
                placeholder={`Enter ${activeTab} page content`}
                rows={12}
                style={{ minHeight: '300px' }}
              />
            </div>

            {activeTab === 'contact' && (
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  color: '#8B0000',
                  fontWeight: '500'
                }}>
                  Contact Information (JSON format)
                </label>
                <TextArea
                  value={JSON.stringify(formData.metadata, null, 2)}
                  onChange={(e) => {
                    try {
                      const metadata = JSON.parse(e.target.value);
                      handleChange('metadata', metadata);
                    } catch (err) {
                      // Invalid JSON, don't update
                    }
                  }}
                  placeholder='{"email": "contact@example.com", "phone": "+91 12345 67890", "address": "Location"}'
                  rows={6}
                />
              </div>
            )}

            <div style={{ textAlign: 'center' }}>
              <CTAButton 
                onClick={handleSave} 
                disabled={loading}
                style={{ minWidth: '200px' }}
              >
                {loading ? 'Saving...' : '💾 Save Changes'}
              </CTAButton>
            </div>

            {pages[activeTab] && (
              <div style={{
                marginTop: '2rem',
                padding: '1rem',
                background: 'rgba(218,165,32,0.1)',
                borderRadius: '10px',
                fontSize: '0.9rem',
                color: '#666'
              }}>
                <strong>Last modified:</strong> {new Date(pages[activeTab].lastModified).toLocaleString()}
                {pages[activeTab].modifiedBy && (
                  <span> by {pages[activeTab].modifiedBy.name}</span>
                )}
              </div>
            )}
          </div>
        </Container>
      </Section>
    </Layout>
  );
};

export default AdminPageManager;