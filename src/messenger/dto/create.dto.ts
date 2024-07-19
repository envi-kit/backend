import { IsNotEmpty, IsString } from "class-validator";

export class CreateMessageDto {
    @IsNotEmpty()
    channelId: string

    @IsNotEmpty()
    @IsString()
    userId: string

    @IsNotEmpty()
    @IsString()
    text: string
}

export class CreateChannelDto {
    @IsNotEmpty()
    @IsString()
    name: string
}