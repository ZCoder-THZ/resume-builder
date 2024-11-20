import { RowDataPacket } from 'mysql2';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';
import { commonValidations } from '@/common/utils/commonValidation';

extendZodWithOpenApi(z);

export type Skill = z.infer<typeof skillSchema> & RowDataPacket;

export const skillSchema = z.object({
  id: z.number(),
  skill_name: z.string(),
});

// Input Validation for 'GET users/:id' endpoint

// Search Query Schema
export const searchSkillsSchema = z.object({
  query: z.object({
    keyword: z.string().min(1, 'Keyword must not be empty'), // Keyword is required and must not be empty
    // limit: z.number().int().positive().optional(), // Optional limit for pagination (must be a positive integer)
    // page: z.number().int().positive().optional(), // Optional page number for pagination (must be a positive integer)
  }),
});
