export class TasksController {
  static async getTasks (req, res) {
    const { userId } = req.params
    console.log(userId)
  }
}
