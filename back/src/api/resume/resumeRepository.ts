import dbConnection from '@/common/dbConnection';
import { ResumeWithUser } from './resumeModel';
import { ResultSetHeader } from 'mysql2';
export class ResumeRepository {
  // Find all resumes with associated user details
  async findAllAsync(): Promise<ResumeWithUser[]> {
    try {
      const [rows] = await dbConnection.promise().query<ResumeWithUser[]>(
        `SELECT resumes.*, users.name, users.email, users.phone, users.address
         FROM resumes
         LEFT JOIN users ON resumes.user_id = users.id;`
      );
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
        experience,
      } = body;

      const { name, email, phone, address, portfolio, summary } = personalInfo;

      if (!name || !email || !phone || !address || !portfolio || !summary) {
        throw new Error('Missing required fields');
      }

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
      console.log(experience);
      // Process experience array
      // Normalize keys to avoid case-sensitivity issues
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

      return { personalInfoResult };
    } catch (error) {
      console.error('Error inserting data:', error);
      throw new Error('Failed to insert data');
    }
  };
}
