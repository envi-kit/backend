import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { UsersService } from '../../users/users.service';
import { AuthService } from '../auth.service';
import { User } from '../../users/user.entity';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {

    constructor(
        private readonly usersService: UsersService,
        private readonly authService: AuthService
    ) {
        super({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
            scope: ['email', 'profile'],
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: any): Promise<any> {
        const { id, emails, displayName, photos } = profile;
        const userEmail = emails[0].value;
        const userName = displayName;
        const userPicture = photos[0].value;

        let user = await this.usersService.findByEmail(userEmail);

        if (!user) {
            user = await this.usersService.create({
                email: userEmail,
                name: userName,
                picture: userPicture,
            });
        }

        return this.authService.login(user);
    }
}