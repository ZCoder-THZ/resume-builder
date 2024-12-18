import { openAPIRouter } from '@/api-docs/openAPIRouter';
import { healthCheckRouter } from '@/api/healthCheck/healthCheckRouter';
import { userRouter } from '@/api/user/userRouter';
import errorHandler from '@/common/middleware/errorHandler';
import rateLimiter from '@/common/middleware/rateLimiter';
import requestLogger from '@/common/middleware/requestLogger';
import { env } from '@/common/utils/envConfig';
import cors from 'cors';
import express, { response, type Express } from 'express';
import helmet from 'helmet';
import { pino } from 'pino';
import { issueRouter } from './api/issue/issueRoute';
import { resumeRouter } from './api/resume/resumeRoute';
import { skillRouter } from './api/skill/skillRoute';
import { gptRouter } from './api/ai/aiRoute';
const logger = pino({ name: 'server start' });
const app: Express = express();

// Set the application to trust the reverse proxy
app.set('trust proxy', true);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.options('*', cors()); // Enable preflight requests for all routes
app.use(cors());
// app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(helmet());
app.use(rateLimiter);

// Request logging
app.use(requestLogger);

//
app.use((req, res, next) => {
  console.log('Incoming request:', req.method, req.url, req.body);
  next();
});
// Routes
app.use('/health-check', healthCheckRouter);
app.use('/users', userRouter);
app.use('/issues', issueRouter);
app.use('/resumes', resumeRouter);
app.use('/skills', skillRouter);
app.use('/ai', gptRouter);
// Swagger UI
app.use(openAPIRouter);

// Error handlers
app.use(errorHandler());

export { app, logger };
