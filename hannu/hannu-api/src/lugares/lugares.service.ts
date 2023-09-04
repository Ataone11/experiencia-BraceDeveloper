import { BadRequestException, Injectable, UploadedFiles } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Like, Repository } from 'typeorm';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { CreateLugarDto } from './dto/create-lugar.dto';
import { CreateComentarioDto } from './dto/create-comentario.dto';
import { CreateNegocioDto } from './dto/create-negocio.dto';
import { UpdateLugarDto } from './dto/update-lugar.dto';
import { Accesibilidad } from './entities/accesibilidad.entity';
import { Categoria } from './entities/categoria.entity';
import { Departamento } from './entities/departamento.entity';
import { Lugar } from './entities/lugar.entity';
import { Media } from './entities/media.entity';
import { Comentario } from './entities/comentario.entity';
import { ESTADOS_LUGAR } from './enums/estados-lugar.enum';
import { Order } from './enums/orden.enum'
import { FiltroLugaresDto } from './dto/filtro-lugares.dto';
import { FilesService } from 'src/files/files.service';
import { Usuario } from './entities/usuario.entity';
import { CaracteristicaAccesibilidad } from './entities/caracteristica_accesbilidad.entity';

@Injectable()
export class LugaresService {
  constructor(
    @InjectRepository(Lugar)
    private lugaresRepository: Repository<Lugar>,
    @InjectRepository(Categoria)
    private categoriasRepository: Repository<Categoria>,
    @InjectRepository(Media)
    private mediasRepository: Repository<Media>,
    @InjectRepository(Accesibilidad)
    private accesibilidadesRepository: Repository<Accesibilidad>,
    @InjectRepository(CaracteristicaAccesibilidad)
    private caracteristicasRepository: Repository<CaracteristicaAccesibilidad>,
    @InjectRepository(Departamento)
    private departamentosRepository: Repository<Departamento>,
    @InjectRepository(Usuario)
    private usuariosRepository: Repository<Usuario>,
    @InjectRepository(Comentario)
    private comentariosRepository: Repository<Comentario>,
    private readonly filesService: FilesService,

  ) {}
  

  async createLugar(createLugarDto: CreateLugarDto, medias: Array<Express.Multer.File>, video: Express.Multer.File ) {
    const idDepartamento = createLugarDto.departamento;
    const idCategoria = createLugarDto.categoria;
    

    if(idCategoria){
      const categoria = await this.categoriasRepository.findOne(idCategoria)
      if(!categoria){
        throw new BadRequestException("La categoria no existe")
      }
    }

    if(idDepartamento){
      const departamento = await this.departamentosRepository.findOne(idDepartamento)
      if(!departamento){
        throw new BadRequestException("El departamento no existe")
      }
    }

    if(idDepartamento){
      const departamento = await this.departamentosRepository.findOne(idDepartamento)
      if(!departamento){
        throw new BadRequestException("El departamento no existe")
      }
    }
    const caracteristicas = await this.caracteristicasRepository.findByIds(createLugarDto.caracteristicas || []);
    const lugar = await this.lugaresRepository.save({...createLugarDto, estado:ESTADOS_LUGAR.PENDIENTE, caracteristicas} as any);

    let filesKeys;
    const subidaMedias = async () => {
      filesKeys = await this.filesService.uploadPublicFiles(`lugares/${lugar.id}/medias`, medias);
    }
    
    let videoKey;
    const subidaVideo = async () => {
      if(video) {
        videoKey = await this.filesService.uploadVideoLugar(`lugares/${lugar.id}`, video);
      }
    }

    const promesasSubidaArchivos = [subidaMedias(), subidaVideo()];
    await Promise.all(promesasSubidaArchivos);

    return await this.lugaresRepository.save({...lugar, medias: filesKeys.map(key => ({ruta: key})), video: videoKey} as any);
  }

  async createComentario(idLugar: number, createComentarioDto: CreateComentarioDto) {
    const idUsuario = createComentarioDto.usuario;
    if(idLugar){
      const lugar = await this.lugaresRepository.findOne(idLugar)
      if(!lugar){
        throw new BadRequestException("El lugar no existe")
      }
    }
    if(idUsuario){
      const usuario = await this.usuariosRepository.findOne(idUsuario)
      if(!usuario){
        throw new BadRequestException("El usuario no existe")
      }
    }
    if(createComentarioDto.calificacion < 6 && createComentarioDto.calificacion > 0) {
      return this.comentariosRepository.save({...createComentarioDto, lugar: {id: idLugar}} as any)
    } else {
      throw new BadRequestException("calificacion invalida")
    }
  }

