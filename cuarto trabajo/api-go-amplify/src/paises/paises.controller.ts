import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateCiudadDto } from './dto/create-ciudad.dto';
import { PaisesService } from './paises.service';
import { PositionSuportedDto } from './dto/position-supported.dto';

@Controller('paises')
export class PaisesController {
    constructor(private readonly paisesService: PaisesService) {}
    
  @Get('/tipos-documentos')
  findAllMedias() {
    return this.paisesService.findAllTiposDocumentos();
  }

  @Get('/ciudades')
  findAllCiudades() {
    return this.paisesService.findAllCiudades();
  }

  @Post('/ciudades')
  createCiudad(@Body() createCiudadDto: CreateCiudadDto) {
    return this.paisesService.createCiudad(createCiudadDto);
  }

  @Post('/ciudades/posicion-disponible')
  checkPositionSupported(@Body() positionSuportedDto: PositionSuportedDto) {
    return this.paisesService.checkPositionSupported(positionSuportedDto.longitud, positionSuportedDto.latitud);
  }
}
