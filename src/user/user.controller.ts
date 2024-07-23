import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    NotFoundException,
    UseGuards
} from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return await this.userService.create(createUserDto)
    }

    @Get()
    async findAll() {
        return await this.userService.findAll()
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        let user: User = await this.userService.findOne(id)

        if (user) return user
        else throw new NotFoundException()
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<UpdateResult> {
        console.log(updateUserDto, id);
        return await this.userService.update(id, updateUserDto)
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<DeleteResult> {
        return await this.userService.remove(id)
    }
}