  async createSolicitud(createNegocioDto: CreateNegocioDto){
    const lugarExistente = await this.lugaresRepository.findOne({
      where: {
        usuario: {
          id: createNegocioDto.usuario
        }
      }
    });
    
    if(lugarExistente) {
      throw new BadRequestException("El usuario ya tiene creado un lugar")  
    }

    const idDepartamento = createNegocioDto.departamento;

    if(idDepartamento) {
      const departamento= await this.departamentosRepository.findOne(idDepartamento)

      if(!departamento) {
        throw new BadRequestException("El departamento no existe")
      }
    }

    const solicitud = await this.departamentosRepository.findOne({id:createNegocioDto.departamento})
    
    return this.lugaresRepository.save({...createNegocioDto, solicitud, estado:ESTADOS_LUGAR.PENDIENTE,fechaRegistro: new Date()} as any);
  }

  async listarLugares(departamento) {
    const accesibilidad = await this.accesibilidadesRepository.find()
    const lista = this.lugaresRepository.find({
      relations: ["accesibilidades","comentarios"],
      where: {
        departamento:departamento,
        estado:ESTADOS_LUGAR.APROBADO,
        accesibilidades:In([])
      },
      order:{
        id: 'DESC'
      }
     
    })
    return lista
  }

  createCategoria(createCategoriaDto: CreateCategoriaDto) {
    return this.categoriasRepository.save(createCategoriaDto);
  }

  async rechazarLugar(id: number) {
      const lugar = await this.lugaresRepository.findOne(id)
      if(lugar.estado === ESTADOS_LUGAR.PENDIENTE){
        return this.lugaresRepository.save({id,estado:ESTADOS_LUGAR.DENEGADO} as any)
      } else{
        throw new BadRequestException(`El estado de la solicitud debe ser pendiente`)
      } 
  }

  async ocultarLugar(id: number) {
    const lugar = await this.lugaresRepository.findOne(id);
    if(lugar.estado === ESTADOS_LUGAR.APROBADO) {
        return this.lugaresRepository.save({id,estado: ESTADOS_LUGAR.OCULTO} as any)
    } else{
      throw new BadRequestException(`El lugar ya se encuentra oculto`)
    } 
  }

  async habilitarLugar(id: number) {
      const lugar = await this.lugaresRepository.findOne(id);
      
      if(lugar.nombre!=null && lugar.categoria !=null && lugar.correo!=null && lugar.departamento!=null && lugar.estado!=null && lugar.telefono!=null && lugar.latitud!=null && lugar.longitud!=null && lugar.video!=null && lugar.descripcion!=null && lugar.nit!=null){
        if(lugar.estado === ESTADOS_LUGAR.PENDIENTE || lugar.estado === ESTADOS_LUGAR.OCULTO) {
        return this.lugaresRepository.save({...lugar, estado: ESTADOS_LUGAR.APROBADO} as any)
      } else{
        throw new BadRequestException(`El estado del lugar debe ser oculto o pendiente`)
      } 
    } else {
      throw new BadRequestException(`Todos los campos del lugar deben estar completos para poder habilitarlo`)
    }
  }
  
  async findDepartamentos(conLugares: boolean){
    if(conLugares==true){
      const query =  this.departamentosRepository.createQueryBuilder("d")
    .innerJoin("d.lugares", "l")
    .select("d");
    return await query.getMany();
    }else{
      return this.departamentosRepository.find()
    }
  }

  findLugaresWhith() {
    return this.lugaresRepository.find();
  }

