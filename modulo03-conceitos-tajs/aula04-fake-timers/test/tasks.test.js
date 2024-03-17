import { describe, it, expect, beforeEach, jest } from "@jest/globals";
import Task from "../src/task.js";
import { setTimeout } from "node:timers/promises";

describe('Task Test Suite', () => {
  let _logMock
  let _task
  beforeEach(() => {
    _logMock = jest.spyOn(
      console,
      console.log.name
    ).mockImplementation()

    _task = new Task()
  })

  it.skip('shoul only run tasks that are due without fake timers (slow)', async () => {
    // AAA = Arrange, Act, Assert

    // Arrange
    const tasks = [
      {
        name: 'Task-Will-Run-In5-Secons',
        dueAt: new Date(Date.now() + 5_000), // numeric separator 5_000 = 5000
        fn: jest.fn()
      },
      {
        name: 'Task-Will-Run-In5-Secons',
        dueAt: new Date(Date.now() + 10_000), // numeric separator 10_000 = 10000
        fn: jest.fn()
      }
    ]

    // Act
    _task.save(tasks.at(0))
    _task.save(tasks.at(1))

    _task.run(200) //200ms

    await setTimeout(11e3) // 11_000

    expect(tasks.at(0).fn).toHaveBeenCalled()
    expect(tasks.at(1).fn).toHaveBeenCalled()

  },
  // configurar para o jest aguardar 15 segundos
  15e3
  )

  it('shoul only run tasks that are due with fake timers (fast)', async () => {
    jest.useFakeTimers()
    // AAA = Arrange, Act, Assert

    // Arrange
    const tasks = [
      {
        name: 'Task-Will-Run-In5-Secons',
        dueAt: new Date(Date.now() + 5_000), // numeric separator 5_000 = 5000
        fn: jest.fn()
      },
      {
        name: 'Task-Will-Run-In5-Secons',
        dueAt: new Date(Date.now() + 10_000), // numeric separator 10_000 = 10000
        fn: jest.fn()
      }
    ]

    // Act
    _task.save(tasks.at(0))
    _task.save(tasks.at(1))

    _task.run(200) //200ms

    // Assert
    jest.advanceTimersByTime(4_000)

    // ninguém deve ser executado ainda!
    expect(tasks.at(0).fn).not.toHaveBeenCalled()
    expect(tasks.at(1).fn).not.toHaveBeenCalled()

    jest.advanceTimersByTime(2_000)

    // 4s+2s=6s somente a primeira tarefa deve executar
    expect(tasks.at(0).fn).toHaveBeenCalled()
    expect(tasks.at(1).fn).not.toHaveBeenCalled()

    jest.advanceTimersByTime(4_000)

    // 4s+2s+4s=10s somente a segunda tarefa deve executar
    expect(tasks.at(1).fn).toHaveBeenCalled()

    jest.useRealTimers()
  })
})
