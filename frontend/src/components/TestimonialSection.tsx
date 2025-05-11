import { Testimonial } from "@/types/types";
import { motion } from "framer-motion";

const testimonials: Testimonial[] = [
  {
    name: "Sarah Johnson",
    title: "Real Estate Investor",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    quote:
      "WealthMap has transformed how we identify high-net-worth property owners. The net worth estimates are surprisingly accurate.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    title: "Commercial Broker",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    quote:
      "The interactive maps save me hours of research. I can visualize entire neighborhoods' ownership patterns at a glance.",
    rating: 5,
  },
  {
    name: "David Rodriguez",
    title: "Property Developer",
    avatar: "https://randomuser.me/api/portraits/men/68.jpg",
    quote:
      "Their API integration with our CRM was seamless. Now we have WealthMap data directly in our sales workflow.",
    rating: 4,
  },
];

const TestimonialSection = () => {
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
            What Our{" "}
            <span className="bg-primary-gradient bg-clip-text text-transparent">
              Clients
            </span>{" "}
            Say
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Trusted by real estate professionals and investors nationwide
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition-all"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-600">{testimonial.title}</p>
                </div>
              </div>

              <p className="text-gray-700 italic mb-6">"{testimonial.quote}"</p>

              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${
                      i < testimonial.rating
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Client logos */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 pt-12 border-t border-gray-200"
        >
          <p className="text-center text-gray-500 text-sm mb-8">
            TRUSTED BY INDUSTRY LEADERS
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center">
            {[
              "RealtyTrust",
              "UrbanDevelopers",
              "PrimeProperties",
              "EliteHomes",
              "MetroBrokers",
            ].map((company, index) => (
              <motion.div
                key={company}
                whileHover={{ scale: 1.05 }}
                className="text-gray-400 font-bold text-center text-xl"
              >
                {company}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialSection;