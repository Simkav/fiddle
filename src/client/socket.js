const io = require('socket.io-client')
const socket = io()

socket.on('hello', arg => {
  console.log(arg) // world
})
socket.on('log', data => {
  console.log(data)
})

module.exports = {
  socket
}
