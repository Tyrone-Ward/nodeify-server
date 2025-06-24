import { Sequelize, DataTypes } from 'sequelize'
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
 *           example: passworx123
 */

export const User = sequelize.define('User', {
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
