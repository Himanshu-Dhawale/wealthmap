"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const TermsPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-gray-50 to-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl"
      >
        <div className="overflow-hidden bg-white shadow-xl rounded-2xl">
          <div className="p-8 text-center bg-primary-gradient">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h1 className="text-3xl font-bold text-white">Terms and Conditions</h1>
            </motion.div>
          </div>

          <div className="p-8 max-h-[70vh] overflow-y-auto">
            <div className="space-y-6 text-gray-700">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <h2 className="text-xl font-semibold text-gray-800">1. Acceptance of Terms</h2>
                <p className="mt-2">
                  By registering or using WealthMap, users agree to comply with and be bound by these terms. If you disagree with any part, please do not use the platform.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
              >
                <h2 className="text-xl font-semibold text-gray-800">2. Description of Service</h2>
                <p className="mt-2">
                  WealthMap is a data aggregation and research platform that allows users to explore property ownership and estimated wealth profiles through a map-based interface. It is intended for internal business use by wealth management professionals.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.6 }}
              >
                <h2 className="text-xl font-semibold text-gray-800">3. User Roles and Responsibilities</h2>
                <div className="mt-2 space-y-4">
                  <div>
                    <h3 className="font-medium">a. Admins:</h3>
                    <ul className="mt-2 ml-6 list-disc space-y-1">
                      <li>Are responsible for company registration and employee account management.</li>
                      <li>Must ensure only authorized users are invited.</li>
                      <li>Can revoke employee access at any time.</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium">b. Employees:</h3>
                    <ul className="mt-2 ml-6 list-disc space-y-1">
                      <li>Must not share access credentials.</li>
                      <li>May only use the platform for research and reporting tasks authorized by the admin.</li>
                      <li>Are expected to complete onboarding and follow all usage guidelines.</li>
                    </ul>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.7 }}
              >
                <h2 className="text-xl font-semibold text-gray-800">4. Data Usage & Accuracy</h2>
                <p className="mt-2">
                  WealthMap uses mock and public-sourced data for demonstration and evaluation purposes. We do not guarantee the accuracy or real-time validity of any data presented.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.8 }}
              >
                <h2 className="text-xl font-semibold text-gray-800">5. Privacy & Security</h2>
                <div className="mt-2 space-y-2">
                  <p>User credentials and activity are stored securely.</p>
                  <p>Multi-factor authentication is used for protection.</p>
                  <p>No user data is sold or shared with third parties.</p>
                  <p>
                    Refer to our <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link> for full details.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.9 }}
              >
                <h2 className="text-xl font-semibold text-gray-800">6. Restrictions</h2>
                <p className="mt-2">Users may not:</p>
                <ul className="mt-2 ml-6 list-disc space-y-1">
                  <li>Use WealthMap for illegal or unethical purposes.</li>
                  <li>Attempt to reverse engineer or extract data from the platform.</li>
                  <li>Sell or distribute data without written permission.</li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 1.0 }}
              >
                <h2 className="text-xl font-semibold text-gray-800">7. Termination of Access</h2>
                <div className="mt-2 space-y-2">
                  <p>Admins may revoke employee access at any time.</p>
                  <p>WealthMap reserves the right to suspend or terminate any user account if these terms are violated.</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 1.1 }}
              >
                <h2 className="text-xl font-semibold text-gray-800">8. Intellectual Property</h2>
                <p className="mt-2">
                  All content, UI, and backend systems are the intellectual property of WealthMap. No part may be copied or reused without permission.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 1.2 }}
              >
                <h2 className="text-xl font-semibold text-gray-800">9. Disclaimers</h2>
                <p className="mt-2">
                  This platform is an MVP and uses mock datasets. Data shown is not guaranteed to reflect real-world conditions or outcomes.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 1.3 }}
              >
                <h2 className="text-xl font-semibold text-gray-800">10. Modifications</h2>
                <p className="mt-2">
                  Terms may be updated from time to time. Continued use of the platform constitutes acceptance of any changes.
                </p>
              </motion.div>
            </div>
          </div>

          <div className="p-6 border-t">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.4 }}
              className="text-center"
            >
              <Link
                href="/"
                className="px-6 py-2 font-medium text-white transition-all rounded-lg shadow-md bg-primary-gradient hover:shadow-lg"
              >
                Back to Home
              </Link>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.5 }}
          className="mt-8 text-sm text-center text-gray-500"
        >
          <p>© {new Date().getFullYear()} WealthMap. All rights reserved.</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default TermsPage;