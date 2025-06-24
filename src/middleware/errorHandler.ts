import logger from '@utils/logger'
import { Request, Response, NextFunction } from 'express'

/**
 * @openapi
 * components:
 *   schemas:
 *     Error:
 *      type: object
 *      properties:
 *        code:
 *          type: number
 *        message:
 *          type: string
 *      required:
 *        - code
 *        - message
 */

export interface AppError extends Error {
    status?: number
}

export const errorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
    logger.error(err.message)
    res.status(err.status || 500).json({
        code: err.status || 500,
        Message: err.message || 'Internal Server Error'
    })
}
