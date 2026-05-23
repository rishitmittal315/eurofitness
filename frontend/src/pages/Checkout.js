import React, { useState } from 'react';
import axios from 'axios';
import { useSearchParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaCreditCard } from 'react-icons/fa';

const CheckoutContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%);
  padding: 3rem 2rem;
`;

const Content = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const Title = styled.h1`
  text-align: center;
  color: white;
  margin-bottom: 2rem;
  font-size: 2.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Card = styled.div`
  background: rgba(102, 126, 234, 0.1);
  border: 2px solid #667eea;
  border-radius: 10px;
  padding: 2rem;
  color: white;
`;

const SummarySection = styled.div`
  background: rgba(102, 126, 234, 0.2);
  padding: 1.5rem;
  border-radius: 5px;
  margin-bottom: 2rem;

  h3 {
    color: #667eea;
    margin-bottom: 1rem;
  }

  .summary-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.75rem;
    opacity: 0.9;
  }

  .total {
    display: flex;
    justify-content: space-between;
    font-size: 1.3rem;
    font-weight: bold;
    color: #667eea;
    padding-top: 1rem;
    border-top: 1px solid rgba(102, 126, 234, 0.2);
    margin-top: 1rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 0.5rem;
  color: #667eea;
  font-weight: 500;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 2px solid #667eea;
  border-radius: 5px;
  background: rgba(102, 126, 234, 0.1);
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    background: rgba(102, 126, 234, 0.2);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const PayButton = styled.button`
  padding: 0.85rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  margin-top: 1rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  background: #e74c3c;
  color: white;
  padding: 1rem;
  border-radius: 5px;
  margin-bottom: 1rem;
  text-align: center;
`;

const SuccessMessage = styled.div`
  background: #4caf50;
  color: white;
  padding: 1rem;
  border-radius: 5px;
  margin-bottom: 1rem;
  text-align: center;
`;

function Checkout() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const paymentType = searchParams.get('type') || 'membership';
  const itemId = searchParams.get('id');
  const price = parseFloat(searchParams.get('price')) || 0;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const token = localStorage.getItem('token');
    try {
      // In production, use Stripe.js for secure payment processing
      const paymentResponse = await axios.post(
        '/api/payments/record-payment',
        {
          amount: price,
          payment_method: 'card',
          stripe_payment_id: 'sim_' + Math.random().toString(36),
          description: `${paymentType} - Item ${itemId}`,
          payment_type: paymentType
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSuccess(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <CheckoutContainer>
      <Content>
        <Title><FaCreditCard /> Checkout</Title>
        <Card>
          {success && <SuccessMessage>Payment successful! Redirecting...</SuccessMessage>}
          {error && <ErrorMessage>{error}</ErrorMessage>}

          <SummarySection>
            <h3>Order Summary</h3>
            <div className="summary-item">
              <span>Item Type:</span>
              <span style={{ textTransform: 'capitalize', color: '#667eea' }}>{paymentType}</span>
            </div>
            <div className="summary-item">
              <span>Item ID:</span>
              <span>#{itemId}</span>
            </div>
            <div className="total">
              <span>Total Amount:</span>
              <span>${price.toFixed(2)}</span>
            </div>
          </SummarySection>

          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="cardHolder">Cardholder Name</Label>
              <Input
                id="cardHolder"
                type="text"
                name="cardHolder"
                value={formData.cardHolder}
                onChange={handleChange}
                placeholder="John Doe"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                placeholder="4532 1234 5678 9010"
                maxLength="19"
                required
              />
            </FormGroup>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <FormGroup>
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input
                  id="expiryDate"
                  type="text"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  placeholder="MM/YY"
                  maxLength="5"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  type="text"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleChange}
                  placeholder="123"
                  maxLength="3"
                  required
                />
              </FormGroup>
            </div>
            <PayButton type="submit" disabled={loading}>
              <FaCreditCard /> {loading ? 'Processing...' : 'Pay Now'}
            </PayButton>
          </Form>
        </Card>
      </Content>
    </CheckoutContainer>
  );
}

export default Checkout;
