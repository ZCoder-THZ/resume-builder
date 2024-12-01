import type { Request, Response, RequestHandler } from 'express';
import dbConnection from '@/common/dbConnection';
import ResumeService from './resumeService';
import * as path from 'path';

import ejs from 'ejs';
import puppeteer from 'puppeteer';
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
    if (serviceResponse.error) {
      return res.json({ error: serviceResponse.error });
    }
    return res.json({
      data: serviceResponse,
      status: 'success',
    });
  };

  downloadResume = async (req: Request, res: Response) => {
    try {
      // Log start of the process
      const id = req.params.id;
      console.log('Downloading resume for ID:', id);

      // Launch Puppeteer
      console.log('Launching Puppeteer...');
      const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'], // For minimal environments
      });

      // Fetch resume data for the given ID from the database
      const [rows] = await dbConnection.promise().query(
        `SELECT name, email, phone, address, portfolio FROM resumes WHERE id = ?`,
        [id] // Use parameterized query for safety
      );

      if (rows.length === 0) {
        throw new Error(`Resume with ID ${id} not found.`);
      }

      // Log fetched data
      console.log(rows);

      const resumeData = rows[0]; // Since we're fetching a single record, use the first row

      // Log Puppeteer launch success
      console.log('Puppeteer launched successfully');

      // Path to the EJS template
      const templatePath = path.join(
        __dirname,
        '../../templates/',
        'resume.ejs'
      );

      // Render the EJS template with provided data
      console.log('Rendering EJS template...');
      const htmlContent = await ejs.renderFile(templatePath, {
        name: resumeData.name,
        email: resumeData.email,
        phone: resumeData.phone,
        address: resumeData.address,
        portfolio: resumeData.portfolio,
      });

      console.log('EJS template rendered successfully');

      // Set the HTML content for Puppeteer
      console.log('Setting HTML content in Puppeteer...');
      const page = await browser.newPage();
      await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

      // Generate the PDF
      console.log('Generating PDF...');
      const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true,
      });

      // Close the Puppeteer browser
      console.log('Closing Puppeteer browser...');
      await browser.close();

      // Send the generated PDF as a response
      console.log('PDF Buffer Length:', pdfBuffer.length);

      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="resume.pdf"',
      });

      res.end(pdfBuffer);
      console.log('PDF sent successfully');
    } catch (error) {
      if (error instanceof Error) {
        res
          .status(500)
          .send(
            'Failed to generate resume PDF. Please try again later.' +
              error.message
          );
      }
    } // Send error response
  };
}
export const resumeController = new ResumeController();
