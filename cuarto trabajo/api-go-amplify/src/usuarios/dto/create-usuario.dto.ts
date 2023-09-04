import { IsNumber, IsString ,IsEmail, IsEmpty, IsDate} from 'class-validator';
import { TipoDocumento } from 'src/paises/entities/tipoDocumento.entity';

export class CreateUsuarioDto {
  @IsString()
  id: string;

  @IsString()
  instagram: string;

  @IsString()
  numeroDocumento: string;

  @IsString()
  nombre: string;

  @IsString()
  apellido: string;

  @IsEmail()
  correo: string;

  @IsString()
  telefono: string;

  @IsDate()
  fechaDeNacimiento: Date;

  @IsNumber()
  tipoDocumento: TipoDocumento;

  @IsEmpty()
  estado: number;
}
