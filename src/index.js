const server = require('./server/server')
const PORT = process.env.PORT || 8001
require('./server/socket')
server.listen(PORT)
