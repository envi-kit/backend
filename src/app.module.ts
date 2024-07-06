import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { NotificationModule } from './notification/notification.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: '185.125.200.170',
            port: 3306,
            username: 'root',
            password: 'dys*qWj7^V7PtL',
            database: 'envi',
            entities: [User],
            synchronize: true,
        }),
        UserModule,
        NotificationModule,
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
