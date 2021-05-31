import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Expense } from './expense.entity';
import { Group } from './group.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    name: string;

    @ManyToMany((type) => Group, (group) => group.users)
    groups?: Group[];

    @OneToMany((type) => Expense, (expense) => expense.user)
    expenses?: Expense[];
}
