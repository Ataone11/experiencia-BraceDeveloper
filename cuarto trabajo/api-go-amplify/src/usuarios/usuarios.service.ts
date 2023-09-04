import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { TerminarRegistroDto } from './dto/terminar-registro.dto';
import { Usuario } from './entities/usuario.entity';
import { ESTADOS_USUARIO } from './enums/estados-usuario.enum';

import axios, { AxiosRequestConfig } from 'axios';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { UsuarioCampaña } from './entities/usuarios-campañas.entity';
import * as moment from 'moment';
import { CreateInteresesDto } from './dto/create-intereses.dto';
import { Interes } from './entities/interes.entity';
import { Campaña } from 'src/campañas/entities/campañas.entitys';
import { UpdateCamapañaDto } from 'src/campañas/dto/update-campaña.dto';
import { PaginarDto } from './dto/paginar.dto';
import { Horario } from 'src/campañas/entities/horarios.entitys';
import { ORDENES } from './enums/ordenes.enum';
import { STATE_GROUPS, TraerAmplifiersDto } from './dto/traer-amplifiers.dto';
import { FilesService } from '../files/files.service';
import { Pantallazo } from './entities/pantallazos.entity';
import { ROLES_USUARIOS } from './enums/roles-usuarios.enum';
import { Ciudad } from 'src/paises/entities/ciudades.entitys';
import { Lead } from './entities/leads.entity';
import { VerifyInstagramInfoDto } from './dto/verify-instagram-info.dto';
import { ApifyInstagramInfo } from './interfaces/ApifyInstagramInfo';
import { ESTADOS_USUARIO_CAMPANIA } from './enums/estados-usuario-campaña.enum';
import { GetUserCampaignsDto } from './dto/get-user-campaigns-dto';
import { UpdateInstagramDataDto } from './dto/update-instagram-data.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private usuariosRepository: Repository<Usuario>,
    @InjectRepository(UsuarioCampaña)
    private usuariosCampañaRepository: Repository<UsuarioCampaña>,
    @InjectRepository(Interes)
    private interesesRepository: Repository<Interes>,
    @InjectRepository(Campaña)
    private campañaRepository: Repository<Campaña>,
    @InjectRepository(Pantallazo)
    private pantallazoRepository: Repository<Pantallazo>,
    @InjectRepository(Ciudad)
    private ciudadRepository: Repository<Ciudad>,
    @InjectRepository(Lead)
    private leadsRepository: Repository<Lead>,
    private readonly filesService: FilesService,
  ) { }

  async createUsuario(createUsuarioDto: CreateUsuarioDto) {
    const usuario = await this.usuariosRepository.save({
      ...createUsuarioDto,
      estado: ESTADOS_USUARIO.COMPLETANDO_REGISTRO,
      rol: ROLES_USUARIOS.AMPLIFIER
    } as any);
    return usuario;
  }

  async traerAmplifiers(traerAmplifiersDto: TraerAmplifiersDto) {
    const take = traerAmplifiersDto.take || 10;
    const page = traerAmplifiersDto.page || 1;
    const skip = (page - 1) * take;
    const keyword = traerAmplifiersDto.keyword || "";

    let query = this.usuariosRepository.createQueryBuilder('usuario');

    // Traer el numero de campanias activas
    query = query.leftJoin(
      (qb) =>
        qb
          .select('usuarios_campaña."usuarioId"')
          .addSelect('COUNT(*)', 'campanias_activas')
          .from(UsuarioCampaña, 'usuarios_campaña')
          .where('usuarios_campaña.estado IN(:...estados_activos)', { estados_activos: [ESTADOS_USUARIO_CAMPANIA.INSCRITO, ESTADOS_USUARIO_CAMPANIA.DEBO_PUBLICAR, ESTADOS_USUARIO_CAMPANIA.SUBIR_PANTALLAZOS, ESTADOS_USUARIO_CAMPANIA.PANTALLAZOS_EN_REVISION, ESTADOS_USUARIO_CAMPANIA.PANTALLAZOS_RECHAZADOS] })
          .groupBy('usuarios_campaña."usuarioId"'),
      'campanias_activas_usuarios',
      'campanias_activas_usuarios."usuarioId" = usuario.id',
    )

    // Traer el numero de campanias terminadas
    query = query.leftJoin(
      (qb) =>
        qb
          .select('usuarios_campaña."usuarioId"')
          .addSelect('COUNT(*)', 'campanias_terminadas')
          .from(UsuarioCampaña, 'usuarios_campaña')
          .where('usuarios_campaña.estado IN(:...estados_terminados)', { estados_terminados: [ESTADOS_USUARIO_CAMPANIA.TERMINADA_INSATISFACTORIAMENTE, ESTADOS_USUARIO_CAMPANIA.TERMINADA_SATISFACTORIAMENTE] })
          .groupBy('usuarios_campaña."usuarioId"'),
      'campanias_terminadas_usuarios',
      'campanias_terminadas_usuarios."usuarioId" = usuario.id',
    )
    query = query.addSelect('campanias_activas_usuarios.campanias_activas', 'campanias_activas')
      .addSelect('campanias_terminadas_usuarios.campanias_terminadas', 'campanias_terminadas')

    query = query.where("CONCAT(LOWER(usuario.nombre), ' ', LOWER(usuario.apellido)) like LOWER(:keyword)", {
      keyword: `%${keyword}%`,
    });

    query = query.andWhere('usuario.estado IN(:...estados)', {
      estados: traerAmplifiersDto.estado ? STATE_GROUPS[traerAmplifiersDto.estado] : STATE_GROUPS.TODOS,
    });

    if (traerAmplifiersDto.criterioOrden) {
      const aggregatedColumns = ["campanias_activas", "campanias_terminadas"];
      query = query.addOrderBy(
        aggregatedColumns.includes(traerAmplifiersDto.criterioOrden) ? traerAmplifiersDto.criterioOrden : `usuario.${traerAmplifiersDto.criterioOrden}`,
        traerAmplifiersDto.orden || ORDENES.ASC,
        'NULLS LAST',
      );
    }

    const count = await query.getCount();
    query = query.take(take).skip(skip);

    // Ajustar los datos para poder insertar el valor de campanias_activas a la entidad
    let { raw, entities } = await query.getRawAndEntities();

    entities.forEach((e: any) => {
      const currentRaw: any = raw.find((r: any) => e.id === r.usuario_id);
      e.campanias_activas = currentRaw
        ? parseInt(currentRaw.campanias_activas)
        : 0;
      e.campanias_terminadas = currentRaw
        ? parseInt(currentRaw.campanias_terminadas)
        : 0;
    });

    return this.paginateResponse(count, entities, page, take);
  }

  async createIntereses(
    idUsuario: string,
    createInteresesDto: CreateInteresesDto,
  ) {
    const intereses = createInteresesDto.categorias.map((categoria) => ({
      usuario: idUsuario,
      categoria,
    }));

    const res = await this.interesesRepository.save(intereses as DeepPartial<Interes>);
    await this.usuariosRepository.save({
      id: idUsuario,
      estado: ESTADOS_USUARIO.ACTIVO
    });

    return res;
  }

  async paginateResponse(count, data, page, take) {
    const lastPage = Math.ceil(count / take);
    const nextPage = page + 1 > lastPage ? null : page + 1;
    const prevPage = page - 1 < 1 ? null : page - 1;
    return {
      statusCode: 'success',
      data: [...data],
      count,
      currentPage: page,
      nextPage: nextPage,
      prevPage: prevPage,
      lastPage: lastPage,
    };
  }

  async campañasRecomendadas(id: string, paginasDto: PaginarDto) {
    const take = paginasDto.take || 10;
    const page = paginasDto.page || 1;
    const skip = (page - 1) * take;
    const keyword = paginasDto.keyword;

    const user = await this.usuariosRepository.findOne({
      where: {
        id
      }
    });

    if (!user) {
      throw new BadRequestException("Este usuario no existe");
    }

    // Cruzar con los interes del usuario
    let query = this.campañaRepository
      .createQueryBuilder('campaña')
      .leftJoinAndSelect('campaña.ciudadesCampañas', 'ciudad_campana')
      .leftJoinAndSelect('ciudad_campana.ciudad', 'ciudad')
      .andWhere('campaña.fechaCierreInscripciones > :today', { today: new Date() })
      // Solo devolver las campañas que crucen con las coordenadas del usuarios, ya sea alguna de las ciudades que se asociaron a la campaña o el multipoligono que se genero
      .andWhere(`ST_Intersects(campaña."areaCampaña", 'POINT(${`${user.longitud} ${user.latitud}`})') OR ST_Intersects(ciudad.multipolygon, 'POINT(${`${user.longitud} ${user.latitud}`})')`)

    if (paginasDto.categorias) {
      query = query.andWhere('campaña."categoriaId" IN(:...ids)', { ids: paginasDto.categorias }); // Filtrar por las categorias que llegan del DTO
    }

    // En caso de que se quiera ordenar por fecha de publicacion es necesario sacar el minimo de las fechas si el orden es ascendente
    // y el maximo si es descendente
    if (paginasDto.criterioOrden === 'fecha_publicacion' && paginasDto.orden) {
      query = query.leftJoinAndSelect(
        (qb) =>
          qb
            .select('horarios."campañaId"')
            .addSelect(
              `${paginasDto.orden === ORDENES.ASC ? 'MIN' : 'MAX'
              }(horarios.fecha_hora)`,
              'min_max_fecha_publicacion',
            )
            .from(Horario, 'horarios')
            .groupBy('horarios."campañaId"'),
        'horarios_campania',
        'horarios_campania."campañaId" = campaña.id',
      );
      query = query.addSelect('horarios_campania.min_max_fecha_publicacion', 'fecha_publicacion')
    }

    // Filtro por fecha de publicacion
    if (paginasDto.fechaPublicacionInicio && paginasDto.fechaPublicacionFinal) {
      query = query
        .innerJoinAndSelect(
          'horarios',
          'horario',
          'horario."campañaId" = campaña.id',
        )
        .andWhere('fecha_hora > :startDatePublicacion', {
          startDatePublicacion: paginasDto.fechaPublicacionInicio,
        })
        .andWhere('fecha_hora < :endDatePublicacion', {
          endDatePublicacion: paginasDto.fechaPublicacionFinal,
        });
    } else if (paginasDto.fechaPublicacionInicio) {
      query = query
        .innerJoinAndSelect(
          'horarios',
          'horario',
          'horario."campañaId" = campaña.id',
        )
        .andWhere('fecha_hora > :startDatePublicacion', {
          startDatePublicacion: paginasDto.fechaPublicacionInicio,
        });
    } else if (paginasDto.fechaPublicacionFinal) {
      query = query
        .innerJoinAndSelect(
          'horarios',
          'horario',
          'horario."campañaId" = campaña.id',
        )
        .andWhere('fecha_hora < :endDatePublicacion', {
          endDatePublicacion: paginasDto.fechaPublicacionFinal,
        });
    }

    // Filtro por fecha de inscripcion
    if (paginasDto.fechaInscripcionInicio && paginasDto.fechaInscripcionFinal) {
      query = query
        .andWhere('campaña.fechaCierreInscripciones > :startDateInscripcion', {
          startDateInscripcion: paginasDto.fechaInscripcionInicio,
        })
        .andWhere('campaña.fechaCierreInscripciones < :endDateInscripcion', {
          endDateInscripcion: paginasDto.fechaInscripcionFinal,
        });
    } else if (paginasDto.fechaInscripcionInicio) {
      query = query.andWhere(
        'campaña.fechaCierreInscripciones > :startDateInscripcion',
        {
          startDateInscripcion: paginasDto.fechaInscripcionInicio,
        },
      );
    } else if (paginasDto.fechaInscripcionFinal) {
      query = query.andWhere(
        'campaña.fechaCierreInscripciones < :endDateInscripcion',
        {
          endDateInscripcion: paginasDto.fechaInscripcionFinal,
        },
      );
    }

    // Filtro por keyword
    if (keyword) {
      query = query.andWhere('campaña.titulo like :keyword', {
        keyword: `%${keyword}%`,
      });
    }

    if (paginasDto.criterioOrden && paginasDto.orden) {
      const aggregatedColumns = ["fecha_publicacion"];
      query = query.orderBy(
        aggregatedColumns.includes(paginasDto.criterioOrden) ? paginasDto.criterioOrden : `campaña.${paginasDto.criterioOrden}`
        , paginasDto.orden, "NULLS LAST")
    }

    const count = await query.getCount();

    // Paginar
    query = query.take(take).skip(skip);

    const data = await query.getMany();

    return this.paginateResponse(count, data, page, take);
  }

  async findCampaña(id: number, usuarioId: string) {
    const usuarioCampaña = await this.usuariosCampañaRepository.findOne({
      where: {
        usuario: { id: usuarioId },
        campaña: { id },
      },
    });
    const campaña: any = await this.campañaRepository.findOne({
      where: {
        id,
      },
      relations: ['horario'],
    });

    campaña.usuarioCampaña = usuarioCampaña;

    return campaña;
  }

  async completarRegistro(
    id: string,
    terminarRegistroDto: TerminarRegistroDto,
  ) {
    // Buscar el usuario que ya deberia estar en la base de datos
    const usuario = await this.usuariosRepository.findOne({
      where: {
        id,
      },
    });

    if (!usuario) {
      throw new BadRequestException('El usuario no existe');
    }

    //Revisar si la ciudad que se esta recibiendo existe en la base de datos
    const ciudad = await this.ciudadRepository.createQueryBuilder('ciudad')
      .where(`ST_Intersects(ciudad.multipolygon, 'POINT(${`${terminarRegistroDto.longitud} ${terminarRegistroDto.latitud}`})')`)
      .getOne();

    if (!ciudad) {
      await this.leadsRepository.save({
        ciudad: terminarRegistroDto.ciudad,
        pais: terminarRegistroDto.pais,
        direccion: terminarRegistroDto.direccion,
        indicacionesAdicionales: terminarRegistroDto.indicacionesAdicionales,
        latitud: terminarRegistroDto.latitud,
        longitud: terminarRegistroDto.longitud,
        usuario
      });
      throw new BadRequestException(`La ciudad ${terminarRegistroDto.ciudad} no existe en la base de datos.`);
    }

    // Consultar los datos de instagram
    const instagramUser = usuario.instagram;
    const path =
      'https://api.apify.com/v2/acts/zuzka~instagram-profile-scraper/runs';
    const headers = {
      'Content-Type': 'application/json',
    };

    let config: AxiosRequestConfig<any> = {
      method: 'POST',
      url: `${path}?token=${process.env.APIFY_TOKEN}`,
      headers,
      data: { usernames: [instagramUser] },
    };
    const baseCompleteUserInfo = {
      id,
      ...terminarRegistroDto,
      estado: ESTADOS_USUARIO.ESPERANDO_APROBACION,
      fechaSolicitud: new Date(),
      ciudad
    };

    await this.usuariosRepository.save(baseCompleteUserInfo as any);

    try {
      // Revisar si el usuario existe
      if (!instagramUser) {
        throw new BadRequestException('Usuario de instagram no existente');
      } else {
        await axios(config);
      }
    } catch (error) {
      // Guardemos en la base de datos que no se pudo realizar la validacion
      await this.usuariosRepository.save({
        ...baseCompleteUserInfo,
        seguidores: -1,
      } as any);
    }
    return this.findOne(id);
  }

  async findOne(id: string) {
    let query = this.usuariosRepository
      .createQueryBuilder('usuario')
      .leftJoinAndSelect('usuario.tipoDocumento', 'tipos_documento')
      .leftJoinAndSelect('usuario.ciudad', 'ciudad')

    const startOfMonth = moment().startOf('month').toDate();
    const endOfMonth = moment().endOf('month').toDate();

    let startOfSemester;
    let endOfSemester;

    if (moment().month() <= 5) {
      startOfSemester = new Date(moment().year(), 0, 1);
      endOfSemester = new Date(moment().year(), 5, 30);
    } else {
      startOfSemester = new Date(moment().year(), 6, 1);
      endOfSemester = new Date(moment().year(), 11, 31);
    }

    const startOfYear = moment().startOf('year').toDate();
    const endOfYear = moment().endOf('year').toDate();

    const campañasTerminadas = await this.usuariosCampañaRepository.find({
      where: {
        usuario: { id },
        terminada: true,
      },
      relations: [
        "campaña"
      ]
    });

    const campañasActivas = await this.usuariosCampañaRepository.find({
      where: {
        usuario: { id },
        terminada: false,
      },
      relations: [
        "campaña"
      ]
    });

    query = query.leftJoinAndSelect(
      (qb) =>
        qb
          .select('usuarios_campaña."usuarioId"')
          .addSelect('SUM(usuarios_campaña.puntos)', 'puntos_mes')
          .from(UsuarioCampaña, 'usuarios_campaña')
          .groupBy('usuarios_campaña."usuarioId"')
          .where(
            'usuarios_campaña.fecha_finalizacion > :startOfMonth AND usuarios_campaña.fecha_finalizacion < :endOfMonth',
            { startOfMonth, endOfMonth },
          ),
      'usuarios_campañas_mes',
      'usuarios_campañas_mes."usuarioId" = usuario.id',
    );

    query = query.leftJoinAndSelect(
      (qb) =>
        qb
          .select('usuarios_campaña."usuarioId"')
          .addSelect('SUM(usuarios_campaña.puntos)', 'puntos_semestre')
          .from(UsuarioCampaña, 'usuarios_campaña')
          .groupBy('usuarios_campaña.usuarioId')
          .where(
            'usuarios_campaña.fecha_finalizacion > :startOfSemester AND usuarios_campaña.fecha_finalizacion < :endOfSemester',
            { startOfSemester, endOfSemester },
          ),
      'usuarios_campañas_semestre',
      'usuarios_campañas_semestre."usuarioId" = usuario.id',
    );

    query = query.leftJoinAndSelect(
      (qb) =>
        qb
          .select('usuarios_campaña."usuarioId"')
          .addSelect('SUM(usuarios_campaña.puntos)', 'puntos_año')
          .from(UsuarioCampaña, 'usuarios_campaña')
          .groupBy('usuarios_campaña.usuarioId')
          .where(
            'usuarios_campaña.fecha_finalizacion > :startOfYear AND usuarios_campaña.fecha_finalizacion < :endOfYear',
            { startOfYear, endOfYear },
          ),
      'usuarios_campañas_año',
      'usuarios_campañas_año."usuarioId" = usuario.id',
    );
    query = query.leftJoinAndSelect(
      (qb) =>
        qb
          .select('usuarios_campaña."usuarioId"')
          .addSelect('SUM(usuarios_campaña.puntos)', 'puntos_totales')
          .from(UsuarioCampaña, 'usuarios_campaña')
          .groupBy('usuarios_campaña.usuarioId'),
      'usuarios_campañas_puntos_totales',
      'usuarios_campañas_puntos_totales."usuarioId" = usuario.id',
    );

    query = query.where('usuario.id = :id', { id });
    const res = await query.getRawAndEntities();
    const usuario: any = res.entities[0];

    usuario.puntos_mes = parseFloat(res.raw[0].puntos_mes);
    usuario.puntos_semestre = parseFloat(res.raw[0].puntos_semestre);
    usuario.puntos_año = parseFloat(res.raw[0].puntos_año);
    usuario.puntos_totales = parseFloat(res.raw[0].puntos_totales);
    usuario.campañasTerminadas = campañasTerminadas;
    usuario.campañasActivas = campañasActivas;

    return usuario;
  }

  async aprobarUsuario(id: string) {
    const usuario = await this.usuariosRepository.findOne({
      where: {
        id,
      },
    });
    if (
      usuario.estado === ESTADOS_USUARIO.ESPERANDO_APROBACION ||
      usuario.estado === ESTADOS_USUARIO.RECHAZADO
    ) {
      await this.usuariosRepository.save({
        id,
        estado: ESTADOS_USUARIO.ACTIVO,
      } as any);
      return this.findOne(id);
    } else {
      throw new BadRequestException(
        `El Usuario no esta en estado de esperando aprobacion`,
      );
    }
  }

  async rechazarUsuario(id: string) {
    const usuario = await this.usuariosRepository.findOne({
      where: {
        id,
      },
    });
    if (
      usuario.estado === ESTADOS_USUARIO.ESPERANDO_APROBACION ||
      usuario.estado === ESTADOS_USUARIO.ACTIVO
    ) {
      return this.usuariosRepository.save({
        id,
        estado: ESTADOS_USUARIO.RECHAZADO,
      } as any);
    } else {
      throw new BadRequestException(
        `El Usuario no esta en estado de esperando aprobacion`,
      );
    }
  }

  async updateCampaña(id: number, updateCamapañaDto: UpdateCamapañaDto) {
    const rq = await this.campañaRepository.save({
      ...updateCamapañaDto,
      id,
    } as any);
    return rq;
  }

  async update(id: string, updateUsuarioDto: UpdateUsuarioDto) {
    // Buscar el usuario que ya deberia estar en la base de datos
    const usuario = await this.usuariosRepository.findOne({
      where: {
        id,
      },
    });

    if (!usuario) {
      throw new BadRequestException('El usuario no existe');
    }

    //Revisar si la ciudad que se esta recibiendo existe en la base de datos
    const ciudad = await this.ciudadRepository.findOne({
      where: {
        nombre: updateUsuarioDto.ciudad
      }
    });

    if (!ciudad) {
      throw new BadRequestException(`La ciudad ${updateUsuarioDto.ciudad} no existe en la base de datos.`);
    }

    await this.usuariosRepository.save({
      id,
      ...updateUsuarioDto,
      ciudad
    } as any);

    return await this.findOne(id);
  }

  async verifyInstagramInfo(verifyInstagramInfo: VerifyInstagramInfoDto) {
    const path = `https://api.apify.com/v2/datasets/${verifyInstagramInfo.resource.defaultDatasetId}/items`;
    console.log(path);

    const headers = {
      'Content-Type': 'application/json',
    };

    let config: AxiosRequestConfig<any> = {
      method: 'GET',
      url: path,
      headers
    };

    const response = await axios(config);
    const instagramInfo: ApifyInstagramInfo = response.data[0];

    if (instagramInfo['#error']) {
      const instagramAccount = instagramInfo['#url'].split("https://www.instagram.com/")[1];
      await this.usuariosRepository.update({
        instagram: instagramAccount
      }, {
        seguidores: -1,
      });
    } else {
      // Bajar la foto de instagram
      const res = await axios({
        method: 'get',
        url: instagramInfo.profilePicUrlHD,
        responseType: 'arraybuffer',
      });

      const key = await this.filesService.uploadBuffer(`instagram/${instagramInfo.username}`, res.data);

      await this.usuariosRepository.update({
        instagram: instagramInfo.username
      }, {
        seguidores: instagramInfo.followersCount,
        urlFoto: key
      });
    }

    return instagramInfo;
  }

  async findUserCampanias(id: string, getUserCampaigns: GetUserCampaignsDto) {
    const take = getUserCampaigns.take || 10;
    const page = getUserCampaigns.page || 1;
    const skip = (page - 1) * take;
    const keyword = getUserCampaigns.keyword;

    let query = this.usuariosCampañaRepository
      .createQueryBuilder('usuario_campania')
      .leftJoinAndSelect('usuario_campania.usuario', 'usuario')
      .leftJoinAndSelect('usuario_campania.campaña', 'campania')
      .leftJoinAndSelect('usuario_campania.horario', 'horario')
      .leftJoinAndSelect('usuario_campania.codigo', 'codigo');


    query = query.where('usuario.id = :id_usuario', { id_usuario: id });
    if (getUserCampaigns.estado) {
      query = query.where('usuario_campania.estado = :estado', {
        estado: getUserCampaigns.estado,
      });
    }

    if (keyword) {
      query = query.andWhere('LOWER(campania.titulo) like LOWER(:keyword)', {
        keyword: `%${keyword}%`,
      });
    }

    if (getUserCampaigns.criterioOrden) {
      const campaniasFields = ["titulo", "marca"];
      const horarioFields = ["horario"];

      if (campaniasFields.includes(getUserCampaigns.criterioOrden)) {
        query = query.orderBy(
          `campania.${getUserCampaigns.criterioOrden}`,
          getUserCampaigns.orden || ORDENES.ASC,
          'NULLS LAST',
        );
      } else if (horarioFields.includes(getUserCampaigns.criterioOrden)) {
        query = query.orderBy(
          `horario.${getUserCampaigns.criterioOrden}`,
          getUserCampaigns.orden || ORDENES.ASC,
          'NULLS LAST',
        );
      } else {
        query = query.orderBy(
          `${getUserCampaigns.criterioOrden}`,
          getUserCampaigns.orden || ORDENES.ASC,
          'NULLS LAST',
        );
      }
    }
    const count = await query.getCount();
    query = query.take(take).skip(skip);

    // Ajustar los datos para poder insertar el valor de cupos_utilizados a la entidad
    let entities = await query.getMany();

    return this.paginateResponse(count, entities, page, take);
  }

  async updateInstagramData(id: string, updateInstagramDataDto: UpdateInstagramDataDto) {
    // Buscar el usuario que ya deberia estar en la base de datos
    const usuario = await this.usuariosRepository.findOne({
      where: {
        id,
      },
    });

    if (!usuario) {
      throw new BadRequestException('El usuario no existe');
    }

    await this.usuariosRepository.save({
      id,
      ...updateInstagramDataDto,
    } as any);

    return await this.findOne(id);
  }
}
