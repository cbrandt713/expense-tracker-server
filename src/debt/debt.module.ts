import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from 'src/core';
import { DebtController } from './debt.controller';
import { DebtService } from './debt.service';

@Module({
    imports: [TypeOrmModule.forFeature([Group])],
    controllers: [DebtController],
    providers: [DebtService],
})
export class DebtModule {}
