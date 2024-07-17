import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { MessengerService } from './messenger.service';
import { CreateChannelDto, CreateMessageDto } from './dto/create.dto';
import { UpdateChannelDto, UpdateMessageDto } from './dto/update.dto';

@Controller('messenger')
export class MessengerController {
    constructor(private messengerServie: MessengerService) {}

    @Get("message")
    getMessage() {
        return this.messengerServie.getMessage();
    }
    @Post("message")
    createMessage(@Body() createMessageDto: CreateMessageDto) {
        return this.messengerServie.createMessage(createMessageDto);
    }
    @Patch("message/:id")
    updateMessage(@Param('id') id: number, @Body() updateMessageDto: UpdateMessageDto) {
        return this.messengerServie.updateMessage(id, updateMessageDto);
    }
    @Delete("message/:id")
    deleteMessage(@Param('id') id: number) {
        return this.messengerServie.deleteMessage(id);
    }

    @Get("channel")
    async getChannel() {
        return await this.messengerServie.getChannel();
    }
    @Post("channel")
    async createChannel(@Body() createChannelDto: CreateChannelDto) {
        return await this.messengerServie.createChannel(createChannelDto);
    }
    @Patch("channel/:id")
    async updateChannel(@Param('id') id: string, @Body() updateChannelDto: UpdateChannelDto) {
        return await this.messengerServie.updateChannel(id, updateChannelDto);
    }
    @Delete("channel/:id")
    async deleteChannel(@Param('id') id: string) {
        return await this.messengerServie.deleteChannel(id);
    }
}
