import { Request, Response, NextFunction } from 'express'
import { extractToken, verifyToken, DecodedToken } from '@services/jwt.service'
import logger from '@utils/logger'
import { User } from 'models/user.model'
import { AppError } from '@utils/AppError'

export const requireAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const token = extractToken(req)
    if (!token) {
        throw new AppError('Unauthorized', 'Token required.', 401)
        return
    }

    const decoded = verifyToken(token)
    if (!decoded) {
        throw new AppError('Unauthorized', 'Invalid or non-user token.', 401)
        return
    }
    logger.info(decoded)
    try {
        const user = await User.findByPk(decoded.id)
        if (!decoded || decoded.role !== 'admin') {
            throw new AppError('Forbidden', 'Admin access required.', 403)
            return
        }
        // Attach user info to request if needed downstream
        if (user?.id) {
            ;(req as any).userId = user.id
        }
        ;(req as any).isAdmin = true
    } catch (error) {
        next(error)
        // res.status(500).json({ error: 'Server error validating admin' })
        return
    }

    next()
}

export const authCheck = (req: Request, res: Response, next: NextFunction): void => {
    const token = extractToken(req) as string

    try {
        const decoded = verifyToken(token)
    } catch (error) {
        throw new AppError('Unauthorized', 'User not admin.', 403)
        // res.status(401)
        // res.json({ message: 'User not admin' })

        return
    }

    next()
}
