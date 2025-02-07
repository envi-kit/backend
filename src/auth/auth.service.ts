import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService
    ) {}

    async login(user: User) {
        const payload = { email: user.email, sub: user.id };

        const accessToken: string = this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_SECRET'),
            expiresIn: '15m'
        })
        const refreshToken: string = this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_SECRET'),
            expiresIn: '7d'
        })

        return { accessToken, refreshToken };
    }

    // async verifyToken
    async refreshTokens(refreshToken: string) {
        try {
            const payload = this.jwtService.verify(refreshToken, {
                secret: this.configService.get<string>('JWT_SECRET')
            });
            const user = await this.usersService.findById(payload.sub);

            if (!user) {
                throw new NotFoundException('User not found');
            }

            return this.login(user);
        }
        catch (e) {
            throw new Error('Invalid refresh token');
        }
    }

    async validateUser(id: string): Promise<User> {
        return this.usersService.findById(id);
    }
}
