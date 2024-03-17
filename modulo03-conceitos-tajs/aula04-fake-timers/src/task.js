export default class Task {
  #tasks = new Set()
  save({ name, dueAt, fn }) {
    console.log(
      `Task [${name}] saved and will be executed at ${dueAt.toISOString()}`
    )
    this.#tasks.add({ name, dueAt, fn })
  }
  run(everyMilisecond) {
    const intervalId = setInterval(() => {

      if(this.#tasks.size === 0) {
        console.log('tasks finished!')
        clearInterval(intervalId)
        return
      }

      const now = new Date()

      for (const task of this.#tasks) {
        if (task.dueAt <= now) {
          task.fn()
          this.#tasks.delete(task)
        }
      }
    }, everyMilisecond)
  }
}
