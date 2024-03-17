export default function mapPerson(personString) {
  const { name, age } = JSON.parse(personString)

  return {
    name,
    age,
    createdAt: new Date()
  }
}
