import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.entity';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

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
            expiresIn: this.configService.get('JWT_ACCESS_EXPIRE') ?? '15m'
        })
        const refreshToken: string = this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_SECRET'),
            expiresIn: this.configService.get('JWT_REFRESH_EXPIRE') ?? '7d'
        })

        return { accessToken, refreshToken };
    }

    async refreshTokens(refreshToken: string) {
        let payload: any;

        try {
            payload = this.jwtService.verify(refreshToken, {
                secret: this.configService.get<string>('JWT_SECRET')
            });
        }
        catch (e) {
            throw new Error('Invalid refresh token');
        }

        const user = await this.usersService.findById(payload.sub);

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return this.login(user);
    }

    async setPassword(id: string, password: string) {
        const hashedPassword = await bcrypt.hash(password, 10);
        await this.usersService.update(id, { passwordHash: hashedPassword })
    }

    async validateUser(id: string): Promise<User> {
        return this.usersService.findById(id);
    }

    async validateUserByCredentials(email: string, password: string): Promise<User | null> {
        const user = await this.usersService.findByEmail(email);

        if (!user) return null;

        const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
        return isPasswordValid ? user : null;
    }
}
