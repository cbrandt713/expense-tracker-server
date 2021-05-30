import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Expense } from 'src/core';
import { ExpenseService } from './expense.service';

@Controller('group/:groupId/expense')
export class ExpenseController {

    constructor(private _expenseService: ExpenseService) {}

    @Get('')
    getExpenses(@Param('groupId') groupId: number): Promise<Expense[]> {
        return this._expenseService.getExpenses(groupId);
    }

    @Post('/')
    createUser(@Body() expense: Expense): Promise<Expense> {
        return this._expenseService.createExpense(expense);
    }

    @Put('/:expenseId')
    updateUser(@Body() expense: Expense): Promise<Expense> {
        return this._expenseService.updateExpense(expense);
    }

    @Delete('/:expenseId')
    async deleteUser(@Param('expenseId') id: number): Promise<void> {
        await this._expenseService.deleteExpense(id);
    }
}
