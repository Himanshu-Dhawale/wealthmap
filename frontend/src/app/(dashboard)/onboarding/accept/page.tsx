"use client";
import { Suspense } from "react";
import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { OnboardingFormData } from "@/types/types";
import { onboardingSchema } from "@/schema/onboardingSchema";
import { postReq } from "../../../../lib/axios-helpers/apiClient";
import { EMPLOYEE_SIGNUP } from "../../../../endpoints/employee.endpoint";
import { useMembersStore } from "@/stores/membersStore";

const AcceptPageContent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<OnboardingFormData>({ resolver: zodResolver(onboardingSchema) });
  const router = useRouter();
  const searchParams = useSearchParams();
  const invitationId = searchParams.get("token");
  const { acceptInvitaion } = useMembersStore();

  const onSubmit = async (data: OnboardingFormData) => {
    const payload = { ...data, invitationId };
    try {
      const response: any = await postReq(EMPLOYEE_SIGNUP, payload);
      if (response.status === 200 || response.status === 201) {
        const email = response?.data.email;
        acceptInvitaion(email, `${data.firstName} ${data.lastName}`);
        router.push("/map");
      }
    } catch (err) {
      console.error(err);
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
              <h1 className="text-3xl font-bold text-white">Onboarding</h1>
              <p className="mt-2 text-blue-100">
                Fill out the form below to create your account
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
                  htmlFor="firstName"
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
                  First name
                </label>
                <input
                  id="firstName"
                  type="text"
                  className={`w-full px-4 py-3 rounded-lg outline-none border ${
                    errors.firstName ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                  placeholder=""
                  {...register("firstName")}
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.firstName.message}
                  </p>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <label
                  htmlFor="lastName"
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
                  Last name
                </label>
                <input
                  id="lastName"
                  type="text"
                  className={`w-full px-4 py-3 rounded-lg outline-none border ${
                    errors.lastName ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                  placeholder=""
                  {...register("lastName")}
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.lastName.message}
                  </p>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <label
                  htmlFor="password"
                  className="block mb-1 text-sm font-medium text-gray-700"
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
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.password.message}
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
                    Creating account...
                  </span>
                ) : (
                  "Continue"
                )}
              </motion.button>
            </form>
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

export default function AcceptPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="w-full max-w-md p-8 text-center">
            <div className="p-8 overflow-hidden bg-white shadow-xl rounded-2xl">
              <div className="flex justify-center">
                <div className="w-8 h-8 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
              </div>
              <p className="mt-4 text-gray-700">Loading onboarding form...</p>
            </div>
          </div>
        </div>
      }
    >
      <AcceptPageContent />
    </Suspense>
  );
}