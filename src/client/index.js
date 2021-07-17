const { codemirror, options } = require('./cm')
const socket = require('./socket')
const createCmFromTextArea = mode =>
  codemirror.fromTextArea(document.getElementById(`${mode}-text-area`), {
    ...options,
    mode
  })

window.onload = () => {
  let myCmJs = createCmFromTextArea('javascript')
  let myCmCss = createCmFromTextArea('css')
  let myCmHtml = createCmFromTextArea('htmlmixed')
}
