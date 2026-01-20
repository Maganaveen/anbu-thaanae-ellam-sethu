import React from 'react';
import { useTranslation } from 'react-i18next';
import Layout from '../components/Layout';
import { 
  HeroContainer, GlassCard, ModernTitle, 
  FloatingElements, KolamWrapper, Container,
  Grid, InfoCard
} from '../styles/styled';

const Donate = () => {
  const { t } = useTranslation();

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
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <ModernTitle>
              <span>{t('sacred_contribution')}</span>
              {t('anbu_dhanam')}
            </ModernTitle>
            <p style={{
              fontSize: '1.4rem',
              color: '#5d4037',
              maxWidth: '800px',
              margin: '0 auto',
              lineHeight: '1.8',
              fontFamily: "'Crimson Text', serif",
              fontStyle: 'italic'
            }}>
              "{t('donate_desc')}"
            </p>
          </div>

          <Grid>
            {/* UPI Section */}
            <GlassCard style={{ padding: '3rem 2rem' }}>
              <h3 style={{ 
                color: '#3e2723', 
                fontSize: '2rem', 
                fontFamily: "'Crimson Text', serif",
                marginBottom: '1.5rem'
              }}>{t('upi_donation')}</h3>
              
              <div style={{
                background: 'white',
                padding: '1.5rem',
                borderRadius: '20px',
                display: 'inline-block',
                boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                border: '1px solid #ffd700',
                marginBottom: '2rem'
              }}>
                <img 
                  src="/images/qr-code.jpg" 
                  alt="UPI QR Code" 
                  style={{ maxWidth: '250px', borderRadius: '10px' }} 
                />
              </div>

              <div style={{ textAlign: 'left', color: '#5d4037', fontSize: '1.1rem' }}>
                <p style={{ marginBottom: '10px' }}>• {t('upi_step1')}</p>
                <p style={{ marginBottom: '10px' }}>• {t('upi_step2')}</p>
                <p>• {t('upi_step3')}</p>
              </div>
            </GlassCard>

            {/* Bank Section */}
            <GlassCard style={{ padding: '3rem 2rem' }}>
              <h3 style={{ 
                color: '#3e2723', 
                fontSize: '2rem', 
                fontFamily: "'Crimson Text', serif",
                marginBottom: '1.5rem'
              }}>{t('bank_transfer')}</h3>
              
              <div style={{
                background: 'rgba(62, 39, 35, 0.05)',
                padding: '2rem',
                borderRadius: '20px',
                textAlign: 'left',
                borderLeft: '5px solid #ffd700',
                marginBottom: '2rem'
              }}>
                <div style={{ marginBottom: '15px' }}>
                  <strong style={{ color: '#8b4513' }}>{t('bank_name')}:</strong><br />
                  <span style={{ fontSize: '1.2rem' }}>Indian Bank</span>
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <strong style={{ color: '#8b4513' }}>{t('acc_no')}:</strong><br />
                  <span style={{ fontSize: '1.2rem', letterSpacing: '1px' }}>782454122</span>
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <strong style={{ color: '#8b4513' }}>{t('ifsc')}:</strong><br />
                  <span style={{ fontSize: '1.2rem', letterSpacing: '1px' }}>IDIB000T095</span>
                </div>
                <div>
                  <strong style={{ color: '#8b4513' }}>{t('branch')}:</strong><br />
                  <span style={{ fontSize: '1.2rem' }}>Eswarinagar, Thanjavur</span>
                </div>
              </div>

              <p style={{ color: '#795548', fontStyle: 'italic' }}>
                {t('contact_queries')}: +91 9342732720
              </p>
            </GlassCard>
          </Grid>

          <div style={{ marginTop: '5rem', textAlign: 'center' }}>
            <h2 style={{ 
              fontSize: '2.5rem', 
              fontFamily: "'Crimson Text', serif", 
              color: '#3e2723',
              marginBottom: '3rem'
            }}>{t('how_help')}</h2>
            
            <Grid style={{ margin: '0' }}>
              <InfoCard>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🕉️</div>
                <h3>{t('preservation')}</h3>
                <p>{t('preservation_desc')}</p>
              </InfoCard>

              <InfoCard>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📢</div>
                <h3>{t('awareness')}</h3>
                <p>{t('awareness_desc')}</p>
              </InfoCard>

              <InfoCard>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📽️</div>
                <h3>{t('production')}</h3>
                <p>{t('production_desc')}</p>
              </InfoCard>
            </Grid>
          </div>
        </Container>
      </HeroContainer>
    </Layout>
  );
};

export default Donate;