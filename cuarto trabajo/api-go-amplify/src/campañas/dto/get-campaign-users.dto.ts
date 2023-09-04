import { IsNumber, IsOptional, IsString, IsEnum, IsBoolean} from 'class-validator';
import { ToBoolean } from 'src/common/transformers/to-boolean.transformer';
import { ORDENES } from 'src/usuarios/enums/ordenes.enum';

export class GetCampaignUsersDto {  
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
  @IsString()
  criterioOrden: string;

  @IsOptional()
  @IsEnum(ORDENES)
  orden: ORDENES;

  @IsOptional()
  @ToBoolean()
  @IsBoolean()
  porRevisar: boolean;
}
