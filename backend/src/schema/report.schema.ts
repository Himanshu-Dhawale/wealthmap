import { z } from 'zod';

export const ReportSchema = z.object({
	fullName: z.string(),
	estimatedNetWorth: z.number().min(800_000_000),
	primaryLocation: z.string(),
	contactEmail: z.string().email(),
	primaryIndustry: z.string(),
	sourceOfWealth: z.string(),
	propertyTypes: z.array(z.string()),
	description: z.string(),
	propertyDetails: z.string(),
	confidenceScore: z.number().min(0).max(100),
	lastContactDate: z.string().optional(),
});
