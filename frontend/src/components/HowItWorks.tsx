import { ISteps } from "@/types/types";
import { motion } from "framer-motion";

const steps:ISteps[] = [
  {
    number: 1,
    title: "Register Your Company",
    description:
      "Create a company account to access our powerful property data platform.",
  },
  {
    number: 2,
    title: "Onboard Team Members",
    description:
      "Invite team members and set permissions based on their roles.",
  },
  {
    number: 3,
    title: "Access Property Data",
    description: "Explore interactive maps and wealth data across the US.",
  },
  {
    number: 4,
    title: "Generate Insights",
    description:
      "Analyze property ownership and wealth composition for better decisions.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            How{" "}
            <span className="bg-primary-gradient bg-clip-text text-transparent">
              WealthMap
            </span>{" "}
            Works
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Get actionable property insights in just three simple steps
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all"
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-10 bg-primary-gradient rounded-full flex items-center justify-center text-white font-bold shadow-md">
                {step.number}
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                {step.title}
              </h3>
              <p className="text-gray-600 text-center">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;