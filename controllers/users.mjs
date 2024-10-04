import { userDB } from '../model/userAuth.mjs'
import { SaltRounds } from '../config/config.mjs'
import { validateUser } from '../schemas/userSchema.mjs'

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

    res.status(201).json({ message: 'User registered successfully', userId: result })
  }

  static async login (req, res) {
    const { email, password } = req.body
    console.log(email, password)
  }
}
