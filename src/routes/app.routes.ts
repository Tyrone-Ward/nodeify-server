import { Router } from 'express'
import { index, health } from 'controllers/app.controller.js'

const appRouter = Router()

appRouter.get('/', index)
appRouter.get('/health', health)

export default appRouter
