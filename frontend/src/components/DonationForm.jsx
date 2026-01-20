import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import toast from 'react-hot-toast';
import { API_BASE_URL } from '../config/api';
import { Form, Input, DonateButton, Modal, ModalContent } from '../styles/styled';

const DonationForm = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    amount: '',
    donorName: '',
    email: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/donation/create`, formData);
      
      // Initialize Razorpay
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: response.data.amount,
        currency: response.data.currency,
        order_id: response.data.orderId,
        name: t('about_channel'),
        description: t('donate_message'),
        handler: async function (response) {
          try {
            await axios.post(`${API_BASE_URL}/donation/verify`, {
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
              signature: response.razorpay_signature
            });
            
            toast.success(t('thank_you'));
            onClose();
            setFormData({ amount: '', donorName: '', email: '' });
          } catch (error) {
            toast.error('Payment verification failed');
          }
        },
        prefill: {
          name: formData.donorName,
          email: formData.email
        },
        theme: {
          color: '#DAA520'
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      toast.error('Failed to create donation order');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <Modal onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <h2 style={{ marginBottom: '1rem', color: '#8B0000' }}>{t('donate')}</h2>
        <p style={{ marginBottom: '1.5rem', color: '#666' }}>{t('donate_message')}</p>
        
        <Form onSubmit={handleSubmit}>
          <Input
            type="number"
            name="amount"
            placeholder={t('amount') + ' (₹)'}
            value={formData.amount}
            onChange={handleChange}
            required
            min="1"
          />
          <Input
            type="text"
            name="donorName"
            placeholder={t('donor_name')}
            value={formData.donorName}
            onChange={handleChange}
            required
          />
          <Input
            type="email"
            name="email"
            placeholder={t('email')}
            value={formData.email}
            onChange={handleChange}
            required
          />
          
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <DonateButton type="submit" disabled={loading}>
              {loading ? 'Processing...' : t('donate_now')}
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
        
        <div style={{ marginTop: '1.5rem', fontSize: '0.9rem', color: '#666' }}>
          <p>Supported payment methods:</p>
          <p>UPI • Google Pay • PhonePe • Paytm • Cards • Net Banking</p>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default DonationForm;a