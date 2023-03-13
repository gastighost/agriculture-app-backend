import { IsNumber, IsString } from 'class-validator';

export class CreateFarmDto {
  @IsString()
  name: string;

  @IsNumber()
  areaSize: number;
}
