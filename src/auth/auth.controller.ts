import {
    Body,
    Controller,
    Get,
    Patch,
    Post,
    Req,
    Res,
    UnauthorizedException,
    UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { User } from '../users/user.entity';
import { CurrentUser } from './decorators/current-user.decorator';
import { Request, Response } from 'express';
import { UsersService } from '../users/users.service';
import { ApiExcludeController } from '@nestjs/swagger';


@ApiExcludeController()
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly usersService: UsersService,
    ) {}

    @Get('google')
    @UseGuards(GoogleAuthGuard)
    async googleAuth() {}

    @Get('google/redirect')
    @UseGuards(GoogleAuthGuard)
    async googleAuthRedirect(@CurrentUser() user: User, @Res() res: Response) {
        const { accessToken, refreshToken } =
            await this.authService.login(user);

        res.cookie('refresh_token', refreshToken, {
            httpOnly: true,
        });

        return res.json({
            access_token: accessToken,
        });
    }

    @Get('refresh')
    async refresh(@Req() req: Request, @Res() res: Response) {
        const extractedToken = req.cookies['refresh_token'];
        console.log('Extract refresh token from cookies', extractedToken);

        if (!extractedToken) {
            throw new UnauthorizedException('Refresh token not found');
        }

        try {
            const { accessToken, refreshToken } =
                await this.authService.refreshTokens(extractedToken);

            res.cookie('refresh_token', refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
            });

            return res.json({ access_token: accessToken });
        } catch (err) {
            return res.status(401).json({ message: 'Invalid refresh token' });
        }
    }

    @Get('profile')
    @UseGuards(JwtAuthGuard)
    async getProfile(@CurrentUser() user: User): Promise<User> {
        return user;
    }

    @Post('register')
    async register(
        @Body() dto: { email: string; name: string; password: string },
    ) {
        return this.usersService.register(dto.email, dto.name, dto.password);
    }

    @Post('login')
    async login(
        @Body() body: { email: string; password: string },
        @Res() res: Response
    ) {
        const user = await this.authService.validateUserByCredentials(body.email, body.password);

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const { accessToken, refreshToken } = await this.authService.login(user);

        res.cookie('refresh_token', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
        });

        return res.json({ access_token: accessToken });
    }

    @Patch('set-password')
    @UseGuards(JwtAuthGuard)
    async setPassword(
        @CurrentUser() user: User,
        @Body('password') password: string,
    ) {
        await this.authService.setPassword(user.id, password);
        return { message: 'Password has been updated' };
    }
}
