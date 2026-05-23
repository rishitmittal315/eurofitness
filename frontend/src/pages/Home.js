import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';
import styled from 'styled-components';
import * as THREE from 'three';

const HomeContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%);
`;

const HeroSection = styled.div`
  height: 600px;
  position: relative;
  overflow: hidden;
`;

const HeroContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 10;
  color: white;

  h1 {
    font-size: 3.5rem;
    margin-bottom: 1rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  p {
    font-size: 1.5rem;
    opacity: 0.8;
    margin-bottom: 2rem;
  }
`;

const CTA = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
  }
`;

const FeaturesSection = styled.section`
  max-width: 1200px;
  margin: 4rem auto;
  padding: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const FeatureCard = styled.div`
  background: rgba(102, 126, 234, 0.1);
  border: 2px solid #667eea;
  padding: 2rem;
  border-radius: 10px;
  text-align: center;
  transition: all 0.3s ease;
  color: white;

  &:hover {
    transform: translateY(-10px);
    background: rgba(102, 126, 234, 0.2);
    box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
  }

  h3 {
    color: #667eea;
    margin-bottom: 1rem;
  }

  p {
    opacity: 0.8;
  }
`;

function GymModel() {
  return (
    <group>
      {/* Dumbbells */}
      <mesh position={[-2, 1, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 1, 8]} />
        <meshStandardMaterial color="#667eea" />
      </mesh>
      <mesh position={[-2, 0.2, -0.5]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="#667eea" />
      </mesh>
      <mesh position={[-2, 0.2, 0.5]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="#667eea" />
      </mesh>

      {/* Treadmill */}
      <mesh position={[1, 0.5, -1]}>
        <boxGeometry args={[3, 0.2, 1]} />
        <meshStandardMaterial color="#764ba2" />
      </mesh>

      {/* Bench */}
      <mesh position={[1, 0.3, 1]}>
        <boxGeometry args={[2, 0.1, 0.5]} />
        <meshStandardMaterial color="#667eea" />
      </mesh>
    </group>
  );
}

function Home() {
  return (
    <HomeContainer>
      <HeroSection>
        <Canvas>
          <PerspectiveCamera position={[0, 2, 5]} fov={75} />
          <OrbitControls autoRotate />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <GymModel />
        </Canvas>
        <HeroContent>
          <h1>EuroFitness</h1>
          <p>Your Journey to Excellence Starts Here</p>
          <CTA onClick={() => window.location.href = '/memberships'}>
            Get Started Today
          </CTA>
        </HeroContent>
      </HeroSection>

      <FeaturesSection>
        <FeatureCard>
          <h3>Expert Trainers</h3>
          <p>Train with certified fitness professionals who are passionate about your success.</p>
        </FeatureCard>
        <FeatureCard>
          <h3>Personalized Plans</h3>
          <p>Customized diet and workout plans tailored to your specific goals and lifestyle.</p>
        </FeatureCard>
        <FeatureCard>
          <h3>Flexible Memberships</h3>
          <p>Choose from various membership plans that fit your schedule and budget.</p>
        </FeatureCard>
        <FeatureCard>
          <h3>Advanced Equipment</h3>
          <p>Access to state-of-the-art fitness equipment and facilities.</p>
        </FeatureCard>
        <FeatureCard>
          <h3>Community Support</h3>
          <p>Join a supportive community of fitness enthusiasts working towards their goals.</p>
        </FeatureCard>
        <FeatureCard>
          <h3>Progress Tracking</h3>
          <p>Monitor your progress with detailed analytics and performance metrics.</p>
        </FeatureCard>
      </FeaturesSection>
    </HomeContainer>
  );
}

export default Home;
