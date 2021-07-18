const { codemirror, options } = require('./cm')
const socket = require('./socket')
const Swal = require('sweetalert2')
const createCmFromTextArea = mode =>
  codemirror.fromTextArea(document.getElementById(`${mode}-text-area`), {
    ...options,
    mode
  })

const setActiveContainer = index => {
  const { classList } = document.getElementsByTagName('main')[0]
  index === 0
    ? classList.remove('main-containers')
    : classList.add('main-containers')
  containers.forEach(({ classList }, i) => {
    i === index ? classList.remove('hidden') : classList.add('hidden')
  })
}

window.onload = () => {
  let nickname = localStorage.getItem('nickname')
  const containers = (window.containers = document.querySelectorAll('main>*'))
  if (nickname) {
    setActiveContainer(2)
    socket.emit('login', nickname)
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
      Swal.fire({
        icon: 'success',
        title: 'Success, please wait'
      })
      setActiveContainer(0)
    }
  })
  document.getElementById('create-lobby').addEventListener('click', () => {
    console.log('click')
    socket.emit('create-lobby', nickname)
  })
  let myCmJs = createCmFromTextArea('javascript')
  let myCmCss = createCmFromTextArea('css')
  let myCmHtml = createCmFromTextArea('htmlmixed')
}
