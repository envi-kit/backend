import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

// create-user-dto
export class CreateUserDto {
    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    @IsEmail()
    email: string

    avatarModelName: string

    iconPicture: string

    language: string

    showNicknames: boolean

    enableMusic: boolean

    @IsString()
    password: string
}
