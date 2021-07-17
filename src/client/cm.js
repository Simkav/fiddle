JSHINT = window.JSHINT = require('jshint/dist/jshint').JSHINT
CSSLint = window.CSSLint = require('csslint').CSSLint

require('codemirror/mode/javascript/javascript')
require('codemirror/mode/css/css')
require('codemirror/mode/htmlmixed/htmlmixed')

require('codemirror/addon/edit/closetag')
require('codemirror/addon/edit/matchbrackets')
require('codemirror/addon/edit/matchtags')
require('codemirror/addon/edit/closebrackets')

require('codemirror/addon/hint/javascript-hint')
require('codemirror/addon/hint/html-hint')
require('codemirror/addon/hint/css-hint')
require('codemirror/addon/hint/show-hint')
require('codemirror/addon/hint/show-hint.css')

require('codemirror/addon/lint/lint')
require('codemirror/addon/lint/lint.css')
require('codemirror/addon/lint/javascript-lint')
require('codemirror/addon/lint/html-lint')
require('codemirror/addon/lint/css-lint')

const codemirror = require('codemirror')

const options = {
  lineNumbers: true,
  theme: 'ayu-dark',
  autoCloseBrackets: true,
  autoCloseTags: true,
  matchBrackets: true,
  matchTags: true,
  showHint: true,
  extraKeys: { 'Ctrl-Space': 'autocomplete' },
  gutters: ['CodeMirror-lint-markers'],
  lint: true
}

module.exports = {
  options,
  codemirror
}
