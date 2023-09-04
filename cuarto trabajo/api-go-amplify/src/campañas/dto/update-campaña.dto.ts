import { Transform, Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, IsDate, IsBoolean, IsArray } from 'class-validator';
import { Position } from 'geojson';
import { ToBoolean } from 'src/common/transformers/to-boolean.transformer';


export class UpdateCamapañaDto {
  @IsOptional()
  @IsString()
  titulo: string;

  @IsOptional()
  @IsString()
  marca: string;

  @IsOptional()
  @IsString()
  requisitos: string;

  @IsOptional()
  @IsString()
  instrucciones: string;

  @IsOptional()
  @IsBoolean()
  @ToBoolean()
  muestra: boolean;

  @IsOptional()
  @IsString()
  imgMuestra: string;

  @IsOptional()
  @IsString()
  materialGrafico: string;

  @IsOptional()
  @IsBoolean()
  @ToBoolean()
  codigoUnico: boolean;

  @IsArray()
  @IsOptional()
  codigos: string[];

  @IsOptional()
  @IsDate()
  fechaCreacion: Date;

  @IsOptional()
  @IsDate()
  fechaCierreIncripciones: Date;

  @IsOptional()
  @IsNumber()
  puntos: number;

  @IsOptional()
  @IsNumber()
  categoria: number;

  @IsOptional()
  @IsString()
  descripcion: string;

  @IsOptional()
  @IsString()
  mensajeWhatsapp: string;

  @IsOptional()
  @IsString()
  urlInstagram: string;

  @IsOptional()
  @IsString()
  imgCampania: string;

  @IsOptional()
  @Transform(({ value }) => {
    if (!Array.isArray(value)) {
      return [value];
    }
    return value;
  })
  @Type(() => Number)
  ciudadesAgregar: number[];

  @IsOptional()
  @Transform(({ value }) => {
    if (!Array.isArray(value)) {
      return [value];
    }
    return value;
  })
  @Type(() => Date)
  horariosAgregar: Date[];

  @IsOptional()
  @Transform(({ value }) => {
    if (!Array.isArray(value)) {
      return [value];
    }
    return value;
  })
  ciudadesBorrar: number[];

  @IsOptional()
  @Transform(({ value }) => {
    if (!Array.isArray(value)) {
      return [value];
    }
    return value;
  })
  horariosBorrar: Date[];

  @IsOptional()
  @Transform(({ value }) => {
    return JSON.parse(value);
  })
  areaCampania?: Position[][][]
}
