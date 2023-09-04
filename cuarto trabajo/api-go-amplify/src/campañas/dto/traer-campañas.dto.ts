import { IsNumber, IsOptional, IsString, IsEnum} from 'class-validator';
import { ORDENES } from 'src/usuarios/enums/ordenes.enum';
import { ESTADOS_CAMPAÑA } from '../enums/estados-campaña.enum';

export class TraerCampañasDto {  
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
  @IsEnum(ESTADOS_CAMPAÑA)
  estado: ESTADOS_CAMPAÑA;

  @IsOptional()
  @IsString()
  criterioOrden: string;

  @IsOptional()
  @IsEnum(ORDENES)
  orden: ORDENES;
}
