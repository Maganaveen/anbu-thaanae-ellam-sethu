import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Section, SectionTitle, Form, Input, TextArea, CTAButton } from '../styles/styled';

const AdminPageManager = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('about');
  const [pageContent, setPageContent] = useState({
    about: { title: '', content: '', mission: '', vision: '' },
    contact: { address: '', phone: '', email: '', hours: '' },
    donation: { title: '', description: '', goals: '', methods: '' }
  });

  const handleSave = async (pageType) => {
    try {
      const response = await fetch(`/api/admin/pages/${pageType}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(pageContent[pageType])
      });
      
      if (response.ok) {
        alert(`${pageType} page updated successfully!`);
      }
    } catch (error) {
      console.error('Error updating page:', error);
    }
  };

  const handleInputChange = (pageType, field, value) => {
    setPageContent(prev => ({
      ...prev,
      [pageType]: { ...prev[pageType], [field]: value }
    }));
  };

  return (
    <Section style={{ minHeight: '80vh', paddingTop: '120px' }}>
      <Container>
        <SectionTitle>Page Management</SectionTitle>
        
        <div style={{ display: 'flex', gap: '20px', marginBottom: '30px', justifyContent: 'center' }}>
          {['about', 'contact', 'donation'].map(tab => (
            <CTAButton
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                background: activeTab === tab ? '#ffd700' : '#3e2723',
                color: activeTab === tab ? '#3e2723' : '#ffd700'
              }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)} Page
            </CTAButton>
          ))}
        </div>

        {activeTab === 'about' && (
          <Form onSubmit={(e) => { e.preventDefault(); handleSave('about'); }}>
            <h3>About Us Page</h3>
            <Input
              placeholder="Page Title"
              value={pageContent.about.title}
              onChange={(e) => handleInputChange('about', 'title', e.target.value)}
            />
            <TextArea
              placeholder="Main Content"
              value={pageContent.about.content}
              onChange={(e) => handleInputChange('about', 'content', e.target.value)}
            />
            <TextArea
              placeholder="Mission Statement"
              value={pageContent.about.mission}
              onChange={(e) => handleInputChange('about', 'mission', e.target.value)}
            />
            <TextArea
              placeholder="Vision Statement"
              value={pageContent.about.vision}
              onChange={(e) => handleInputChange('about', 'vision', e.target.value)}
            />
            <CTAButton type="submit">Save About Page</CTAButton>
          </Form>
        )}

        {activeTab === 'contact' && (
          <Form onSubmit={(e) => { e.preventDefault(); handleSave('contact'); }}>
            <h3>Contact Page</h3>
            <Input
              placeholder="Address"
              value={pageContent.contact.address}
              onChange={(e) => handleInputChange('contact', 'address', e.target.value)}
            />
            <Input
              placeholder="Phone Number"
              value={pageContent.contact.phone}
              onChange={(e) => handleInputChange('contact', 'phone', e.target.value)}
            />
            <Input
              placeholder="Email Address"
              value={pageContent.contact.email}
              onChange={(e) => handleInputChange('contact', 'email', e.target.value)}
            />
            <TextArea
              placeholder="Office Hours"
              value={pageContent.contact.hours}
              onChange={(e) => handleInputChange('contact', 'hours', e.target.value)}
            />
            <CTAButton type="submit">Save Contact Page</CTAButton>
          </Form>
        )}

        {activeTab === 'donation' && (
          <Form onSubmit={(e) => { e.preventDefault(); handleSave('donation'); }}>
            <h3>Donation Page</h3>
            <Input
              placeholder="Page Title"
              value={pageContent.donation.title}
              onChange={(e) => handleInputChange('donation', 'title', e.target.value)}
            />
            <TextArea
              placeholder="Description"
              value={pageContent.donation.description}
              onChange={(e) => handleInputChange('donation', 'description', e.target.value)}
            />
            <TextArea
              placeholder="Goals & Objectives"
              value={pageContent.donation.goals}
              onChange={(e) => handleInputChange('donation', 'goals', e.target.value)}
            />
            <TextArea
              placeholder="Payment Methods Info"
              value={pageContent.donation.methods}
              onChange={(e) => handleInputChange('donation', 'methods', e.target.value)}
            />
            <CTAButton type="submit">Save Donation Page</CTAButton>
          </Form>
        )}
      </Container>
    </Section>
  );
};

export default AdminPageManager;