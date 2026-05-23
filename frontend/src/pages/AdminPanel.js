import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { FaChartBar, FaUsers, FaMoneyBillWave, FaEnvelope } from 'react-icons/fa';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const AdminContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%);
  padding: 3rem 2rem;
`;

const Content = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const Title = styled.h1`
  color: white;
  margin-bottom: 2rem;
  font-size: 2.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const StatCard = styled.div`
  background: rgba(102, 126, 234, 0.1);
  border: 2px solid #667eea;
  border-radius: 10px;
  padding: 2rem;
  color: white;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    background: rgba(102, 126, 234, 0.2);
  }

  svg {
    font-size: 2.5rem;
    color: #667eea;
  }

  .stat-content {
    h3 {
      opacity: 0.8;
      font-size: 0.9rem;
      margin-bottom: 0.5rem;
    }

    .stat-value {
      font-size: 2rem;
      font-weight: bold;
      color: #667eea;
    }
  }
`;

const Section = styled.div`
  background: rgba(102, 126, 234, 0.1);
  border: 2px solid #667eea;
  border-radius: 10px;
  padding: 2rem;
  margin-bottom: 2rem;
  color: white;

  h2 {
    color: #667eea;
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const MessageList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-height: 400px;
  overflow-y: auto;
`;

const MessageItem = styled.div`
  background: rgba(102, 126, 234, 0.2);
  padding: 1rem;
  border-radius: 5px;
  border-left: 4px solid #667eea;

  h4 {
    color: #667eea;
    margin-bottom: 0.5rem;
  }

  p {
    opacity: 0.8;
    margin: 0.25rem 0;
    font-size: 0.9rem;
  }
`;

function AdminPanel() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('/api/admin/dashboard', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <AdminContainer><Content><Title>Loading...</Title></Content></AdminContainer>;
  }

  return (
    <AdminContainer>
      <Content>
        <Title>Admin Dashboard</Title>

        <StatsGrid>
          <StatCard>
            <FaUsers />
            <div className="stat-content">
              <h3>Total Users</h3>
              <div className="stat-value">{stats?.totalUsers || 0}</div>
            </div>
          </StatCard>
          <StatCard>
            <FaUsers />
            <div className="stat-content">
              <h3>Total Trainers</h3>
              <div className="stat-value">{stats?.totalTrainers || 0}</div>
            </div>
          </StatCard>
          <StatCard>
            <FaMoneyBillWave />
            <div className="stat-content">
              <h3>Total Revenue</h3>
              <div className="stat-value">${stats?.totalRevenue?.toFixed(2) || '0.00'}</div>
            </div>
          </StatCard>
        </StatsGrid>

        <Section>
          <h2><FaEnvelope /> Recent Contact Messages</h2>
          <MessageList>
            {stats?.recentMessages && stats.recentMessages.map(msg => (
              <MessageItem key={msg.id}>
                <h4>{msg.name} - {msg.subject}</h4>
                <p><strong>Email:</strong> {msg.email}</p>
                <p><strong>Message:</strong> {msg.message}</p>
                <p style={{ fontSize: '0.8rem', opacity: 0.6 }}>
                  {new Date(msg.created_at).toLocaleDateString()}
                </p>
              </MessageItem>
            ))}
          </MessageList>
        </Section>
      </Content>
    </AdminContainer>
  );
}

export default AdminPanel;
