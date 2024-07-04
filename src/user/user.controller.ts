import { Controller, Get, Post, Patch, Delete } from '@nestjs/common';

@Controller('user')
export class UserController {

    @Get()
    getUser(): string {
        return "GET /user"
    }

    @Post()
    addUser(): string {
        return "POST /user"
    }

    @Patch()
    updateUser(): object {
        return { "message": "PATCH /user" }
    }

    @Delete()
    deleteUser(): string {
        return "DELETE /user"
    }
}
