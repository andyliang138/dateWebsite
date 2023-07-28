// project-root/api/users/[id].js
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '136827',
  database: 'FEED',
  connectionLimit: 10,
});


export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    const { id } = req.query;
  try{
      const [result] = await pool.execute('DELETE FROM feed WHERE id = ?', [id]);
     res.status(200).json({ message: `User with ID ${id} deleted successfully` });
  }
  catch(error)
  {
    res.status(400).json({ message: 'Comment ID not provided' });
  }
    // Perform the deletion logic using the 'id'
    // Example: Delete the user with 'id' from the database

  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
