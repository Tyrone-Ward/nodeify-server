import express from 'express'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'
import morganMiddleware from 'middleware/httpLpgger.js'
import { errorHandler } from 'middleware/errorHandler.js'

export const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cors())
app.use(morganMiddleware)

// Routes

// Global error handler (should be after routes)
app.use(errorHandler)

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Nodeify Server API',
            version: '1.0.0',
            description: 'A simple API for sending and receiving messages in real-time per WebSocket.'
        }
    },
    apis: ['../controllers/message.controller.ts', '../models/messages.model.ts'] // files containing annotations as above
}

const swaggerSpec = swaggerJsdoc(options)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
