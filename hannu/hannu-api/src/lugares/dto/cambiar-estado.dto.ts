import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { ESTADOS_LUGAR } from '../enums/estados-lugar.enum';

export class CambiarEstadoDto {
  @IsEnum(ESTADOS_LUGAR)
  estado: ESTADOS_LUGAR;
}