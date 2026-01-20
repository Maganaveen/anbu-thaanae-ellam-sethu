# Anbu Thaane Ellam Sethu - React Website

This is the React version of the Tamil YouTube channel platform website, converted from Next.js.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- Backend server running on port 5000

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Environment Configuration**
   Update `.env` with your credentials:
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   REACT_APP_RAZORPAY_KEY_ID=your_razorpay_key_id
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Access the website**
   Open http://localhost:3000 in your browser

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Layout.jsx      # Main layout with navigation
│   ├── VideoCard.jsx   # Video display component
│   ├── DonationForm.jsx # Payment form
│   └── LoginModal.jsx  # Authentication modal
├── pages/              # Page components
│   ├── Home.jsx        # Homepage
│   ├── About.jsx       # About page
│   ├── Contact.jsx     # Contact form
│   ├── Donate.jsx      # Donation page
│   ├── Gallery.jsx     # Gallery page
│   ├── AdminVideos.jsx # Spiritual videos
│   ├── Admin.jsx       # Admin panel
│   └── MyUploads.jsx   # User uploads
├── styles/             # Styled components
│   └── styled.js       # All styled components
├── lib/                # Utilities
│   └── i18n.js         # Internationalization
├── App.jsx             # Main app component
└── index.jsx           # Entry point
```

## 🎨 Features

- **React Router**: Client-side routing
- **Styled Components**: CSS-in-JS styling
- **i18next**: Tamil/English language support
- **React Hot Toast**: Notifications
- **React Player**: YouTube video player
- **Responsive Design**: Mobile-first approach
- **Payment Integration**: Razorpay support

## 🔧 Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

## 🌐 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify/Vercel
1. Build the project
2. Upload the `build` folder
3. Configure environment variables
4. Set up redirects for React Router

## 🔗 API Integration

The app connects to the backend API running on port 5000. Make sure the backend server is running before starting the React app.

## 📱 Mobile Responsive

The website is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

## 🎯 Key Differences from Next.js Version

1. **Routing**: Uses React Router instead of Next.js routing
2. **Environment Variables**: Uses `REACT_APP_` prefix
3. **File Extensions**: Uses `.jsx` instead of `.js`
4. **Build Process**: Uses Create React App build system
5. **Deployment**: Standard React app deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

Made with ❤️ for Tamil culture and spirituality