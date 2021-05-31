import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Expense } from './expense.entity';
import { User } from './user.entity';

@Entity()
export class Group {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    name: string;

    @ManyToMany((type) => User, (user) => user.groups, { eager: true })
    @JoinTable()
    users: User[];

    @OneToMany((type) => Expense, (expense) => expense.group, { eager: true })
    expenses: Expense[];
}
