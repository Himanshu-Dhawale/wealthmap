import { motion, AnimatePresence } from "framer-motion";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { status } = useSession();
  if (status === "loading") return null;
  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <span className="text-2xl font-bold text-transparent bg-primary-gradient bg-clip-text">
              WealthMap
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="items-center hidden space-x-8 md:flex">
            {["Features", "Solutions", "Pricing", "Resources"].map((item) => (
              <motion.a
                key={item}
                href="#"
                whileHover={{ scale: 1.05, color: "#4f46e5" }}
                className="text-sm font-medium text-gray-700"
              >
                {item}
              </motion.a>
            ))}
            {status === "authenticated" ? (
              <div onClick={() => signOut()} tabIndex={0} role="button">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-1.5 mr-2 text-purple-gradient-end border border-purple-gradient-end bg-white rounded-lg font-medium shadow-md"
                >
                  Logout
                </motion.button>
              </div>
            ) : (
              <div>
                <Link href={"/login"}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-1.5 mr-2 text-purple-gradient-end border border-purple-gradient-end bg-white rounded-lg font-medium shadow-md"
                  >
                    Login
                  </motion.button>
                </Link>
                <Link href={"/signup"}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 font-medium text-white rounded-lg shadow-md bg-primary-gradient"
                  >
                    Request Demo
                  </motion.button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-gray-900"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden md:hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {["Features", "Solutions", "Pricing", "Resources"].map((item) => (
                <motion.a
                  key={item}
                  href="#"
                  className="block px-3 py-2 text-base font-medium text-gray-700 rounded-md hover:text-gray-900 hover:bg-gray-100"
                  whileHover={{ x: 5 }}
                >
                  {item}
                </motion.a>
              ))}
              <Link href={"/signup"}>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="w-full px-4 py-2 mt-2 font-medium text-white rounded-lg shadow-md bg-primary-gradient"
                >
                  Request Demo
                </motion.button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
