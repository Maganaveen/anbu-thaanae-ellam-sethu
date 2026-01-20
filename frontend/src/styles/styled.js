import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * { margin:0; padding:0; box-sizing:border-box; }
  body {
    font-family: 'Noto Sans Tamil', sans-serif;
    background: #f1bc68;
    background-image: url("https://www.transparenttextures.com/patterns/cream-pixels.png"); 
    color: #3E2723;
    padding-top: 100px;
  }
`;

export const Container = styled.div`
  max-width: 1200px; margin: 0 auto; padding: 0 20px;
`;

/* SIMPLE HEADER COMPONENTS */
export const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 100px;
  z-index: 1000;

  background: linear-gradient(
    135deg,
    rgba(58, 29, 15, 0.98) 0%,
    rgba(107, 62, 31, 0.98) 45%,
    rgba(139, 69, 19, 0.98) 100%
  );
  backdrop-filter: blur(10px);

  border-bottom: 3px solid #ffd700;
  box-shadow:
    0 4px 30px rgba(0, 0, 0, 0.4);

  overflow: hidden;

  /* Temple Gopuram Silhouettes in background */
  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none'><path d='M10 100 L30 100 L30 80 L35 80 L35 65 L40 65 L40 50 L50 30 L60 50 L65 50 L65 65 L70 65 L70 80 L75 80 L75 100 L90 100' fill='none' stroke='%23ffd700' stroke-width='0.5' opacity='0.15'/></svg>");
    background-size: 200px 100px;
    background-repeat: repeat-x;
    background-position: bottom;
    pointer-events: none;
    z-index: 1;
  }

  /* Traditional Temple Border (Frieze) */
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 12px;
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'><circle cx='10' cy='10' r='3' fill='%23ffd700' opacity='0.6'/><path d='M0 10 Q5 0 10 10 T20 10' fill='none' stroke='%23ffd700' stroke-width='1' opacity='0.4'/></svg>");
    background-size: 24px 12px;
    background-repeat: repeat-x;
    z-index: 2;
  }
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  position: relative;
  z-index: 10;
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }

  img {
    width: 90px;
    height: 90px;
    border-radius: 50%;
    border: 3px solid #ffd700;
    box-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
    object-fit: cover;
  }

  @media (max-width: 768px) {
    img {
      width: 70px;
      height: 70px;
    }
  }
`;

export const NavLinks = styled.div`
  display: flex;
  gap: 30px;
  align-items: center;
  
  @media (max-width: 992px) {
    gap: 15px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const NavLink = styled.a`
  color: #ffd700;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  position: relative;
  padding: 5px 0;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: #fff;
    transition: width 0.3s ease;
  }

  &:hover {
    color: #fff;
    &::after {
      width: 100%;
    }
  }

  &.active {
    color: #fff;
    &::after {
      width: 100%;
    }
  }
`;

export const DonateNavLink = styled(NavLink)`
  color: #ffd700 !important;
  margin-left: 10px;
  
  &:hover {
    color: #fff !important;
  }

  &.active {
    color: #fff !important;
  }
