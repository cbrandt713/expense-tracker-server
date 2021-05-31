import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/core/entities/user.entity';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private _userRepository: Repository<User>) {}

    getUsers(): Promise<User[]> {
        return this._userRepository.find();
    }

    createUser(user: User): Promise<User> {
        return this._userRepository.save(user);
    }

    updateUser(user: User): Promise<User> {
        return this._userRepository.save(user);
    }

    deleteUser(id: number): Promise<DeleteResult> {
        return this._userRepository.delete(id);
    }
}
