import { describe, it, expect, beforeEach, jest } from "@jest/globals";
import mapPerson from "../src/person.js";

describe('Person Test Suite', () => {
  describe('happy path', () => {

    it('should map person', () => {
      const personString = '{"name":"joaomacaoli","age":36}'
      const personObject = mapPerson(personString)

      expect(personObject).toEqual({
        name: 'joaomacaoli',
        age: 36,
        createdAt: expect.any(Date)
      })
    })
  })

  describe('what coverage doesnt tell you', () => {

    it('should not map person given invalid JSON String', () => {
      const personString = '{"name"'

      expect(() => mapPerson(personString))
      .toThrow('Unexpected end of JSON input')
    })

    it('should not map person given invalid JSON data', () => {
      const personString = '{}'
      const personObject = mapPerson(personString)

      expect(personObject).toEqual({
        name: undefined,
        age: undefined,
        createdAt: expect.any(Date)
      })
    })

  })
})
