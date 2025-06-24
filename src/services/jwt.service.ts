import jwt, { JwtPayload } from 'jsonwebtoken'
import logger from '@utils/logger'
import dotenv from 'dotenv'

dotenv.config()

const SECRET = process.env.JWT_SECRET as string
const EXPIRES_IN = process.env.ACCESS_TOKEN_EXPIRES_IN

export type TokenPayload = {
    id: string
}

export interface DecodedToken extends JwtPayload, TokenPayload {}

// Generate a JWT token for an application or client.
export const generateToken =  (payload: TokenPayload): string => {
    return jwt.sign(payload, SECRET, { expiresIn: EXPIRES_IN })
}

// Verify a JWT token and return the payload if valid, otherwise null.
export const verifyToken = (token: string): DecodedToken | null => {
    try {
        return jwt.verify(token, SECRET) as DecodedToken
    } catch (err) {
        return null
    }
}

// Extract token from Authorization header.
export const extractToken = (req: any): string | null => {
    const authHeader = req.headers.authorization
    if (!authHeader?.startsWith('Bearer ')) {
        logger.error('No refresh token provided.')
        return null
    }

    const refreshToken = authHeader.split(' ')[1]
    return refreshToken || null
}
