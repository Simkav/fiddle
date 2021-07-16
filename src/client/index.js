require('codemirror/mode/javascript/javascript')
require('codemirror/mode/css/css')
require('codemirror/mode/htmlmixed/htmlmixed')
const linter = require('codemirror/addon/lint/javascript-lint')

const codemirror = require('codemirror')

// const { EditorView } = require('@codemirror/view')
// const { EditorState } = require('@codemirror/state')
const io = require('socket.io-client')
const socket = io()

socket.on('hello', arg => {
  console.log(arg) // world
})
socket.on('log', data => {
  console.log(data)
})

window.onload = () => {
  let myCmJs = codemirror.fromTextArea(
    document.getElementById('js-text-area'),
    {
      mode: 'javascript',
      theme: 'ayu-dark'
    }
  )
  
  myCmJs.on('change', (instance, obj) => {
    console.log(instance)
    console.log(obj)
  })

  let myCmCss = codemirror.fromTextArea(
    document.getElementById('css-text-area'),
    {
      mode: 'css',
      theme: 'ayu-dark'
    }
  )
  let myCmHtml = codemirror.fromTextArea(
    document.getElementById('html-text-area'),
    {
      mode: 'htmlmixed',
      theme: 'ayu-dark'
    }
  )
}
