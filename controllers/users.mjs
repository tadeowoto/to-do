import { userDB } from '../model/userAuth.mjs'
import { SaltRounds } from '../config/config.mjs'
import { userSchema } from '../schemas/userSchema.mjs'

import bcrypt from 'bcrypt'
import crypto from 'crypto'

export class userController {
  static async register (req, res) {
    const { username, password } = req.body

    const validación = userSchema.safeParse({ username, password })
    if (!validación.success) {
      return res.status(400).send({ error: 'User data is not valid' })
    }

    const userExists = await userDB.findUserbyUsername(username)
    if (userExists) {
      res.status(400).send({ error: 'User already exists' })
    }

    const id = crypto.randomUUID()

    const hashedPassword = await bcrypt.hash(password, SaltRounds)

    const result = await userDB.registerUser(id, username, hashedPassword)

    res.send(result)
  }

  static async login (req, res) {
    const { email, password } = req.body
    console.log(email, password)
  }
}
