import { PartialType } from '@nestjs/mapped-types'
import { CreateChannelDto, CreateMessageDto } from './create.dto';

export class UpdateMessageDto extends PartialType(CreateMessageDto) {}
export class UpdateChannelDto extends PartialType(CreateChannelDto) {}
