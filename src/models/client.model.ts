import { Sequelize, DataTypes, Model } from 'sequelize'
import logger from '@utils/logger'
import { sequelize } from '@config/database.config'
import { nanoid } from 'nanoid'
import { User } from './user.model'

interface ClientAttributes {
    token?: string
    name: string
    lastUsed?: Date
    userId: string
}

interface ClientInstance extends Model<ClientAttributes>, ClientAttributes {}

// establish a foreign key relationship

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
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false
    }
})

// Associations
Client.belongsTo(User, { foreignKey: 'userId' })
User.hasMany(Client, { foreignKey: 'userId' })
