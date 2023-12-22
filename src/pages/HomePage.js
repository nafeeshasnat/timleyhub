import React from 'react';
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';

const HomePage = () => {
  return (
    <div>
      <Navigation />
      <HeroSection />
      {/* Other components specific to the HomePage */}
    </div>
  );
};

export default HomePage;
