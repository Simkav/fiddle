const server = require('./server/server')
const PORT = process.env.PORT || 8001
const { initRoomsFolder } = require('./utils/fsutil')
initRoomsFolder()
require('./server/socket')
server.listen(PORT)
