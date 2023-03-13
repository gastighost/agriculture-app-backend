import { IsISO8601, IsNumber, Max, Min } from 'class-validator';

export class AddWeatherDto {
  @IsISO8601()
  date: Date;

  @IsNumber()
  temperature: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  humidity: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  rainfall: number;
}
