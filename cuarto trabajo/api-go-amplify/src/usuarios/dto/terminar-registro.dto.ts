import { IsNumber, IsString } from 'class-validator';

export class TerminarRegistroDto {
  @IsString()
  direccion: string;

  @IsString()
  indicacionesAdicionales: string;

  @IsNumber()
  latitud: number;

  @IsNumber()
  longitud: number;

  @IsString()
  ciudad: string;

  @IsString()
  pais: string;
}
