import {
    WebSocketGateway,
    SubscribeMessage,
    MessageBody,
    WebSocketServer,
    ConnectedSocket,
    WsException
} from '@nestjs/websockets'
import { User } from 'src/user/entities/user.entity'
import { Server, Socket } from 'socket.io'
import { CreateMessageDto } from './dto/create.dto'
import { MessengerService } from './messenger.service'

@WebSocketGateway()
export class MessengerGateway {
    @WebSocketServer()
    private socket: Server

    constructor(private readonly messengerService: MessengerService) {}

    @SubscribeMessage('messenger:connect')
    connect(@ConnectedSocket() client: Socket, @MessageBody() userdata: User) {
        client.data = userdata;
    }

    @SubscribeMessage('messenger:join_room')
    async joinRoom(@ConnectedSocket() client: Socket, @MessageBody() channelName: string) {
        let channel = await this.messengerService.getChannelByName(channelName);
        
        if (channel) {
            client.rooms.clear();
            client.join(channel.id);
            return channel;
        } else {
            throw new WsException("Channel not found");
        }
    }

    broadcastMessage(message: any) {
        this.socket.to(message.channelId).emit('messenger:broadcast_message', message);
        console.log(message);
    }


    handleDisconnect(client: Socket) {
        console.log(`Disconnected: ${client.id}`);
    }

    handleConnection(client: Socket, ...args: any[]) {
        console.log(`Connected ${client.id}`);
    }
}
