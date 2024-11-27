import { RowDataPacket } from 'mysql2';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';
import { commonValidations } from '@/common/utils/commonValidation';

extendZodWithOpenApi(z);

// Define the types for the input data
export type Resume = z.infer<typeof ResumeSchema>;
export type ResumeWithUser = z.infer<typeof ResumeWithUserSchema> &
  RowDataPacket;

// Resume schema for the base resume data
export const ResumeSchema = z.object({
  personalInfo: z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string(),
    address: z.string(),
    portfolio: z.string(), // Valid URL
    summary: z.string(),
  }),
  education: z.array(
    z.object({
      institution: z.string(),
      degree: z.string(),
      fieldOfStudy: z.string(),
      location: z.string(),
      startYear: z.string(), // Consider making this a date if possible
      endYear: z.string(),
    })
  ),
  experience: z.array(
    z.object({
      jobTitle: z.string().or(z.literal(undefined)), // Accept `JobTitle` case mismatch
      companyName: z.string(),
      description: z.string(),
      location: z.string(),
      startDate: z.string(),
      endDate: z.string(),
      expSkills: z.array(z.number()).optional(),
      expTools: z.array(z.number()).optional(),
    })
  ),
  // skills: z.array(z.object({ value: z.number() })),
  github: z.string().url().optional(),
  linkedin: z.string().url().optional(),
  facebook: z.string().url().optional(),
  twitter: z.string().url().optional(),
});

// Extend the Resume schema with user-specific data
export const ResumeWithUserSchema = ResumeSchema.extend({
  userName: z.string(),
  userEmail: z.string().email(),
  userPhone: z.string(),
  userAddress: z.string(),
});

// Input validation schema for endpoints like 'GET users/:id'
export const GetResumeSchema = z.object({
  params: z.object({
    id: commonValidations.id, // Assuming `commonValidations.id` handles numeric validation
  }),
});
