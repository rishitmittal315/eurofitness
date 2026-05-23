import React from 'react';
import styled from 'styled-components';
import { FaTarget, FaUsers, FaAward } from 'react-icons/fa';

const AboutContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%);
  padding: 3rem 2rem;
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  color: white;
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

const Section = styled.section`
  margin-bottom: 3rem;
  background: rgba(102, 126, 234, 0.1);
  border: 2px solid #667eea;
  border-radius: 10px;
  padding: 2rem;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(102, 126, 234, 0.15);
    box-shadow: 0 5px 20px rgba(102, 126, 234, 0.2);
  }

  h2 {
    color: #667eea;
    margin-bottom: 1rem;
    font-size: 1.8rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  p {
    line-height: 1.8;
    opacity: 0.9;
    margin-bottom: 1rem;
  }
`;

const ValuesList = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;

  li {
    background: rgba(102, 126, 234, 0.2);
    padding: 1.5rem;
    border-radius: 5px;
    text-align: center;

    strong {
      color: #667eea;
      display: block;
      margin-bottom: 0.5rem;
    }

    span {
      opacity: 0.8;
    }
  }
`;

function About() {
  return (
    <AboutContainer>
      <Content>
        <Title>About EuroFitness</Title>

        <Section>
          <h2>Welcome to EuroFitness</h2>
          <p>
            EuroFitness is a premier online fitness platform dedicated to transforming lives through
            comprehensive fitness solutions. We believe that fitness is not just about physical
            transformation, but also about building a healthier, happier lifestyle.
          </p>
          <p>
            With over a decade of experience in the fitness industry, we've helped thousands of
            individuals achieve their fitness goals through personalized training and nutrition guidance.
          </p>
        </Section>

        <Section>
          <h2><FaTarget /> Our Mission</h2>
          <p>
            Our mission is to empower individuals to achieve their fitness goals through expert training,
            personalized diet plans, and a supportive community. We strive to make fitness accessible,
            affordable, and enjoyable for everyone, regardless of their fitness level or background.
          </p>
        </Section>

        <Section>
          <h2><FaAward /> Our Vision</h2>
          <p>
            To become the most trusted and innovative fitness platform in Europe, setting the standard
            for excellence in online fitness coaching, nutrition guidance, and community support.
          </p>
        </Section>

        <Section>
          <h2><FaUsers /> Our Values</h2>
          <ValuesList>
            <li>
              <strong>Excellence</strong>
              <span>We pursue the highest standards in all aspects of our service</span>
            </li>
            <li>
              <strong>Integrity</strong>
              <span>We are honest, transparent, and ethical in all our dealings</span>
            </li>
            <li>
              <strong>Compassion</strong>
              <span>We genuinely care about the wellbeing of our members</span>
            </li>
            <li>
              <strong>Innovation</strong>
              <span>We continuously improve and adapt to serve you better</span>
            </li>
          </ValuesList>
        </Section>

        <Section>
          <h2>Why Choose EuroFitness?</h2>
          <ValuesList>
            <li>
              <strong>Expert Trainers</strong>
              <span>Certified professionals with years of experience</span>
            </li>
            <li>
              <strong>Personalized Plans</strong>
              <span>Customized for your specific goals and lifestyle</span>
            </li>
            <li>
              <strong>24/7 Support</strong>
              <span>Always here to help you succeed</span>
            </li>
            <li>
              <strong>Community</strong>
              <span>Join a supportive network of fitness enthusiasts</span>
            </li>
            <li>
              <strong>Flexible Options</strong>
              <span>Choose plans that fit your schedule and budget</span>
            </li>
            <li>
              <strong>Results Guaranteed</strong>
              <span>Proven track record of transforming lives</span>
            </li>
          </ValuesList>
        </Section>
      </Content>
    </AboutContainer>
  );
}

export default About;
