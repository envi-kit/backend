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
import { CreateMessageDto } from './dto/create.dto';
import { MessengerService } from './messenger.service'

@WebSocketGateway({ cors: true })
export class MessengerGateway {
    @WebSocketServer()
    private socket: Server

    constructor(private readonly messengerService: MessengerService) {}

    // @SubscribeMessage('messenger:connect')
    // connect(@ConnectedSocket() client: Socket, @MessageBody() userdata: User) {
    //     client.data = userdata;
    // }

    @SubscribeMessage('messenger:joinRoom')
    async joinRoom(@ConnectedSocket() client: Socket, @MessageBody() channelName: string) {
        let channel = await this.messengerService.getChannelByName(channelName);
        
        if (channel) {
            client.rooms.clear();
            client.join(channel.id);

            console.log(`Client ${client.id} connected to channel ${channel.name}`);
            return channel;
        } else {
            throw new WsException("Channel not found");
        }
    }
    @SubscribeMessage('messenger:leaveChat')
    async leaveChat(@ConnectedSocket() client: Socket) {
        client.rooms.clear();
        return client.rooms;
    }
    @SubscribeMessage('messenger:sendMessage')
    async sendMessage(@ConnectedSocket() client: Socket, @MessageBody() createMessageDto: CreateMessageDto) {
        let message = await this.messengerService.createMessage(createMessageDto)
        
        if (message) {
            this.socket.to(message.channelId).emit("messenger:broadcastMessage", message)
        }
    }

    broadcastMessage(message: any) {
        this.socket
            .to(message.channelId)
            .emit('messenger:broadcastMessage', message);
    }
}
