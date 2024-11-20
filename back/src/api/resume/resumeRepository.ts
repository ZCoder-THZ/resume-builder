import dbConnection from '@/common/dbConnection';
import { ResumeWithUser } from './resumeModel';

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
}
