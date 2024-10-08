import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket, WebSocketServer } from '@nestjs/websockets'
import { NotificationService } from './notification.service'
import { CreateNotificationDto } from './dto/create-notification.dto'
import { UpdateNotificationDto } from './dto/update-notification.dto'
import { Server, Socket } from 'socket.io'

@WebSocketGateway({ cors: true})
export class NotificationGateway {
    @WebSocketServer()
    private socket: Server;

    constructor(private readonly notificationService: NotificationService) {}

    @SubscribeMessage('sendNotification')
    broadcastNotification(@MessageBody() text: string) {
        this.socket.emit('broadcastNotification', text);
    }

    // @SubscribeMessage('createNotification')
    // create(@MessageBody() createNotificationDto: CreateNotificationDto) {
    //     return this.notificationService.create(createNotificationDto)
    // }

    // @SubscribeMessage('findAllNotification')
    // findAll() {
    //     return this.notificationService.findAll()
    // }

    // @SubscribeMessage('findOneNotification')
    // findOne(@MessageBody() id: number) {
    //     return this.notificationService.findOne(id)
    // }

    // @SubscribeMessage('updateNotification')
    // update(@MessageBody() updateNotificationDto: UpdateNotificationDto) {
    //     return this.notificationService.update(updateNotificationDto.id, updateNotificationDto)
    // }

    // @SubscribeMessage('removeNotification')
    // remove(@MessageBody() id: number) {
    //     return this.notificationService.remove(id)
    // }
}
