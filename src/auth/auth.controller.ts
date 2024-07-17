import { Body, ClassSerializerInterceptor, Controller, Get, HttpCode, Post, Req, Request, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service'
import { Public } from './decorators/public.decorator'
import { LocalAuthGuard } from './guards/local-auth.guard'
import { UserService } from '../user/user.service'
import { User } from 'src/user/entities/user.entity'
import { CreateUserDto } from 'src/user/dto/create-user.dto'

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private userService: UserService
    ){}

    @Public()
    @UseGuards(LocalAuthGuard)
    @HttpCode(200)
    @Post('sign-in')
    async signIn(@Request() req) {
        return this.authService.login(req.user)
    }

    @Public()
    @UseInterceptors(ClassSerializerInterceptor)
    @HttpCode(200)
    @Post('sign-up')
    async signUp(@Body() createUserDto: CreateUserDto) {
        return await this.userService.create(createUserDto)
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get("profile")
    async getProfile(@Request() req) {
        return await this.userService.findOne(req.user.userId)
    }
}
