"use client";

import React from 'react'
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
    <div>OnboardingTutorial</div>
  )
}

export default OnboardingTutorial