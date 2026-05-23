import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaHome, FaUsers, FaDumbbell, FaAppleAlt, FaShoppingCart, FaUser, FaSignOutAlt } from 'react-icons/fa';

const NavbarContainer = styled.nav`
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  position: sticky;
  top: 0;
  z-index: 100;
`;

const Logo = styled(Link)`
  font-size: 1.8rem;
  font-weight: bold;
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    opacity: 0.8;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }
`;

const Button = styled.button`
  background: white;
  color: #667eea;
  border: none;
  padding: 0.7rem 1.5rem;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
`;

function Navbar({ isAuthenticated, user, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <NavbarContainer>
      <Logo to="">
        <FaDumbbell /> EuroFitness
      </Logo>
      <NavLinks>
        <StyledLink to="/">
          <FaHome /> Home
        </StyledLink>
        <StyledLink to="/trainers">
          <FaUsers /> Trainers
        </StyledLink>
        <StyledLink to="/memberships">
          <FaShoppingCart /> Memberships
        </StyledLink>
        <StyledLink to="/diet-plans">
          <FaAppleAlt /> Diet Plans
        </StyledLink>
        <StyledLink to="/about">About</StyledLink>
        <StyledLink to="/contact">Contact</StyledLink>

        {isAuthenticated ? (
          <>
            <StyledLink to="/dashboard">
              <FaUser /> Dashboard
            </StyledLink>
            {user?.role === 'admin' && (
              <StyledLink to="/admin">Admin</StyledLink>
            )}
            <Button onClick={handleLogout}>
              <FaSignOutAlt /> Logout
            </Button>
          </>
        ) : (
          <>
            <Button as={Link} to="/login">
              Login
            </Button>
            <Button as={Link} to="/register" style={{ background: '#764ba2' }}>
              Register
            </Button>
          </>
        )}
      </NavLinks>
    </NavbarContainer>
  );
}

export default Navbar;
