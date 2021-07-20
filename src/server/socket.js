const {
  createRoom,
  parseRoomFiles,
  parseFile,
  updateFile
} = require('../utils/fsutil')
const uuid = require('uuid')
const players = {}
const lobbys = new Set()
const io = require('socket.io')(require('./server'))

const updateLobbys = (room, isAdd = true) => {
  if (room.slice(0, 5) === '_room') {
    action ? lobbys.add(room) : lobbys.delete(room)
    io.in('lobbys').emit('updateLobbyList', { list: [...lobbys] })
  }
}

io.of('/').adapter.on('create-room', room => updateLobbys(room))

io.of('/').adapter.on('delete-room', room => updateLobbys(room, false))

io.on('connection', socket => {
  socket.on('login', nickname => {
    if (players[nickname]) {
      socket.emit('401')
    } else {
      players[nickname] = socket.id
      createRoom(nickname)
      socket.emit('logined', socket.id)
      socket.emit('updateLobbyList', { list: [...lobbys] })
    }
  })
  socket.on('auth', ({ nickname, authId }) => {
    if (players[nickname] && authId && players[nickname] === authId) {
      createRoom(nickname)
      socket.emit('authed')
      socket.join('lobbys')
      socket.emit('updateLobbyList', { list: [...lobbys] })
    } else {
      socket.emit('flushAuth')
    }
  })
  socket.on('getLobbyList', () => {
    socket.emit('updateLobbyList', { list: [...lobbys] })
  })
  socket.on('updateFile', ({ id, file, value }) => {
    updateFile(id, file, value)
    socket.to(`room_${id}`).emit('updateFile', { file, value })
  })
  socket.on('create-lobby', nickname => {
    if (nickname) {
      socket.leave('lobbys')
      socket.join(`room_${nickname}`)
      createRoom(nickname)
      socket.emit('lobbyJoined', nickname)
      parseRoomFiles(nickname).then(data => {
        socket.emit('lobbyFiles', data)
      })
    } else {
      socket.emit('401')
    }
  })
})
