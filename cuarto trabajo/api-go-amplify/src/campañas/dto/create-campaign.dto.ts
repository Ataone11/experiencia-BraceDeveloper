import { Transform, Type } from 'class-transformer';
import {
  IsNumber,
  IsOptional,
  IsString,
  IsDate,
  IsBoolean,
  IsArray,
} from 'class-validator';
import { Position } from 'geojson';
import { ToBoolean } from 'src/common/transformers/to-boolean.transformer';

export class CreateCampaignDto {
  @IsString()
  titulo: string;

  @IsString()
  marca: string;

  @IsString()
  requisitos: string;

  @IsNumber()
  cupos: number;

  @IsString()
  instrucciones: string;

  @IsNumber()
  categoria: number;

  @IsBoolean()
  @ToBoolean()
  muestra: boolean;

  @IsBoolean()
  @ToBoolean()
  codigoUnico: boolean;

  @IsArray()
  @IsOptional()
  codigos: string[];

  @IsDate()
  fechaCierreInscripciones: Date;

  @IsNumber()
  puntos: number;

  @IsString()
  descripcion: string;

  @IsString()
  mensajeWhatsapp: string;
  
  @IsString()
  urlInstagram: string;

  @IsOptional()
  @Transform(({ value }) => {
    if (!Array.isArray(value)) {
      return [value];
    }
    return value;
  })
  @Type(() => Number)
  ciudades: number[];

  @IsOptional()
  @Transform(({ value }) => {
    if (!Array.isArray(value)) {
      return [value];
    }
    return value;
  })
  @Type(() => Date)
  horarios: Date[]; 

  @IsOptional()
  @Transform(({ value }) => {
    return JSON.parse(value);
  })
  areaCampania?: Position[][][]
}
