import { Router } from 'express'
import { TasksController } from '../controllers/tasks.mjs'
const TaskRouter = Router()

TaskRouter.get('/', TasksController.getUserAllTasks)

export { TaskRouter }
