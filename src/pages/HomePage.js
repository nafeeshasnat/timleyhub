import React from 'react';
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import Features from '../components/Features';
import HowWorks from '../components/HowWorks';
import Security from '../components/Security';
import Pricing from '../components/Pricing';
import ContactUs from '../components/ContactUs';

const HomePage = () => {
  return (
    <div>
      <Navigation />
      <HeroSection />
      <Features />
      <HowWorks />
      <Security />
      <Pricing />
      <ContactUs />
      {/* Other components specific to the HomePage */}
    </div>
  );
};

export default HomePage;
