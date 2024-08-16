import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator'

// create-user-dto
export class CreateUserDto {
    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsString()
    @IsOptional()
    avatarModelName: string

    @IsString()
    @IsOptional()
    iconPicture: string

    @IsString()
    @IsOptional()
    language: string

    @IsBoolean()
    @IsOptional()
    showNicknames: boolean

    @IsBoolean()
    @IsOptional()
    enableMusic: boolean

    @IsString()
    password: string
}
