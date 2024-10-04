import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../config/config.mjs'
import { tasksDB } from '../model/db.mjs'

export class TasksController {
  static async getUserAllTasks (req, res) {
    const token = req.cookies.access_token
    if (!token) {
      return res.status(401).send({ error: 'Unauthorized' }).res.redirect('/')
    }

    try {
      const data = jwt.verify(token, SECRET_KEY)
      const userId = data.id
      const tasks = await tasksDB.getTasksByUserId({ userId })
      if (!tasks) {
        res.render('tasks', { tasks: [] })
      }
      res.render('tasks', { tasks })
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return res.status(401).send({ error: 'Token expired' })
      }
      return res.status(401).send({ error: 'Invalid token' })
    }
  }
}
