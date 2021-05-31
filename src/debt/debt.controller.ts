import { Controller, Get, Param } from '@nestjs/common';
import { Debt } from 'src/core';
import { DebtService } from './debt.service';

@Controller('group/:groupId/debt')
export class DebtController {
    constructor(private _debtService: DebtService) {}

    @Get('')
    calculateDebts(@Param('groupId') groupId: number): Promise<Debt[]> {
        return this._debtService.getTotalDebts(groupId);
    }
}
