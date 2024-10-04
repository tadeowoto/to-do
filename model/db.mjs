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
    const result = await connection.query('SELECT * FROM task WHERE user_id = ?', [userId])
    return result
  }

  static async createTask () {}
  static async updateTask () {}
  static async deleteTask () {}
}
