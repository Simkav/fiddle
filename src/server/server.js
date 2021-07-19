const express = require('express')
const app = express()
const path = require('path')

app.use(express.json())
app.use('/public', express.static(path.join(__dirname, '../', 'public')))
app.use('/rooms', express.static(path.join(__dirname, '../', 'rooms'))) // TODO UNSECURE REFACTOR
app.set('views', path.join(__dirname, '../', 'templates'))
app.set('view engine', 'pug')

app.get('/', (req, res, next) => {
  res.render('index', { pageTitle: 'JSFiddle' })
})

const server = require('http').createServer(app)

module.exports = server
