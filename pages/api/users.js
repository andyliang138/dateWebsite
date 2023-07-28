import mysql from 'mysql2/promise';
import {uploadFile} from './cloudStorageImage'
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '136827',
  database: 'FEED',
  connectionLimit: 10,
});

export default async function handler(req, res) {

  if (req.method === 'GET') {
    try {
      // Perform SELECT query to retrieve data from the 'feed' table
      const [rows] = await pool.execute('SELECT * FROM feed');
      res.status(200).json(rows);
    } catch (error) {
      console.error('Error fetching data:', error.message);
      res.status(500).json({ message: 'Internal Server Error' });
    }

  } else if (req.method === 'POST') {
  const { id, name, content, image } = req.body;

  // Replace undefined values with null
  if (typeof content === 'undefined' || content === null || content === "") {
    res.status(401).json({ message: 'Your post cannot be blank' });
    return; // Return early to prevent further execution
  }

  let url = null; // Define the url variable outside the try-catch block

  
  const values = [id !== undefined ? id : null, name !== undefined ? name : null, content !== undefined ? content : null, image !== undefined ? url : null];

  try {
    // Process user data from req.body and insert it into the 'feed' table
    await pool.execute('INSERT INTO feed (id, name, content, image) VALUES (?, ?, ?, ?)', values);
    res.status(201).json({ message: 'Feed created successfully' });
  } catch (error) {
    console.error('Error creating new feed:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
} else {
  res.status(405).json({ message: 'Method Not Allowed' });
} }
