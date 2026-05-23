import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { FaUser, FaClipboardList, FaHistory } from 'react-icons/fa';

const DashboardContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%);
  padding: 3rem 2rem;
`;

const Content = styled.div`
  max-width: 1200px;
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

const ProfileInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const InfoBox = styled.div`
  background: rgba(102, 126, 234, 0.2);
  padding: 1rem;
  border-radius: 5px;

  label {
    opacity: 0.7;
    font-size: 0.9rem;
    display: block;
    margin-bottom: 0.3rem;
  }

  div {
    font-weight: bold;
  }
`;

const MembershipStatus = styled.div`
  background: rgba(102, 126, 234, 0.2);
  padding: 1.5rem;
  border-radius: 5px;
  margin-top: 1rem;

  .status-label {
    opacity: 0.8;
    margin-bottom: 0.5rem;
  }

  .status-value {
    font-size: 1.2rem;
    color: #667eea;
    font-weight: bold;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  thead {
    background: rgba(102, 126, 234, 0.2);
  }

  th, td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid rgba(102, 126, 234, 0.2);
  }

  th {
    color: #667eea;
    font-weight: bold;
  }

  tr:hover {
    background: rgba(102, 126, 234, 0.1);
  }
`;

function Dashboard({ user }) {
  const [profileData, setProfileData] = useState(null);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const token = localStorage.getItem('token');
    try {
      const [profileRes, paymentRes] = await Promise.all([
        axios.get('/api/users/profile', { headers: { Authorization: `Bearer ${token}` } }),
        axios.get('/api/payments/history', { headers: { Authorization: `Bearer ${token}` } })
      ]);
      setProfileData(profileRes.data);
      setPaymentHistory(paymentRes.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <DashboardContainer><Content><Title>Loading...</Title></Content></DashboardContainer>;
  }

  return (
    <DashboardContainer>
      <Content>
        <Title><FaUser /> My Dashboard</Title>

        <Section>
          <h2><FaUser /> Personal Information</h2>
          <ProfileInfo>
            <InfoBox>
              <label>Name</label>
              <div>{profileData?.name}</div>
            </InfoBox>
            <InfoBox>
              <label>Email</label>
              <div>{profileData?.email}</div>
            </InfoBox>
            <InfoBox>
              <label>Phone</label>
              <div>{profileData?.phone || 'Not provided'}</div>
            </InfoBox>
            <InfoBox>
              <label>Age</label>
              <div>{profileData?.age || 'Not provided'}</div>
            </InfoBox>
            <InfoBox>
              <label>Gender</label>
              <div>{profileData?.gender || 'Not provided'}</div>
            </InfoBox>
          </ProfileInfo>
          <MembershipStatus>
            <div className="status-label">Current Membership</div>
            <div className="status-value">
              {profileData?.membership_plan || 'No active membership'}
            </div>
            {profileData?.membership_end_date && (
              <div className="status-label" style={{ marginTop: '0.5rem' }}>
                Expires: {new Date(profileData.membership_end_date).toLocaleDateString()}
              </div>
            )}
          </MembershipStatus>
        </Section>

        <Section>
          <h2><FaHistory /> Payment History</h2>
          {paymentHistory.length > 0 ? (
            <Table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {paymentHistory.map(payment => (
                  <tr key={payment.id}>
                    <td>{new Date(payment.created_at).toLocaleDateString()}</td>
                    <td>{payment.description}</td>
                    <td>${payment.amount.toFixed(2)}</td>
                    <td style={{ color: payment.status === 'completed' ? '#4caf50' : '#ff9800' }}>
                      {payment.status.toUpperCase()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p>No payment history yet.</p>
          )}
        </Section>
      </Content>
    </DashboardContainer>
  );
}

export default Dashboard;
