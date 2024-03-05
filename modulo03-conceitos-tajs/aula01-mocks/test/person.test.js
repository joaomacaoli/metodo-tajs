import { describe, it, expect, jest } from "@jest/globals";
import Person from "../src/Person";

describe('#Person Suite', () => {
    describe('#validate', () => {
        it('should throw an error when empty name', () => {
            const mockInvalidName = {
                name: '',
                cpf: '123.456.789-00'
            }

            expect(() => Person.validate(mockInvalidName))
                .toThrow(new Error('Name is required'))
        })
        it('should throw an error when empty cpf', () => {
            const mockInvalidCPF = {
                name: 'John Doe',
            }

            expect(() => Person.validate(mockInvalidCPF))
                .toThrow(new Error('CPF is required'))
        })
        it('should throw an error when there is no name', () => {
            const mockInvalidName = {
                cpf: '123.456.789-00'
            }

            expect(() => Person.validate(mockInvalidName))
                .toThrow(new Error('Name is required'))
        })
        it('should throw an error when there is no cpf', () => {
            const mockInvalidCPF = {
                name: 'John Doe',
                cpf: ''
            }

            expect(() => Person.validate(mockInvalidCPF))
                .toThrow(new Error('CPF is required'))
        })
        it('should not throw an error when there is name and cpf', () => {
            const mockValidPerson = {
                name: 'John Doe',
                cpf: '123.456.789-00'
            }

            expect(() => Person.validate(mockValidPerson))
                .not
                .toThrow()
        })
    })

    describe('#format', () => {
        it('should format the person name and CPF', () => {
            // parte do principio que os dados já foram validados
            // Arrange
            const mockPerson = {
                name: 'Xuxa da silva',
                cpf: '123.456.789-00',
            }

            // Act
            const formattedPerson = Person.format(mockPerson)

            // Assert
            const expected = {
                name: 'Xuxa',
                cpf: '12345678900',
                lastName: 'da silva'
            }

            expect(formattedPerson).toStrictEqual(expected)
        })
    })

    describe('#save', () => {
        it('should throw an error when there is no prop name', () => {
            const mockInvalidName = {
                cpf: '12345678900',
                lastName: 'da silva'
            }

            expect(() => Person.save(mockInvalidName))
                .toThrow(new Error(`Cannot save invalid person: ${JSON.stringify(mockInvalidName)}`))
        })
        it('should throw an error when there is no prop cpf', () => {
            const mockInvalidCPF = {
                name: 'Xuxa',
                lastName: 'da silva'
            }

            expect(() => Person.save(mockInvalidCPF))
                .toThrow(new Error(`Cannot save invalid person: ${JSON.stringify(mockInvalidCPF)}`))
        })
        it('should throw an error when there is no prop lastName', () => {
            const mockInvalidLastName = {
                name: 'Xuxa',
                cpf: '12345678900',
            }

            expect(() => Person.save(mockInvalidLastName))
                .toThrow(new Error(`Cannot save invalid person: ${JSON.stringify(mockInvalidLastName)}`))
        })
        it('should save person when is formatted', () => {
            const mockPerson = {
                name: 'Xuxa',
                cpf: '12345678900',
                lastName: 'da silva'
            }

            const savePerson =  Person.save(mockPerson)

            const expected = 'person saved'

            expect(savePerson).toStrictEqual(expected)
        })
    })

    describe('#process', () => {
        it('should process a valid person', () => {
            //    Uma outra ideia é não retestr o que já foi testado
            //    Lembra dos checkpoints?
            //    Testou do caminho A para o caminho B, agora testa do caminho B ao C
            //    Então aqui, eu pulo o caminho A (validate), caminho B (format), pois estes caminhos já foram validados e vou direto para o caminho C (save)
            //    Este método abaixo faz mais sentido para quando se tem interaçoes externas como chamadas de API, Bancos de dados e etc que serão mostrados na próxima aula
            //    Mocks são simulações de funções que você pode fazer ao testar o comportamento

            // AAA: Arrange, Act, Assert

            // Arrange
            const mockPerson = {
                name: 'Xuxa da silva',
                cpf: '123.456.789-00',
            }
            jest
                .spyOn(
                    Person,
                    Person.validate.name
                )
                .mockReturnValue()
            // .mockImplementation(() => {
            //     throw new Error('Deu ruim!!')
            // })

            jest
                .spyOn(
                    Person,
                    Person.format.name
                )
                .mockReturnValue({
                    cpf: '12345678900',
                    name: 'Xuxa',
                    lastName: 'da Silva'
                })

            // Act
            const result = Person.process(mockPerson)

            // Assert
            const expected = 'ok'
            expect(result).toStrictEqual(expected)

        })
    })
})