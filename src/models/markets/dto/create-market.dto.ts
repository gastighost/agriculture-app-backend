import { IsISO8601, IsNumber } from 'class-validator';

export class CreateMarketDto {
  @IsNumber()
  price: number;

  @IsNumber()
  amountKg: number;

  @IsISO8601()
  date: Date;
}
