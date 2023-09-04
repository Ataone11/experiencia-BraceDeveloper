import { Transform, Type } from 'class-transformer';
import {IsArray, IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';


export class FiltroLugaresDto {
  @IsString()
  @IsOptional()
  nombre: string;

  @IsNumber()
  @IsOptional()
  departamento: number;

  @IsNumber()
  @IsOptional()
  calificacion: number;

  @IsOptional()
  @IsArray()
  @Transform(({value}) => value.split(',').map(a => parseInt(a)))
  @Type(() => String)
  accesibilidades: number[];

  @IsOptional()
  @IsArray()
  @Transform(({value}) => value.split(',').map(a => parseInt(a)))
  @Type(() => String)
  estados: number[];
}