import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Debt, Expense, Group, User, DebtOwner } from 'src/core';
import { Repository } from 'typeorm';

@Injectable()
export class DebtService {
    constructor(@InjectRepository(Group) private _groupRepository: Repository<Group>) {}

    async getTotalDebts(groupId: number): Promise<Debt[]> {
        // Get the group:
        const group = await this._groupRepository.findOne({ id: groupId });

        // Calculate the debtors and debt owners and their weights from the group expenses:
        const debtOwners = this._getDebtOwners(group);
        const debtors = this._getDebtors(group);

        // For each debt owner, create a payment amount from the debtor based on the weight of the debt the debtor owes.
        // Since the debt owners will have a negative weight, we need to take the absolute value of what they owe.
        return debtOwners
            .map((debtOwner) =>
                debtors.map((debtor) => ({
                    from: debtor.user,
                    to: debtOwner.user,
                    amount: this._roundToNearestCent(Math.abs(debtor.amountOwes * debtOwner.weight)),
                })),
            )
            .reduce((acc, debts) => [...acc, ...debts], [])
            .sort((first, second) => this._debtSorter(first, second));
    }

    private _getAverageExpense(group: Group): number {
        return this._getSumOfExpenses(group.expenses) / this._getAmountOfUsers(group);
    }

    private _getUserTotalSpent(expenses: Expense[], user: User): number {
        const userExpenses = expenses.filter((e) => e.user.id === user.id);

        return this._getSumOfExpenses(userExpenses);
    }

    private _getAmountOfUsers(group: Group): number {
        return group.users.length;
    }

    private _getSumOfExpenses(expenses: Expense[]): number {
        return expenses.reduce((acc, expense) => acc + expense.cost, 0);
    }

    private _getTotalDebt(group: Group): number {
        const expenses = group.expenses;
        // Get the average amount owed in the group:
        const average = this._getAverageExpense(group);
        // For each user that owes money, get the sum of the amount owed
        return group.users
            .filter((user) => this._getUserTotalSpent(expenses, user) < average)
            .map((user) => average - this._getUserTotalSpent(expenses, user))
            .reduce((acc, owed) => acc + owed, 0);
    }

    private _getDebtors(group: Group): DebtOwner[] {
        return this._getAmountOwedPerUser(group).filter(({ amountOwes }) => amountOwes > 0);
    }

    private _getDebtOwners(group: Group): DebtOwner[] {
        return this._getAmountOwedPerUser(group).filter(({ amountOwes }) => amountOwes < 0);
    }

    private _getAmountOwedPerUser(group: Group): DebtOwner[] {
        const expenses = group.expenses;
        // Get the average amount owed in the group:
        const average = this._roundToNearestCent(this._getAverageExpense(group));
        // For each user that owes money, get the sum of the amount owed and calculate the weight
        return group.users
            .map((user) => ({
                user,
                amountOwes: average - this._getUserTotalSpent(expenses, user),
            }))
            .map((debtOwner) => ({ ...debtOwner, weight: debtOwner.amountOwes / this._getTotalDebt(group) }));
    }

    // Sort by the debtor's name, than the debt owner's name.
    private _debtSorter(first: Debt, second: Debt): number {
        const formatName = (name: string) => name.toLowerCase();
        return formatName(first.from.name) > formatName(second.from.name)
            ? 1
            : formatName(first.from.name) < formatName(second.from.name)
            ? -1
            : formatName(first.to.name) > formatName(second.to.name)
            ? 1
            : formatName(first.to.name) < formatName(second.to.name)
            ? -1
            : 0;
    }

    private _roundToNearestCent(value: number): number {
        return Math.round(value * 100) / 100;
    }
}
