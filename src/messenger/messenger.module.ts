import { Module } from '@nestjs/common'
import { MessengerService } from './messenger.service'
import { MessengerGateway } from './messenger.gateway';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Message } from './entities/message.entity'
import { Channel } from './entities/channel.entity'
import { MessengerController } from './messenger.controller'

@Module({
    imports: [TypeOrmModule.forFeature([Message, Channel])],
    providers: [MessengerGateway, MessengerService],
    controllers: [MessengerController],
    exports: [MessengerService]
})
export class MessengerModule {}
