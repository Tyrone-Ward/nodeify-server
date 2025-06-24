import { Sequelize, DataTypes } from 'sequelize'
import logger from '@utils/logger'
import { sequelize } from '@config/database.config'
import { v7 } from 'uuid'

export const Message = sequelize.define('Message', {
    _id: {
        type: DataTypes.UUID,
        defaultValue: v7(),
        primaryKey: true
    },
    message: {
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
        type: DataTypes.BOOLEAN
    }
})
