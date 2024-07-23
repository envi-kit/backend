import { Injectable } from '@nestjs/common'
import { CreateChannelDto, CreateMessageDto } from './dto/create.dto';
import { MessengerGateway } from './messenger.gateway'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Channel } from './entities/channel.entity'
import { Message } from './entities/message.entity'
import { UpdateChannelDto, UpdateMessageDto } from './dto/update.dto';
import { take } from 'rxjs';

@Injectable()
export class MessengerService {
    constructor(
        @InjectRepository(Message) private messageRepository: Repository<Message>,
        @InjectRepository(Channel) private channelRepository: Repository<Channel>,
    ) {}
    
    async getMessage(options: any) {
        return await this.messageRepository.find(options);
    }

    async createMessage(createMessageDto: CreateMessageDto) {
        await this.messageRepository.insert(createMessageDto);
        return createMessageDto;
    }

    async updateMessage(id: number, updateMessageDto: UpdateMessageDto) {
        return this.messageRepository.update(id, updateMessageDto);
    }

    async deleteMessage(id: number) {
        return this.messageRepository.delete({ id: id });
    }



    async getChannel(options: any) {
        return this.channelRepository.find(options);
    }

    async getChannelByName(name: string) {
        return this.channelRepository.findOneBy({ name: name });
    }
    
    async createChannel(createChannelDto: CreateChannelDto){
        return this.channelRepository.save(createChannelDto);
    }

    async updateChannel(id: string, updateChannelDto: UpdateChannelDto) {
        return this.channelRepository.update(id, updateChannelDto);
    }

    async deleteChannel(id: string) {
        return this.channelRepository.delete({ id: id });
    }
}
