import { IsOptional, IsString } from 'class-validator';

export class FarmQueryDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  locationId: string;

  @IsOptional()
  @IsString()
  userId: string;
}
