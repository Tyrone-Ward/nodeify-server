import express from 'express'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'
import morganMiddleware from 'middleware/httpLpgger.js'
import { errorHandler } from 'middleware/errorHandler.js'
import appRouter from 'routes/app.routes.js'
import { notFound } from 'middleware/notFound'
import { version } from '../../package.json'
import { authRouter } from 'routes/auth.routes'

export const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cors())
app.use(morganMiddleware)

// Routes
app.use('/', appRouter)
app.use('/auth', authRouter)

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Nodeify Server API',
            version: version,
            description: 'A simple API for sending and receiving messages in real-time per WebSocket.'
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Development server'
            }
        ]
    },
    apis: ['./src/controllers/*.ts', './src/models/*.ts', './src/middleware/errorHandler.ts'] // files containing annotations as above
}

const swaggerSpec = swaggerJsdoc(options)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// Global error handlers
app.use(notFound)
app.use(errorHandler)
