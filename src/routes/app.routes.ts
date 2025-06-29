import { Router } from 'express'
import { index, health, connectedClientsCount, createClient } from 'controllers/app.controller.js'
import { requireAdmin } from '@middleware/auth.middleware'

const appRouter = Router()

appRouter.get('/', index)
appRouter.get('/health', health)
appRouter.get('/clientcount', connectedClientsCount)

appRouter.post('/client', requireAdmin, createClient)

export default appRouter
