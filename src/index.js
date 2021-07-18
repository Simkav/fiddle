const express = require('express')
const socketIo = require('socket.io')
const http = require('http')
const morgan = require('morgan')
const path = require('path')
const app = express()
const fs = require('fs')

app.use(morgan('dev'), express.json())
app.use('/public', express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'templates'))
app.set('view engine', 'pug')

const server = http.createServer(app)

const io = socketIo(server)

app.get('/', (req, res, next) => {
  res.render('index', { pageTitle: 'JSFiddle' })
})
const copyDefaultRoom = dir =>
  ['index.html', 'styles.css', 'index.js'].forEach(file => {
    fs.copyFile(
      path.join(defaultRoomLayotDir, file),
      path.join(dir, file),
      err => {
        if (err) console.error(err)
      }
    )
  })

const defaultRoomLayotDir = path.join(__dirname, 'defaultRoom')
const checkRoom = nickname => {
  const dir = path.join(__dirname, 'public', 'rooms', nickname)
  fs.access(dir, err => {
    if (err) {
      fs.mkdir(dir, err => {
        if (err) {
          console.error(err)
          return
        }
        copyDefaultRoom(dir)
      })
    }
  })
}

io.on('connection', socket => {
  socket.emit('hello', 'world')
  socket.on('data', data => {
    console.log(data)
  })
  socket.on('login', data => {
    socket.join('lobbys')
    console.log(socket.rooms)
    console.log(data)
  })
  socket.on('create-lobby', nickname => {
    socket.leave('lobbys')
    socket.join(nickname)
    checkRoom(nickname)
  })
})

server.listen(8001)
