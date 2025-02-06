import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { User } from '../users/user.entity';
import { CurrentUser } from './decorators/current-user.decorator';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get('google')
    @UseGuards(GoogleAuthGuard)
    async googleAuth() {
    }

    @Get('google/redirect')
    @UseGuards(GoogleAuthGuard)
    googleAuthRedirect(@CurrentUser() user: User) {
        // После успешной аутентификации, Google перенаправляет сюда
        return this.authService.login(user);
    }

    @Get('profile')
    @UseGuards(JwtAuthGuard)  // Защищаем маршрут проверкой JWT
    async getProfile(@CurrentUser() user: User) {
        return user;  // Возвращаем текущего пользователя из JWT
    }
}
