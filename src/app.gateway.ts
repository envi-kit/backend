import {
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AnalyticsService } from './analytics/analytics.service';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

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

        const secret = this.configService.get<string>('JWT_SECRET');
        const payload = jwt.verify(token, secret) as { sub: string };

        if (!payload?.sub) {
            client.disconnect();
            return;
        }
        //
        // await this.analyticsService.create(client.data.userId, EventType.UserConnected);

        client.data.userId = payload.sub;

        console.log('Client connected', client.data.userId);
    }

    async handleDisconnect(client: Socket) {
        console.log('Client disconnected', client.data.userId);
    }

    // private getUuidFromJwt(client: Socket) {
    //     try {
    //         const token = client.handshake.headers.authorization?.split(' ')[1];
    //
    //         if (!token) return null;
    //
    //         const decodingResult = jwt.decode(token, this.configService.get('JWT_SECRET'));
    //
    //         return decodingResult;
    //     }
    // }
}
