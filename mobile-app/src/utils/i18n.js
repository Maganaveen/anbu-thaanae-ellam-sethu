import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

const resources = {
  ta: {
    translation: {
      "home": "முகப்பு",
      "videos": "வீடியோக்கள்",
      "about": "எங்களைப் பற்றி",
      "donate": "நன்கொடை",
      "settings": "அமைப்புகள்",
      "latest_videos": "சமீபத்திய வீடியோக்கள்",
      "featured_videos": "சிறப்பு வீடியோக்கள்",
      "popular_videos": "பிரபலமான வீடியோக்கள்",
      "view_count": "பார்வைகள்",
      "published_on": "வெளியிடப்பட்ட தேதி",
      "donate_message": "எங்கள் சேனலை ஆதரிக்க நன்கொடை அளிக்கவும்",
      "amount": "தொகை",
      "donor_name": "நன்கொடையாளர் பெயர்",
      "email": "மின்னஞ்சல்",
      "donate_now": "இப்போது நன்கொடை",
      "thank_you": "நன்றி! உங்கள் நன்கொடை வெற்றிகரமாக பெறப்பட்டது.",
      "about_channel": "அன்பு தானே எல்லாம் செது",
      "about_description": "அன்பு, ஆன்மீகம் மற்றும் தமிழ் கலாச்சாரத்தை பரப்பும் நோக்கத்துடன் உருவாக்கப்பட்ட சேனல்.",
      "language": "மொழி",
      "notifications": "அறிவிப்புகள்",
      "loading": "ஏற்றுகிறது...",
      "error": "பிழை ஏற்பட்டது",
      "retry": "மீண்டும் முயற்சிக்கவும்"
    }
  },
  en: {
    translation: {
      "home": "Home",
      "videos": "Videos",
      "about": "About",
      "donate": "Donate",
      "settings": "Settings",
      "latest_videos": "Latest Videos",
      "popular_videos": "Popular Videos",
      "view_count": "Views",
      "published_on": "Published on",
      "donate_message": "Support our channel with a donation",
      "amount": "Amount",
      "donor_name": "Donor Name",
      "email": "Email",
      "donate_now": "Donate Now",
      "thank_you": "Thank you! Your donation was received successfully.",
      "about_channel": "Anbu Thaane Ellam Sethu",
      "about_description": "A channel dedicated to spreading love, spirituality, and Tamil culture.",
      "language": "Language",
      "notifications": "Notifications",
      "loading": "Loading...",
      "error": "An error occurred",
      "retry": "Retry"
    }
  }
};

const initI18n = async () => {
  let savedLanguage = 'ta';
  try {
    savedLanguage = await AsyncStorage.getItem('language') || 'ta';
  } catch (error) {
    console.log('Error loading saved language:', error);
  }

  i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: savedLanguage,
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false,
      },
    });
};

initI18n();

export default i18n;