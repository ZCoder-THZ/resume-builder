import dbConnection from '@/common/dbConnection';
import { ResumeWithUser, ResumeSchema } from './resumeModel';
import { ResultSetHeader } from 'mysql2';
import { z } from 'zod';
import { Skill } from '../skill/skillModel';

export class ResumeRepository {
  async findAllAsync(): Promise<ResumeWithUser[]> {
    try {
      const [rows] = await dbConnection
        .promise()
        .query<ResumeWithUser[]>(`SELECT * from resumes`);
      console.log(rows, 'from repository');
      return rows;
    } catch (error) {
      throw new Error(`Error fetching resumes: ${error}`);
    }
  }

  // Find a resume by ID
  async findByIdAsync(id: string): Promise<ResumeWithUser[]> {
    try {
      const [rows] = await dbConnection
        .promise()
        .query<ResumeWithUser[]>('SELECT * FROM resumes WHERE id = ?', [id]);
      console.log(rows);
      return rows;
    } catch (error) {
      throw new Error(`Error fetching user with ID ${id}: ${error}`);
    }
  }
  createAsync = async (body: any) => {
    try {
      const {
        personalInfo,
        github,
        facebook,
        linkedin,
        twitter,
        skills,
        education,
        experience,
      } = body;

      const { name, email, phone, address, portfolio, summary } = personalInfo;
      const result = ResumeSchema.safeParse(body);

      if (!result.success) {
        console.error('Validation failed:', result.error.errors);

        if (result.error as Error) {
          return {
            error: result.error,
          };
        }
      }

      // Access validated data
      const parsedData = result.data;
      console.log('Validation successful:', parsedData);

      // Insert personal info
      const [personalInfoResult] = await dbConnection
        .promise()
        .query<ResultSetHeader>(
          `INSERT INTO resumes (name, email, phone, address, portfolio, summary) VALUES (?, ?, ?, ?, ?, ?)`,
          [name, email, phone, address, portfolio, summary]
        );

      const resumeId = personalInfoResult.insertId;

      // Insert social links
      const socialLinks = { github, facebook, linkedin, twitter };
      const socialLinkData = Object.entries(socialLinks)
        .filter(([_, url]) => url)
        .map(([platform, url]) => [resumeId, platform, url]);

      if (socialLinkData.length) {
        await dbConnection
          .promise()
          .query(
            `INSERT INTO social_links (resume_id, platform_name, url) VALUES ?`,
            [socialLinkData]
          );
      }
      console.log(education, 'education');

      for (const exp of experience) {
        const {
          jobTitle: rawJobTitle, // Map potential inconsistent case
          JobTitle: rawJobTitleAlt, // Handle alternative casing
          companyName,
          description,
          location,
          startDate,
          endDate,
          expSkills = [],
          expTools = [],
        } = exp;

        // Choose the correct key for jobTitle
        const jobTitle = rawJobTitle || rawJobTitleAlt;

        if (!jobTitle) {
          throw new Error('Job title is required for all experience entries');
        }

        // Insert main experience record
        const [experienceResult] = await dbConnection
          .promise()
          .query<ResultSetHeader>(
            `
      INSERT INTO experience (resume_id, job_title, company_name, description, location, start_date, end_date)
      VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
            [
              resumeId,
              jobTitle,
              companyName,
              description,
              location,
              startDate,
              endDate,
            ]
          );

        const experienceId = experienceResult.insertId;

        // Insert skills and tools if provided
        if (expSkills.length > 0) {
          const skillValues = expSkills.map((skillId: number) => [
            experienceId,
            skillId,
          ]);
          await dbConnection
            .promise()
            .query(
              `INSERT INTO experience_skills (exp_id, skill_id) VALUES ?`,
              [skillValues]
            );
        }

        if (expTools.length > 0) {
          const toolValues = expTools.map((toolId: number) => [
            experienceId,
            toolId,
          ]);
          await dbConnection
            .promise()
            .query(`INSERT INTO experience_tools (exp_id, tool_id) VALUES ?`, [
              toolValues,
            ]);
        }
      }
      for (const edu of education) {
        const educationData = education
          .filter(
            (edu: any) =>
              edu.institution &&
              edu.degree &&
              edu.fieldOfStudy &&
              edu.location &&
              edu.startYear &&
              edu.endYear
          )
          .map((edu: any) => [
            resumeId,
            edu.institution,
            edu.degree,
            edu.fieldOfStudy,
            edu.location,
            edu.startYear,
            edu.endYear,
          ]);

        if (educationData.length) {
          try {
            const [result] = await dbConnection
              .promise()
              .query<ResultSetHeader>(
                `
              INSERT INTO education (resume_id, institution, degree, field_of_study, location, start_date, end_date)
              VALUES ?
              `,
                [educationData]
              );
            console.log('Batch insert successful:', result);
          } catch (error) {
            console.error('Error during batch insert:', error);
            throw new Error('Failed to insert education data');
          }
        } else {
          console.error('No valid education data to insert');
        }
      }
      const skillData = skills.map((skill: Skill) => [resumeId, skill.id]);
      for (const skill of skills) {
        if (!skill.id) {
          console.error('Skill ID is missing:', skill);
          continue;
        }
        skillData.push([resumeId, skill.id]);
      }

      if (skillData.length > 0) {
        try {
          const [result] = await dbConnection
            .promise()
            .query<ResultSetHeader>(
              `INSERT INTO resume_skills (resume_id, skill_id) VALUES ?`,
              [skillData]
            );
          console.log('Skills batch insert successful:', result);
        } catch (error) {
          console.error('Error during skills batch insert:', error);
          throw new Error('Failed to insert skills data');
        }
      } else {
        console.error('No valid skills data to insert');
      }

      return { personalInfoResult };
    } catch (error) {
      console.error('Error inserting data:', error);
      throw new Error('Failed to insert data');
    }
  };
}
