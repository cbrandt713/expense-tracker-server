import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Expense, Group, User } from 'src/core';
import { Repository } from 'typeorm';

@Injectable()
export class CalculationService {
  constructor(
    @InjectRepository(Group) private _groupRepository: Repository<Group>,
  ) {}

  async getTotalOwed(groupId: number): Promise<any> {
    // Get the group:
    const group = await this._groupRepository.findOne({ id: groupId });
    // Get the average amount owed in the group:
    const average = this._getAverageExpense(group);
    // Get what each person in the group paid and subtract it from the average per person:
    const usersPaid = group.users.map((user) => ({
      user,
      total: this._getUserTotal(group.expenses, user),
      owes: average - this._getUserTotal(group.expenses, user),
      weight: 0,
    }));
    // For each person who owes money, split their balance between each person owed money.
    const moneyToUsers = usersPaid.filter((paid) => paid.owes < 0);
    const moneyFromUsers = usersPaid.filter((paid) => paid.owes > 0);

    const totalOwed = moneyToUsers.reduce((acc, owed) => acc + owed.owes, 0);
    const res = [];

    for (const owee of moneyFromUsers) {
      owee.weight = owee.owes / totalOwed;
    }

    for (const ower of moneyToUsers) {
      ower.weight = ower.owes / totalOwed;
    }

    // Resolve each debt by the person owed:
    for (const to of moneyToUsers) {
      for (const from of moneyFromUsers) {
        const amount = from.owes * to.weight;
        res.push(
          {
            from: from.user,
            to: to.user,
            amount,
          }
        );
      }
    }
    return res;
  }

  private _getAverageExpense(group: Group): number {
    return this._getSumOfExpenses(group.expenses) / this._amountOfUsers(group);
  }

  private _getUserTotal(expenses: Expense[], user: User): number {
    const userExpenses = expenses.filter((e) => e.user.id === user.id);

    return this._getSumOfExpenses(userExpenses);
  }

  private _amountOfUsers(group: Group): number {
    return group.users.length;
  }

  private _getSumOfExpenses(expenses: Expense[]): number {
    return expenses.reduce((acc, expense) => acc + expense.cost, 0);
  }
}
