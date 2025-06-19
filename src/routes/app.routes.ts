import { Router } from 'express'
import { health } from 'controllers/app.controller.js'

const appRouter = Router()

appRouter.get('/health', health)

export default appRouter
