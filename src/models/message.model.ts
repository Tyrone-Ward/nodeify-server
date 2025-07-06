import { DataTypes, Model } from 'sequelize'
import { sequelize } from '@config/database.config'
import { v7 } from 'uuid'

interface MessageAttributes {
    id?: string
    content: string
    recipient: string
    sender: string
    date?: Date
    isDelivered?: Boolean
}

interface MessageInstance extends Model<MessageAttributes>, MessageAttributes {}

export const Message = sequelize.define('Message', {
    id: {
        type: DataTypes.UUID,
        defaultValue: () => v7(),
        primaryKey: true
    },
    content: {
        type: DataTypes.STRING
    },
    recipient: {
        type: DataTypes.STRING
    },
    sender: {
        type: DataTypes.STRING
    },
    date: {
        type: DataTypes.DATE
    },
    isDelivered: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
})
