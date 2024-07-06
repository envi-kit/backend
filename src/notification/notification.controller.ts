import { Body, Controller, Post } from '@nestjs/common';
import { ConnectedSocket, WebSocketServer } from '@nestjs/websockets';
import { NotificationGateway } from './notification.gateway';

@Controller('notification')
export class NotificationController {

    constructor(private notificationGateway: NotificationGateway) {}

    @Post()
    broadcastNotification(@Body() text: any): void {
        this.notificationGateway.broadcastNotification(text);
    }
}
