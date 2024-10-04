import mysql from 'mysql2/promise'
import { DB_PORT } from '../config/config.mjs'

const config = {
  host: 'localhost',
  user: 'root',
  port: DB_PORT,
  password: '',
  database: 'tododb'
}
const connection = await mysql.createConnection(config)
export class userDB {
  static async findUserbyUsername (username) {
    const [result] = await connection.execute('SELECT * FROM user WHERE username = ?', [username])
    return result[0]
  }

  static async registerUser (id, username, hashedPassword) {
    const [result] = await connection.execute('INSERT INTO user (id, username, password) VALUES (?, ?, ?)', [id, username, hashedPassword])
    return result.insertId // esto devuelve el ID del usuario insertado
  }
}
