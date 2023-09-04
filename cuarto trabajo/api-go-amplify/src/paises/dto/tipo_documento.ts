import { IsNumber, IsOptional, IsString } from 'class-validator';

export class Tipo_documentoDto {
  @IsNumber()
  @IsOptional()
  id: number;

  @IsString()
  nombre: string;

  @IsString()
  @IsOptional()
  abreviatura: string;

  @IsNumber()
  pais: number;
}
