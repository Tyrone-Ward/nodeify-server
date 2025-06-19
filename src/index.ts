import { expressServer, SERVER_PORT } from "@config/server.config.js"
import { app } from "@config/app.config.js"
import logger from "@utils/logger.js"

app.get('/', (req, res) => {
    res.send('hello')
})

expressServer.listen(SERVER_PORT, () => {
  logger.info(`Listening on http://localhost:${SERVER_PORT}`)
})
