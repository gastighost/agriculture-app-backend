import { CropStatus } from '@prisma/client';
import { IsEnum, IsISO8601, IsNumber, IsString } from 'class-validator';

export class CreateCropDto {
  @IsString()
  name: string;

  @IsISO8601()
  plantingDate: Date;

  @IsISO8601()
  harvestDate: Date;

  @IsEnum(CropStatus)
  status: CropStatus;

  @IsNumber()
  area: number;
}
