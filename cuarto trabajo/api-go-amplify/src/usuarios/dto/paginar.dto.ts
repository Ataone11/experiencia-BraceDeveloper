import { Transform, TransformFnParams } from 'class-transformer';
import { IsNumber, IsOptional, IsString, IsDate, IsEnum, IsArray} from 'class-validator';
import { ORDENES } from '../enums/ordenes.enum';

export class PaginarDto {  
  @IsOptional()
  @IsNumber()
  page: number;

  @IsOptional()
  @IsNumber()
  take: number;

  @IsOptional()
  @IsString()
  keyword: string
  
  @IsOptional()
  @IsDate()
  fechaInscripcionInicio: Date

  @IsOptional()
  @IsDate()
  fechaInscripcionFinal: Date

  @IsOptional()
  @IsDate()
  fechaPublicacionInicio: Date

  @IsOptional()
  @IsDate()
  fechaPublicacionFinal: Date

  @IsOptional()
  @IsString()
  criterioOrden: string;

  @IsOptional()
  @IsEnum(ORDENES)
  orden: ORDENES;

  @IsOptional()
  @IsArray()
  @Transform((params: TransformFnParams) => {
    if(typeof params.value === "string") {
      return [parseInt(params.value)]
    } else {
      return params.value.map((c: string) => parseInt(c))
    }
  })
  categorias: number[];
}
