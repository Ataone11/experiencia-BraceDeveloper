import { IsNumber, IsOptional, IsString, IsEnum} from 'class-validator';
import { ESTADOS_USUARIO } from '../enums/estados-usuario.enum';
import { ORDENES } from '../enums/ordenes.enum';

export enum OPTIONS_STATES {
  SOLICITUDES = "solicitudes",
  ACEPTADOS = "aceptados",
  RECHAZADOS = "rechazados"
}

export const STATE_GROUPS = {
  [OPTIONS_STATES.SOLICITUDES]: [ESTADOS_USUARIO.ESPERANDO_APROBACION],
  [OPTIONS_STATES.ACEPTADOS]: [ESTADOS_USUARIO.SELECCION_INTERESES, ESTADOS_USUARIO.ACTIVO, ESTADOS_USUARIO.OCULTO],
  [OPTIONS_STATES.RECHAZADOS]: [ESTADOS_USUARIO.RECHAZADO],
  TODOS: [ESTADOS_USUARIO.ESPERANDO_APROBACION, ESTADOS_USUARIO.SELECCION_INTERESES, ESTADOS_USUARIO.ACTIVO, ESTADOS_USUARIO.OCULTO, ESTADOS_USUARIO.RECHAZADO]
}

export class TraerAmplifiersDto {  
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
  @IsEnum(OPTIONS_STATES)
  estado: OPTIONS_STATES;

  @IsOptional()
  @IsString()
  criterioOrden: string;

  @IsOptional()
  @IsEnum(ORDENES)
  orden: ORDENES;
}
