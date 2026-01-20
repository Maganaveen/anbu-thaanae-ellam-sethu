import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Layout from '../components/Layout';
import { API_BASE_URL } from '../config/api';

const LoginContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #FFF8DC 0%, #F5F5DC 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const LoginCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 15px 40px rgba(139, 69, 19, 0.2);
  border: 3px solid #DAA520;
  width: 100%;
  max-width: 400px;
`;

const LoginButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: linear-gradient(45deg, #8B0000, #DC143C);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(139, 0, 0, 0.3);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const Admin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {

      const response = await fetch(`${API_BASE_URL.replace('/api', '')}/api/auth/admin-login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/admin-dashboard');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (error) {
      setError('Connection error. Please check if the server is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <LoginContainer>
        <LoginCard>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h1 style={{ color: '#8B0000', margin: '0 0 0.5rem 0', fontSize: '2.5rem' }}>
              🏛️ Admin Login
            </h1>
            <p style={{ color: '#666', margin: 0 }}>
              Access the admin dashboard
            </p>
          </div>

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#8B4513', fontWeight: '600' }}>
                📧 Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@gmail.com"
                style={{
                  width: '100%',
                  padding: '1rem',
                  border: '2px solid #DAA520',
                  borderRadius: '10px',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'border-color 0.3s ease'
                }}
                required
              />
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#8B4513', fontWeight: '600' }}>
                🔑 Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                style={{
                  width: '100%',
                  padding: '1rem',
                  border: '2px solid #DAA520',
                  borderRadius: '10px',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'border-color 0.3s ease'
                }}
                required
              />
            </div>

            {error && (
              <div style={{
                background: '#ffebee',
                color: '#c62828',
                padding: '1rem',
                borderRadius: '10px',
                marginBottom: '1.5rem',
                border: '1px solid #ef5350'
              }}>
                {error}
              </div>
            )}

            <LoginButton type="submit" disabled={loading}>
              {loading ? '🔄 Logging in...' : '🚀 Login to Dashboard'}
            </LoginButton>
          </form>

          <div style={{
            marginTop: '2rem',
            padding: '1rem',
            background: 'linear-gradient(135deg, #E3F2FD, #F3E5F5)',
            borderRadius: '10px',
            border: '1px solid #DAA520'
          }}>
            <p style={{ margin: '0 0 0.5rem 0', color: '#8B4513', fontWeight: '600', fontSize: '0.9rem' }}>
              🔐 Default Admin Credentials:
            </p>
            <p style={{ margin: '0 0 0.25rem 0', color: '#666', fontSize: '0.85rem' }}>
              Email: admin@gmail.com
            </p>
            <p style={{ margin: 0, color: '#666', fontSize: '0.85rem' }}>
              Password: 12345678
            </p>
          </div>
        </LoginCard>
      </LoginContainer>
    </Layout>
  );
};

export default Admin;