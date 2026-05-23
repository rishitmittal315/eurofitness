import React from 'react';
import styled from 'styled-components';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const FooterContainer = styled.footer`
  background: #0a0e27;
  color: #fff;
  padding: 3rem 2rem;
  margin-top: 4rem;
  border-top: 2px solid #667eea;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const FooterSection = styled.div`
  h3 {
    color: #667eea;
    margin-bottom: 1rem;
  }

  p {
    line-height: 1.8;
    opacity: 0.8;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
  opacity: 0.8;

  svg {
    color: #667eea;
    font-size: 1.2rem;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;

  a {
    color: #667eea;
    font-size: 1.5rem;
    transition: all 0.3s ease;

    &:hover {
      color: #764ba2;
      transform: translateY(-3px);
    }
  }
`;

const Copyright = styled.div`
  text-align: center;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  opacity: 0.6;
`;

function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <h3>About EuroFitness</h3>
          <p>
            Your premier destination for fitness excellence. We provide world-class training,
            personalized diet plans, and comprehensive fitness solutions.
          </p>
        </FooterSection>

        <FooterSection>
          <h3>Quick Links</h3>
          <ContactInfo>Home</ContactInfo>
          <ContactInfo>Trainers</ContactInfo>
          <ContactInfo>Memberships</ContactInfo>
          <ContactInfo>Diet Plans</ContactInfo>
        </FooterSection>

        <FooterSection>
          <h3>Contact Us</h3>
          <ContactInfo>
            <FaMapMarkerAlt />
            123 Fitness Street, Europe
          </ContactInfo>
          <ContactInfo>
            <FaPhone />
            +1 (555) 123-4567
          </ContactInfo>
          <ContactInfo>
            <FaEnvelope />
            info@eurofitness.com
          </ContactInfo>
          <SocialLinks>
            <a href="#facebook">< FaFacebook /></a>
            <a href="#twitter"><FaTwitter /></a>
            <a href="#instagram"><FaInstagram /></a>
            <a href="#linkedin"><FaLinkedin /></a>
          </SocialLinks>
        </FooterSection>
      </FooterContent>
      <Copyright>
        <p>&copy; 2026 EuroFitness. All rights reserved.</p>
      </Copyright>
    </FooterContainer>
  );
}

export default Footer;
