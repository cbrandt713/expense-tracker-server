import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Group } from "./group.entity";
import { User } from "./user.entity";

@Entity()
export class Expense {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    cost: number;

    @Column()
    purpose?: string;

    @ManyToOne(type => Group, group => group.expenses)
    group: Group;

    @ManyToOne(type => User, user => user.expenses, { eager: true })
    user: User;
}