 async findAllLugares(filtroLugaresDto: FiltroLugaresDto) {
    let query = this.lugaresRepository.createQueryBuilder("lugar")
    .leftJoinAndSelect('lugar.caracteristicas', 'caracteristica')
    .leftJoinAndSelect('caracteristica.accesibilidad', 'accesibilidad')
    .leftJoinAndSelect('lugar.departamento', 'departamento')
    .leftJoinAndSelect('lugar.medias', 'media')
    .leftJoinAndSelect('lugar.categoria', 'categoria')
    .leftJoinAndSelect('lugar.comentarios', 'comentario')

    // Calculando la calificacion promedio
    query = query.leftJoinAndSelect(
      (qb) => qb
      .select('comentario.id_lugar')
      .addSelect('ROUND(AVG(comentario.calificacion), 0)', 'calificacion_promedio')
      .from(Comentario, 'comentario')
      .groupBy('comentario.id_lugar'),
      'comentarios',
      'comentarios.id_lugar = lugar.id'
    );

    const filterPromises = [];

    Object.keys(filtroLugaresDto).forEach(key => {
      const filterFunction = async () => {
        const stringKeys = ["nombre"];

        if(stringKeys.includes(key)) {
            query = query.andWhere(`LOWER(lugar.${key}) like LOWER(:${key})`, { [key]:`%${filtroLugaresDto[key]}%` })
        } else if(key === 'calificacion') {
            query = query.andWhere(`calificacion_promedio = ${filtroLugaresDto[key]}`)
        } else if (key === 'accesibilidades') {
          let whereLogic = `"accesibilidadId" = ${filtroLugaresDto[key][0]}`;

          for(let i = 1; i < filtroLugaresDto[key].length; i++) {
            whereLogic += ` OR "accesibilidadId" = ${filtroLugaresDto[key][i]}`;
          }

          // Se revisan los lugares que cuentan con las accesibilidades que se buscan
          const rawData = await this.lugaresRepository.query(`
            SELECT b."lugarId" FROM 
              (SELECT a."lugarId", COUNT(*) FROM 
                (SELECT "lugarId", "accesibilidadId" FROM caracteristicas_lugares 
                  LEFT JOIN caracteristicas_accesibilidades ON caracteristicas_lugares."caracteristicaId" = caracteristicas_accesibilidades."id" 
                WHERE ${whereLogic} GROUP BY "lugarId", "accesibilidadId") a 
              GROUP BY "lugarId") b 
            WHERE count = ${filtroLugaresDto[key].length}
          `);

          const ids = rawData.map(lugar => lugar.lugarId);
          
          
          if(ids.length === 0) {
            query = query.andWhere('1 = 0');
          } else if(ids.length === 1) {
            query = query.andWhere(`lugar.id = ${ids[0]}`)
          } else {
            query = query.andWhere(`lugar.id IN (${ids.join(',')})`)
          }
        } else if (key === 'estados') {
          if(filtroLugaresDto.estados.length === 1) {
            query = query.andWhere(`lugar.estado = ${filtroLugaresDto.estados[0]}`)
          } else {
            query = query.andWhere(`lugar.estado IN (${filtroLugaresDto.estados.join(',')})`)
          }
        } else {
            query = query.andWhere(`lugar.${key} = ${filtroLugaresDto[key]}`)
        }
      }

      filterPromises.push(filterFunction());
    });

    // Esperar a que la logica de todos los filtros se ejecute
    await Promise.all(filterPromises);

    // Busca los lugares con los filtros definidos
    const res = await query.getRawAndEntities();
    const resEntities = res.entities;

    resEntities.forEach((lugar: any) => {
      const posicionLugarRaw = res.raw.findIndex(lugarRaw => lugarRaw.lugar_id === lugar.id);
      lugar.calificacion_promedio = parseFloat(res.raw[posicionLugarRaw].calificacion_promedio);

      const accesibilidades = {};
      lugar.caracteristicas.forEach(caracteristica => {
        accesibilidades[caracteristica.accesibilidad.id] = {
          ...caracteristica.accesibilidad,
          caracteristicas: [...(accesibilidades[caracteristica.accesibilidad.id]?.caracteristicas ?? []), caracteristica]
        }
      });
      delete lugar.caracteristicas;
      lugar.accesibilidades = Object.values(accesibilidades);
    })

    return resEntities;
  }

  async findAllCategorias(conLugares:boolean) {
    if(conLugares==true){
      const query =  this.categoriasRepository.createQueryBuilder("c")
    .innerJoin("c.lugares", "l")
    .select("c");
    return await query.getMany();
    }else{
      return this.categoriasRepository.find();
    }
  }

  findAllMedias() {
    return this.mediasRepository.find();
  }

  findAllAccesibilidades() {
    return this.accesibilidadesRepository.find({
      relations: ['caracteristicas']
    });
  }

