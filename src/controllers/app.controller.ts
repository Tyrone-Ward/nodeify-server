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
    res.json({ message: 'all good' })
}