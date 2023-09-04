import { IsEmpty, IsNumber, IsOptional, IsString } from 'class-validator';


export class CreateComentarioDto {
  @IsEmpty()
  id: number;

  @IsNumber()
  calificacion: number;

  @IsString()
  texto: string;

  @IsString()
  @IsOptional()
  textoint: string;

  @IsNumber()
  usuario: number;
}