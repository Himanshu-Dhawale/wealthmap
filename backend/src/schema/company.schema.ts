import { z } from 'zod'

export const UpdateCompanyProfileSchema = z.object({
  name: z.string().min(1).optional(),
  size: z.string().optional(),
  location: z.string().optional(),
  logoUrl: z.string().url().optional(),
  preferences: z.any().optional()
})
