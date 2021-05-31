import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Expense } from 'src/core/entities/expense.entity';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class ExpenseService {
    constructor(@InjectRepository(Expense) private _expenseRepository: Repository<Expense>) {}

    getExpenses(groupId: number): Promise<Expense[]> {
        return this._expenseRepository.find({ where: { group: groupId }, relations: ['group', 'user'] });
    }

    createExpense(expense: Expense): Promise<Expense> {
        return this._expenseRepository.save(expense);
    }

    updateExpense(expense: Expense): Promise<Expense> {
        return this._expenseRepository.save(expense);
    }

    deleteExpense(id: number): Promise<DeleteResult> {
        return this._expenseRepository.delete(id);
    }
}
