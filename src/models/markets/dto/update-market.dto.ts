import { IsISO8601, IsNumber, IsOptional } from 'class-validator';

export class UpdateMarketDto {
  @IsOptional()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsNumber()
  amountKg: number;

  @IsOptional()
  @IsISO8601()
  date: Date;
}
