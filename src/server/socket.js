const { createRoom, parseRoomFiles, parseFile } = require('../utils/fsutil')

const players = {}

const io = require('socket.io')(require('./server'))

io.on('connection', socket => {
  socket.on('login', nickname => {
    if (players[nickname]) {
      socket.emit('401')
    } else {
      players[nickname] = socket.id
      socket.emit('logined', socket.id)
    }
  })
  socket.on('auth', ({ nickname, authId }) => {
    if (players[nickname] && authId && players[nickname] === authId) {
      socket.emit('authed')
      socket.join('lobbys')
    } else {
      socket.emit('flushAuth')
    }
  })
  socket.on('create-lobby', nickname => {
    if (nickname) {
      socket.leave('lobbys')
      socket.join(nickname)
      socket.emit('lobbyJoined', nickname)
      createRoom(nickname)
      parseRoomFiles('asdasd').then(data => socket.emit('lobbyFiles', data))
    } else {
      socket.emit('401')
    }
  })
})
