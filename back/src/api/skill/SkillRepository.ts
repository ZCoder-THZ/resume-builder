import dbConnection from '@/common/dbConnection';
// import { ResumeWithUser } from './resumeModel';
import { Skill } from './skillModel';

export class SkillRepository {
  async findAllAsync(): Promise<Skill[]> {
    try {
      const [rows] = await dbConnection
        .promise()
        .query<Skill[]>(`SELECT * FROM skills limit 5`);

      console.log(rows, 'from repository');
      return rows as Skill[];
    } catch (error) {
      throw new Error(`Error fetching resumes: ${error}`);
    }
  }

  async findBySearchAsync(keyword: string): Promise<Skill[]> {
    try {
      const [rows] = await dbConnection
        .promise()
        .query<Skill[]>(
          `SELECT * FROM skills WHERE skill_name LIKE ? LIMIT 5`,
          [`%${keyword}%`]
        );
      console.log(rows, 'from repository');
      return rows;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error fetching skills: ${error.message}`);
      }

      throw new Error(`Unknown error occurred while fetching skills`);
    }
  }
}
