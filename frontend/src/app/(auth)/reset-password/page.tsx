"use client";
import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ForgotPasswordFormData } from "@/types/types";
import { forgotPasswordSchema } from "@/schema/forgotPasswordSchema";


const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });
  const router = useRouter();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); 
      
      toast.success("Password reset link sent to your email!");
      router.push("/login");
    } catch (err) {
      console.error(err);
      toast.error("Failed to send reset link. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-gray-50 to-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="overflow-hidden bg-white shadow-xl rounded-2xl">
          <div className="p-8 text-center bg-primary-gradient">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h1 className="text-3xl font-bold text-white">Reset Password</h1>
              <p className="mt-2 text-blue-100">
                Enter your email to receive a reset link
              </p>
            </motion.div>
          </div>

          <div className="p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <label
                  htmlFor="email"
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  className={`w-full px-4 py-3 rounded-lg outline-none border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                  placeholder="you@example.com"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full px-4 py-3 font-medium text-white transition-all rounded-lg shadow-md bg-primary-gradient hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                transition={{ duration: 0.3 }}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="w-4 h-4 mr-2 -ml-1 text-white animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  "Send Reset Link"
                )}
              </motion.button>
            </form>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mt-6 text-center"
            >
              <p className="text-sm text-gray-600">
                Remember your password?{" "}
                <Link
                  href="/login"
                  className="font-medium text-blue-600 hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </motion.div>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="mt-8 text-sm text-center text-gray-500"
        >
          <p>© {new Date().getFullYear()} WealthMap. All rights reserved.</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ResetPassword;