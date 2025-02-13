import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './user.dto';

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

    // Can be created only through register
    // @Post()
    // async createUser(@Body() userData: Partial<User>): Promise<User> {
    //     return this.usersService.create(userData);
    // }

    @Patch(':id')
    @ApiBody({ type: UpdateUserDto })
    async updateUser(
        @Param('id') id: string,
        @Body() userData: UpdateUserDto,
    ): Promise<User | null> {
        return this.usersService.update(id, userData);
    }

    @Patch('/settings/:id')
    @ApiBody({ type: UpdateUserDto })
    async updateUserSettings(
        @Param('id') id: string,
        @Body() settings: any,
    ) {
        return this.usersService.updateSettings(id, JSON.stringify(settings));
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string): Promise<boolean> {
        return this.usersService.delete(id);
    }
}
