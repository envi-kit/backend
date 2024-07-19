import { IsNotEmpty, IsString } from "class-validator";

export class CreateMessageDto {
    @IsNotEmpty()
    channelId: string

    @IsNotEmpty()
    @IsString()
    sender: string

    @IsNotEmpty()
    @IsString()
    text: string
}

export class CreateChannelDto {
    @IsNotEmpty()
    @IsString()
    name: string
}