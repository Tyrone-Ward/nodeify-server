import { Sequelize, DataTypes } from 'sequelize'
import logger from '@utils/logger'
import { sequelize } from '@config/database.config'
import { nanoid } from 'nanoid'

export const Client = sequelize.define('Client', {
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
