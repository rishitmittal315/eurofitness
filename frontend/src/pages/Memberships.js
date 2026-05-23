import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { FaCheck } from 'react-icons/fa';

const MembershipsContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%);
  padding: 3rem 2rem;
`;

const Content = styled.div`
  max-width: 1200px;
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

const PlansGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const PlanCard = styled.div`
  background: rgba(102, 126, 234, 0.1);
  border: 3px solid ${props => props.featured ? '#667eea' : '#667eea'};
  border-radius: 10px;
  padding: 2.5rem;
  color: white;
  transition: all 0.3s ease;
  position: relative;
  transform: ${props => props.featured ? 'scale(1.05)' : 'scale(1)'};

  ${props => props.featured && `
    background: rgba(102, 126, 234, 0.2);
    box-shadow: 0 10px 40px rgba(102, 126, 234, 0.4);
  `}

  &:hover {
    transform: translateY(-10px) scale(${props => props.featured ? 1.05 : 1});
    background: rgba(102, 126, 234, 0.2);
    box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
  }

  h3 {
    color: #667eea;
    margin-bottom: 0.5rem;
    font-size: 1.8rem;
  }

  .price {
    font-size: 2.5rem;
    color: #667eea;
    margin: 1rem 0;
    font-weight: bold;

    span {
      font-size: 1rem;
      opacity: 0.8;
    }
  }

  .description {
    opacity: 0.8;
    margin-bottom: 1.5rem;
  }
`;

const FeatureList = styled.ul`
  list-style: none;
  margin-bottom: 2rem;

  li {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
    opacity: 0.9;

    svg {
      color: #667eea;
      font-size: 1.2rem;
    }
  }
`;

const SubscribeButton = styled.button`
  width: 100%;
  padding: 0.85rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

function Memberships() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await axios.get('/api/memberships/plans');
      setPlans(response.data);
    } catch (error) {
      console.error('Error fetching membership plans:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async (planId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
      return;
    }

    try {
      await axios.post('/api/memberships/subscribe', { plan_id: planId }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Membership activated successfully!');
    } catch (error) {
      alert('Error subscribing to membership: ' + error.response?.data?.message);
    }
  };

  if (loading) {
    return <MembershipsContainer><Content><Title>Loading...</Title></Content></MembershipsContainer>;
  }

  return (
    <MembershipsContainer>
      <Content>
        <Title>Membership Plans</Title>
        <PlansGrid>
          {plans.map((plan, index) => (
            <PlanCard key={plan.id} featured={index === 1}>
              <h3>{plan.name}</h3>
              <div className="price">${plan.price}<span>/month</span></div>
              <div className="description">{plan.description}</div>
              <FeatureList>
                <li><FaCheck /> {plan.duration_months} month(s) access</li>
                <li><FaCheck /> Full gym access</li>
                <li><FaCheck /> Equipment usage</li>
                <li><FaCheck /> Member support</li>
              </FeatureList>
              <SubscribeButton onClick={() => handleSubscribe(plan.id)}>
                Subscribe Now
              </SubscribeButton>
            </PlanCard>
          ))}
        </PlansGrid>
      </Content>
    </MembershipsContainer>
  );
}

export default Memberships;
