import { createApiResponse } from '@/api-docs/openAPIResponseBuilders';
import dbConnection from '@/common/dbConnection';
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { type Router } from 'express';
import { z } from 'zod';
import { GetIssuesSchema, IssueSchema } from './issueModel';

export const issueRgistry = new OpenAPIRegistry();
export const issueRouter = express.Router();
issueRgistry.register('Issue', IssueSchema);

issueRouter.get('/', (req, res) => {
  dbConnection.query('SELECT * FROM issues', (err, results) => {
    if (err) {
      console.error('Database query error:', err); // Logs the error for debugging
      return res.status(500).json({
        message: 'An error occurred while fetching issues.',
        error: err.message,
      });
    }

    // Respond with the query results if successful
    res.json({
      issues: results,
    });
  });
});

issueRgistry.registerPath({
  method: 'get',
  path: '/issues',
  tags: ['Issues'],
  responses: createApiResponse(z.array(IssueSchema), 'Success'),
});
