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

export const connectedClientsCount = (req: Request, res: Response) => {
    // logger.info(connectedClients)
    res.send(connectedClients.size)
}

export const createClient = async () => {}