`;

export const LanguageToggle = styled.button`
  background: rgba(255, 215, 0, 0.2);
  color: #ffd700;
  border: 1px solid #ffd700;
  padding: 8px 18px;
  border-radius: 50px;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(5px);
  
  &:hover {
    background: #ffd700;
    color: #3e2723;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(255, 215, 0, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

/* MODERN DESIGN COMPONENTS */
export const HeroContainer = styled.div`
  width: 100%;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: 40px 20px;
  background: radial-gradient(circle at 50% 50%, #f9e4c8 0%, #f1bc68 100%);
`;

export const GlassCard = styled.div`
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 40px;
  padding: clamp(2rem, 5vw, 4rem);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
  max-width: 1000px;
  width: 100%;
  position: relative;
  z-index: 5;
  text-align: center;
`;

export const ModernTitle = styled.h1`
  font-size: clamp(2.5rem, 7vw, 5rem);
  font-weight: 900;
  color: #3e2723;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  font-family: 'Crimson Text', serif;
  
  span {
    display: block;
    font-size: 0.4em;
    text-transform: uppercase;
    letter-spacing: 8px;
    color: #8b4513;
    font-weight: 600;
    margin-bottom: 10px;
  }
`;

export const MissionSection = styled.section`
  padding: 100px 0;
  background: #fff8e1;
`;

export const MissionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

export const MissionCard = styled.div`
  background: white;
  padding: 3rem 2rem;
  border-radius: 32px;
  text-align: center;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: 1px solid rgba(0,0,0,0.05);
  
  &:hover {
    transform: translateY(-15px);
    box-shadow: 0 30px 60px rgba(0,0,0,0.1);
    border-color: #ffd700;
  }

  .icon {
    font-size: 4rem;
    margin-bottom: 1.5rem;
    display: inline-block;
    filter: drop-shadow(0 10px 10px rgba(0,0,0,0.1));
  }

  h3 {
    color: #3e2723;
    margin-bottom: 1.2rem;
    font-size: 1.6rem;
    font-family: 'Crimson Text', serif;
  }

  p {
    color: #5d4037;
    line-height: 1.7;
    font-size: 1rem;
  }
`;

export const FloatingElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;

  .blob {
    position: absolute;
    background: linear-gradient(135deg, rgba(255, 215, 0, 0.3) 0%, rgba(255, 165, 0, 0.2) 100%);
    filter: blur(80px);
    border-radius: 50%;
    animation: float 25s infinite alternate ease-in-out;
  }

  @keyframes float {
    0% { transform: translate(-5%, -5%) rotate(0deg); }
    100% { transform: translate(10%, 10%) rotate(360deg); }
  }
`;

export const CTAButton = styled.button`
  background: #3e2723;
  color: #ffd700;
  border: none;
  padding: 1.2rem 3.5rem;
  border-radius: 100px;
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(62, 39, 35, 0.2);
  margin-top: 2rem;

  &:hover {
    background: #ffd700;
    color: #3e2723;
    transform: scale(1.05);
    box-shadow: 0 15px 40px rgba(255, 215, 0, 0.3);
  }
`;


export const TemplePillarWrapper = styled.div`
  position: relative; padding: 80px 50px 60px;
  background: #e9c48c;
  border-radius: 180px 180px 0 0;
  border-left: 50px solid #8b4513;
  border-right: 50px solid #8b4513;
  border-top: 40px solid #8b4513;
  box-shadow: 0 20px 50px rgba(0,0,0,0.3);

  &::before {
    content: ''; position: absolute; top: -70px; left: 50%; transform: translateX(-50%);
    width: 60%; height: 50px; background: #a67c52;
    clip-path: polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%);
  }
