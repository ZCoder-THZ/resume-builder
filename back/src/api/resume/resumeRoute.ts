import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { resumeController } from './resumeController';
import express, { type Router } from 'express';

export const resumeRegistry = new OpenAPIRegistry();

export const resumeRouter: Router = express.Router();

resumeRouter.get('/', resumeController.getResumes);
resumeRouter.post('/', resumeController.createResume);

resumeRouter.get('/:id', resumeController.getResumeById);
