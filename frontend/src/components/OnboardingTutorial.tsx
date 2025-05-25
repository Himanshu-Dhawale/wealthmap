"use client";

import React from 'react';
import { motion } from "framer-motion";
import { X } from "lucide-react";

interface OnboardingTutorialProps {
  onComplete: () => void;
}
const OnboardingTutorial = () => {
    const steps = [
  {
    title: "Welcome to your dashboard!",
    content: "Here's a quick tour to get you started with the tools you'll need.",
    step: "1 of 5",
  },
  {
    title: "Property Map",
    content: "This is where you search for properties.",
    step: "2 of 5",
  },
  {
    title: "Client Leads",
    content: "This is where you add client leads.",
    step: "3 of 5",
  },
  {
    title: "Wealth Analysis",
    content: "Here you can view property details.",
    progress: "3/15",
    step: "4 of 5",
  },
  {
    title: "Create & Send Reports",
    content: "Generate and send reports to your admin.",
    step: "5of5",
  },
];

const handleNext = () => {
  if (currentStep < steps.length - 1) {
    setCurrentStep(currentStep + 1);
  } else {
    onComplete();
  }
};

const handleSkip = () => {
  onComplete();
};


  return (
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3 }}
    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
  >
    <button
  onClick={handleSkip}
  className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100"
>
  <X className="w-5 h-5 text-gray-500" />
</button>
 <div className="p-6 text-center bg-primary-gradient">
          <h2 className="text-2xl font-bold text-white">{steps[currentStep].title}</h2>
        </div>
     <div className="p-6">
  <p className="text-gray-700">{steps[currentStep].content}</p>
  {steps[currentStep].progress && (
    <div className="mt-4 text-sm text-gray-500">
      {steps[currentStep].progress}
    </div>
  )}
</div>
  </motion.div>
  )
}

export default OnboardingTutorial