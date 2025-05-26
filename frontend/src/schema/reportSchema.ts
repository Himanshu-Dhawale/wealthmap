import { z } from "zod";

const financialSchema = z.union([
  z.number().min(800_000_000).max(999_999_999_999), 
  z.string()
    .min(1)
    .transform((val) => parseFloat(val.replace(/[$,]/g, '')))
    .refine((val) => val >= 800_000_000 && val <= 999_999_999_999, {
      message: "Value must be between $800M and $999B"
    })
]);

export const reportSchema = z.object({
  name: z.string().min(1, "Name is required")
    .max(100, "Name too long"),
    
  estimatedNetWorth: financialSchema
    .describe("Estimated net worth in USD (800M - 999B range)"),

  location: z.string().min(1, "Location is required")
    .max(200, "Location too long"),

  contact: z.string().min(1, "Contact is required")
    .email("Invalid email format"),

  description: z.string().min(10, "Description too short (min 10 chars)")
    .max(1000, "Description too long (max 1000 chars)"),

  propertyDetails: z.string().min(20, "Provide detailed property info")
    .max(5000, "Maximum length exceeded"),

  propertyTypes: z.array(
    z.enum([
      "LUXURY_HOME",
      "COMMERCIAL",
      "VACATION",
      "INVESTMENT",
      "SPECIAL_USE"
    ])
  ).min(1, "Select at least one property type"),

  lastContactDate: z.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Use YYYY-MM-DD format")
    .optional(),

  confidenceScore: z.number()
    .min(0, "Minimum 0% confidence")
    .max(100, "Maximum 100% confidence")
    .int("Must be whole percentage")
    .optional(),

  primaryIndustry: z.string()
    .min(1, "Industry required")
    .max(100, "Industry too long"),

  knownAssets: z.array(
    z.object({
      type: z.string().min(1),
      value: financialSchema,
      location: z.string().min(1)
    })
  ).optional(),

  wealthSource: z.enum([
    "INHERITANCE",
    "ENTREPRENEURSHIP",
    "INVESTMENTS",
    "TECH",
    "REAL_ESTATE",
    "OTHER"
  ])
});