import mysql from 'mysql2/promise'
import { PORT } from '../config/config.mjs'

const config = {
  host: 'localhost',
  user: 'root',
  port: PORT,
  password: '',
  database: 'tododb'
}
const connection = await mysql.createConnection(config)
export class userDB {
  static async findUserbyUsername (username) {
    const [result] = await connection.execute('SELECT * FROM users WHERE username = ?', [username])
    return result[0]
  }

  static async registerUser (id, username, hashedPassword) {
    const [result] = await connection.execute('INSERT INTO user (id, username, password) VALUES (?, ?, ?)', [id, username, hashedPassword])
    return result.insertId
  }
}
