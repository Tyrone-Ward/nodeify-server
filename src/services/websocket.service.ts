import { WebSocketServer, WebSocket } from 'ws'
import url from 'url'
import { Client } from 'models/client.model'
import { Message } from 'models/message.model'
import logger from '@utils/logger'

type ClientRegistry = Map<string, Set<WebSocket>>
// type ClientInstance = string
export const connectedClients: ClientRegistry = new Map()

export const setupWebSocket = (wss: WebSocketServer): void => {
    wss.on('connection', async (ws: WebSocket, req) => {
        const parsedUrl = url.parse(req.url || '', true)
        const token = parsedUrl.query.token as string
        // logger.info(`token: ${token}`)

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

        const clientToken = client.token as string

        // Add connection to the client’s set
        if (!connectedClients.has(clientToken)) {
            connectedClients.set(clientToken, new Set())
        }
        connectedClients.get(clientToken)?.add(ws)

        logger.info(`Client ${client.name} connected (connections: ${connectedClients.get(clientToken)?.size})`)

        ws.on('close', () => {
            const clientSet = connectedClients.get(clientToken)
            if (clientSet) {
                clientSet.delete(ws)
                if (clientSet.size === 0) {
                    connectedClients.delete(clientToken)
                    logger.info(`Client ${clientToken} fully disconnected`)
                } else {
                    logger.info(`Client ${clientToken} connection closed (remaining: ${clientSet.size})`)
                }
            }
        })
        ws.on('error', (error) => {
            logger.error(error)
        })
    })
}

export const sendToClient = async (clientToken: string, content: any, senderToken: any): Promise<void> => {
    const sockets = connectedClients.get(clientToken)
    if (!sockets) return

    for (const ws of sockets) {
        if (ws.readyState === WebSocket.OPEN) {
            console.log('message:', { senderToken, content, clientToken })
            ws.send(JSON.stringify({ senderToken, content }))
        }
    }
}
