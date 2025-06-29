import { Sequelize, DataTypes, Model } from 'sequelize'
import logger from '@utils/logger'
import { sequelize } from '@config/database.config'
import { nanoid } from 'nanoid'

interface ClientAttributes {
    token?: string
    lastUsed?: Date
    name: string
}

interface ClientInstance extends Model<ClientAttributes>, ClientAttributes {}

export const Client = sequelize.define<ClientInstance>('Client', {
    token: {
        type: DataTypes.UUID,
        defaultValue: () => nanoid(10),
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        unique: true
    },
    lastUsed: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
})
