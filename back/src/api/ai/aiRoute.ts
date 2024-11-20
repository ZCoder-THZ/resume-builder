import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { Router } from 'express';
import { createApiResponse } from '@/api-docs/openAPIResponseBuilders';
import axios from 'axios';
import { chatGPTRequestSchema } from './aiModel';
import { aiController } from './aiController';

export const gptRouter: Router = express.Router();
export const gptRegistry = new OpenAPIRegistry();
import z from 'zod';
gptRouter.get('/', (req, res) => {
  res.json({
    message: 'Hello from GPT API',
  });
});

gptRouter.post('/chat', aiController.generateJobresponsibilities);

// Register OpenAPI documentation for the ChatGPT endpoint
gptRegistry.registerPath({
  method: 'post',
  path: '/chat',
  tags: ['ChatGPT'],
  request: {
    body: chatGPTRequestSchema, // Zod schema for request validation
  },
  responses: createApiResponse(
    z.object({
      id: z.string(),
      object: z.string(),
      created: z.number(),
      model: z.string(),
      choices: z.array(
        z.object({
          message: z.object({
            role: z.enum(['system', 'user', 'assistant']),
            content: z.string(),
          }),
          finish_reason: z.string(),
          index: z.number(),
        })
      ),
      usage: z.object({
        prompt_tokens: z.number(),
        completion_tokens: z.number(),
        total_tokens: z.number(),
      }),
    }),
    'ChatGPT response'
  ),
});
