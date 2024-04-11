import { AfterAll, Given } from "@cucumber/cucumber";
import { server } from "../src/api.js";
import sinon from "sinon";

let _testServer
let _testServerAddress

function waitForServerStatus(server) {
  return new Promise((resolve, reject) => {
    server.once('error', (err) => reject(err))
    server.once('listening', () => resolve())
  })
}

AfterAll(done => {
  sinon.restore()
  server.closeAllConnections()
  _testServer.close(done)
})

Given('I have a running server', async function () {
  // Se o servidor já estiver rodando usa ele!
  if(_testServer) return

  _testServer = server.listen()

  await waitForServerStatus(_testServer)

  const serverInfo = _testServer.address()
  this.testServerAddress = `http://localhost:${serverInfo.port}`
})

Given('The current date is {string}', async function (date) {
  sinon.restore()
  const clock = sinon.useFakeTimers(new Date(date).getTime())

  this.clock = clock
})
