import { RowDataPacket } from 'mysql2';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';
import { commonValidations } from '@/common/utils/commonValidation';

extendZodWithOpenApi(z);

export type Resume = z.infer<typeof ResumeSchema>;
export type ResumeWithUser = z.infer<typeof ResumeWithUserSchema> &
  RowDataPacket;

export const ResumeSchema = z.object({
  id: z.number(),
  user_id: z.number(),
  title: z.string(),
  summary: z.string(),
  createdAt: z.string(),
  updatedAt: z.date(),
});

export const ResumeWithUserSchema = ResumeSchema.extend({
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  address: z.string(),
});

// Input Validation for 'GET users/:id' endpoint
export const GetResumeSchema = z.object({
  params: z.object({ id: commonValidations.id }),
});
