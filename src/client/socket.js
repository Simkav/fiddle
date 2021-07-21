const io = require('socket.io-client')
const socket = io({
  autoConnect: false,
  auth: {
    id: localStorage.getItem('authId') || null,
    nickname: localStorage.getItem('nickname') || null
  }
})
const Swal = require('sweetalert2')
socket.on('401', () => {
  Swal.fire({ title: 'Already authorized', icon: 'error' })
})
socket.on('recieveAuthId', data => {
  localStorage.setItem('authId', data)
})
socket.on('flushauth', () => {
  localStorage.removeItem('nickname')
  localStorage.removeItem('authId')
})

module.exports = socket
