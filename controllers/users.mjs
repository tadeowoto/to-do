export class userController {
  static async register (req, res) {
    const { email, password } = req.body
    console.log(email, password)
  }

  static async login (req, res) {
    const { email, password } = req.body
    console.log(email, password)
  }
}
