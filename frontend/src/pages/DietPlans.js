import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { FaAppleAlt, FaFire } from 'react-icons/fa';

const DietPlansContainer = styled.div`
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
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
`;

const PlanCard = styled.div`
  background: rgba(102, 126, 234, 0.1);
  border: 2px solid #667eea;
  border-radius: 10px;
  padding: 2rem;
  color: white;
  transition: all 0.3s ease;
  overflow: hidden;

  &:hover {
    transform: translateY(-10px);
    background: rgba(102, 126, 234, 0.2);
    box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
  }

  h3 {
    color: #667eea;
    margin-bottom: 1rem;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  p {
    opacity: 0.8;
    margin-bottom: 0.75rem;
    line-height: 1.6;
  }
`;

const NutritionInfo = styled.div`
  background: rgba(102, 126, 234, 0.2);
  padding: 1rem;
  border-radius: 5px;
  margin: 1rem 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
  font-size: 0.9rem;

  div {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;

    strong {
      color: #667eea;
    }
  }
`;

const Price = styled.div`
  font-size: 1.8rem;
  color: #667eea;
  font-weight: bold;
  margin-top: 1rem;
`;

const BuyButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  margin-top: 1rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
  }
`;

function DietPlans() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDietPlans();
  }, []);

  const fetchDietPlans = async () => {
    try {
      const response = await axios.get('/api/diet-plans');
      setPlans(response.data);
    } catch (error) {
      console.error('Error fetching diet plans:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBuy = (plan) => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
      return;
    }
    // Redirect to checkout with plan info
    window.location.href = `/checkout?type=diet&id=${plan.id}&price=${plan.price}`;
  };

  if (loading) {
    return <DietPlansContainer><Content><Title>Loading...</Title></Content></DietPlansContainer>;
  }

  return (
    <DietPlansContainer>
      <Content>
        <Title><FaAppleAlt /> Personalized Diet Plans</Title>
        <PlansGrid>
          {plans.map(plan => (
            <PlanCard key={plan.id}>
              <h3><FaAppleAlt /> {plan.name}</h3>
              <p>{plan.description}</p>
              <NutritionInfo>
                <div>
                  <strong><FaFire /> {plan.calories} cal</strong>
                </div>
                <div>
                  <strong>Protein: {plan.protein}g</strong>
                </div>
                <div>
                  <strong>Carbs: {plan.carbs}g</strong>
                </div>
                <div>
                  <strong>Fats: {plan.fats}g</strong>
                </div>
              </NutritionInfo>
              <p><strong>Duration:</strong> {plan.duration_days} days</p>
              <Price>${plan.price}</Price>
              <BuyButton onClick={() => handleBuy(plan)}>Purchase Plan</BuyButton>
            </PlanCard>
          ))}
        </PlansGrid>
      </Content>
    </DietPlansContainer>
  );
}

export default DietPlans;
