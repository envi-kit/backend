import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post, UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';


@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    @ApiOperation({ summary: 'Get list of users' })
    async getAllUsers(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get single user by id' })
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
