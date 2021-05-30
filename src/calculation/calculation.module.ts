import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from 'src/core';
import { CalculationController } from './calculation.controller';
import { CalculationService } from './calculation.service';

@Module({
  imports: [TypeOrmModule.forFeature([Group])],
  controllers: [CalculationController],
  providers: [CalculationService],
})
export class CalculationModule {}
