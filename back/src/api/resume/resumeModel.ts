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
  id: z.number().optional(), // Assuming `id` might be auto-generated
  user_id: z.number(),
  title: z.string(),
  summary: z.string(),
  createdAt: z.string(),
  updatedAt: z.date(),
  personalInfo: z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string(),
    address: z.string(),
    portfolio: z.string().url(),
  }),
  education: z.array(
    z.object({
      // You can expand this schema if needed for education
      school: z.string().optional(),
      degree: z.string().optional(),
      startDate: z.string().optional(),
      endDate: z.string().optional(),
    })
  ),
  experience: z.array(
    z.object({
      name: z.string(),
      description: z.string(),
      startDate: z.string(),
      endDate: z.string(),
      title: z.string(),
      skills: z.array(z.string()),
      tools: z.array(z.string()),
    })
  ),
  skills: z.array(
    z.object({
      value: z.string(),
      label: z.string(),
      color: z.string(),
      isFixed: z.boolean().optional(),
    })
  ),
  github: z.string().url(),
  linkedin: z.string().url(),
  facebook: z.string().url(),
  twitter: z.string().url(),
});

// Extend the Resume schema with user data
export const ResumeWithUserSchema = ResumeSchema.extend({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  address: z.string(),
});

// Input Validation for 'GET users/:id' endpoint
export const GetResumeSchema = z.object({
  params: z.object({ id: commonValidations.id }),
});
