import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Group } from 'src/core';
import { GroupService } from './group.service';

@Controller('group')
export class GroupController {
    constructor(private _groupService: GroupService) {}

    @Get('/')
    getGroups(): Promise<Group[]> {
        return this._groupService.getAllGroups();
    }

    @Post('/')
    createUser(@Body() group: Group): Promise<Group> {
        return this._groupService.createGroup(group);
    }

    @Put('/:groupId')
    updateUser(@Body() group: Group): Promise<Group> {
        return this._groupService.updateGroup(group);
    }

    @Delete('/:groupId')
    async deleteUser(@Param('groupId') id: number): Promise<void> {
        await this._groupService.deleteGroup(id);
    }

}
