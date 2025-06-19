import { expressServer, SERVER_PORT } from '@config/server.config'
import { app } from '@config/app.config'
import logger from '@utils/logger.js'
import { sequelize } from '@config/database.config'

app.get('/', (req, res) => {
    res.send('hello')
})

// Gracefully shutdown ?
let SHUTDOWN = false

process.on('SIGINT', async () => {
    if (!SHUTDOWN) {
        logger.info('Closing connections')
        await sequelize.close()
        expressServer.close()
    }
})

expressServer.listen(SERVER_PORT, () => {
    logger.info(`Listening on http://localhost:${SERVER_PORT}`)
})
