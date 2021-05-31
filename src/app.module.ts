import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExpenseModule } from './expense/expense.module';
import { UserModule } from './user/user.module';
import { GroupModule } from './group/group.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DebtModule } from './debt/debt.module';

@Module({
    imports: [TypeOrmModule.forRoot(), ExpenseModule, UserModule, GroupModule, DebtModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
