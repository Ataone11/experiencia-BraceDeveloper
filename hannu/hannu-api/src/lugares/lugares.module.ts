import { Module } from '@nestjs/common';
import { LugaresService } from './lugares.service';
import { LugaresController } from './lugares.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lugar } from './entities/lugar.entity';
import { Categoria } from './entities/categoria.entity';
import { Comentario } from './entities/comentario.entity';
import { Accesibilidad } from './entities/accesibilidad.entity';
import { Media } from './entities/media.entity';
import { Departamento } from './entities/departamento.entity';
import { Usuario } from './entities/usuario.entity';
import { FilesService } from 'src/files/files.service';
import { CaracteristicaAccesibilidad } from './entities/caracteristica_accesbilidad.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Lugar,
      Categoria,
      Departamento,
      Comentario,
      Accesibilidad,
      Usuario,
      Media,
      CaracteristicaAccesibilidad
    ]),
  ],
  controllers: [LugaresController],
  providers: [LugaresService, FilesService],
})
export class LugaresModule {}
