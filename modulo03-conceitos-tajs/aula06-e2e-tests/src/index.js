import server from "./server.js";

if(process.env.NODE_ENV !== 'test') {
  server.listen(process.env.PORT, () => {
    const serverInfo = server.address()
    console.log(`
      Server is running at ${serverInfo.address}:${serverInfo.port}
    `);
  })
}

export default server

/*
  curl \
  -i \
  -X POST \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "João Macaoli",
    "cpf": "123.123.123-12"
  }' \
  http://localhost:3000/persons

*/
