import { userAuth } from '../model/user-auth.mjs'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import { SaltRounds } from '../config/config.mjs'

export class userController {
  static async register (req, res) {
    const { username, password } = req.body
    const userExists = await userAuth.findUserbyUsername(username)

    if (userExists) {
      res.status(400).send({ error: 'User already exists' })
    }

    const id = crypto.randomUUID()

    const hashedPassword = await bcrypt.hash(password, SaltRounds)

    const result = await userAuth.registerUser(id, username, hashedPassword)

    res.send(result)
  }

  static async login (req, res) {
    const { email, password } = req.body
    console.log(email, password)
  }
}
