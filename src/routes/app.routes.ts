import { Router } from 'express'
import { index, health, connectedClientsCount, createClient, sendMessage } from 'controllers/app.controller.js'
import { requireAdmin, authCheck } from '@middleware/auth.middleware'

const appRouter = Router()

appRouter.get('/', index)
appRouter.get('/health', health)
appRouter.get('/clientcount', connectedClientsCount)

appRouter.post('/client', requireAdmin, createClient)
appRouter.post('/message', sendMessage)

export default appRouter
