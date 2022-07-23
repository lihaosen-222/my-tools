const { Server: Socket } = require("socket.io");

function socketInit(server) {
  const io = new Socket(server, { cors: {} });

  let i = 0;
  io.on("connection", () => {
    console.log("a user login in", i++);
  });

  return io;
}

module.exports = socketInit;
