// "use client";
// import { motion } from "framer-motion";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { reportSchema } from "@/schema/reportSchema";
// import {  ReportFormData } from "@/types/types";
// import { Button } from "@/components/ui/button";

// const CreateReportForm = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//   } = useForm<ReportFormData>({ resolver: zodResolver(reportSchema) });

//   const onSubmit = async (data: ReportFormData) => {
//     try {
//       // Handle report submission
//       console.log("Report data:", data);
//       // Add your API call here
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.3 }}
//       className="w-full max-w-2xl mx-auto"
//     >
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <motion.div
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.4 }}
//           >
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Name
//             </label>
//             <input
//               type="text"
//               className={`w-full px-4 py-2 rounded-lg border ${
//                 errors.name ? "border-red-500" : "border-gray-300"
//               } focus:ring-blue-500 focus:border-blue-500`}
//               {...register("name")}
//             />
//             {errors.name && (
//               <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
//             )}
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.4, delay: 0.1 }}
//           >
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Estimated Net Worth
//             </label>
//             <input
//               type="text"
//               className={`w-full px-4 py-2 rounded-lg border ${
//                 errors.estimatedNetWorth ? "border-red-500" : "border-gray-300"
//               } focus:ring-blue-500 focus:border-blue-500`}
//               {...register("estimatedNetWorth")}
//             />
//             {errors.estimatedNetWorth && (
//               <p className="mt-1 text-sm text-red-600">
//                 {errors.estimatedNetWorth.message}
//               </p>
//             )}
//           </motion.div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <motion.div
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.4, delay: 0.2 }}
//           >
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Location
//             </label>
//             <input
//               type="text"
//               className={`w-full px-4 py-2 rounded-lg border ${
//                 errors.location ? "border-red-500" : "border-gray-300"
//               } focus:ring-blue-500 focus:border-blue-500`}
//               {...register("location")}
//             />
//             {errors.location && (
//               <p className="mt-1 text-sm text-red-600">
//                 {errors.location.message}
//               </p>
//             )}
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.4, delay: 0.3 }}
//           >
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Contact
//             </label>
//             <input
//               type="text"
//               className={`w-full px-4 py-2 rounded-lg border ${
//                 errors.contact ? "border-red-500" : "border-gray-300"
//               } focus:ring-blue-500 focus:border-blue-500`}
//               {...register("contact")}
//             />
//             {errors.contact && (
//               <p className="mt-1 text-sm text-red-600">
//                 {errors.contact.message}
//               </p>
//             )}
//           </motion.div>
//         </div>

//         <motion.div
//           initial={{ opacity: 0, x: -20 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.4, delay: 0.4 }}
//         >
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Description
//           </label>
//           <input
//             type="text"
//             className={`w-full px-4 py-2 rounded-lg border ${
//               errors.description ? "border-red-500" : "border-gray-300"
//             } focus:ring-blue-500 focus:border-blue-500`}
//             {...register("description")}
//           />
//           {errors.description && (
//             <p className="mt-1 text-sm text-red-600">
//               {errors.description.message}
//             </p>
//           )}
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, x: -20 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.4, delay: 0.5 }}
//         >
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Property Overview and Ownership Details
//           </label>
//           <textarea
//             rows={5}
//             className={`w-full px-4 py-2 rounded-lg border ${
//               errors.propertyDetails ? "border-red-500" : "border-gray-300"
//             } focus:ring-blue-500 focus:border-blue-500`}
//             {...register("propertyDetails")}
//           />
//           {errors.propertyDetails && (
//             <p className="mt-1 text-sm text-red-600">
//               {errors.propertyDetails.message}
//             </p>
//           )}
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.4, delay: 0.6 }}
//           className="flex justify-end space-x-4 pt-4"
//         >
//           <Button
//             type="button"
//             variant="outline"
//             className="px-6 py-2 border-gray-300 text-gray-700 hover:bg-gray-50"
//           >
//             Cancel
//           </Button>
//           <Button
//             type="submit"
//             className="px-6 py-2 bg-primary-gradient text-white hover:shadow-lg"
//             disabled={isSubmitting}
//           >
//             {isSubmitting ? "Submitting..." : "Submit Report"}
//           </Button>
//         </motion.div>
//       </form>
//     </motion.div>
//   );
// };

// export default CreateReportForm;



"use client";
import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { reportSchema } from "@/schema/reportSchema";
import {  ReportFormData } from "@/types/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

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

const CreateReportForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ReportFormData>({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      propertyTypes: [],
      confidenceScore: 70,
    },
  });

  const onSubmit = async (data: ReportFormData) => {
    try {
      const formattedData = {
        ...data,
        estimatedNetWorth: typeof data.estimatedNetWorth === 'string'
          ? parseFloat(data.estimatedNetWorth.replace(/[$,]/g, ''))
          : data.estimatedNetWorth
      };
      console.log("Report data:", formattedData);
      // Add your API call here
    } catch (err) {
      console.error(err);
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Label htmlFor="name">Full Name*</Label>
            <Input
              id="name"
              type="text"
              error={errors.name?.message}
              {...register("name")}
              placeholder="John Billionaire"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Label htmlFor="estimatedNetWorth">Estimated Net Worth (USD)*</Label>
            <Input
              id="estimatedNetWorth"
              type="text"
              error={errors.estimatedNetWorth?.message}
              {...register("estimatedNetWorth")}
              placeholder="$2,100,000,000"
            />
            <p className="mt-1 text-xs text-gray-500">
              Enter value between $800M - $999B
            </p>
          </motion.div>
        </div>

        {/* Contact Information Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <Label htmlFor="location">Primary Location*</Label>
            <Input
              id="location"
              type="text"
              error={errors.location?.message}
              {...register("location")}
              placeholder="New York, NY"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <Label htmlFor="contact">Contact Email*</Label>
            <Input
              id="contact"
              type="email"
              error={errors.contact?.message}
              {...register("contact")}
              placeholder="john@example.com"
            />
          </motion.div>
        </div>

        {/* Wealth Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <Label htmlFor="primaryIndustry">Primary Industry*</Label>
            <Input
              id="primaryIndustry"
              type="text"
              error={errors.primaryIndustry?.message}
              {...register("primaryIndustry")}
              placeholder="Technology"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <Label>Source of Wealth*</Label>
            <Controller
              name="wealthSource"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
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
            {errors.wealthSource && (
              <p className="mt-1 text-sm text-red-600">
                {errors.wealthSource.message}
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
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {propertyTypeOptions.map((option) => (
              <div key={option.id} className="flex items-center space-x-2">
                <Controller
                  name="propertyTypes"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      id={option.id}
                      checked={field.value?.includes(option.id) || false}
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
            error={errors.description?.message}
            {...register("description")}
            placeholder="Brief overview of the individual"
          />
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
            error={errors.propertyDetails?.message}
            {...register("propertyDetails")}
            placeholder="Detailed information about properties owned"
          />
        </motion.div>

        {/* Additional Information Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
              error={errors.confidenceScore?.message}
              {...register("confidenceScore", { valueAsNumber: true })}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 1.0 }}
          >
            <Label>Last Contact Date</Label>
            <Controller
              name="lastContactDate"
              control={control}
              render={({ field }) => (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? (
                        format(new Date(field.value), "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={(date) =>
                        field.onChange(date?.toISOString().split('T')[0])
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              )}
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
          className="flex justify-end space-x-4 pt-6"
        >
          <Button
            type="button"
            variant="outline"
            className="px-6 py-2"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="px-6 py-2 bg-primary-gradient text-white hover:shadow-lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
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