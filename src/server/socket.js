const { createRoom, parseRoomFiles, parseFile } = require('../utils/fsutil')

const players = {}

const io = require('socket.io')(require('./server'))

const logRooms = () => {
  console.log(io.of('/').adapter.rooms)
}

io.on('connection', socket => {
  // logRooms()
  socket.on('login', nickname => {
    if (players[nickname]) {
      socket.emit('401')
    } else {
      players[nickname] = socket.id
      socket.emit('logined', socket.id)
    }
  })
  socket.on('auth', ({ nickname, authId }) => {
    // logRooms()
    if (players[nickname] && authId && players[nickname] === authId) {
      createRoom(nickname)
      socket.emit('authed')
      socket.join('lobbys')
    } else {
      socket.emit('flushAuth')
    }
  })
  socket.on('create-lobby', nickname => {
    // logRooms()
    if (nickname) {
      socket.leave('lobbys')
      socket.join(nickname)
      createRoom(nickname)
      socket.emit('lobbyJoined', nickname)
      parseRoomFiles('asdasd')
        .then(data => socket.emit('lobbyFiles', data))
        .catch(err => {
          // TODO wtf?
          console.log(err, 'ERORA')
        })
    } else {
      socket.emit('401')
    }
  })
})
