"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useState } from "react";

interface OnboardingTutorialProps {
  onComplete: () => void;
}

const OnboardingTutorial = ({ onComplete }: OnboardingTutorialProps) => {
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

  const [currentStep, setCurrentStep] = useState(0);

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
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="relative w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        {/* Close button */}
        <button
          onClick={handleSkip}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        {/* Header */}
        <div className="p-6 text-center bg-primary-gradient">
          <h2 className="text-2xl font-bold text-white">{steps[currentStep].title}</h2>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-700">{steps[currentStep].content}</p>
          {steps[currentStep].progress && (
            <div className="mt-4 text-sm text-gray-500">
              {steps[currentStep].progress}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-between p-4 border-t">
          <Button
            variant="ghost"
            onClick={handleSkip}
            className="text-gray-600 hover:text-gray-900"
          >
            Skip Tutorial
          </Button>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">
              {steps[currentStep].step}
            </span>
            <Button
              onClick={handleNext}
              className="px-6 py-2 font-medium text-white transition-all rounded-lg shadow-md bg-primary-gradient hover:shadow-lg"
            >
              {currentStep === steps.length - 1 ? "Get Started" : "Next"}
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default OnboardingTutorial;




