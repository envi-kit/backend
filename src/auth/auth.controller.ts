import { ClassSerializerInterceptor, Controller, Get, HttpCode, Post, Request, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UserService } from '../user/user.service';
import { User } from 'src/user/entities/user.entity';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private userService: UserService
    ){}

    @Public()
    @UseGuards(LocalAuthGuard)
    @HttpCode(200)
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get("profile")
    async getProfile(@Request() req) {
        return await this.userService.findOne(parseInt(req.user.userId));
    }
}
