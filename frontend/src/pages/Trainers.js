import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { FaStar, FaDumbbell, FaPhone, FaEnvelope } from 'react-icons/fa';

const TrainersContainer = styled.div`
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

const TrainersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const TrainerCard = styled.div`
  background: rgba(102, 126, 234, 0.1);
  border: 2px solid #667eea;
  border-radius: 10px;
  padding: 2rem;
  color: white;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-10px);
    background: rgba(102, 126, 234, 0.2);
    box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
  }

  h3 {
    color: #667eea;
    margin-bottom: 0.5rem;
    font-size: 1.5rem;
  }

  p {
    opacity: 0.8;
    margin-bottom: 1rem;
    line-height: 1.6;
  }
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  opacity: 0.9;

  svg {
    color: #667eea;
  }
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  color: #ffc107;
`;

const HireButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
  }
`;

function Trainers() {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrainers();
  }, []);

  const fetchTrainers = async () => {
    try {
      const response = await axios.get('/api/trainers');
      setTrainers(response.data);
    } catch (error) {
      console.error('Error fetching trainers:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <TrainersContainer><Content><Title>Loading...</Title></Content></TrainersContainer>;
  }

  return (
    <TrainersContainer>
      <Content>
        <Title><FaDumbbell /> Our Expert Trainers</Title>
        <TrainersGrid>
          {trainers.map(trainer => (
            <TrainerCard key={trainer.id}>
              <h3>{trainer.name}</h3>
              <p><strong>Specialization:</strong> {trainer.specialization}</p>
              <p><strong>Experience:</strong> {trainer.experience} years</p>
              <p>{trainer.bio || 'Professional fitness trainer'}</p>
              <Rating>
                <FaStar /> {trainer.rating || 'New'}
              </Rating>
              <InfoItem>
                <FaPhone /> {trainer.phone}
              </InfoItem>
              <InfoItem>
                <FaEnvelope /> {trainer.email}
              </InfoItem>
              <p style={{ marginTop: '1rem', color: '#667eea', fontWeight: 'bold' }}>
                ${trainer.hourly_rate}/hour
              </p>
              <HireButton>Hire This Trainer</HireButton>
            </TrainerCard>
          ))}
        </TrainersGrid>
      </Content>
    </TrainersContainer>
  );
}

export default Trainers;
