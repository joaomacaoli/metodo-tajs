
class Person {
    static validate(person) {
        if(!person.name) throw new Error('Name is required')
        if(!person.cpf) throw new Error('CPF is required')
    }

    static format(person) {
        const [name, ...lastName] = person.name.split(' ')

        return {
            cpf: person.cpf.replace(/\D/g, ''),
            name,
            lastName: lastName.join(' ')
        }
    }

    static save(person) {
        if(!['name', 'cpf', 'lastName'].every(prop => person[prop])) {
            throw new Error(`Cannot save invalid person: ${JSON.stringify(person)}`)
        }

        //  ... banco de dados, api, etc

        console.log('Registrado com sucesso!!', person);
    }

    static process(person) {
        this.validate(person)
        const personFormatted = this.format(person)
        this.save(personFormatted)
        return 'ok'
    }
}

// Person.process({
//     name: 'Jonh Doe',
//     cpf: '123.456.789-00'
// })

export default Person