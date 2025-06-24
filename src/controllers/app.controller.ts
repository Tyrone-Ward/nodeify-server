import os from 'node:os'
import { statSync } from 'node:fs'
import { Request, Response } from 'express'

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

export const health = (req: Request, res: Response) => {
    // const dbSize = statSync('./database/messages.db').size
    // const dbHealth = db.pragma('integrity_check')[0].integrity_check

    res.json({
        databaseHealth: null,
        databaseSize: 0,
        health: 'green',
        process_uptime: `${Math.floor(process.uptime())} seconds`,
        system_uptime: `${Math.floor(os.uptime())} seconds`
    })
}
