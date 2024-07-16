import { Module } from '@nestjs/common';
import { SceneService } from './scene.service';
import { SceneGateway } from './scene.gateway';
import { SceneController } from './scene.controller';
import { Scene } from './entities/scene.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stand } from './entities/environment.objects/stand.entity';
import { Screen } from './entities/environment.objects/screen.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Scene, Screen, Stand])],
  providers: [SceneGateway, SceneService],
  controllers: [SceneController],
  exports: [SceneService]
})
export class SceneModule {}
