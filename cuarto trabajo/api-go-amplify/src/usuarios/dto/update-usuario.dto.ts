import { IsNumber, IsOptional, IsString, IsEmpty, IsDate} from 'class-validator';
import { TipoDocumento } from 'src/paises/entities/tipoDocumento.entity';

export class UpdateUsuarioDto {
  @IsOptional()
  @IsString()
  instagram: string;

  @IsOptional()
  @IsString()
  numeroDocumento: string;

  @IsOptional()
  @IsString()
  nombre: string;

  @IsOptional()
  @IsString()
  apellido: string;

  @IsEmpty()
  correo: string;

  @IsOptional()
  @IsString()
  telefono: string;

  @IsOptional()
  @IsDate()
  fechaDeNacimiento: Date;

  @IsOptional()
  @IsNumber()
  tipoDocumento: TipoDocumento;

  @IsString()
  indicacionesAdicionales: string;

  @IsNumber()
  latitud: number;

  @IsNumber()
  longitud: number;

  @IsString()
  ciudad: string;

  @IsEmpty()
  estado: number;
}
