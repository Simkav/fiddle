const { parseFile, roomsPath, writeFile } = require('./fsutil')
const bodyStart = `<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="./styles.css" />
  <title>Document</title>
</head>

<body>
`
const bodyEnd = `
<script src="./index.js"></script>
</body>

</html>`

const updateIframe = async nickName => {
  const body = await parseFile(nickName, 'index.html')
  const compiledFile = bodyStart + body + bodyEnd
  writeFile(roomsPath, nickName, 'iframe.html', compiledFile)
}

module.exports = {
  updateIframe
}
