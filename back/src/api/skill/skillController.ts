import Skillservice from './skillService';
import type { Request, Response, RequestHandler } from 'express';
import dbConnection from '@/common/dbConnection';

class SkillController {
  public getSkills: RequestHandler = async (req: Request, res: Response) => {
    const serviceResponse = await new Skillservice().getAll();
    return res.json({
      data: serviceResponse,
    });
  };
  public getSkillsByKeworksSearch: RequestHandler = async (
    req: Request,
    res: Response
  ) => {
    const { keyword } = req.query;
    const serviceResponse = await new Skillservice().getSkillsByKeworksSearch(
      keyword as string
    );

    return res.json({
      data: serviceResponse,
    });
  };
}

export const skillController = new SkillController();
