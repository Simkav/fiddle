const socket = io()
socket.on('hello', arg => {
  console.log(arg) // world
})
socket.on('log', data => {
  console.log(data)
})
socket.emit('data', 'test')
