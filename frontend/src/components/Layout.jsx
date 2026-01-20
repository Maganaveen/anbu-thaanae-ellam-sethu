import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink as Link } from 'react-router-dom';
import LoginModal from './LoginModal';
import { 
  Header, 
  Nav, 
  Logo, 
  NavLinks, 
  NavLink, 
  DonateNavLink,
  LanguageToggle, 
  Container, 
  Footer,
  MobileMenu,
  MobileToggle
} from '../styles/styled';

const Layout = ({ children }) => {
  const { t, i18n } = useTranslation();
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'ta' ? 'en' : 'ta';
    i18n.changeLanguage(newLang);
  };

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <>
      <Header>
        <Nav>
          <Logo>
            <img src="/images/anbu_thane_ellam_sethu.JPEG" alt="Channel Logo" />
          </Logo>
          
          <NavLinks>
            <NavLink as={Link} to="/" end>{t('home')}</NavLink>
            <NavLink as={Link} to="/admin-videos">{t('videos')}</NavLink>
            <NavLink as={Link} to="/shorts">{t('shorts')}</NavLink>
            <NavLink as={Link} to="/live">{t('live')}</NavLink>
            <NavLink as={Link} to="/posts">{t('posts')}</NavLink>
            <NavLink as={Link} to="/about">{t('about')}</NavLink>
            <NavLink as={Link} to="/contact">{t('contact')}</NavLink>
            <DonateNavLink as={Link} to="/donate">{t('donate')}</DonateNavLink>
            {user?.role === 'admin1' && (
              <NavLink as={Link} to="/admin/pages" style={{ color: '#DAA520' }}>📝 Pages</NavLink>
            )}
            {user ? (
              <NavLink onClick={handleLogout} style={{ cursor: 'pointer', marginLeft: '10px' }}>{t('logout')}</NavLink>
            ) : (
              <NavLink onClick={() => setShowLogin(true)} style={{ cursor: 'pointer', marginLeft: '10px' }}>{t('login')}</NavLink>
            )}
          </NavLinks>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <LanguageToggle onClick={toggleLanguage}>
              {i18n.language === 'ta' ? 'English' : 'தமிழ்'}
            </LanguageToggle>
            <MobileToggle onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              ☰
            </MobileToggle>
          </div>
          
          <MobileMenu isOpen={mobileMenuOpen}>
            <NavLink as={Link} to="/" end onClick={() => setMobileMenuOpen(false)}>{t('home')}</NavLink>
            <NavLink as={Link} to="/admin-videos" onClick={() => setMobileMenuOpen(false)}>{t('videos')}</NavLink>
            <NavLink as={Link} to="/about" onClick={() => setMobileMenuOpen(false)}>{t('about')}</NavLink>
            <NavLink as={Link} to="/contact" onClick={() => setMobileMenuOpen(false)}>{t('contact')}</NavLink>
            <DonateNavLink as={Link} to="/donate" onClick={() => setMobileMenuOpen(false)}>{t('donate')}</DonateNavLink>
            {user?.role === 'admin' && (
              <NavLink as={Link} to="/admin/pages" onClick={() => setMobileMenuOpen(false)}>📝 Manage Pages</NavLink>
            )}
            {user ? (
              <NavLink onClick={() => { handleLogout(); setMobileMenuOpen(false); }} style={{ cursor: 'pointer' }}>{t('logout')}</NavLink>
            ) : (
              <NavLink onClick={() => { setShowLogin(true); setMobileMenuOpen(false); }} style={{ cursor: 'pointer' }}>{t('login')}</NavLink>
            )}
          </MobileMenu>
        </Nav>
      </Header>
      
      <main>{children}</main>
      
      <Footer>
        <Container>
          <p>&copy; {new Date().getFullYear()} {t('about_channel')}. All rights reserved.</p>
          <p style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>
            Made with ❤️ for Tamil culture and spirituality
          </p>
        </Container>
      </Footer>
      
      <LoginModal 
        isOpen={showLogin} 
        onClose={() => setShowLogin(false)}
        onLogin={handleLogin}
      />
      
      <LoginModal 
        isOpen={showAdminLogin} 
        onClose={() => setShowAdminLogin(false)}
        onLogin={handleLogin}
        isAdmin={true}
      />
    </>
  );
};

export default Layout;