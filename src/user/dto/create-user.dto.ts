import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

// create-user-dto
export class CreateUserDto {
    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    avatarModelName: string

    @IsNotEmpty()
    iconPicture: string

    @IsNotEmpty()
    language: string

    @IsNotEmpty()
    showNicknames: boolean

    @IsNotEmpty()
    enableMusic: boolean

    @IsNotEmpty()
    @IsString()
    password: string
}
