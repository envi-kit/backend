import { Injectable } from '@nestjs/common'
import { CreateChannelDto, CreateMessageDto } from './dto/create.dto';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Channel } from './entities/channel.entity'
import { Message } from './entities/message.entity'
import { UpdateChannelDto, UpdateMessageDto } from './dto/update.dto';

@Injectable()
export class MessengerService {
    constructor(
        @InjectRepository(Message) private messageRepository: Repository<Message>,
        @InjectRepository(Channel) private channelRepository: Repository<Channel>,
    ) {}
    
    async getMessage(options: any) {
        return (await this.messageRepository.find(options)).reverse();
    }

    async getMessageById(id: number) {
        return await this.messageRepository.findOne({
            where: { id: id },
            relations: {
                user: true,
            },
            select: {
                id: true,
                text: true,
                createdAt: true,
                user: {
                    id: true,
                    name: true
                }
            }
        });
    }

    async createMessage(createMessageDto: CreateMessageDto) {
        return await this.messageRepository.insert(createMessageDto);
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
