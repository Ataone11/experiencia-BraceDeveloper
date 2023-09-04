import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Query,
  UseInterceptors,
  UploadedFiles,
  UploadedFile,
} from '@nestjs/common';
import { LugaresService } from './lugares.service';
import { CreateLugarDto } from './dto/create-lugar.dto';
import { CreateNegocioDto } from './dto/create-negocio.dto';
import { UpdateLugarDto } from './dto/update-lugar.dto';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { CreateComentarioDto } from './dto/create-comentario.dto';
import { FiltroLugaresDto } from './dto/filtro-lugares.dto';
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@Controller('lugares')
export class LugaresController {
  constructor(private readonly lugaresService: LugaresService) {}

  @Post()
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'medias' },
    { name: 'video', maxCount: 1 },
  ]))
  createLugar(@UploadedFiles() files: { medias?: Express.Multer.File[], video?: Express.Multer.File[] }, @Body() createLugarDto: CreateLugarDto) {
    const { medias, video } = files || {};
    
    return this.lugaresService.createLugar(createLugarDto, medias, video ? video[0] : null);
  }
  
  @Post(':id/comentario')
  createComenatrio(@Param('id') idLugar: number, @Body() createComentarioDto: CreateComentarioDto) {
    return this.lugaresService.createComentario(idLugar, createComentarioDto);
  }

  @Post('/categorias')
  createCategoria(@Body() createCategoriaDto: CreateCategoriaDto) {
    return this.lugaresService.createCategoria(createCategoriaDto);
  }
  
  @Post('/negocio')
  createSolicitud(@Body() createNegocioDto: CreateNegocioDto) {
    return this.lugaresService.createSolicitud(createNegocioDto);
  }

  @Get()
  findAllLugares(@Query() filtroLugaresDto: FiltroLugaresDto) {
    return this.lugaresService.findAllLugares(filtroLugaresDto);
  }

  //@Get('/negocio')
 // findAllNegocios() {
//    return this.lugaresService.findAllLugares();
 // }

  @Get('/lista')
  listarLugares() {
    return this.lugaresService.listarLugares(1);
  }

  @Get('/departamentos')
  findLugaresByDepartamento(@Query("conLugares") conLugares:boolean) {
    return this.lugaresService.findDepartamentos(conLugares);
  }
  
  @Put('/:id/rechazar')
  changeStateLugarRechazar(@Param('id') id: string) {
    return this.lugaresService.rechazarLugar(+id);
  }
  
  @Put('/:id/ocultar')
  changeStateLugarOculto(@Param('id') id: string) {  
    return this.lugaresService.ocultarLugar(+id);
  }

  @Put('/:id/habilitar')
  habilitarLugar(@Param('id') id: string) {
    return this.lugaresService.habilitarLugar(+id);
  }

  @Get('/categorias')
  findAllCategorias(@Query("conLugares") conLugares:boolean) {
    return this.lugaresService.findAllCategorias(conLugares);
  }

  @Get('/medias')
  findAllMedias() {
    return this.lugaresService.findAllMedias();
  }

  @Get('/accesibilidades')
  findAllAccesibilidades() {
    return this.lugaresService.findAllAccesibilidades();
  }

  @Get(':id')
  findOneLugar(@Param('id') id: string) {
    return this.lugaresService.findOneLugar(+id);
  }

  @Patch(':id')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'medias' },
    { name: 'video', maxCount: 1 },
  ]))
  update(@UploadedFiles() files: { medias?: Express.Multer.File[], video?: Express.Multer.File[] },@Param('id') id: string, @Body() updateLugarDto: UpdateLugarDto) {
    const { medias, video } = files || {};
    return this.lugaresService.update(+id, updateLugarDto, medias, video ? video[0] : null);
  }

  @Delete(':id')
  removeLugar(@Param('id') id: string) {
    return this.lugaresService.removeLugar(+id);
  }
}
