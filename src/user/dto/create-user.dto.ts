import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator'

// create-user-dto
export class CreateUserDto {
    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsString()
    avatarModelName: string

    @IsString()
    iconPicture: string

    @IsString()
    language: string

    @IsBoolean()
    showNicknames: boolean

    @IsBoolean()
    enableMusic: boolean

    @IsString()
    password: string
}
