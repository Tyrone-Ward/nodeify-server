import 'dotenv/config'
import http from 'node:http'
import { app } from './app.config.js'
import { WebSocketServer } from 'ws'
import { setupWebSocket } from '@services/websocket.service.js'

type ServerHostname = string
type ServerPort = number

const expressServer = http.createServer(app)

const wss = new WebSocketServer({ server: expressServer })
setupWebSocket(wss)

const DEVELOPMENT = process.env.NODE_ENV === 'development'
const TEST = process.env.NODE_ENV === 'test'

const SERVER_HOSTNAME: ServerHostname = process.env.SERVER_HOSTNAME || 'localhost'
const SERVER_PORT: ServerPort = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 3000

export { SERVER_HOSTNAME, SERVER_PORT, expressServer }
