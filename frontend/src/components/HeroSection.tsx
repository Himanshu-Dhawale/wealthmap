import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";

const HeroSection = () => {
  const [currentFeature, setCurrentFeature] = useState(0);

  const features = [
    {
      title: "Property Ownership Insights",
      description: "Uncover detailed ownership data for any property in the US",
      icon: "🏠",
    },
    {
      title: "Net Worth Estimation",
      description: "AI-powered net worth estimates for property owners",
      icon: "💰",
    },
    {
      title: "Interactive Mapping",
      description: "Visualize data with our cutting-edge geospatial technology",
      icon: "🗺️",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  return (
    <section className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-700 bg-blue-100 rounded-full">
                Now with AI-powered insights
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
            >
              <span className="bg-primary-gradient bg-clip-text text-transparent">
                Unlock
              </span>{" "}
              Property Intelligence
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-lg md:text-xl text-gray-600 max-w-lg"
            >
              WealthMap provides comprehensive property ownership and net worth
              data across the US through our interactive platform with seamless
              third-party integrations.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 pt-2"
            >
              <Link href={'/signup'}>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-4 bg-primary-gradient text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                Request Demo
              </motion.button>
              </Link>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-blue-500 transition-all"
              >
                Learn More
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="flex items-center gap-4 pt-8"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((item) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -10 * item }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 1 + item * 0.1 }}
                    className="w-10 h-10 rounded-full border-2 border-white bg-gray-300"
                    style={{
                      backgroundImage: `url(https://randomuser.me/api/portraits/${
                        item % 2 === 0 ? "women" : "men"
                      }/${item + 20}.jpg)`,
                      backgroundSize: "cover",
                      zIndex: item,
                    }}
                  />
                ))}
              </div>
              <div className="text-sm text-gray-600">
                <p>Trusted by 5,000+ real estate professionals</p>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span>4.9/5 (1,200 reviews)</span>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="relative"
          >
            <div className="bg-white p-1 rounded-2xl shadow-2xl max-w-lg w-full border border-gray-200">
              <div className="aspect-video rounded-xl overflow-hidden relative bg-gradient-to-br from-blue-50 to-purple-50">
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <div className="text-center space-y-6">
                    <motion.div
                      animate={{
                        scale: [1, 1.05, 1],
                        boxShadow: [
                          "0 4px 14px rgba(79, 70, 229, 0.1)",
                          "0 6px 20px rgba(79, 70, 229, 0.2)",
                          "0 4px 14px rgba(79, 70, 229, 0.1)",
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md"
                    >
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                      <span className="text-sm font-medium text-gray-700">
                        LIVE DEMO
                      </span>
                    </motion.div>

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentFeature}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-4"
                      >
                        <h3 className="text-2xl font-bold text-gray-900">
                          {features[currentFeature].title}
                        </h3>
                        <p className="text-gray-600">
                          {features[currentFeature].description}
                        </p>
                        <div className="text-4xl">
                          {features[currentFeature].icon}
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <motion.div
              animate={{
                y: [0, -10, 0],
                opacity: [0.2, 0.3, 0.2],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-blue-200 blur-xl -z-10"
            />
            <motion.div
              animate={{
                y: [0, 10, 0],
                opacity: [0.2, 0.3, 0.2],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full bg-purple-200 blur-xl -z-10"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;