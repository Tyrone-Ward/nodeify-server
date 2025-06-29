import { WebSocketServer, WebSocket } from 'ws'
import url from 'url'
import { Client } from 'models/client.model'
import logger from '@utils/logger'

type ClientRegistry = Map<string, Set<WebSocket>>
export const connectedClients: ClientRegistry = new Map()

export const setupWebSocket = (wss: WebSocketServer): void => {
    wss.on('connection', async (ws: WebSocket, req) => {
        const parsedUrl = url.parse(req.url || '', true)
        const token = parsedUrl.query.token as string
        logger.info('token:', token)

        if (!token) {
            ws.close(4001, 'Token required')
            logger.warn('No token provided')
            return
        }

        // Lookup client by token
        const client = await Client.findOne({ where: { token } })
        if (!client) {
            ws.send(JSON.stringify({ error: 'incorrect credentials' }))
            ws.close(4003, 'Invalid token')
            logger.warn('Invalid token')
            return
        }

        const clientToken = client.token

        // Add connection to the client’s set
        if (!connectedClients.has(clientToken)) {
            connectedClients.set(clientToken, new Set())
        }
        connectedClients.get(clientToken)?.add(ws)

        console.log(`Client ${client.name} connected (connections: ${connectedClients.get(clientToken)?.size})`)

        ws.on('close', () => {
            const clientSet = connectedClients.get(clientToken)
            if (clientSet) {
                clientSet.delete(ws)
                if (clientSet.size === 0) {
                    connectedClients.delete(clientToken)
                    console.log(`Client ${clientToken} fully disconnected`)
                } else {
                    console.log(`Client ${clientToken} connection closed (remaining: ${clientSet.size})`)
                }
            }
        })
        ws.on('error', console.error)
    })
}

export const sendToClient = (clientToken: string, message: any, senderToken: string): void => {}
