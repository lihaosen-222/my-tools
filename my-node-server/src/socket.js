const { Server: Socket } = require('socket.io')
const tLog = require('./utils')

function socketInit(server) {
  const io = new Socket(server, { cors: {} })

  let i = 0
  io.on('connection', () => {
    tLog('a user login in', i++)
  })

  return io
}

module.exports = socketInit
