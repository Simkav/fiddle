const path = require('path')
const fs = require('fs')
const defaultRoomLayotDir = path.resolve(__dirname, '../', 'defaultRoom')
const roomsPath = path.resolve(__dirname, '../', 'rooms')
const defaultFiles = ['index.html', 'styles.css', 'index.js']
const parseFile = async (nickname, file) =>
  await fs.promises.readFile(path.resolve(roomsPath, nickname, file), {
    encoding: 'utf8'
  })

const parseRoomFiles = async nickname =>
  Promise.all(defaultFiles.map(file => parseFile(nickname, file))).then(
    data => data
  )

const copyDefaultRoom = dir =>
  defaultFiles.forEach(file => {
    fs.copyFile(
      path.join(defaultRoomLayotDir, file),
      path.join(dir, file),
      err => {
        if (err) console.error(err)
      }
    )
  })

const createRoom = nickname => {
  const dir = path.join(roomsPath, nickname)
  fs.access(dir, err => {
    if (err) {
      fs.mkdir(dir, err => {
        if (err) {
          console.error(err)
          return
        }
        copyDefaultRoom(dir)
      })
    }
  })
}

const initRoomsFolder = () => {
  const dir = path.resolve(__dirname, '../', 'rooms')
  try {
    fs.accessSync(dir)
  } catch (err) {
    fs.mkdirSync(dir)
  }
}

module.exports = {
  createRoom,
  parseRoomFiles,
  parseFile,
  initRoomsFolder
}
