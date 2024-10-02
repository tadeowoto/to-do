import express from 'express'
import { userController } from '../controllers/users.mjs'

const UserRouter = express.Router()

UserRouter.get('/', (req, res) => {
  res.render('home') // Renderiza la vista de home.pug
})

// Ruta para el registro
UserRouter.post('/register', userController.register)
// Ruta para el login
UserRouter.post('/login', userController.login)

export { UserRouter }
