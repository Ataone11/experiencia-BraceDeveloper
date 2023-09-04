import { Module } from '@nestjs/common';
import { RifasController } from './rifas.controller';
import { RifasService } from './rifas.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rifa } from './entities/rifa.entitys';
import { FilesService } from 'src/files/files.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Rifa
    ]),
  ],
  controllers: [RifasController],
  providers: [RifasService, FilesService]
})
export class RifasModule {}
