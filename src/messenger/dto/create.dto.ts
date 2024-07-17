import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateMessageDto {
    @IsNotEmpty()
    @IsString()
    channel: string

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