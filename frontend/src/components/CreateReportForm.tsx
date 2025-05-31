"use client";
import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { reportSchema } from "@/schema/reportSchema";
import {
  CreateReportResponse,
  ReportFormData,
  ReportPropertyType,
} from "@/types/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { getSession } from "next-auth/react";
import { postReq } from "@/lib/axios-helpers/apiClient";
import { LoaderCircle } from "lucide-react";

const propertyTypeOptions = [
  { id: "LUXURY_HOME", label: "Luxury Home" },
  { id: "COMMERCIAL", label: "Commercial" },
  { id: "VACATION", label: "Vacation Property" },
  { id: "INVESTMENT", label: "Investment Property" },
  { id: "SPECIAL_USE", label: "Special Use" },
];

const wealthSourceOptions = [
  { value: "INHERITANCE", label: "Inheritance" },
  { value: "ENTREPRENEURSHIP", label: "Entrepreneurship" },
  { value: "INVESTMENTS", label: "Investments" },
  { value: "TECH", label: "Technology" },
  { value: "REAL_ESTATE", label: "Real Estate" },
  { value: "OTHER", label: "Other" },
];

type ReportFormInput = Omit<ReportFormData, "estimatedNetWorth"> & {
  estimatedNetWorth: string;
};

const CreateReportForm = () => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ReportFormInput>({
    resolver: zodResolver(reportSchema as any),
    defaultValues: {
      propertyTypes: [],
      confidenceScore: 70,
      estimatedNetWorth: "",
    },
  });

  const onSubmit = async (data: ReportFormInput) => {
    try {
      const session = await getSession();
      const token = session?.user.accessToken;

      const payload = {
        fullName: data.fullName,
        primaryLocation: data.primaryLocation,
        contactEmail: data.contactEmail,
        primaryIndustry: data.primaryIndustry,
        sourceOfWealth: data.sourceOfWealth,
        propertyTypes: data.propertyTypes,
        description: data.description,
        propertyDetails: data.propertyDetails,
        confidenceScore: data.confidenceScore,
        lastContactDate: data.lastContactDate,
        estimatedNetWorth: data.estimatedNetWorth,
      };

      const response = await postReq<CreateReportResponse>(
        "/report",
        payload,
        token
      );

      if (response.status === 201) {
        toast.success("Report created successfully!", {
          description: "Your report has been generated and saved.",
        });
        reset();
      }
    } catch (error) {
      console.error("Error creating report:", error);
      toast.error("Failed to create report", {
        description:
          error instanceof Error ? error.message : "Please try again later",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-3xl mx-auto"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Information Section */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Label htmlFor="fullName">Full Name*</Label>
            <Input
              id="fullName"
              type="text"
              {...register("fullName")}
              placeholder="John Billionaire"
              className={errors.fullName ? "border-red-500" : ""}
            />
            {errors.fullName && (
              <p className="mt-1 text-sm text-red-600">
                {errors.fullName.message}
              </p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Label htmlFor="estimatedNetWorth">
              Estimated Net Worth (USD)*
            </Label>
            <Input
              id="estimatedNetWorth"
              type="text"
              {...register("estimatedNetWorth")}
              placeholder="$2,100,000,000"
              // onChange={handleNetWorthChange}
              className={errors.estimatedNetWorth ? "border-red-500" : ""}
            />
            {errors.estimatedNetWorth && (
              <p className="mt-1 text-sm text-red-600">
                {errors.estimatedNetWorth.message}
              </p>
            )}
            <p className="mt-1 text-xs text-gray-500">
              Enter value between $800M - $999B
            </p>
          </motion.div>
        </div>

        {/* Contact Information Section */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <Label htmlFor="primaryLocation">Primary Location*</Label>
            <Input
              id="primaryLocation"
              type="text"
              {...register("primaryLocation")}
              placeholder="New York, NY"
              className={errors.primaryLocation ? "border-red-500" : ""}
            />
            {errors.primaryLocation && (
              <p className="mt-1 text-sm text-red-600">
                {errors.primaryLocation.message}
              </p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <Label htmlFor="contactEmail">Contact Email*</Label>
            <Input
              id="contactEmail"
              type="email"
              {...register("contactEmail")}
              placeholder="john@example.com"
              className={errors.contactEmail ? "border-red-500" : ""}
            />
            {errors.contactEmail && (
              <p className="mt-1 text-sm text-red-600">
                {errors.contactEmail.message}
              </p>
            )}
          </motion.div>
        </div>

        {/* Wealth Details Section */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <Label htmlFor="primaryIndustry">Primary Industry*</Label>
            <Input
              id="primaryIndustry"
              type="text"
              {...register("primaryIndustry")}
              placeholder="Technology"
              className={errors.primaryIndustry ? "border-red-500" : ""}
            />
            {errors.primaryIndustry && (
              <p className="mt-1 text-sm text-red-600">
                {errors.primaryIndustry.message}
              </p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <Label>Source of Wealth*</Label>
            <Controller
              name="sourceOfWealth"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger
                    className={errors.sourceOfWealth ? "border-red-500" : ""}
                  >
                    <SelectValue placeholder="Select source" />
                  </SelectTrigger>
                  <SelectContent>
                    {wealthSourceOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.sourceOfWealth && (
              <p className="mt-1 text-sm text-red-600">
                {errors.sourceOfWealth.message}
              </p>
            )}
          </motion.div>
        </div>

        {/* Property Information Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
        >
          <Label className="block mb-3">Property Types*</Label>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
            {propertyTypeOptions.map((option) => (
              <div key={option.id} className="flex items-center space-x-2">
                <Controller
                  name="propertyTypes"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      id={option.id}
                      checked={
                        field.value?.includes(
                          option.id as ReportPropertyType
                        ) || false
                      }
                      onCheckedChange={(checked) => {
                        const newValue = checked
                          ? [...(field.value || []), option.id]
                          : field.value?.filter((v) => v !== option.id) || [];
                        field.onChange(newValue);
                      }}
                    />
                  )}
                />
                <Label htmlFor={option.id} className="text-sm font-medium">
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
          {errors.propertyTypes && (
            <p className="mt-1 text-sm text-red-600">
              {errors.propertyTypes.message}
            </p>
          )}
        </motion.div>

        {/* Detailed Information Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.7 }}
        >
          <Label htmlFor="description">Description*</Label>
          <Textarea
            id="description"
            rows={3}
            {...register("description")}
            placeholder="Brief overview of the individual"
            className={errors.description ? "border-red-500" : ""}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">
              {errors.description.message}
            </p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.8 }}
        >
          <Label htmlFor="propertyDetails">Property Details*</Label>
          <Textarea
            id="propertyDetails"
            rows={5}
            {...register("propertyDetails")}
            placeholder="Detailed information about properties owned"
            className={errors.propertyDetails ? "border-red-500" : ""}
          />
          {errors.propertyDetails && (
            <p className="mt-1 text-sm text-red-600">
              {errors.propertyDetails.message}
            </p>
          )}
        </motion.div>

        {/* Additional Information Section */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.9 }}
          >
            <Label htmlFor="confidenceScore">Confidence Score (%)</Label>
            <Input
              id="confidenceScore"
              type="number"
              min={0}
              max={100}
              {...register("confidenceScore", { valueAsNumber: true })}
              className={errors.confidenceScore ? "border-red-500" : ""}
            />
            {errors.confidenceScore && (
              <p className="mt-1 text-sm text-red-600">
                {errors.confidenceScore.message}
              </p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 1.0 }}
          >
            <Label htmlFor="lastContactDate">Last Contact Date</Label>
            <Input
              id="lastContactDate"
              type="date"
              {...register("lastContactDate")}
              className={errors.lastContactDate ? "border-red-500" : ""}
            />
            {errors.lastContactDate && (
              <p className="mt-1 text-sm text-red-600">
                {errors.lastContactDate.message}
              </p>
            )}
          </motion.div>
        </div>

        {/* Form Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 1.1 }}
          className="flex justify-end pt-6 space-x-4"
        >
          <Button type="button" variant="outline" className="px-6 py-2">
            Cancel
          </Button>
          <Button
            type="submit"
            className="px-6 py-2 text-white bg-primary-gradient hover:shadow-lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <LoaderCircle size={20} className="spinner" />
                Creating report...
              </span>
            ) : (
              "Submit Report"
            )}
          </Button>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default CreateReportForm;