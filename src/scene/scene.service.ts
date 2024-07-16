import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Scene } from './entities/scene.entity';
import { Repository } from 'typeorm';
import { Screen } from './entities/environment.objects/screen.entity';
import { CreateSceneDto, CreateScreenDto } from './dto/create.dto';
import { UpdateScreenDto } from './dto/update.dto';

@Injectable()
export class SceneService {
    constructor(
        @InjectRepository(Scene)
        private sceneRepository: Repository<Scene>,
        @InjectRepository(Screen)
        private screenRepository: Repository<Screen>
    ){}

    async getScene() {
        return this.sceneRepository.find();
    }

    async createScene(createSceneDto: CreateSceneDto): Promise<Scene> {
        return this.sceneRepository.save(createSceneDto);
    }
    
    async updateScene(id: number, updateSceneDto) {
        return this.sceneRepository.update(id, updateSceneDto);
    }

    async deleteScene(id: number) {
        return this.sceneRepository.delete(id);
    }



    async getScreen() {
        return this.screenRepository.find();
    }

    async createScreen(createScreenDto: CreateScreenDto): Promise<any> {
        return this.screenRepository.save(createScreenDto); 
    }

    async updateScreen(id: number, updateScreenDto: UpdateScreenDto) {
        await this.screenRepository.update(id, updateScreenDto);
        return this.screenRepository.findOneBy({ id: id});
    }

    async deleteScreen(id: number) {
        return this.screenRepository.delete(id);
    }
}
