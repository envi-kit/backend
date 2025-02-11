import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEmail, IsString, IsUUID } from 'class-validator';

export class UserDto {
    @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
    @IsUUID()
    id: string;

    @ApiProperty({ example: 'John Doe' })
    @IsString()
    name: string;

    @ApiProperty({ example: 'john@example.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'default.png'})
    @IsString()
    picture: string;

    @ApiProperty({ example: '{"avatar":"Male01"}' })
    @IsString()
    settings: string
}
export class UpdateUserDto extends PartialType(UserDto) {}