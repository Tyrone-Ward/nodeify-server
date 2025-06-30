import { NextFunction, Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import { User } from '../models/user.model'
import { generateToken } from '@services/jwt.service'
import { AppError } from '@utils/AppError'

const SALT_ROUNDS = 10

export const registerUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email, password } = req.body

    try {
        const emailExists = await User.findOne({ where: { email } })
        if (emailExists) {
            throw new AppError('Conflict', 'Email address already exists.', 409)
            return
        }

        const hashedPass = await bcrypt.hash(password, SALT_ROUNDS)
        await User.create({ email, hashedPass })

        res.status(201).json({ message: 'user created' })
    } catch (error) {
        next(error)
        // throw new AppError('Internal Server Error', 'Failed to register user', 500)
    }
}

export const loginUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email, password } = req.body

    try {
        const user: null | any | string = await User.findOne({ where: { email } })

        if (!user || !password) {
            throw new AppError('Unauthorized', 'All fields are required.', 401)
            return
        }

        const match = await bcrypt.compare(password, user.hashedPass)
        if (!match) {
            throw new AppError('Unauthorized', 'Invalid email address and/or password.', 401)
            return
        }

        const accessToken = generateToken({ role: user.role, id: user.id, email: user.email })

        res.status(200).json({ accessToken })
    } catch (error) {
        next(error)
    }
}
