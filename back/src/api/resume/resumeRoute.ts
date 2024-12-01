import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { resumeController } from './resumeController';
import express, { type Router } from 'express';
import { createApiResponse } from '@/api-docs/openAPIResponseBuilders';
import { z } from 'zod';
import { ResumeSchema } from './resumeModel';

export const resumeRegistry = new OpenAPIRegistry();
export const resumeRouter: Router = express.Router();

// Define the Zod schema for `id` as a number
const idSchema = z.number().int().positive().describe('Resume ID'); // Ensure `id` is a positive integer.

resumeRouter.get('/', resumeController.getResumes);
resumeRouter.post('/', resumeController.createResume);
resumeRouter.get('/:id/download', resumeController.downloadResume);

resumeRouter.get('/:id', resumeController.getResumeById);

// Define OpenAPI paths
resumeRegistry.registerPath({
  method: 'get',
  path: '/resumes',
  tags: ['Resumes'],
  responses: createApiResponse(z.null(), 'Success'),
});

resumeRegistry.registerPath({
  method: 'get',
  path: '/resumes/{id}',
  tags: ['Resumes'],
  request: { params: z.object({ id: idSchema }) }, // Use the number-based `idSchema` in a params object
  responses: createApiResponse(z.null(), 'Success'),
});

resumeRegistry.registerPath({
  method: 'post',
  path: '/resumes',
  description: 'Create a new resume',
  summary: 'Create Resume',
  request: {
    body: {
      content: {
        'application/json': { schema: ResumeSchema },
      },
    },
  },
  responses: {
    200: {
      description: 'Resume created successfully',
      content: {
        'application/json': {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
    },
  },
});
