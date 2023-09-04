import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCiudadDto } from './dto/create-ciudad.dto';
import { Ciudad } from './entities/ciudades.entitys';
import { Pais } from './entities/paises.entitys';
import { TipoDocumento } from './entities/tipoDocumento.entity';
import { MultiPolygon } from "geojson";

@Injectable()
export class PaisesService {
  constructor(
    @InjectRepository(Pais)
    private PaisRepository: Repository<Pais>,
    @InjectRepository(TipoDocumento)
    private Tipo_documentoRepository: Repository<TipoDocumento>,
    @InjectRepository(Ciudad)
    private ciudadesRepository: Repository<Ciudad>
  ) { }

  findAllTiposDocumentos() {
    return this.Tipo_documentoRepository.find();
  }
  findAllCiudades() {
    return this.ciudadesRepository.find();
  }

  async createCiudad(createCiudadDto: CreateCiudadDto) {
    const {
      multipolygon,
      nombre,
      pais
    } = createCiudadDto
    const polygonCreated: MultiPolygon = {
      type: 'MultiPolygon',
      coordinates: multipolygon
    }

    const ciudad = this.ciudadesRepository.create({
      multipolygon: polygonCreated,
      nombre,
      pais
    } as any)

    await this.ciudadesRepository.save(ciudad)
    return ciudad
  }

  async checkPositionSupported(longitud: number, latitud: number) {
    return await this.ciudadesRepository
      .createQueryBuilder('ciudad')
      .where(`ST_Intersects(ciudad.multipolygon, 'POINT(${`${longitud} ${latitud}`})')`)
      .getMany();

  }
}
