import { env } from '@/common/utils/envConfig';

import mysql from 'mysql2';

const dbConnection = mysql.createConnection({
  host: 'localhost' as string | 'mysql_db', // Use environment variable for host
  port: 3306, // Ensure port is a number
  user: 'root',
  password: 'secret',
  database: 'resume_builder',
});

dbConnection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL');
  }
});

export default dbConnection;
