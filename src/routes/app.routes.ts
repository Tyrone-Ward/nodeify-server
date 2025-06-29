import { Router } from 'express'
import { index, health, connectedClientsCount } from 'controllers/app.controller.js'

const appRouter = Router()

appRouter.get('/', index)
appRouter.get('/health', health)
appRouter.get('/clientcount', connectedClientsCount)

export default appRouter
