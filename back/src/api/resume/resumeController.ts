import type { Request, Response, RequestHandler } from 'express';
import dbConnection from '@/common/dbConnection';
import ResumeService from './resumeService';
class ResumeController {
  public getResumes: RequestHandler = async (req: Request, res: Response) => {
    const serviceResponse = await new ResumeService().getAll();

    return res.json({
      data: serviceResponse,
    });
  };
  public getResumeById = async (req: Request, res: Response) => {
    const serviceResponse = await new ResumeService().getById(req.params.id);
    return res.json({
      data: serviceResponse,
    });
  };
}

export const resumeController = new ResumeController();
