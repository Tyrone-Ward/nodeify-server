import os from 'node:os'
import { statSync } from 'node:fs'
import { Request, Response } from 'express'
import { sequelize } from '@config/database.config'
import logger from '@utils/logger'
import { connectedClients } from '@services/websocket.service'
import { Client } from 'models/client.model'

/**
 * @openapi
 * /:
 *   get:
 *     tags:
 *     - Application
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */

export const index = (req: Request, res: Response) => {
    res.send('hello')
}

/**
 * @openapi
 * /health:
 *  get:
 *     tags:
 *     - Application
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: App is up and running
 */

export const health = async (req: Request, res: Response) => {
    try {
        const dbSize = statSync('./database/database.db').size
        await sequelize.authenticate()
        res.json({
            databaseHealth: 'ok',
            databaseSize: dbSize,
            health: 'green',
            processUptime: `${Math.floor(process.uptime())} seconds`,
            systemUptime: `${Math.floor(os.uptime())} seconds`
        })
    } catch (error) {
        logger.error(error)
    }
}

/**
 * @openapi
 * /client/status:
 *  get:
 *     tags:
 *     - client
 *     description: Responds with the ammount of clients currently listening for messages.
 *     responses:
 *       200:
 *         description: Client count
 */

export const connectedClientsCount = (req: Request, res: Response) => {
    // logger.info(connectedClients)
    res.send(connectedClients.size)
}

/**
 * @openapi
 * /client:
 *  post:
 *     tags:
 *     - client
 *     description: Create a client.
 *     responses:
 *       200:
 *         description: Successfully created client.
 */

export const createClient = async (req: Request, res: Response) => {
    const { name } = req.body
    try {
        const newClient = await Client.create({ name })
        res.json({ id: newClient.id, name: newClient.name, token: newClient.token })
    } catch (error) {
        logger.error(error)
    }
}
