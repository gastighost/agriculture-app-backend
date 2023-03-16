import { IsISO8601, IsNumber, IsOptional, IsString } from 'class-validator';

export class QueryMarketDto {
  @IsOptional()
  @IsString()
  cropId: string;

  @IsOptional()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsNumber()
  amountKg: number;

  @IsOptional()
  @IsISO8601()
  date: Date;

  @IsOptional()
  @IsString()
  locationId: string;
}
