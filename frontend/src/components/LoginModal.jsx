import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import toast from 'react-hot-toast';
import { API_BASE_URL } from '../config/api';
import { Modal, ModalContent, Form, Input, DonateButton } from '../styles/styled';

const LoginModal = ({ isOpen, onClose, onLogin, isAdmin = false }) => {
  const { t } = useTranslation();
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    emailOrMobile: '',
    password: '',
    name: '',
    email: '',
    mobile: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const endpoint = isAdmin 
        ? `${API_BASE_URL}/auth/admin-login`
        : isRegister 
          ? `${API_BASE_URL}/auth/register` 
          : `${API_BASE_URL}/auth/login`;

      const payload = isRegister 
        ? { email: formData.email, mobile: formData.mobile, password: formData.password, name: formData.name }
        : isAdmin
          ? { email: formData.emailOrMobile, password: formData.password }
          : { emailOrMobile: formData.emailOrMobile, password: formData.password };

      const response = await axios.post(endpoint, payload);
      
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      toast.success(isRegister ? 'Registration successful!' : 'Login successful!');
      onLogin(response.data.user);
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <Modal onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <h2 style={{ marginBottom: '1rem', color: '#8B0000' }}>
          {isAdmin ? 'Admin Login' : isRegister ? 'Register' : 'Login'}
        </h2>
        
        <Form onSubmit={handleSubmit}>
          {isRegister && (
            <>
              <Input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <Input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <Input
                type="tel"
                name="mobile"
                placeholder="Mobile Number"
                value={formData.mobile}
                onChange={handleChange}
                required
              />
            </>
          )}
          
          {!isRegister && (
            <Input
              type="text"
              name="emailOrMobile"
              placeholder={isAdmin ? "Admin Email" : "Email or Mobile"}
              value={formData.emailOrMobile}
              onChange={handleChange}
              required
            />
          )}
          
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <DonateButton type="submit" disabled={loading}>
              {loading ? 'Processing...' : isRegister ? 'Register' : 'Login'}
            </DonateButton>
            <button
              type="button"
              onClick={onClose}
              style={{
                background: '#ccc',
                border: 'none',
                padding: '1rem 2rem',
                borderRadius: '30px',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
          </div>
        </Form>
        
        {!isAdmin && (
          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <button
              type="button"
              onClick={() => setIsRegister(!isRegister)}
              style={{
                background: 'none',
                border: 'none',
                color: '#8B0000',
                textDecoration: 'underline',
                cursor: 'pointer'
              }}
            >
              {isRegister ? 'Already have an account? Login' : "Don't have an account? Register"}
            </button>
          </div>
        )}
      </ModalContent>
    </Modal>
  );
};

export default LoginModal;