  async findOneLugar(id: number) {   
    let query = this.lugaresRepository.createQueryBuilder("lugar")
      .leftJoinAndSelect('lugar.caracteristicas', 'caracteristica')
      .leftJoinAndSelect('caracteristica.accesibilidad', 'accesibilidad')
      .leftJoinAndSelect('lugar.departamento', 'departamento')
      .leftJoinAndSelect('lugar.categoria', 'categoria')
      .leftJoinAndSelect('lugar.comentarios', 'comentario')
      .leftJoinAndSelect('lugar.medias', 'media')
      .where("lugar.id = :id", { id });
          // Calculando la calificacion promedio
    query = query.leftJoinAndSelect(
      (qb) => qb
      .select('comentario.id_lugar')
      .addSelect('ROUND(AVG(comentario.calificacion), 0)', 'calificacion_promedio')
      .from(Comentario, 'comentario')
      .groupBy('comentario.id_lugar'),
      'comentarios',
      'comentarios.id_lugar = lugar.id'
      );

      const res = await query.getRawAndEntities();
      const resEntities = res.entities;
  
      resEntities.forEach((lugar: any) => {
        const posicionLugarRaw = res.raw.findIndex(lugarRaw => lugarRaw.lugar_id === lugar.id);
        lugar.calificacion_promedio = parseFloat(res.raw[posicionLugarRaw].calificacion_promedio);
        const accesibilidades = {};
        lugar.caracteristicas.forEach(caracteristica => {
          accesibilidades[caracteristica.accesibilidad.id] = {
            ...caracteristica.accesibilidad,
            caracteristicas: [...(accesibilidades[caracteristica.accesibilidad.id]?.caracteristicas ?? []), caracteristica]
          }
        });
        delete lugar.caracteristicas;
        lugar.accesibilidades = Object.values(accesibilidades);
      })

      return resEntities[0];
    }

   async update(id: number, updateLugarDto: UpdateLugarDto, medias: Array<Express.Multer.File>, video: Express.Multer.File ) {
    const idCategoria = updateLugarDto.categoria;
    const idDepartamento = updateLugarDto.departamento;
    
      if(idCategoria){
        const categoria = await this.categoriasRepository.findOne(idCategoria)
        if(!categoria){
          throw new BadRequestException("La categoria no existe")
        }
      }
      if(idDepartamento){
        const departamento = await this.departamentosRepository.findOne(idDepartamento)
        if(!departamento){
          throw new BadRequestException("El departamento no existe")
        }
      }

      const caracteristicas = await this.caracteristicasRepository.findByIds(updateLugarDto.caracteristicas || []);

      const rq = await this.lugaresRepository.save({id,...updateLugarDto} as any)
      
      let filesKeys;
      const subidaMedias = async () => {
        filesKeys = await this.filesService.uploadPublicFiles(`lugares/${rq.id}/medias`, medias);
      }

      let videoKey;
      const subidaVideo = async () => {
        if(video) {
          videoKey = await this.filesService.uploadVideoLugar(`lugares/${rq.id}`, video);
        }
      }

      const eliminarMediasS3 = async () => {
        const filesToDelete = typeof updateLugarDto.mediasBorrar === "string" ? [updateLugarDto.mediasBorrar] : updateLugarDto.mediasBorrar;
        await this.filesService.deleteFiles(filesToDelete)
      }

      const eliminarMediasBD = async () => {
        const filesToDelete = typeof updateLugarDto.mediasBorrar === "string" ? [updateLugarDto.mediasBorrar] : updateLugarDto.mediasBorrar;
        if(updateLugarDto.mediasBorrar) {
          await this.mediasRepository.delete({
            ruta: In(filesToDelete) 
          });
        }
      }

      const promesasSubidaArchivos = [subidaMedias(), subidaVideo(), eliminarMediasS3(), eliminarMediasBD()];
      await Promise.all(promesasSubidaArchivos);


      const lugar = await this.lugaresRepository.findOne(id, { relations: ["medias"]});
      let nuevasMedias = lugar.medias;
      nuevasMedias = nuevasMedias.filter(media => !(updateLugarDto.mediasBorrar || []).includes(media.ruta))
      nuevasMedias = [...nuevasMedias, ...filesKeys.map(key => ({ruta: key}))]

      await this.lugaresRepository.save({id,...updateLugarDto, medias: nuevasMedias, video: videoKey, caracteristicas} as any);

      return this.findOneLugar(id);
  }
  async findLugarFiltro(idLugar: number,idAccesibilidades:any,idAomentario:any ,filterLugar:any){
    
     
      const buscar = await this.findOneLugar(idLugar);

      // Pagination parameters
      const take = filterLugar.limit || 10;
      const page = filterLugar.page || 1;
      const skip = (page - 1) * take;

      // Sorting logic
      const order = {};
      const sortField = filterLugar.criterio;
      if(sortField) {
          order[sortField] = filterLugar.order || Order.ASC;
      }


  }

  async removeLugar(id: number) {
    const lugar = await this.findOneLugar(id);
    return this.lugaresRepository.remove(lugar);
  }
}
