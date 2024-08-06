import { MessageBody, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets'
import { Socket } from 'socket.io'

@WebSocketGateway({ cors: true })
export class AppGateway {
    handleDisconnect(client: Socket) {
        console.log(`Disconnected: ${client.id}`)
    }
    handleConnection(client: Socket,...args: any[]) {
        console.log(`Connected ${client.id}`)
    }
}
