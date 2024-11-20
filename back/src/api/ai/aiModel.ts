import { z } from 'zod';

export const chatGPTRequestSchema = z.object({
  jobTitle: z.string().min(1, 'Job title is required.'),
  company_name: z.string().min(1, 'Company name is required.'),
  location: z.string().optional(),
  tools: z
    .array(z.string())
    .min(1, 'At least one tool/technology is required.'),
  teamRole: z.string().optional(),
  experience: z.string().min(1, 'Experience description is required.'),
  skills: z.array(z.string()).min(1, 'At least one skill is required.'), // Changed from `z.string()` to `z.array(z.string())`
  // startDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
  //   message: 'Invalid start date.',
  // }),
  // endDate: z
  //   .string()
  //   .optional()
  //   .refine((val) => !val || !isNaN(Date.parse(val)), {
  //     message: 'Invalid end date.',
  //   }),
});
