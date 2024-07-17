import {
    WebSocketGateway,
    SubscribeMessage,
    MessageBody,
    WebSocketServer,
    ConnectedSocket
} from '@nestjs/websockets'
import { MessengerService } from './messenger.service'
import { User } from 'src/user/entities/user.entity'
import { Server, Socket } from 'socket.io'

@WebSocketGateway()
export class MessengerGateway {
    @WebSocketServer()
    private socket: Server

    // constructor(private messengerService: MessengerService) {}

    @SubscribeMessage('messenger:connect')
    connect(@ConnectedSocket() client: Socket, @MessageBody() userdata: User) {
        client.data = userdata
    }

    @SubscribeMessage('messenger:join_room')
    joinRoom(@ConnectedSocket() client: Socket, @MessageBody() roomName: string) {
        client.rooms.clear()
        client.join(roomName)
    }

    @SubscribeMessage('messenger:send_message')
    sendMessage(@ConnectedSocket() client: Socket, @MessageBody() text: string) {
      this.socket.to(client.rooms[0]).emit("messenger:");
    }

    // @SubscribeMessage('createMessenger')
    // create(@MessageBody() createMessengerDto: CreateMessengerDto) {
    //   return this.messengerService.create(createMessengerDto);
    // }

    // @SubscribeMessage('findAllMessenger')
    // findAll() {
    //   return this.messengerService.findAll();
    // }

    // @SubscribeMessage('findOneMessenger')
    // findOne(@MessageBody() id: number) {
    //   return this.messengerService.findOne(id);
    // }

    // @SubscribeMessage('updateMessenger')
    // update(@MessageBody() updateMessengerDto: UpdateMessengerDto) {
    //   return this.messengerService.update(updateMessengerDto.id, updateMessengerDto);
    // }

    // @SubscribeMessage('removeMessenger')
    // remove(@MessageBody() id: number) {
    //   return this.messengerService.remove(id);
    // }
}
