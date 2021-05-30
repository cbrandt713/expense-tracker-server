import { Controller, Get, Param } from '@nestjs/common';
import { CalculationService } from './calculation.service';

@Controller('group/:groupId/calculation')
export class CalculationController {

    constructor(private _calculationService: CalculationService) {}

    @Get('')
    getTotalOwed(@Param('groupId') groupId: number): Promise<any> {
        return this._calculationService.getTotalOwed(groupId);
    }
}
