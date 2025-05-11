import FeatureSection from "@/components/FeatureSection";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import Navbar from "@/components/Navbar";
import ServicesSection from "@/components/ServicesSection";
import TestimonialSection from "@/components/TestimonialSection";
// import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      {/* <h1 className="text-xl text-red-500 italic">Wealth map</h1> */}
      <Navbar/>
      <HeroSection/>
      <FeatureSection/>
      <HowItWorks/>
      <ServicesSection/>
      <TestimonialSection/>
      <Footer/>
    </div>
  );
}


