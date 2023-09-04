import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesService } from 'src/files/files.service';
import { Pantallazo } from 'src/usuarios/entities/pantallazos.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { UsuarioCampaña } from 'src/usuarios/entities/usuarios-campañas.entity';
import { CampañasController } from './campañas.controller';
import { CampañasService } from './campañas.service';
import { Campaña } from './entities/campañas.entitys';
import { Categoria } from './entities/categorias.entitys';
import { CiudadesCampañas } from './entities/ciudadesCampañas.entity';
import { Codigo } from './entities/codigos.entitys';
import { Horario } from './entities/horarios.entitys';

@Module({
    imports: [
      TypeOrmModule.forFeature([
        Campaña,
        Categoria,
        Codigo,
        Horario,
        CiudadesCampañas,
        UsuarioCampaña,
        Pantallazo,
        Usuario
      ]),
    ],
    providers: [CampañasService, FilesService],
    controllers: [CampañasController],
    exports: [
      TypeOrmModule.forFeature([
        Campaña,
        Categoria,
        Codigo,
        Horario,
        CiudadesCampañas
      ]),
    ],
  })
export class CampañasModule {}
