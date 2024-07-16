import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import { SceneService } from './scene.service'
import { Server } from 'socket.io';
import { Screen } from './entities/environment.objects/screen.entity';

@WebSocketGateway()
export class SceneGateway {
    @WebSocketServer()
    private socket: Server;
    
    constructor(private readonly sceneService: SceneService) {}

    broadcastScreenUpdate(screen: Screen) {
        this.socket.emit('scene:screen_updated', screen);
    }
}
