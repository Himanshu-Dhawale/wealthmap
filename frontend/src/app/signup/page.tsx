"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Check } from "lucide-react";
import { signupSchema } from "@/schema/signupSchema";
import { SignupFormData } from "@/types/types";
import RegisterAdminForm from "@/components/RegisterAdminForm";
import CompanyRegisterForm from "@/components/CompanyRegisterForm";
import { postReq } from "../../lib/axios-helpers/apiClient";
import { SIGNUP } from "../../endpoints/auth.endpoint";
import { fileToBase64, loggingInUser } from "../../lib/utils";
import { SignInPayload } from "../../types/auth/login";
import { useRouter } from "next/navigation";

const SignupForm = () => {
  const [step, setStep] = useState(1);
  const methods = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
  });
  const { handleSubmit } = methods;
  const router = useRouter();

  const onSubmit = async (data: SignupFormData) => {
    const payload = {
      email: data.email,
      password: data.password,
      name: data.companyName,
      logo: "",
      firstName: data.firstName,
      lastName: data.lastName,
      size: data.companySize,
      location: data.location,
    };

    try {
      if (!data.logo) {
        throw new Error("Logo is required");
      }
      payload.logo = await fileToBase64(data.logo);
      const response = await postReq<{ email: string; password: string }>(
        SIGNUP,
        payload
      );
      if (response.status === 201) {
        const userPayload: SignInPayload = {
          email: data.email,
          password: data.password,
          redirect: false,
        };
        try {
          const response = await loggingInUser(userPayload);
          if (response?.status !== 401) return router.push("/map");
          console.log(response?.error);
        } catch (err) {
          console.error(err, "Something went wrong, please login...");
        }
      }
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-gray-50 to-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <div className="overflow-hidden bg-white shadow-xl rounded-2xl">
          {/* Header */}
          <div className="p-8 text-center bg-primary-gradient">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h1 className="text-3xl font-bold text-white">Create Account</h1>
              <p className="mt-2 text-blue-100">
                Get started with WealthMap today
              </p>
            </motion.div>
          </div>

          {/* Stepper */}
          <div className="px-8 pt-6">
            <div className="flex items-center justify-between">
              <div
                className={`flex items-center ${
                  step >= 1 ? "text-blue-600" : "text-gray-400"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step >= 1 ? "bg-blue-100" : "bg-gray-100"
                  }`}
                >
                  {step >= 1 ? <Check size={18} /> : <span>1</span>}
                </div>
                <span className="ml-2 text-sm font-medium">Admin Details</span>
              </div>

              <div className="flex-1 h-0.5 mx-2 bg-gray-200">
                <div
                  className={`h-full transition-all duration-300 ${
                    step >= 2 ? "bg-blue-600" : "bg-gray-200"
                  }`}
                ></div>
              </div>

              <div
                className={`flex items-center ${
                  step >= 2 ? "text-blue-600" : "text-gray-400"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step >= 2 ? "bg-blue-100" : "bg-gray-100"
                  }`}
                >
                  {step >= 2 ? <Check size={18} /> : <span>2</span>}
                </div>
                <span className="ml-2 text-sm font-medium">
                  Company Details
                </span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="p-8">
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <AnimatePresence mode="wait">
                  {step === 1 ? (
                    <RegisterAdminForm setStep={setStep} />
                  ) : (
                    <CompanyRegisterForm setStep={setStep} />
                  )}
                </AnimatePresence>
              </form>
            </FormProvider>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.4 }}
              className="mt-6 text-center"
            >
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
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

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.6 }}
          className="mt-8 text-sm text-center text-gray-500"
        >
          <p>© {new Date().getFullYear()} WealthMap. All rights reserved.</p>
        </motion.div>
      </motion.div>
    </div>
  );
};
export default SignupForm;
