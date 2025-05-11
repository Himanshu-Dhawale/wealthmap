'use client';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeatureSection from '@/components/FeatureSection';
import HowItWorks from '@/components/HowItWorks';
import TestimonialSection from '@/components/TestimonialSection';
import CtaSection from '@/components/CtaSection';

const WealthMapLanding = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar/>
      <HeroSection/>   
      <FeatureSection/>
      <HowItWorks/>
      <TestimonialSection/>
      <CtaSection/>
      <Footer/>
    </div>
  );
};

export default WealthMapLanding;