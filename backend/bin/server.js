const http = require('http')
const debug = require('debug')('nodestr:server')
const app = require('../src/app')

function normalizePort(val) {
  const port = parseInt(val, 10)

  if (Number.isNaN(port)) {
    return val
  }

  if (port >= 0) {
    return port
  }

  return false
}

const port = normalizePort(process.env.PORT || '3000')

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error
  }

  switch (error.code) {
    case 'EACESS':
      process.exit(1)
      break
    case 'EADDRINUSE':
      process.exit(1)
      break
    default:
      throw error
  }
}

const server = http.createServer(app)

function onListening() {
  const addr = server.address()
  const bind = typeof addr === 'string' ? `pipe ${port}` : `port ${addr.port}`
  debug(`Listening on ${bind}`)
}

app.set('port', port)

server.listen(port)
server.on('error', onError)
server.on('listening', onListening)
