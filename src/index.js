const express = require('express')
const socketIo = require('socket.io')
const http = require('http')
const morgan = require('morgan')
const path = require('path')

const app = express()

app.use(morgan('dev'), express.json())
app.use('/public', express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'templates'))
app.set('view engine', 'pug')

const server = http.createServer(app)

const io = socketIo(server)

app.get('/', (req, res, next) => {
  res.render('index', { pageTitle: 'JSFiddle' })
})

io.on('connection', socket => {
  socket.emit('hello', 'world')
  socket.on('data', data => {})
})

server.listen(8001)
