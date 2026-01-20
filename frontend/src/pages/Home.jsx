import React, { useState } from 'react';
import Layout from '../components/Layout';
import DonationForm from '../components/DonationForm';
import { 
  HeroContainer, GlassCard, ModernTitle, CTAButton,
  MissionSection,
  FloatingElements, SacredBell, KolamWrapper, Container
} from '../styles/styled';

const Home = () => {
  const [showDonation, setShowDonation] = useState(false);

  return (
    <Layout>
      <HeroContainer>
        <FloatingElements>
          <div className="blob" style={{ width: '400px', height: '400px', top: '-10%', left: '-10%' }} />
          <div className="blob" style={{ width: '300px', height: '300px', bottom: '10%', right: '-5%', background: 'linear-gradient(135deg, rgba(255,100,0,0.1) 0%, rgba(255,200,0,0.1) 100%)' }} />
        </FloatingElements>

        <KolamWrapper style={{ top: '40px', left: '40px', opacity: 0.2 }} />
        <KolamWrapper style={{ top: '40px', right: '40px', opacity: 0.2, transform: 'scaleX(-1)' }} />

        <GlassCard>
          <ModernTitle>
            <span>Welcome to</span>
            அன்பு தானே எல்லாம் சேது
          </ModernTitle>
          
          <p style={{
            fontSize: '1.5rem',
            color: '#5d4037',
            fontFamily: "'Crimson Text', serif",
            fontStyle: 'italic',
            marginBottom: '2.5rem',
            lineHeight: '1.6'
          }}>
            "Love is common to all living things, let's share with everyone.<br />
            Love is Everything."
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '30px', flexWrap: 'wrap' }}>
            <CTAButton onClick={() => setShowDonation(true)}>
              MAKE A DIFFERENCE
            </CTAButton>
            
            <div style={{ textAlign: 'center' }}>
              <SacredBell onClick={() => {
                const audio = new Audio('/bell-sound.mp3');
                audio.play().catch(() => {});
              }}>🔔</SacredBell>
              <small style={{ fontWeight: '700', color: '#8b4513', display: 'block', marginTop: '5px' }}>
                RING FOR PEACE
              </small>
            </div>
          </div>
        </GlassCard>
      </HeroContainer>

      <MissionSection>
        <Container>
          <div style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
            <h2 style={{ 
              fontSize: '3.5rem', 
              fontFamily: "'Crimson Text', serif", 
              color: '#3e2723',
              marginBottom: '1.5rem'
            }}>Our Mission</h2>
            
            <p style={{
              fontSize: '1.3rem',
              color: '#5d4037',
              lineHeight: '1.8',
              marginBottom: '2rem',
              fontWeight: '600',
              fontFamily: "'Noto Sans Tamil', sans-serif"
            }}>
              "அன்பு, நம்பிக்கை மற்றும் ஆன்மீக உண்மைகளை மக்களிடம் கொண்டு சேர்த்து, தமிழகத்தின் மறைந்துள்ள கோவில்கள், தெய்வச் சன்னிதிகள், அற்புத நிகழ்வுகள் மற்றும் உண்மை சம்பவங்களை யாரும் அறியாத கோணத்தில் உலகிற்கு வெளிப்படுத்துவதே ‘அன்பு தானே எல்லாம் சேது’ சேனலின் மிஷன்."
            </p>

            <p style={{
              fontSize: '1.1rem',
              color: '#795548',
              lineHeight: '1.6',
              fontStyle: 'italic',
              fontFamily: "'Crimson Text', serif"
            }}>
              "Our mission is to spread love, faith, and spiritual awareness by showcasing unexplored temples, divine experiences, and real-life spiritual truths from Tamil Nadu, presented with honesty and devotion."
            </p>
          </div>
        </Container>
      </MissionSection>

      <DonationForm isOpen={showDonation} onClose={() => setShowDonation(false)} />
    </Layout>
  );
};

export default Home;