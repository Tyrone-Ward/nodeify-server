import { Request, Response } from 'express'

/**
 * @openapi
 * /health:
 *  get:
 *     tags:
 *     - Health
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: App is up and running
 */

export const health = (req: Request, res: Response) => {
    res.json({ message: 'all good' })
}
