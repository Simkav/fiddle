const { codemirror, createCmFromTextArea } = require('./cm')
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

socket.connect()

const preapareUl = list => {
  const ul = document.createElement('ul')
  const lis = list.map(room => {
    const li = document.createElement('li')
    const btn = document.createElement('button')
    btn.textContent = room.slice(5)
    btn.addEventListener('click', () => {
      socket.emit('join-lobby', room.slice(5))
    })
    li.appendChild(btn)
    return li
  })
  lis.forEach(li => ul.appendChild(li))
  return ul
}

socket.on('updateLobbyList', ({ list }) =>
  lobbyList.replaceChild(preapareUl(list), lobbyList.firstChild)
)

const lobbyList = (window.lobbyList = document.getElementById('lobby-list'))

const checkChanges = (file, cm, origin) => {
  if (origin !== 'setValue') {
    socket.emit('updateFile', prepareUpdate(file, cm))
  }
}

socket.on('authed', () => setActiveContainer(2))

socket.on('lobbyJoined', data => {
  localStorage.setItem('lobbyId', data)
  setActiveContainer(0)
})

socket.on('updateFile', ({ file, value }) => {
  const instance = cmInstances[file]
  const cursor = instance.getCursor()
  instance.setValue(value)
  instance.setCursor(cursor)
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

const prepareUpdate = (file, cm) => ({
  id: getLocal('lobbyId'),
  file,
  value: cm.getValue()
})

const cmInstances = {}

let myCmJs
let myCmCss
let myCmHtml

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
myCmJs = createCmFromTextArea('javascript', {
  lint: { esversion: 6, asi: true }
})
myCmCss = createCmFromTextArea('css')
myCmHtml = createCmFromTextArea('htmlmixed')
cmInstances.js = myCmJs
cmInstances.css = myCmCss
cmInstances.html = myCmHtml
myCmJs.on('changes', (cm, [{ origin }]) => checkChanges('js', cm, origin))
myCmCss.on('changes', (cm, [{ origin }]) => checkChanges('css', cm, origin))
myCmHtml.on('changes', (cm, [{ origin }]) => checkChanges('html', cm, origin))

document.getElementById('updateIframe').addEventListener('click', () => {
  socket.emit('updateIframe', getLocal('lobbyId'))
})
socket.on('updateIframe', () => {
  document
    .getElementById('iframe')
    .setAttribute('src', `./rooms/${getLocal('lobbyId')}/iframe.html`)
})
