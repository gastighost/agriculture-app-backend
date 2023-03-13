import { IsString } from 'class-validator';

export class CreateLocationDto {
  @IsString()
  name: string;

  @IsString()
  region: string;

  @IsString()
  country: string;
}
