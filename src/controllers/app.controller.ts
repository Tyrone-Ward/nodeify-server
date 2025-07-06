import os from 'node:os'
import { statSync } from 'node:fs'
import { NextFunction, Request, Response } from 'express'
import { sequelize } from '@config/database.config'
import logger from '@utils/logger'
import { connectedClients, sendToClient } from '@services/websocket.service'
import { Client } from 'models/client.model'
import { AppError } from '@utils/AppError'

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

export const health = async (req: Request, res: Response): Promise<void> => {
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
        logger.error(error as Error)
    }
}

/**
 * @openapi
 * /client/status:
 *  get:
 *     tags:
 *     - client
 *     description: Responds with the number of clients currently listening for messages.
 *     responses:
 *       200:
 *         description: Client count
 */

export const connectedClientsCount = (req: Request, res: Response) => {
    logger.info(connectedClients)
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

export const createClient = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { name } = req.body
    const userId = (req as any).userId

    try {
        const clientExists = await Client.findOne({ where: { name } })
        if (clientExists) {
            throw new AppError('Conflict', 'Client already exists', 409)
        }
        const newClient = await Client.create({ name, userId })
        res.json({ name: newClient.name, token: newClient.token })
    } catch (error) {
        next(error)
    }
}

export const sendMessage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // Move to auth middleware
    const { content, recipient } = req.body
    const authHeader = req.headers.authorization
    if (!authHeader?.startsWith('Bearer ')) {
        throw new AppError('Unauthorized', 'Token required.', 401)
        return
    }

    const token = authHeader.split(' ')[1]
    console.log(token)

    try {
        const sender = await Client.findOne({ where: { token } })
        if (!sender) {
            throw new AppError('Not Found', 'User not found', 404)
            return
        }
        logger.info(`message: user: ${recipient}, content: ${content}, senderToken: ${sender.token}`)
        sendToClient(recipient, content, sender.token)
        // res.json({ message: 'mesage sent successfully.' })
        res.json({ recipient, content, token })
    } catch (error) {
        next(error)
    }
}
