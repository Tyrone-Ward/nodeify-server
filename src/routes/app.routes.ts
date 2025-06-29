import { Router } from 'express'
import { index, health, connectedClientsCount, createClient } from 'controllers/app.controller.js'

const appRouter = Router()

appRouter.get('/', index)
appRouter.get('/health', health)
appRouter.get('/clientcount', connectedClientsCount)

appRouter.post('/client', createClient)

export default appRouter
