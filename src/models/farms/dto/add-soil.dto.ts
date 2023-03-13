import { IsISO8601, IsNumber } from 'class-validator';

export class AddSoilDto {
  @IsISO8601()
  date: Date;

  @IsNumber()
  pH: number;

  @IsNumber()
  moisture: number;

  @IsNumber()
  fertility: number;
}
