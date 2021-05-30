import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { User } from 'src/core/entities/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private _userService: UserService) {}

    @Get('/')
    getUsers(): Promise<User[]> {
        return this._userService.getUsers();
    }

    @Post('/')
    createUser(@Body() user: User): Promise<User> {
        return this._userService.createUser(user);
    }

    @Put('/:userId')
    updateUser(@Body() user: User): Promise<User> {
        return this._userService.updateUser(user);
    }

    @Delete('/:userId')
    async deleteUser(@Param('userId') id: number): Promise<void> {
        await this._userService.deleteUser(id);
    }
}
