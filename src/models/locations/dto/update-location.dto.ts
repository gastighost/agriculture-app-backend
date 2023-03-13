import { IsOptional, IsString } from 'class-validator';

export class UpdateLocationDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  region: string;

  @IsOptional()
  @IsString()
  country: string;
}
