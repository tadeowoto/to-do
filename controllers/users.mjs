import { userDB } from '../model/userAuth.mjs'
import { SaltRounds, SECRET_KEY } from '../config/config.mjs'
import { validateUser } from '../schemas/userSchema.mjs'
import jwt from 'jsonwebtoken'

import bcrypt from 'bcrypt'
import crypto from 'crypto'

export class userController {
  static async register (req, res) {
    console.log(req.body)
    const { username, password } = req.body

    const validación = validateUser({ username, password })
    if (validación.error) {
      return res.status(400).json({ error: JSON.parse(validación.error.message) })
    }

    const userExists = await userDB.findUserbyUsername(username)
    if (userExists) {
      res.status(400).send({ error: 'User already exists' })
    }

    // Generar UUID y convertirlo a binario
    const uuid = crypto.randomUUID()
    const id = Buffer.from(uuid.replace(/-/g, ''), 'hex') // Convertir a BINARY(16)

    const hashedPassword = await bcrypt.hash(password, SaltRounds)

    const result = await userDB.registerUser(id, username, hashedPassword)
    console.log(result)
    res.redirect('/')
  }

  static async login (req, res) {
    const { username, password } = req.body
    const user = await userDB.findUserbyUsername(username)
    if (!user) {
      throw new Error('User not found')
    }

    const isValidPassword = await bcrypt.compare(password, user.password) // aca debo comparar el password
    if (!isValidPassword) {
      throw new Error('Invalid password')
    }

    const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, {
      expiresIn: '1h'
    })

    res.cookie('access_token', token, {
      httpOnly: true, // la cookie solo se puede leer por el servidor
      secure: process.env.NODE_ENV === 'production', // la cookie solo se puede ser accedida por https
      sameSite: 'strict', // la cookie solo se puede ser accedida por la misma sitio
      maxAge: 1000 * 60 * 60 // tiempo de vida de la cookie en milisegundos
    })
    res.redirect('/tasks')
  }
}
