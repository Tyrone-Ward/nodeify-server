import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import { User } from '../models/user.model'
import { generateToken } from '@services/jwt.service'

const SALT_ROUNDS = 10

export const registerUser = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body

    try {
        const emailExists = await User.findOne({ where: { email } })
        if (emailExists) {
            res.status(409).json({ error: 'Email address already exists.' })
            return
        }

        const hashedPass = await bcrypt.hash(password, SALT_ROUNDS)
        await User.create({ email, hashedPass })

        res.status(201).json({ message: 'user created' })
    } catch (err) {
        res.status(500).json({ error: 'Failed to register user' })
    }
}

export const loginUser = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body

    try {
        const user: null | any | string = await User.findOne({ where: { email } })

        if (!user || !password) {
            res.status(401).json({ error: 'All fields are required' })
            return
        }

        const match = await bcrypt.compare(password, user.hashedPass)
        console.log(match)
        if (!match) {
            res.status(401).json({ error: 'Invalid email address or password' })
            return
        }

        const accessToken = generateToken({ role: user.role, id: user.id, email: user.email })

        res.status(200).json({ accessToken })
    } catch (err: any) {
        res.status(500).json({ error: err.message })
    }
}
