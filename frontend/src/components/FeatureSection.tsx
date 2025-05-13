import { IFeatures } from "@/types/types";
import { motion } from "framer-motion";
import { Building, CircleDollarSign, Map } from "lucide-react";

const features: IFeatures[] = [
  {
    title: "Comprehensive Ownership Data",
    description:
      "Access detailed records of property owners including contact information and ownership history.",
    icon: <Building className="text-blue-600" />,
  },
  {
    title: "Net Worth Estimation",
    description:
      "Our AI models estimate property owner net worth based on multiple financial indicators.",
    icon: <CircleDollarSign className="text-purple-600" />,
  },
  {
    title: "Interactive Mapping",
    description:
      "Visualize property data with our intuitive mapping interface and advanced filtering.",
    icon: <Map className="text-blue-600" />,
  },
];

const FeatureSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Powerful Features for{" "}
            <span className="bg-primary-gradient bg-clip-text text-transparent">
              Property Intelligence
            </span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            WealthMap combines multiple data sources to give you the most
            comprehensive property insights available.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition-all"
            >
              <div className="w-12 h-12 bg-white rounded-lg shadow-sm flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default FeatureSection;