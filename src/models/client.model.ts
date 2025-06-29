import { Sequelize, DataTypes, Model } from 'sequelize'
import logger from '@utils/logger'
import { sequelize } from '@config/database.config'
import { nanoid } from 'nanoid'

interface ClientAttributes {
    id?: string
    lastUsed?: Date
    name: string
    token?: string
}

interface ClientInstance extends Model<ClientAttributes>, ClientAttributes {}

export const Client = sequelize.define<ClientInstance>('Client', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    lastUsed: {
        type: DataTypes.DATE
    },
    name: {
        type: DataTypes.STRING,
        unique: true
    },
    token: {
        type: DataTypes.UUID,
        defaultValue: nanoid(10),
        allowNull: false
    }
})
