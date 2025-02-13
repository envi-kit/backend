import {
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AnalyticsService } from './analytics/analytics.service';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { EventType } from './analytics/enum/EventType';

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class AppGateway {
    @WebSocketServer()
    server: Server;

    constructor(
        private readonly analyticsService: AnalyticsService,
        private readonly configService: ConfigService,
    ) {}


    async handleConnection(client: Socket) {
        const token = client.handshake.headers.authorization?.split(' ')[1];

        if (!token) {
            client.disconnect();
            return;
        }

        const payload = jwt.verify(
            token, this.configService.get<string>('JWT_SECRET')) as { sub: string };

        if (!payload?.sub) {
            client.disconnect();
            return;
        }

        client.data.userId = payload.sub;

        await this.analyticsService.create(client.data.userId, EventType.UserConnected);

        console.log('Client connected', client.data.userId);
    }

    async handleDisconnect(client: Socket) {
        await this.analyticsService.create(client.data.userId, EventType.UserDisconnected);
        console.log('Client disconnected', client.data.userId);
    }
}
