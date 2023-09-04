import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { UpdateRifaDto } from './dto/update-rifa.dto';
import { Rifa } from './entities/rifa.entitys';
import { FilesService } from '../files/files.service';

@Injectable()
export class RifasService {
  constructor(
    @InjectRepository(Rifa)
    private RifaRepository: Repository<Rifa>,
    private readonly filesService: FilesService,
  ) {}
  async traerRifas() {
    return this.RifaRepository.find();
  }

  async update(
    id: number,
    updateRifaDto: UpdateRifaDto,
    imagen: Express.Multer.File,
  ) {
    let imagenKey;
    if (imagen) {
      imagenKey = await this.filesService.uploadImagen(`rifas/${id}`, imagen);
    }

    const rq = await this.RifaRepository.save({
      id,
      ...updateRifaDto,
      imagen: imagenKey,
    } as any);

    return rq;
  }
}
