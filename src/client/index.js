const { codemirror, options, createCmFromTextArea } = require('./cm')
const socket = require('./socket')
const Swal = require('sweetalert2')
// TODO Refactor dat shit
socket.on('logined', id => {
  Swal.fire({
    icon: 'success',
    title: 'Success, please wait',
    timer: 2000
  })
  localStorage.setItem('authId', id)
  setActiveContainer(2)
})
socket.on('authed', () => {
  setActiveContainer(2)
})
socket.on('lobbyJoined', data => {
  localStorage.setItem('lobbyId', data)
  setActiveContainer(0)
})
socket.on('lobbyFiles', ([html, css, js]) => {
  myCmHtml.setValue(html)
  myCmCss.setValue(css)
  myCmJs.setValue(js)
})
const setActiveContainer = index => {
  const { classList } = document.getElementsByTagName('main')[0]
  !index
    ? classList.remove('main-containers')
    : classList.add('main-containers')
  containers.forEach(({ classList }, i) => {
    i === index ? classList.remove('hidden') : classList.add('hidden')
  })
}

const getLocal = value => localStorage.getItem(value)

let myCmJs
let myCmCss
let myCmHtml

window.onload = () => {
  const containers = (window.containers = document.querySelectorAll('main>*'))
  setActiveContainer(1)
  localStorage.removeItem('lobbyId')
  let nickname = localStorage.getItem('nickname')
  let authId = localStorage.getItem('authId')
  if (nickname && authId) {
    socket.emit('auth', { nickname, authId })
  }
  document.querySelector('.login-submit').addEventListener('click', () => {
    const input = document.getElementById('login-input').value
    if (input.length < 6) {
      Swal.fire({
        icon: 'error',
        title: 'Short nickname',
        text: 'Nickname must be at least 6 characters',
        timer: 2000
      })
    } else {
      localStorage.setItem('nickname', input)
      socket.emit('login', getLocal('nickname'))
    }
  })
  document.getElementById('create-lobby').addEventListener('click', () => {
    socket.emit('create-lobby', getLocal('nickname'))
  })
  myCmJs = createCmFromTextArea('javascript')
  myCmCss = createCmFromTextArea('css')
  myCmHtml = createCmFromTextArea('htmlmixed')
  // myCmJs.on('changes', (cm, data) => {
  //   console.log(data)
  // })
}
