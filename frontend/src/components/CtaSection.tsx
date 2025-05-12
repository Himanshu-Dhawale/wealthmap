import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const CtaSection = () => {
  return (
    <section className="py-20 bg-primary-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Ready to unlock property insights?
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Join thousands of real estate professionals who use WealthMap to
            make data-driven decisions.
          </p>
          <Link href={"/signup"}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-8 px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              Request a Demo
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection;