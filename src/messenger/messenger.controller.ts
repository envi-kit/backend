import { BadRequestException, Body, Controller, Delete, Get, HttpException, NotFoundException, Param, Patch, Post, Query } from '@nestjs/common';
import { MessengerService } from './messenger.service';
import { CreateChannelDto, CreateMessageDto } from './dto/create.dto';
import { UpdateChannelDto, UpdateMessageDto } from './dto/update.dto';
import { ConnectedSocket } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Channel } from './entities/channel.entity';
import { MessengerGateway } from './messenger.gateway';
import { take } from 'rxjs';
import { query } from 'express';
import { LessThan, LessThanOrEqual } from 'typeorm';


@Controller('messenger')
export class MessengerController {

    private readonly DEFAULT_LIMIT = 10;

    constructor(
        private messengerService: MessengerService,
        private messengerGateway: MessengerGateway
    ) {}


    @Get("message")
    getMessage(@Body() options: any) {
        return this.messengerService.getMessage(options);
    }
    @Get("message/channel/:id")
    getMessageFromChannel(@Param("id") channelId: string, @Query() query: any) {
        let options = {
            where: {
                channelId: channelId,
                id: query.lastMessageId ? LessThan(query.lastMessageId) : null
            },
            order: {
                id: "DESC"
            },
            take: query.limit ? query.limit : this.DEFAULT_LIMIT,
            relations: {
                user: true,
            },
            select: {
                id: true,
                text: true,
                createdAt: true,
                user: {
                    name: true
                }
            }
        }

        return this.messengerService.getMessage(options);
    }
    @Post("message")
    async createMessage(@Body() createMessageDto: CreateMessageDto) {
        if (!createMessageDto.channelId) 
            throw new BadRequestException("Channel id not provided");

        let insertResult = await this.messengerService.createMessage(createMessageDto); 
        this.messengerGateway.broadcastMessage(insertResult);

        return insertResult;
    }
    @Patch("message/:id")
    updateMessage(@Param('id') id: number, @Body() updateMessageDto: UpdateMessageDto) {
        return this.messengerService.updateMessage(id, updateMessageDto);
    }
    @Delete("message/:id")
    deleteMessage(@Param('id') id: number) {
        return this.messengerService.deleteMessage(id);
    }
    

    @Get("channel")
    async getChannel(@Body() options: any) {
        return await this.messengerService.getChannel(options);
    }
    @Get("channel/:name")
    async getChannelByName(@Param('name') name: string) {
        let result = await this.messengerService.getChannelByName(name);
        if (!result) {
            throw new NotFoundException("Channel is not founded by provided name");
        }
        return result;
    }
    @Post("channel")
    async createChannel(@Body() createChannelDto: CreateChannelDto) {
        return await this.messengerService.createChannel(createChannelDto);
    }
    @Patch("channel/:id")
    async updateChannel(@Param('id') id: string, @Body() updateChannelDto: UpdateChannelDto) {
        return await this.messengerService.updateChannel(id, updateChannelDto);
    }
    @Delete("channel/:id")
    async deleteChannel(@Param('id') id: string) {
        return await this.messengerService.deleteChannel(id);
    }
}
