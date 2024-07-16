import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Public } from 'src/auth/decorators/public.decorator';
import { SceneService } from './scene.service';
import { CreateSceneDto, CreateScreenDto } from './dto/create.dto';
import { UpdateSceneDto, UpdateScreenDto } from './dto/update.dto';
import { SceneGateway } from './scene.gateway';
import { Screen } from './entities/environment.objects/screen.entity';

@Controller('scene')
export class SceneController {

    constructor(
        private sceneSevice: SceneService,
        private sceneGateway: SceneGateway
    ) {}

    // Scene
    @Get()
    async getAllScenes() {
        return await this.sceneSevice.getScene();
    }
    @Post("")
    async addScene(@Body() createSceneDto: CreateSceneDto) {
        return await this.sceneSevice.createScene(createSceneDto);
    }
    @Patch(":id")
    async updateScene(@Param('id') id: number, @Body() updateSceneDto: UpdateSceneDto) {
        return await this.sceneSevice.updateScene(id, updateSceneDto);
    }
    @Delete(":id")
    async deleteScene(@Param('id') id: number) {
        return await this.sceneSevice.deleteScene(id);
    }


    // Screens
    @Get("screen")
    async getScreen() {
        return await this.sceneSevice.getScreen();
    }
    @Post("screen")
    async addScreen(@Body() createScreenDto: CreateScreenDto) {
        return await this.sceneSevice.createScreen(createScreenDto);
    }
    @Patch("screen/:id")
    async updateScreen(@Param('id') id: number, @Body() updateScreenDto: UpdateScreenDto) {
        let result: Screen = await this.sceneSevice.updateScreen(id, updateScreenDto);
        this.sceneGateway.broadcastScreenUpdate(result);
        return result;
    }
    @Delete("screen/:id")
    async deleteScreen(@Param('id') id: number) {
        return await this.sceneSevice.deleteScreen(id);
    }

    // @Public()
    // @Patch("screen/:id")
    // async updateScreen(@Param('id') id: number, @Body() updateScreenDto: UpdateScreenDto) {
    //     return await this.sceneSevice.updateScreen(id, updateScreenDto);
    // }
}
