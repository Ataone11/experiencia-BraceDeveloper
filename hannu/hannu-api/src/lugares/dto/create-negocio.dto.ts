import {IsEmail, IsNumber, IsOptional, IsString ,IsEmpty} from 'class-validator';


export class CreateNegocioDto {
  @IsString()
  nombre: string;

  @IsString()
  nit: string;

  @IsEmail()
  correo: string;

  @IsString()
  telefono: string;

  @IsNumber()
  departamento: number;

  @IsString()
  @IsOptional()
  latitud: string;

  @IsString()
  @IsOptional()
  longitud: string;

  @IsNumber()
  usuario: number;

  @IsEmpty()
  estado: number;
}