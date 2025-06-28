import { Sequelize, Optional, DataTypes, Model } from 'sequelize'
import logger from '@utils/logger'
import { sequelize } from '@config/database.config'

/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: john@email.com
 *           description: The user's email address.
 *         username:
 *           type: string
 *           description: The user's username.
 *           example: LinusTorvalds15
 *         password:
 *           type: string
 *           description: The user's password.
 *           example: password123
 */

interface UserAttributes {
    id?: string
    email: string
    username: string
    hashedPass: string
    role?: string
    isActive?: boolean
}

interface UserInstance extends Model<UserAttributes>, UserAttributes {}

export const User = sequelize.define<UserInstance>('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    email: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true
    },
    username: {
        type: DataTypes.TEXT,
        unique: true
    },
    hashedPass: {
        type: DataTypes.TEXT
    },
    role: {
        type: DataTypes.TEXT,
        defaultValue: 'user'
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
})
