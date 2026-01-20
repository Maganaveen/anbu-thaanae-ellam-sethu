import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { GlobalStyle } from './styles/styled';
import './lib/i18n';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Donate from './pages/Donate';
import Posts from './pages/Posts';
import AdminVideos from './pages/AdminVideos';
import Shorts from './pages/Shorts';
import Live from './pages/Live';
import Admin from './pages/Admin';
import MyUploads from './pages/MyUploads';
import AdminDashboard from './pages/AdminDashboard';
import AdminPageManager from './pages/AdminPageManager';

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/admin-videos" element={<AdminVideos />} />
            <Route path="/shorts" element={<Shorts />} />
            <Route path="/live" element={<Live />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/admin/pages" element={<AdminPageManager />} />
            <Route path="/my-uploads" element={<MyUploads />} />
          </Routes>
          <Toaster position="top-right" />
        </div>
      </Router>
    </>
  );
}

export default App;