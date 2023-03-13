import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateFarmDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  areaSize: number;
}
