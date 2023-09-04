import { IsArray, IsNumber, IsOptional, IsString ,IsEmail, IsEmpty} from 'class-validator';
import { Accesibilidad } from '../entities/accesibilidad.entity';
import { Media } from '../entities/media.entity';

export class CreateLugarDto {
  @IsNumber()
  @IsOptional()
  id: number;

  @IsNumber()
  @IsOptional()
  categoria: number;

  @IsArray()
  @IsOptional()
  caracteristicas: number[];

  @IsArray()
  @IsOptional()
  medias: Media[];

  @IsString()
  nombre: string;

  @IsString()
  @IsOptional()
  nit: string;

  @IsEmail()
  @IsOptional()
  correo: string;

  @IsString()
  @IsOptional()
  telefono: string;

  @IsString()
  @IsOptional()
  descripcion: string;

  @IsString()
  @IsOptional()
  departamento: string;

  @IsString()
  @IsOptional()
  descripcionInt: string;

  @IsString()
  @IsOptional()
  latitud: string;

  @IsString()
  @IsOptional()
  longitud: string;

  @IsString()
  @IsOptional()
  video: string;

  @IsEmpty()
  estado: number;
}
