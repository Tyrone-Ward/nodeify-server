import jwt, { JwtPayload, Secret } from 'jsonwebtoken'
import logger from '@utils/logger'
import 'dotenv/config'
import { StringValue } from 'ms'

const JWT_SECRET = process.env.JWT_SECRET as Secret
const EXPIRES_IN = process.env.ACCESS_TOKEN_EXPIRES_IN as StringValue

export type TokenPayload = {
    username: string
    email: string
    id: string
    role: 'admin' | 'user'
}

export interface DecodedToken extends JwtPayload, TokenPayload {}

// Generate a JWT token for an application or client.
export const generateToken = (payload: TokenPayload): string => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: EXPIRES_IN })
}

// Verify a JWT token and return the payload if valid, otherwise null.
export const verifyToken = (token: string): DecodedToken | null => {
    try {
        return jwt.verify(token, JWT_SECRET) as DecodedToken
    } catch (err) {
        return null
    }
}

// Extract token from Authorization header.
export const extractToken = (req: any): string | null => {
    const authHeader = req.headers.authorization
    if (!authHeader?.startsWith('Bearer ')) {
        logger.error('No access token provided.')
        return null
    }

    const accessToken = authHeader.split(' ')[1]
    return accessToken || null
}
