import { SignupFormData } from "@/types/types";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useFormContext } from "react-hook-form";

const CompanyRegisterForm = ({
  setStep,
}: {
  setStep: Dispatch<SetStateAction<number>>;
}) => {
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext<SignupFormData>();

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("logo", file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };
  return (
    <motion.div
      key="step2"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div>
        <label
          htmlFor="companyName"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Company Name
        </label>
        <input
          id="companyName"
          type="text"
          className={`w-full px-4 py-3 rounded-lg outline-none border ${
            errors.companyName ? "border-red-500" : "border-gray-300"
          } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
          placeholder="Acme Inc."
          {...register("companyName")}
        />
        {errors.companyName && (
          <p className="mt-1 text-sm text-red-600">
            {errors.companyName.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="industry"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Industry
        </label>
        <select
          id="industry"
          className={`w-full px-4 py-3 rounded-lg outline-none border ${
            errors.industry ? "border-red-500" : "border-gray-300"
          } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
          {...register("industry")}
        >
          <option value="">Select your industry</option>
          <option value="real-estate">Real Estate</option>
          <option value="finance">Finance</option>
          <option value="technology">Technology</option>
          <option value="healthcare">Healthcare</option>
          <option value="other">Other</option>
        </select>
        {errors.industry && (
          <p className="mt-1 text-sm text-red-600">{errors.industry.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="companySize"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Company Size
        </label>
        <select
          id="companySize"
          className={`w-full px-4 py-3 rounded-lg outline-none border ${
            errors.companySize ? "border-red-500" : "border-gray-300"
          } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
          {...register("companySize")}
        >
          <option value="">Select company size</option>
          <option value="1-10">1-10 employees</option>
          <option value="11-50">11-50 employees</option>
          <option value="51-200">51-200 employees</option>
          <option value="201-500">201-500 employees</option>
          <option value="501+">501+ employees</option>
        </select>
        {errors.companySize && (
          <p className="mt-1 text-sm text-red-600">
            {errors.companySize.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="location"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Location
        </label>
        <input
          id="location"
          type="text"
          className={`w-full px-4 py-3 rounded-lg outline-none border ${
            errors.location ? "border-red-500" : "border-gray-300"
          } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
          placeholder="City, Country"
          {...register("location")}
        />
        {errors.location && (
          <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="logo"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Company Logo
        </label>
        <div className="flex items-center space-x-4">
          <div className="relative">
            {logoPreview ? (
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-300">
                <img
                  src={logoPreview}
                  alt="Company logo preview"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-16 h-16 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            )}
            <input
              id="logo"
              type="file"
              accept="image/*"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleLogoChange}
            />
          </div>
          <div>
            <label
              htmlFor="logo"
              className="text-sm text-gray-600 cursor-pointer"
            >
              {logoPreview ? "Change logo" : "Upload logo"}
            </label>
            <p className="text-xs text-gray-500">Recommended size: 256x256px</p>
          </div>
        </div>
      </div>

      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            id="terms"
            type="checkbox"
            className={`h-4 w-4 ${
              errors.terms ? "text-red-600" : "text-blue-600"
            } focus:ring-blue-500 border-gray-300 rounded`}
            {...register("terms")}
          />
        </div>

        <div className="ml-3 text-sm">
          <label
            htmlFor="terms"
            className={`font-medium ${
              errors.terms ? "text-red-600" : "text-gray-700"
            }`}
          >
            I agree to the{" "}
            <Link href="/terms" className="text-blue-600 hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-blue-600 hover:underline">
              Privacy Policy
            </Link>
          </label>
          {errors.terms && (
            <p className="mt-1 text-sm text-red-600">{errors.terms.message}</p>
          )}
        </div>
      </div>

      <div className="flex justify-between">
        <motion.button
          type="button"
          onClick={() => setStep(1)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all"
        >
          <span className="inline-flex align-middle gap-2">
            <ChevronLeft size={18} />{" "}
          </span>
          Back
        </motion.button>
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
        >
          Complete Registration
        </motion.button>
      </div>
    </motion.div>
  );
};
export default CompanyRegisterForm;