"use client";
import { motion } from "framer-motion";
import CreateReportForm from "@/components/CreateReportForm";

const CreateReportPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-8">
          <motion.h1
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="text-3xl font-bold text-gray-900"
          >
            Create Report
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="mt-2 text-gray-600"
          >
            Generate client-ready reports for high-net-worth individuals
          </motion.p>
        </div>

        <div className="bg-white shadow rounded-lg p-6 sm:p-8">
          <CreateReportForm />
        </div>
      </motion.div>
    </div>
  );
};

export default CreateReportPage;