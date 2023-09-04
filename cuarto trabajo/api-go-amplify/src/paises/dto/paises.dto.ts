import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePaisDto {
  @IsNumber()
  @IsOptional()
  id: number;

  @IsString()
  nombre: string;
}
