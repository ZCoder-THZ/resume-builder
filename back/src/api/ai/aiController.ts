import type { RequestHandler, Request, Response } from 'express';
import { chatGPTRequestSchema } from './aiModel';
import axios from 'axios';

const OPENAI_API_KEY = process.env.OPENAI_KAY;
import z from 'zod';
class AiController {
  public generateJobresponsibilities: RequestHandler = async (
    req: Request,
    res: Response
  ) => {
    const {
      jobTitle,
      company_name,
      location,
      tools,
      teamRole,
      experience,
      skills,
      // startDate,
      // endDate,
    } = req.body;

    // Validate the input using Zod schema
    const validatedRequest = chatGPTRequestSchema.safeParse(req.body);

    if (!validatedRequest.success) {
      return res.status(400).json({
        error: 'Invalid request body',
        details: validatedRequest.error.message,
      });
    }

    // Prepare the messages for the ChatGPT API
    const messages = [
      {
        role: 'assistant',
        content:
          'You are an HR recruiter who writes professional summaries based on user-provided information about their job title, company name, location, tools, team role, experience, and skills.',
      },
      {
        role: 'user',
        content: `Here is the information about the user:
            - Job Title: ${validatedRequest.data.jobTitle}
            - Company Name: ${validatedRequest.data.company_name}
            - Tools/Technologies: ${validatedRequest.data.tools.join(', ')}
            - Team Role: ${validatedRequest.data.teamRole}
            - Experience: ${validatedRequest.data.experience}
            - Skills: ${validatedRequest.data.skills}.
          Please write a concise, key and responsibilities for this candidate, highlighting key achievements, tools used, and their contributions.`,
      },
    ];

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${OPENAI_API_KEY}`,
          },
        }
      );

      res.status(200).json(response.data.choices[0].message.content);
    } catch (error) {
      if (error as Error) {
        console.error('Error communicating with OpenAI API:', error.message);
        return res.status(500).json({
          error: 'Failed to communicate with OpenAI API',
          details: error.message,
        });
      }
    }
  };
}

export const aiController = new AiController();
