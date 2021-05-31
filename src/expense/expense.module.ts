import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from 'src/core';
import { Expense } from 'src/core/entities/expense.entity';
import { ExpenseController } from './expense.controller';
import { ExpenseService } from './expense.service';

@Module({
    imports: [TypeOrmModule.forFeature([Expense, Group])],
    controllers: [ExpenseController],
    providers: [ExpenseService],
})
export class ExpenseModule {}
