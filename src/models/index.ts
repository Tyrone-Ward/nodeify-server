import { User } from './user.model'
import { Message } from './message.model'
import { Client } from './client.model'
import logger from '@utils/logger'

export const initDatabase = async () => {
    try {
        await User.sync()
        await Message.sync()
        await Client.sync()
        logger.info('All models were synchronized successfully.')
    } catch (error) {
        logger.error(error)
    }
}
