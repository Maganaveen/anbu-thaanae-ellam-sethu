import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout';

const AdminContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background: linear-gradient(135deg, #FFF8DC 0%, #F5F5DC 100%);
  min-height: 100vh;
`;

const Card = styled.div`
  background: white;
  border-radius: 15px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 8px 25px rgba(139, 69, 19, 0.1);
  border: 2px solid #DAA520;
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
`;

const ImageCard = styled.div`
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  border: 1px solid #DAA520;
`;

const DonationTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  
  th, td {
    padding: 0.75rem;
    text-align: left;
    border-bottom: 1px solid #DAA520;
  }
  
  th {
    background: linear-gradient(45deg, #8B0000, #DC143C);
    color: white;
    font-weight: 600;
  }
`;

const AdminDashboard = () => {
  const [stats, setStats] = useState({});
  const [images, setImages] = useState([]);
  const [donations, setDonations] = useState([]);
  const [activeTab, setActiveTab] = useState('gallery');
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [uploadData, setUploadData] = useState({
    templeName: '',
    city: '',
    district: '',
    state: '',
    description: '',
    deity: '',
    category: 'temple'
  });
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    fetchStats();
    if (activeTab === 'gallery') fetchImages();
    if (activeTab === 'donations') fetchDonations();
  }, [activeTab]);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/stats', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchImages = async () => {
    try {
      const response = await fetch('/api/admin/gallery', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const data = await response.json();
      setImages(data.images || []);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const fetchDonations = async () => {
    try {
      const response = await fetch('/api/admin/donations', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const data = await response.json();
      setDonations(data.donations || []);
    } catch (error) {
      console.error('Error fetching donations:', error);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert('Please select an image');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);
    Object.keys(uploadData).forEach(key => {
      formData.append(key, uploadData[key]);
    });
    formData.append('latitude', '0');
    formData.append('longitude', '0');

    try {
      const response = await fetch('/api/images/upload', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        body: formData
      });

      if (response.ok) {
        alert('Image uploaded successfully!');
        setShowUploadForm(false);
        setUploadData({ templeName: '', city: '', district: '', state: '', description: '', deity: '', category: 'temple' });
        setSelectedFile(null);
        fetchImages();
      } else {
        alert('Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed');
    }
  };

  return (
    <Layout>
      <AdminContainer>
        <h1 style={{ color: '#8B0000', textAlign: 'center', marginBottom: '2rem' }}>
          🏛️ Admin Dashboard
        </h1>

        {/* Stats Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          <Card style={{ textAlign: 'center', background: 'linear-gradient(135deg, #FFE4B5, #FFEFD5)' }}>
            <h3 style={{ color: '#8B4513', margin: '0 0 0.5rem 0' }}>📚 Approved Images</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#8B0000', margin: 0 }}>{stats.approvedImages || 0}</p>
          </Card>
          <Card style={{ textAlign: 'center', background: 'linear-gradient(135deg, #F0F8FF, #E6E6FA)' }}>
            <h3 style={{ color: '#8B4513', margin: '0 0 0.5rem 0' }}>⏳ Pending Images</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#8B0000', margin: 0 }}>{stats.pendingImages || 0}</p>
          </Card>
          <Card style={{ textAlign: 'center', background: 'linear-gradient(135deg, #F5FFFA, #F0FFF0)' }}>
            <h3 style={{ color: '#8B4513', margin: '0 0 0.5rem 0' }}>💰 Total Donations</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#8B0000', margin: 0 }}>₹{stats.totalDonationAmount || 0}</p>
          </Card>
          <Card style={{ textAlign: 'center', background: 'linear-gradient(135deg, #FFF0F5, #FFE4E1)' }}>
            <h3 style={{ color: '#8B4513', margin: '0 0 0.5rem 0' }}>👥 Total Users</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#8B0000', margin: 0 }}>{stats.totalUsers || 0}</p>
          </Card>
        </div>

        {/* Tab Navigation */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
          <button
            onClick={() => setActiveTab('gallery')}
            style={{
              padding: '0.75rem 1.5rem',
              background: activeTab === 'gallery' ? 'linear-gradient(45deg, #8B0000, #DC143C)' : '#f0f0f0',
              color: activeTab === 'gallery' ? 'white' : '#333',
              border: 'none',
              borderRadius: '25px',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            🖼️ Image Gallery
          </button>
          <button
            onClick={() => setActiveTab('donations')}
            style={{
              padding: '0.75rem 1.5rem',
              background: activeTab === 'donations' ? 'linear-gradient(45deg, #8B0000, #DC143C)' : '#f0f0f0',
              color: activeTab === 'donations' ? 'white' : '#333',
              border: 'none',
              borderRadius: '25px',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            💰 Donations
          </button>
        </div>

        {/* Gallery Tab */}
        {activeTab === 'gallery' && (
          <Card>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2 style={{ color: '#8B0000', margin: 0 }}>🖼️ Approved Image Gallery</h2>
              <button
                onClick={() => setShowUploadForm(true)}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: 'linear-gradient(45deg, #32CD32, #228B22)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '25px',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                📤 Upload Image
              </button>
            </div>
            
            {/* Upload Form Modal */}
            {showUploadForm && (
              <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0,0,0,0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000
              }}>
                <div style={{
                  background: 'white',
                  padding: '2rem',
                  borderRadius: '15px',
                  width: '90%',
                  maxWidth: '500px',
                  maxHeight: '80vh',
                  overflow: 'auto'
                }}>
                  <h3 style={{ color: '#8B0000', marginBottom: '1.5rem' }}>📤 Upload Temple Image</h3>
                  <form onSubmit={handleUpload}>
                    <div style={{ marginBottom: '1rem' }}>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setSelectedFile(e.target.files[0])}
                        style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '5px' }}
                        required
                      />
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                      <input
                        type="text"
                        placeholder="Temple Name"
                        value={uploadData.templeName}
                        onChange={(e) => setUploadData({...uploadData, templeName: e.target.value})}
                        style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '5px' }}
                        required
                      />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                      <input
                        type="text"
                        placeholder="City"
                        value={uploadData.city}
                        onChange={(e) => setUploadData({...uploadData, city: e.target.value})}
                        style={{ padding: '0.75rem', border: '1px solid #ddd', borderRadius: '5px' }}
                        required
                      />
                      <input
                        type="text"
                        placeholder="District"
                        value={uploadData.district}
                        onChange={(e) => setUploadData({...uploadData, district: e.target.value})}
                        style={{ padding: '0.75rem', border: '1px solid #ddd', borderRadius: '5px' }}
                        required
                      />
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                      <input
                        type="text"
                        placeholder="State"
                        value={uploadData.state}
                        onChange={(e) => setUploadData({...uploadData, state: e.target.value})}
                        style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '5px' }}
                        required
                      />
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                      <input
                        type="text"
                        placeholder="Deity (optional)"
                        value={uploadData.deity}
                        onChange={(e) => setUploadData({...uploadData, deity: e.target.value})}
                        style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '5px' }}
                      />
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                      <textarea
                        placeholder="Description"
                        value={uploadData.description}
                        onChange={(e) => setUploadData({...uploadData, description: e.target.value})}
                        style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '5px', minHeight: '80px' }}
                        required
                      />
                    </div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <button
                        type="submit"
                        style={{
                          flex: 1,
                          padding: '0.75rem',
                          background: 'linear-gradient(45deg, #32CD32, #228B22)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '5px',
                          cursor: 'pointer',
                          fontWeight: '600'
                        }}
                      >
                        Upload
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowUploadForm(false)}
                        style={{
                          flex: 1,
                          padding: '0.75rem',
                          background: '#dc3545',
                          color: 'white',
                          border: 'none',
                          borderRadius: '5px',
                          cursor: 'pointer',
                          fontWeight: '600'
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
            
            <ImageGrid>
              {images.map((image) => (
                <ImageCard key={image._id}>
                  <img 
                    src={`/uploads/images/${image.filename}`} 
                    alt={image.templeName}
                    style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                  />
                  <div style={{ padding: '1rem' }}>
                    <h4 style={{ color: '#8B0000', margin: '0 0 0.5rem 0' }}>{image.templeName}</h4>
                    <p style={{ color: '#666', fontSize: '0.9rem', margin: '0 0 0.5rem 0' }}>
                      📍 {image.city}, {image.district}, {image.state}
                    </p>
                    <p style={{ color: '#333', fontSize: '0.85rem', margin: '0 0 0.5rem 0' }}>
                      {image.description}
                    </p>
                    <p style={{ color: '#888', fontSize: '0.8rem', margin: 0 }}>
                      👤 Uploaded by: {image.userId?.name}
                    </p>
                  </div>
                </ImageCard>
              ))}
            </ImageGrid>
          </Card>
        )}

        {/* Donations Tab */}
        {activeTab === 'donations' && (
          <Card>
            <h2 style={{ color: '#8B0000', marginBottom: '1rem' }}>💰 Donation History</h2>
            <DonationTable>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Donor Name</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Payment ID</th>
                </tr>
              </thead>
              <tbody>
                {donations.map((donation) => (
                  <tr key={donation._id}>
                    <td>{new Date(donation.createdAt).toLocaleDateString()}</td>
                    <td>{donation.donorName || 'Anonymous'}</td>
                    <td style={{ fontWeight: 'bold', color: '#8B0000' }}>₹{donation.amount}</td>
                    <td>
                      <span style={{
                        padding: '0.25rem 0.5rem',
                        borderRadius: '12px',
                        fontSize: '0.8rem',
                        background: donation.status === 'completed' ? '#d4edda' : '#fff3cd',
                        color: donation.status === 'completed' ? '#155724' : '#856404'
                      }}>
                        {donation.status}
                      </span>
                    </td>
                    <td style={{ fontSize: '0.8rem', color: '#666' }}>{donation.paymentId}</td>
                  </tr>
                ))}
              </tbody>
            </DonationTable>
          </Card>
        )}
      </AdminContainer>
    </Layout>
  );
};

export default AdminDashboard;