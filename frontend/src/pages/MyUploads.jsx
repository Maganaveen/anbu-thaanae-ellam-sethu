import React from 'react';
import Layout from '../components/Layout';
import { Container, Section, SectionTitle } from '../styles/styled';

const MyUploads = () => {
  return (
    <Layout>
      <Section>
        <Container>
          <SectionTitle>My Uploads</SectionTitle>
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <p>My Uploads page - Coming soon!</p>
          </div>
        </Container>
      </Section>
    </Layout>
  );
};

export default MyUploads;