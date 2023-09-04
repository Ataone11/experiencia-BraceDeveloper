import { IsArray, IsNumber, IsOptional, IsString ,IsEmail, IsEmpty, IsDate, IsEnum} from 'class-validator';
import { ESTADOS_RIFA } from '../enums/estados-rifa.enum';

export class UpdateRifaDto { 
  @IsOptional()
  @IsString()
  nombre: string;

  @IsOptional()
  @IsString()
  descripcion: string;

  @IsOptional()
  @IsDate()
  fecha: Date;
}
