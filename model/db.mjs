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
export class tasksDB {
  static async getTasksByUserId ({ userId }) {
    // const result = await connection.query('SELECT * FROM task WHERE user_id = ?', [userId])
    const userIdHex = Buffer.from(userId.data).toString('hex')
    const result = await connection.query('SELECT * FROM task WHERE user_id = UNHEX(?)', [userIdHex])
    return [result]
  }

  static async createTask () {}
  static async updateTask () {}
  static async deleteTask () {}
}
