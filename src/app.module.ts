import { Module } from '@nestjs/common';
import { ExpenseModule } from './expense/expense.module';
import { UserModule } from './user/user.module';
import { GroupModule } from './group/group.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DebtModule } from './debt/debt.module';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [TypeOrmModule.forRoot(), ExpenseModule, UserModule, GroupModule, DebtModule, ConfigModule.forRoot()],
})
export class AppModule {}
