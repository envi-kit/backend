import { IsNotEmpty, IsString } from "class-validator";

export class CreateNotificationDto {
    @IsString()
    @IsNotEmpty()
    recipient: string

    @IsString()
    text: string
}
