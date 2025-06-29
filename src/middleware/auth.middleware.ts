import { Request, Response, NextFunction } from 'express'
import { extractToken, verifyToken, DecodedToken } from '@services/jwt.service'
import logger from '@utils/logger'
import { User } from 'models/user.model'

export const requireAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const token = extractToken(req)
    if (!token) {
        res.status(401).json({ error: 'Token required' })
        return
    }

    const decoded = verifyToken(token)
    if (!decoded) {
        res.status(401).json({ error: 'Invalid or non-user token' })
        return
    }
    logger.info(decoded)
    try {
        const user = await User.findByPk(decoded.id)
        if (!decoded || decoded.role !== 'admin') {
            res.status(403).json({ error: 'Admin access required' })
            return
        }
        // Attach user info to request if needed downstream
        if (user?.id) {
            ;(req as any).userId = user.id
        }
        ;(req as any).isAdmin = true
    } catch (error) {
        res.status(500).json({ error: 'Server error validating admin' })
        return
    }

    next()
}

export const authCheck = (req: Request, res: Response, next: NextFunction): void => {
    const token = extractToken(req) as string

    try {
        const decoded = verifyToken(token)
    } catch (error) {
        res.status(401)
        res.json({ message: 'User not admin' })
        return
    }

    next()
}
