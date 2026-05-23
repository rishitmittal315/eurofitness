import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';

const ContactContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%);
  padding: 3rem 2rem;
`;

const Content = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const Title = styled.h1`
  text-align: center;
  color: white;
  margin-bottom: 3rem;
  font-size: 2.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ContactInfo = styled.div`
  color: white;
`;

const InfoItem = styled.div`
  background: rgba(102, 126, 234, 0.1);
  border: 2px solid #667eea;
  border-radius: 10px;
  padding: 2rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(102, 126, 234, 0.2);
    transform: translateX(10px);
  }

  svg {
    color: #667eea;
    font-size: 1.5rem;
    margin-top: 0.25rem;
  }

  div {
    h3 {
      color: #667eea;
      margin-bottom: 0.5rem;
    }

    p {
      opacity: 0.8;
    }
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
  color: white;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const Input = styled.input`
  padding: 0.85rem;
  border: 2px solid #667eea;
  border-radius: 5px;
  background: rgba(102, 126, 234, 0.1);
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    background: rgba(102, 126, 234, 0.2);
    box-shadow: 0 0 10px rgba(102, 126, 234, 0.3);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const TextArea = styled.textarea`
  padding: 0.85rem;
  border: 2px solid #667eea;
  border-radius: 5px;
  background: rgba(102, 126, 234, 0.1);
  color: white;
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
  transition: all 0.3s ease;
  font-family: inherit;

  &:focus {
    outline: none;
    background: rgba(102, 126, 234, 0.2);
    box-shadow: 0 0 10px rgba(102, 126, 234, 0.3);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const SubmitButton = styled.button`
  padding: 0.85rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const SuccessMessage = styled.div`
  background: #4caf50;
  color: white;
  padding: 1rem;
  border-radius: 5px;
  margin-bottom: 1rem;
  text-align: center;
`;

const ErrorMessage = styled.div`
  background: #e74c3c;
  color: white;
  padding: 1rem;
  border-radius: 5px;
  margin-bottom: 1rem;
  text-align: center;
`;

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

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
    setSuccess(false);

    try {
      await axios.post('/api/contact/send', formData);
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ContactContainer>
      <Content>
        <Title>Get In Touch</Title>
        <Container>
          <ContactInfo>
            <InfoItem>
              <FaMapMarkerAlt />
              <div>
                <h3>Address</h3>
                <p>123 Fitness Street<br />Europe, EU 12345</p>
              </div>
            </InfoItem>
            <InfoItem>
              <FaPhone />
              <div>
                <h3>Phone</h3>
                <p>+1 (555) 123-4567</p>
              </div>
            </InfoItem>
            <InfoItem>
              <FaEnvelope />
              <div>
                <h3>Email</h3>
                <p>info@eurofitness.com</p>
              </div>
            </InfoItem>
          </ContactInfo>

          <div>
            {success && <SuccessMessage>Message sent successfully! We'll get back to you soon.</SuccessMessage>}
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="phone">Phone (Optional)</Label>
                <Input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 123-4567"
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help?"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="message">Message</Label>
                <TextArea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message here..."
                  required
                />
              </FormGroup>
              <SubmitButton type="submit" disabled={loading}>
                <FaPaperPlane /> {loading ? 'Sending...' : 'Send Message'}
              </SubmitButton>
            </Form>
          </div>
        </Container>
      </Content>
    </ContactContainer>
  );
}

export default Contact;
