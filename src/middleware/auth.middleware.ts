import { Request, Response, NextFunction } from 'express'
import { extractToken, verifyToken, DecodedToken } from '@services/jwt.service'

export const requireAdmin = (req: Request, res: Response, next: NextFunction): void => {
    const token = extractToken(req)
    if (!token) {
        res.status(401).json({ error: 'Token required' })
        return
    }

    const decoded = verifyToken(token)
    if (!decoded || decoded.type !== 'user' || decoded.role !== 'admin') {
        res.status(403).json({ error: 'Admin access required' })
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
