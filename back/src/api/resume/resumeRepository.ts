import dbConnection from '@/common/dbConnection';
import type { User } from '@/api/user/userModel';

export class ResumeRepository {
  async findAllAsync(): Promise<User[]> {
    try {
      const [rows] = await dbConnection
        .promise()
        .query<any>('SELECT * FROM users');
      return rows;
    } catch (error) {
      throw new Error(`Error fetching users: ${error}`);
    }
  }
}
