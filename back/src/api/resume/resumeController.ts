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
  public createResume = async (req: Request, res: Response) => {
    console.log('create reums');
    const serviceResponse = await new ResumeService().create(req.body);
    return res.json({
      data: serviceResponse,
      status: 'success',
    });
  };
}

export const resumeController = new ResumeController();
