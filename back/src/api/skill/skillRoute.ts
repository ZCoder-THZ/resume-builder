import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { response, type Router } from 'express';
import { createApiResponse } from '@/api-docs/openAPIResponseBuilders';

import { z } from 'zod';
export const skillRouter: Router = express.Router();
export const skillRegistry = new OpenAPIRegistry();
import { searchSkillsSchema, skillSchema } from './skillModel';
import { skillController } from './skillController';
skillRegistry.registerPath({
  method: 'get',
  path: '/skills',
  tags: ['skills list'],
  responses: createApiResponse(z.null(), 'Success'),
});
skillRegistry.registerPath({
  method: 'get',
  path: '/skills/search', // The endpoint for searching skills
  tags: ['Skill'], // API tags for grouping
  request: {
    query: searchSkillsSchema, // Validate the `keyword` query parameter
  },
  responses: createApiResponse(z.array(skillSchema), 'Success'),
});

skillRouter.get('/', skillController.getSkills);
skillRouter.get('/search', skillController.getSkillsByKeworksSearch);
