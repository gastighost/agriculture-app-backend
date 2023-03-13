import { CropStatus } from '@prisma/client';
import {
  IsEnum,
  IsISO8601,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CropQueryDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsISO8601()
  plantingDate: Date;

  @IsOptional()
  @IsISO8601()
  harvestDate: Date;

  @IsOptional()
  @IsEnum(CropStatus)
  status: CropStatus;

  @IsOptional()
  @IsNumber()
  area: number;

  @IsOptional()
  @IsString()
  farmId: string;
}
