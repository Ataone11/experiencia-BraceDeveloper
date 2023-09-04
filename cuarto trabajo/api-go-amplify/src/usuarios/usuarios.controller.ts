import { Controller, Get, Post, Body, Param, Patch, Put, Query } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { TerminarRegistroDto } from './dto/terminar-registro.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { CreateInteresesDto } from './dto/create-intereses.dto';
import { UpdateCamapañaDto } from 'src/campañas/dto/update-campaña.dto';
import { PaginarDto } from './dto/paginar.dto';
import { TraerAmplifiersDto } from './dto/traer-amplifiers.dto';
import { VerifyInstagramInfoDto } from './dto/verify-instagram-info.dto';
import { GetUserCampaignsDto } from './dto/get-user-campaigns-dto';
import { UpdateInstagramDataDto } from './dto/update-instagram-data.dto';
@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  createUsuario(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.createUsuario(createUsuarioDto);
  }
  
  @Get()
  findamplifiers(@Query() traerAmplifiersDto: TraerAmplifiersDto) {
    return this.usuariosService.traerAmplifiers(traerAmplifiersDto)
  }

  @Post(':id/intereses')
  createIntereses(@Param('id') id: string,@Body() createInteresesDto: CreateInteresesDto) {
    return this.usuariosService.createIntereses(id, createInteresesDto);
  }

  @Post(':id/completar-registro')
  completarRegistro(
    @Param('id') id: string,
    @Body() terminarRegistroDto: TerminarRegistroDto,
  ) {
    return this.usuariosService.completarRegistro(id, terminarRegistroDto);
  }

  @Patch(':id/corregir-instagram')
  updateInstagramData(@Param('id') id: string, @Body() updateInstagramDataDto: UpdateInstagramDataDto) {
    return this.usuariosService.updateInstagramData(id, updateInstagramDataDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuariosService.update(id, updateUsuarioDto);
  }

  @Patch(':id/campania')
  updateCampaña(@Param('id') id: number, @Body() updateCampañaDto: UpdateCamapañaDto) {
    return this.usuariosService.updateCampaña(id, updateCampañaDto);
  }
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuariosService.findOne(id);
  }

  @Get(':id/campanias-actuales')
  findUserCampanias(@Param('id') id: string, @Query() getUserCampaigns: GetUserCampaignsDto) {
    return this.usuariosService.findUserCampanias(id, getUserCampaigns);
  }

  @Get(':id/campanas-recomendadas')
  findintereses(@Param('id') id: string, @Query() paginarDto: PaginarDto) {
    return this.usuariosService.campañasRecomendadas(id, paginarDto);
  }

  @Get(':id/campania/:usuario')
  findcampaña(@Param('id') id: number,@Param('usuario') usuario: string) {
    return this.usuariosService.findCampaña(id,usuario);
  }

  @Put('/:id/aprobar')
  changeStateUsuarioAprobado(@Param('id') id: string) {  
    return this.usuariosService.aprobarUsuario(id);
  }

  @Put('/:id/rechazar')
  changeStateUsuarioRechazado(@Param('id') id: string) {  
    return this.usuariosService.rechazarUsuario(id);
  }

  @Post('/verify-instagram-info')
  verifyInstagramInfo(@Body() verifyInstagramInfo: VerifyInstagramInfoDto) {
    return this.usuariosService.verifyInstagramInfo(verifyInstagramInfo);
  }
}
