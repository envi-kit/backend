import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';


@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    async getAllUsers(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @Get(':id')
    async getUserById(@Param('id') id: string): Promise<User | null> {
        return this.usersService.findById(id);
    }

    @Post()
    async createUser(@Body() userData: Partial<User>): Promise<User> {
        return this.usersService.create(userData);
    }

    @Patch(':id')
    async updateUser(
        @Param('id') id: string,
        @Body() userData: Partial<User>,
    ): Promise<User | null> {
        return this.usersService.update(id, userData);
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string): Promise<boolean> {
        return this.usersService.delete(id);
    }
}
