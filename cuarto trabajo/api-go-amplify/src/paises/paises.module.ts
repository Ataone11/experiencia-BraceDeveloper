import { Module } from '@nestjs/common';
import { PaisesService } from './paises.service';
import { PaisesController } from './paises.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pais } from './entities/paises.entitys';
import { Ciudad } from './entities/ciudades.entitys';
import { TipoDocumento } from './entities/tipoDocumento.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Pais,
      Ciudad,
      TipoDocumento
    ]),
  ],
  providers: [PaisesService],
  controllers: [PaisesController],
  exports: [
    TypeOrmModule.forFeature([
      Pais,
      Ciudad,
      TipoDocumento
    ]),
  ]
})
export class PaisesModule {}
