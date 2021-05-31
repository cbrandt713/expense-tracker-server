import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from 'src/core/entities/group.entity';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class GroupService {
    constructor(@InjectRepository(Group) private _groupRepository: Repository<Group>) {}

    getAllGroups(): Promise<Group[]> {
        return this._groupRepository.find();
    }

    createGroup(group: Group): Promise<Group> {
        return this._groupRepository.save(group);
    }

    updateGroup(group: Group): Promise<Group> {
        return this._groupRepository.save(group);
    }

    deleteGroup(id: number): Promise<DeleteResult> {
        return this._groupRepository.delete(id);
    }
}
