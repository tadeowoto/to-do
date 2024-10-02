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
export class DB {
  static async getTasks ({ userId }) {
    const result = await connection.query('SELECT * FROM tasks WHERE userId = ?', [userId])
    console.log(result)
  }

  static async createTask () {}
  static async updateTask () {}
  static async deleteTask () {}
}
