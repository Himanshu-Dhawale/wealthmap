import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import React, { Dispatch, SetStateAction } from "react";
import PasswordStrengthIndicator from "./PasswordStrengthIndicator";
import { useFormContext } from "react-hook-form";
import { SignupFormData } from "@/types/types";

const RegisterAdminForm = ({
  setStep,
}: {
  setStep: Dispatch<SetStateAction<number>>;
}) => {
  const {
    register,
    formState: { errors },
    watch,
    trigger,
  } = useFormContext<SignupFormData>();
  const password = watch("password");

  const handleNext = async () => {
    const isValid = await trigger(
      ["firstName", "lastName", "email", "password", "confirmPassword"],
      { shouldFocus: true }
    );
    if (isValid) {
      setStep(2);
    }
  };
  return (
    <motion.div
      key="step1"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            First Name
          </label>
          <input
            id="firstName"
            type="text"
            className={`w-full px-4 py-3 rounded-lg outline-none border ${
              errors.firstName ? "border-red-500" : "border-gray-300"
            } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
            placeholder="John"
            {...register("firstName")}
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-600">
              {errors.firstName.message}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Last Name
          </label>
          <input
            id="lastName"
            type="text"
            className={`w-full px-4 py-3 rounded-lg outline-none border ${
              errors.lastName ? "border-red-500" : "border-gray-300"
            } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
            placeholder="Doe"
            {...register("lastName")}
          />
          {errors.lastName && (
            <p className="mt-1 text-sm text-red-600">
              {errors.lastName.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-1"
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
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          className={`w-full px-4 py-3 rounded-lg outline-none border ${
            errors.password ? "border-red-500" : "border-gray-300"
          } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
          placeholder="••••••••"
          {...register("password")}
        />
        {password && (
          <div className="mt-2">
            <PasswordStrengthIndicator password={password} />
          </div>
        )}
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          type="password"
          className={`w-full px-4 py-3 rounded-lg outline-none border ${
            errors.confirmPassword ? "border-red-500" : "border-gray-300"
          } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
          placeholder="••••••••"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-600">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <div className="flex justify-end">
        <motion.button
          type="button"
          onClick={handleNext}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-6 py-3 bg-primary-gradient text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
        >
          Next: Company Details
          <span className="inline-flex items-center align-middle">
            <ChevronRight />
          </span>
        </motion.button>
      </div>
    </motion.div>
  );
};
export default RegisterAdminForm;