import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCategoriaDto {
  @IsNumber()
  @IsOptional()
  id: number;

  @IsString()
  nombre: string;

  @IsString()
  @IsOptional()
  nombreInt: string;

  @IsString()
  @IsOptional()
  imagen: string;
}