`;

export const SignboardFrame = styled.div`
  background: linear-gradient(145deg, #3e2723, #1b0000);
  padding: 2rem 3rem; border: 4px solid #8d6e63;
  border-radius: 8px; display: inline-block;
  box-shadow: 0 15px 35px rgba(0,0,0,0.6);
  margin-bottom: 30px;
`;

export const HeroTitle = styled.h1`
  font-size: 3.2rem; color: #ffd700; margin: 0; font-family: 'Crimson Text', serif;
  text-shadow: 3px 3px 0px rgba(0,0,0,0.8);
`;

export const KolamWrapper = styled.div`
  position: absolute;
  width: 150px;
  height: 150px;
  opacity: 0.3;
  pointer-events: none;
  z-index: 1;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="2" fill="%238b4513"/><circle cx="30" cy="30" r="2" fill="%238b4513"/><circle cx="70" cy="30" r="2" fill="%238b4513"/><circle cx="30" cy="70" r="2" fill="%238b4513"/><circle cx="70" cy="70" r="2" fill="%238b4513"/><path d="M30 30 Q 50 10 70 30 Q 90 50 70 70 Q 50 90 30 70 Q 10 50 30 30" fill="none" stroke="%238b4513" stroke-width="1.5"/></svg>');
  background-size: contain;
  background-repeat: no-repeat;
`;

export const DeepamRow = styled.div`
  display: flex;
  justify-content: space-between;
  position: absolute;
  bottom: -25px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  padding: 0 40px;
  z-index: 10;
`;

export const DeepamItem = styled.div`
  font-size: 2.5rem;
  filter: drop-shadow(0 0 10px #ff9800);
  animation: flicker 1.5s infinite alternate;
  cursor: default;
  
  @keyframes flicker {
    0% { transform: scale(1); opacity: 0.8; }
    100% { transform: scale(1.1); opacity: 1; }
  }
`;


export const SacredBell = styled.div`
  width: 85px; height: 85px;
  background: radial-gradient(circle, #001a68, #000b2e);
  border: 4px solid #ffd700; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  margin: 40px auto 10px; font-size: 2.5rem;
  box-shadow: 0 8px 20px rgba(0,0,0,0.5); cursor: pointer;
  transition: all 0.2s ease;

  &:active {
    transform: scale(0.9);
  }

  &.ringing {
    animation: ring 0.5s ease-in-out;
  }

  @keyframes ring {
    0% { transform: rotate(0); }
    20% { transform: rotate(15deg); }
    40% { transform: rotate(-15deg); }
    60% { transform: rotate(10deg); }
    80% { transform: rotate(-10deg); }
    100% { transform: rotate(0); }
  }
`;

export const SocialIconsContainer = styled.div`
  display: flex; justify-content: center; gap: 25px; 
  margin: 30px 0; font-size: 1.8rem; opacity: 0.7;
`;

export const DonateButton = styled.button`
  background: linear-gradient(45deg, #001a68, #0a3d91);
  color: #ffd700;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 26, 104, 0.3);
  
  &:hover {
    background: linear-gradient(45deg, #0a3d91, #001a68);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 26, 104, 0.4);
  }
`;

export const MobileMenu = styled.div`
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: linear-gradient(180deg, #3e2723 0%, #2e1065 100%);
  padding: 30px;
  flex-direction: column;
  gap: 20px;
  border-bottom: 3px solid #ffd700;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  
  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'flex' : 'none'};
  }

  a {
    font-size: 1.2rem;
    padding: 10px 0;
    text-align: center;
    border-bottom: 1px solid rgba(255, 215, 0, 0.1);
    
    &::after {
      display: none;
    }
  }
`;

export const MobileToggle = styled.button`
  display: none;
  background: rgba(255, 215, 0, 0.1);
  border: 1px solid rgba(255, 215, 0, 0.3);
  color: #ffd700;
  font-size: 1.8rem;
  padding: 5px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 215, 0, 0.2);
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

/* VIDEO CARD COMPONENTS */
export const VideoGrid = styled.div` 
  display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); 
  gap: 30px; padding: 40px 0; 
`;

export const VideoCard = styled.div` 
  background: #fff; border-radius: 12px; overflow: hidden; 
  box-shadow: 0 10px 20px rgba(0,0,0,0.1); 
`;

export const VideoThumbnail = styled.div` 
  width: 100%; height: 180px; background-size: cover; background-position: center; 
  background-image: url(${props => props.src});
`;

/* FIX: Added VideoInfo export */
export const VideoInfo = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const VideoTitle = styled.h3` font-size: 1.1rem; color: #3e2723; margin: 0; `;

export const VideoMeta = styled.div` color: #795548; font-size: 0.85rem; display: flex; justify-content: space-between; `;

/* UTILITY COMPONENTS */
export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  width: 100%;
  max-width: 1100px;
  margin: 3rem auto;
`;

export const InfoCard = styled.div`
  background: rgba(255, 255, 255, 0.7);
  padding: 2.5rem;
  border-radius: 30px;
  border: 1px solid rgba(255, 215, 0, 0.3);
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    background: rgba(255, 255, 255, 0.9);
    border-color: #ffd700;
  }

  h3 {
    color: #3e2723;
    margin-bottom: 1.5rem;
    font-family: 'Crimson Text', serif;
    font-size: 1.8rem;
  }
`;

export const Section = styled.section` padding: 60px 0; `;
export const SectionTitle = styled.h2` text-align: center; font-size: 2.5rem; color: #3e2723; `;
export const Footer = styled.footer` background: #3e2723; color: #ffecb3; text-align: center; padding: 40px 0; border-top: 5px solid #ffd700; `;
export const Modal = styled.div` position: fixed; inset: 0; background: rgba(0,0,0,.8); z-index: 3000; display: flex; justify-content: center; align-items: center; `;
export const ModalContent = styled.div` background: #fff8e1; padding: 2rem; border-radius: 12px; border: 2px solid #ffd700; width: 90%; max-width: 420px; `;
export const Form = styled.form` display: flex; flex-direction: column; gap: 1rem; `;
export const Input = styled.input`
  padding: 1rem 1.5rem;
  border: 1px solid rgba(218, 165, 32, 0.3);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
  width: 100%;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #ffd700;
    box-shadow: 0 0 10px rgba(255, 215, 0, 0.2);
  }
`;

export const TextArea = styled.textarea`
  padding: 1rem 1.5rem;
  border: 1px solid rgba(218, 165, 32, 0.3);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
  width: 100%;
  min-height: 150px;
  resize: vertical;
  font-family: inherit;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #ffd700;
    box-shadow: 0 0 10px rgba(255, 215, 0, 0.2);
  }
`;

/* ALTERNATIVE HEADER DESIGNS */

// Design 1: Lotus Temple Header
export const LotusHeader = styled.header`
  background: linear-gradient(135deg, #8b0000 0%, #3e2723 100%);
  position: relative;
  padding: 20px 0;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 8px;
    background: repeating-linear-gradient(
      90deg,
      #ffd700 0px,
      #ffd700 20px,
      #ff9800 20px,
      #ff9800 40px
    );
  }
  
  .lotus-pattern {
    position: absolute;
    top: 50%;
    left: 20px;
    transform: translateY(-50%);
    font-size: 2.5rem;
    color: rgba(255, 215, 0, 0.3);
  }
`;

// Design 2: Mandala Circular Header
export const MandalaHeader = styled.header`
  background: radial-gradient(circle at center, #1a237e 0%, #000051 70%);
  padding: 25px 0;
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    top: -50px;
    right: -50px;
    width: 200px;
    height: 200px;
    background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="none" stroke="%23ffd700" stroke-width="1" opacity="0.3"/><circle cx="50" cy="50" r="25" fill="none" stroke="%23ffd700" stroke-width="1" opacity="0.3"/><circle cx="50" cy="50" r="10" fill="none" stroke="%23ffd700" stroke-width="1" opacity="0.3"/></svg>');
    opacity: 0.4;
  }
`;

// Design 3: Kolam Pattern Header
export const KolamHeader = styled.header`
  background: #2e1065;
  padding: 20px 0;
  border-bottom: 3px solid #ffd700;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      radial-gradient(circle at 25% 25%, rgba(255, 215, 0, 0.1) 2px, transparent 2px),
      radial-gradient(circle at 75% 25%, rgba(255, 215, 0, 0.1) 2px, transparent 2px),
      radial-gradient(circle at 25% 75%, rgba(255, 215, 0, 0.1) 2px, transparent 2px),
      radial-gradient(circle at 75% 75%, rgba(255, 215, 0, 0.1) 2px, transparent 2px);
    background-size: 50px 50px;
  }
`;

// Design 4: Temple Gopuram Header
export const GopuramHeader = styled.header`
  background: linear-gradient(to bottom, #8b4513 0%, #5d2f02 100%);
  padding: 15px 0;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 30px solid transparent;
    border-right: 30px solid transparent;
    border-bottom: 20px solid #ffd700;
  }
  
  &::after {
    content: '🕉️';
    position: absolute;
    top: 25px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 1.5rem;
    color: #ffd700;
  }
`;

// Design 5: Peacock Feather Header
export const PeacockHeader = styled.header`
  background: linear-gradient(45deg, #1a237e 0%, #3949ab 50%, #1a237e 100%);
  padding: 20px 0;
  position: relative;
  
  .feather-accent {
    position: absolute;
    right: 50px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 2rem;
    background: linear-gradient(45deg, #00bcd4, #4caf50, #ffd700);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

// Design 6: Minimalist Sacred Header
export const SacredMinimalHeader = styled.header`
  background: #ffffff;
  padding: 25px 0;
  border-bottom: 1px solid rgba(139, 0, 0, 0.1);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  
  .om-symbol {
    position: absolute;
    left: 30px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1.8rem;
    color: #8b0000;
    opacity: 0.7;
  }
`;

// Design 7: Gradient Wave Header
export const WaveHeader = styled.header`
  background: linear-gradient(135deg, #ff6b35 0%, #f7931e 50%, #ffd700 100%);
  padding: 20px 0;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 10px;
    background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 10"><path d="M0,5 Q25,0 50,5 T100,5 V10 H0 Z" fill="%23ffffff"/></svg>');
    background-size: 100px 10px;
    background-repeat: repeat-x;
  }
`;

// Design 8: Traditional Border Header
export const BorderHeader = styled.header`
  background: #3e2723;
  padding: 20px 0;
  border-top: 8px solid #ffd700;
  border-bottom: 8px solid #ffd700;
  position: relative;
  
  &::before,
  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    height: 2px;
    background: repeating-linear-gradient(
      90deg,
      #ff9800 0px,
      #ff9800 10px,
      transparent 10px,
      transparent 20px
    );
  }
  
  &::before { top: 8px; }
  &::after { bottom: 8px; }
`;