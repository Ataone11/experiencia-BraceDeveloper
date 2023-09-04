import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioCampaña } from 'src/usuarios/entities/usuarios-campañas.entity';
import { ORDENES } from 'src/usuarios/enums/ordenes.enum';
import { FindManyOptions, ILike, In, IsNull, Like, Not, Repository } from 'typeorm';
import { TraerCampañasDto } from './dto/traer-campañas.dto';
import { UpdateCamapañaDto } from './dto/update-campaña.dto';
import { Campaña } from './entities/campañas.entitys';
import { Categoria } from './entities/categorias.entitys';
import { CiudadesCampañas } from './entities/ciudadesCampañas.entity';
import { Horario } from './entities/horarios.entitys';
import { ESTADOS_CAMPAÑA } from './enums/estados-campaña.enum';
import { FilesService } from '../files/files.service';
import { CampaignSignUpDto } from './dto/campaign-sign-up.dto';
import { ESTADOS_USUARIO_CAMPANIA } from 'src/usuarios/enums/estados-usuario-campaña.enum';
import { Pantallazo } from 'src/usuarios/entities/pantallazos.entity';
import { MultiPolygon, Position } from 'geojson';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { GetCampaignUsersDto } from './dto/get-campaign-users.dto';
import { ReviewScreenshotDto } from './dto/review-screenshot.dto';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { createRule24HReminder, createRule72HReminder, createRuleMakePost, createRuleUploadScreenshots } from 'src/event-bridge/EventBridge';
import { Codigo } from './entities/codigos.entitys';

@Injectable()
export class CampañasService {
  constructor(
    @InjectRepository(Campaña)
    private campañaRepository: Repository<Campaña>,
    @InjectRepository(Categoria)
    private CategoriaRepository: Repository<Categoria>,
    @InjectRepository(Horario)
    private horariosRepository: Repository<Horario>,
    @InjectRepository(CiudadesCampañas)
    private ciudadesCampañasRepository: Repository<CiudadesCampañas>,
    @InjectRepository(UsuarioCampaña)
    private usersCampaignsRepository: Repository<UsuarioCampaña>,
    @InjectRepository(Pantallazo)
    private pantallazoRepository: Repository<Pantallazo>,
    @InjectRepository(UsuarioCampaña)
    private usuariosCampañaRepository: Repository<UsuarioCampaña>,
    @InjectRepository(Codigo)
    private codesRepository: Repository<Codigo>,
    private readonly filesService: FilesService,
  ) { }

  async updateCampaña(
    id: number,
    updateCamapañaDto: UpdateCamapañaDto,
    imgCampania: Express.Multer.File,
    imgMuestra: Express.Multer.File,
    materialGrafico: Express.Multer.File,
  ) {
    const campaña = await this.campañaRepository.findOne({
      where: {
        id,
      },
    });

    if (!campaña) {
      throw new BadRequestException('La campaña no existe');
    }

    let inscritos = await this.usersCampaignsRepository.count({
      where: {
        campaña: {
          id
        }
      }
    });

    if (inscritos > 0) {
      throw new BadRequestException('Ya hay personas inscritas, por lo tanto, no es posible editar la campaña');
    }

    const newInfoCampaña: any = {
      ...updateCamapañaDto,
    };

    // Agregando ciudades
    if (updateCamapañaDto.ciudadesAgregar) {
      const ciudadesCampañas: any = updateCamapañaDto.ciudadesAgregar?.map(
        (ciudad) => ({
          ciudad,
          campaña: id,
        }),
      );
      delete newInfoCampaña.ciudadesAgregar;

      await this.ciudadesCampañasRepository.save(ciudadesCampañas);
    }

    // Quitando las ciudades que se indicaron
    if (updateCamapañaDto.ciudadesBorrar) {
      await this.ciudadesCampañasRepository.delete({
        campaña: {
          id,
        },
        ciudad: {
          id: In(updateCamapañaDto.ciudadesBorrar),
        },
      });
      delete newInfoCampaña.ciudadesBorrar;
    }

    // Agregando horarios
    if (updateCamapañaDto.horariosAgregar) {
      const horarios: any = updateCamapañaDto.horariosAgregar?.map(
        (fecha_hora) => ({
          fecha_hora,
          campaña: id,
        }),
      );
      delete newInfoCampaña.horariosAgregar;

      await this.horariosRepository.save(horarios);
    }

    // Quitando los horarios que se indicaron
    if (updateCamapañaDto.horariosBorrar) {
      await this.horariosRepository.delete({
        campaña: {
          id,
        },
        fecha_hora: In(
          updateCamapañaDto.horariosBorrar.map((h: any) => new Date(h)),
        ),
      });
      delete newInfoCampaña.horariosBorrar;
    }
        
    if(!updateCamapañaDto.codigoUnico) {
      await this.codesRepository.delete({
        campaña: {
          id
        }
      });
      delete newInfoCampaña.codigos;
    } else if (updateCamapañaDto.codigos) {
      await this.codesRepository.delete({
        campaña: {
          id
        }
      });
      const newCodes: any = updateCamapañaDto.codigos.map((codigo: string) => ({ codigo, campaña: { id } }));
      delete newInfoCampaña.codigos;
      await this.codesRepository.save(newCodes);
    }

    if (updateCamapañaDto.areaCampania) {
      // Las coordenadas se guardan al contrario de como se generan el front
      const organizedMultiPolygon = updateCamapañaDto.areaCampania[0].map((currentPolygon: Position[]) => (currentPolygon.map((coordinates: Position) => ([coordinates[1], coordinates[0]]))))

      const multiPolygonCreate: MultiPolygon = {
        type: 'MultiPolygon',
        coordinates: [organizedMultiPolygon]
      }
      delete newInfoCampaña.areaCampania;
      newInfoCampaña.areaCampaña = multiPolygonCreate;
    }

    let imagenKey;
    const subidaImagen = async () => {
      if (imgCampania) {
        imagenKey = await this.filesService.uploadImagen(
          `campañas/${id}/imgCampaña`,
          imgCampania,
        );
      }
    };

    let muestraKey;
    const subidaMuestra = async () => {
      if (imgMuestra) {
        muestraKey = await this.filesService.uploadImagen(
          `campañas/${id}/imgMuestra`,
          imgMuestra,
        );
      }
    };

    let materialKey;
    const subidaMaterial = async () => {
      if (materialGrafico) {
        materialKey = await this.filesService.uploadImagen(
          `campañas/${id}/materialGrafico`,
          materialGrafico,
        );
      }
    };

    const promesasSubidaArchivos = [
      subidaImagen(),
      subidaMuestra(),
      subidaMaterial(),
    ];

    await Promise.all(promesasSubidaArchivos);

    console.log();
    
    if (Object.values(newInfoCampaña).some((value: any) => value)) {
      await this.campañaRepository.save({
        ...newInfoCampaña,
        id,
        imgCampania: imagenKey,
        imgMuestra: muestraKey,
        materialGrafico: materialKey,
      } as any);
    }

    const newCampaña = await this.findOne(id, null);

    return newCampaña;
  }

  async findOne(id: number, userId: string) {
    const userCampaign = await this.usersCampaignsRepository.findOne({
      relations: ['horario', 'codigo', 'pantallazos'],
      where: {
        campaña: {
          id,
        },
        usuario: {
          id: userId,
        },
      },
    });

    let inscritos = await this.usersCampaignsRepository.count({
      where: {
        campaña: {
          id
        }
      }
    });

    let campaña: any = await this.campañaRepository.findOne({
      relations: ['horarios', 'ciudadesCampañas.ciudad', 'categoria', 'codigos'],
      where: {
        id,
      },
    });

    campaña = {
      ...campaña,
      inscritos
    }

    if (userId) {
      campaña = {
        ...campaña,
        usuarioCampaña: userCampaign,
      };
    }

    return campaña;
  }

  async createCampaña(
    crearCamapañaDto: CreateCampaignDto,
    imgCampania: Express.Multer.File,
    imgMuestra: Express.Multer.File,
    materialGrafico: Express.Multer.File,
  ) {
    if (crearCamapañaDto.codigoUnico && !crearCamapañaDto.codigos) {
      throw new BadRequestException("Hace falta la lista de códigos");
    } else if (crearCamapañaDto.codigoUnico && crearCamapañaDto.codigos && crearCamapañaDto.codigos.length !== crearCamapañaDto.cupos) {
      throw new BadRequestException("Asegurate que la cantidad de cupos que definiste corresponda con la misma cantidad de códigos que subiste");
    }

    const ciudadesCampañas = crearCamapañaDto.ciudades?.map((ciudad) => ({
      ciudad,
    }));

    const newCampania: any = {
      ...crearCamapañaDto,
      ciudadesCampañas,
    };

    if (crearCamapañaDto.horarios) {
      newCampania.horarios = crearCamapañaDto.horarios.map((horario: Date) => ({
        fecha_hora: horario,
      }));
    }

    if (crearCamapañaDto.codigoUnico) {
      newCampania.codigos = crearCamapañaDto.codigos.map((codigo: string) => ({ codigo }));
    }

    if (crearCamapañaDto.areaCampania) {
      // Las coordenadas se guardan al contrario de como se generan el front
      const organizedMultiPolygon = crearCamapañaDto.areaCampania[0].map((currentPolygon: Position[]) => (currentPolygon.map((coordinates: Position) => ([coordinates[1], coordinates[0]]))))

      const multiPolygonCreate: MultiPolygon = {
        type: 'MultiPolygon',
        coordinates: [organizedMultiPolygon]
      }
      newCampania.areaCampaña = multiPolygonCreate;
    }

    const savedCampaña = await this.campañaRepository.save(newCampania as any);

    let imagenKey;
    const subidaImagen = async () => {
      if (imgCampania) {
        imagenKey = await this.filesService.uploadImagen(
          `campañas/${savedCampaña.id}/imgCampania`,
          imgCampania,
        );
      }
    };

    let muestraKey;
    const subidaMuestra = async () => {
      if (imgMuestra) {
        muestraKey = await this.filesService.uploadImagen(
          `campañas/${savedCampaña.id}/imgMuestra`,
          imgMuestra,
        );
      }
    };

    let materialKey;
    const subidaMaterial = async () => {
      if (materialGrafico) {
        materialKey = await this.filesService.uploadImagen(
          `campañas/${savedCampaña.id}/materialGrafico`,
          materialGrafico,
        );
      }
    };

    const promesasSubidaArchivos = [
      subidaImagen(),
      subidaMuestra(),
      subidaMaterial(),
    ];

    await Promise.all(promesasSubidaArchivos);

    const campaña = await this.campañaRepository.save({
      id: savedCampaña.id,
      imgCampania: imagenKey,
      imgMuestra: muestraKey,
      materialGrafico: materialKey,
      estado: ESTADOS_CAMPAÑA.INSCRIPCIONES
    } as any);

    return this.campañaRepository.findOne({
      where: {
        id: savedCampaña.id,
      },
    });
  }

  async traerCampañas(traerCampañasDto: TraerCampañasDto) {
    const take = traerCampañasDto.take || 10;
    const page = traerCampañasDto.page || 1;
    const skip = (page - 1) * take;
    const keyword = traerCampañasDto.keyword;

    let query = this.campañaRepository
      .createQueryBuilder('campaña')
      .leftJoinAndSelect('campaña.horarios', 'horario');

    // Traer los cupos utilizados de cada campaña
    query = query.leftJoinAndSelect(
      (qb) =>
        qb
          .select('usuarios_campaña."campañaId"')
          .addSelect('COUNT(*)', 'cupos_utilizados')
          .from(UsuarioCampaña, 'usuarios_campaña')
          .groupBy('usuarios_campaña."campañaId"'),
      'cupo_utilizado_campaña',
      'cupo_utilizado_campaña."campañaId" = campaña.id',
    );

    if (traerCampañasDto.estado) {
      query = query.where('campaña.estado = :estado', {
        estado: traerCampañasDto.estado,
      });
    }

    if (keyword) {
      query = query.andWhere('LOWER(campaña.titulo) like LOWER(:keyword)', {
        keyword: `%${keyword}%`,
      });
    }

    if (traerCampañasDto.criterioOrden) {
      query = query.orderBy(
        `campaña.${traerCampañasDto.criterioOrden}`,
        traerCampañasDto.orden || ORDENES.ASC,
        'NULLS LAST',
      );
    }
    const count = await query.getCount();
    query = query.take(take).skip(skip);

    // Ajustar los datos para poder insertar el valor de cupos_utilizados a la entidad
    let { raw, entities } = await query.getRawAndEntities();
    entities.forEach((e: any) => {
      const currentRaw: any = raw.find((r: any) => e.id === r.campañaId);
      e.cupos_utilizados = currentRaw
        ? parseInt(currentRaw.cupos_utilizados)
        : 0;
    });

    return this.paginateResponse(count, entities, page, take);
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
  async removeCampaña(id: number) {
    let inscritos = await this.usersCampaignsRepository.count({
      where: {
        campaña: {
          id
        }
      }
    });

    if (inscritos > 0) {
      throw new BadRequestException('Ya hay personas inscritas, por lo tanto, no es posible eliminar la campaña');
    }

    const campaña: any = await this.campañaRepository.findOne({
      where: {
        id,
      },
    });

    if (campaña.estado !== ESTADOS_CAMPAÑA.ELIMINADA) {
      return this.campañaRepository.save({
        id,
        estado: ESTADOS_CAMPAÑA.ELIMINADA,
      } as any);
    } else {
      throw new BadRequestException(`La campaña ya esta eliminada`);
    }
  }

  async getCategorias() {
    return this.CategoriaRepository.find();
  }

  async signUpToCampaign(
    idCampaña: number,
    campaignSignUpDto: CampaignSignUpDto,
  ) {
    const existente = await this.usersCampaignsRepository.findOne({
      where: {
        usuario: { id: campaignSignUpDto.usuario },
        campaña: { id: idCampaña },
      },
    });

    if (existente) {
      throw new BadRequestException(
        'El usuario ya se registro previamente a esta campaña',
      );
    }

    const campaign = await this.campañaRepository.findOne({ where: { id: idCampaña } });

    if (!campaign) {
      throw new BadRequestException(
        'La campaña no existe',
      );
    }

    const newUserCampaign: any = {
      terminada: false,
      puntos: campaign.puntos,
      fecha_inscripcion: new Date(),
      estado: ESTADOS_USUARIO_CAMPANIA.INSCRITO,
      campaña: idCampaña,
      usuario: campaignSignUpDto.usuario,
      horario: campaignSignUpDto.horario,
    };

    const usersInCampaignCount = await this.usersCampaignsRepository.count({
      where: {
        campaña: {
          id: idCampaña
        }
      }
    });

    if (usersInCampaignCount >= campaign.cupos) {
      throw new BadRequestException("Lo sentimos, se acabaron los cupos para esta campaña");
    }

    if (campaign.codigoUnico) {
      const codeToAssignId = await this.codesRepository
        .query(`SELECT id FROM "codigos" WHERE "campañaId" = ${idCampaña} AND codigos.usuario_campana_id IS NULL ORDER BY "id" ASC LIMIT 1`);

      if (codeToAssignId.length === 0) {
        throw new BadRequestException("No hay códigos disponibles para este campaña");
      } else {
        newUserCampaign.codigo = codeToAssignId[0];
      }
    }

    const usuarioCampania = await this.usersCampaignsRepository.save(newUserCampaign);

    const horario = await this.horariosRepository.findOne({
      where: {
        id: campaignSignUpDto.horario
      }
    });

    await createRuleMakePost(usuarioCampania.id, horario.fecha_hora);

    return await this.usersCampaignsRepository.findOne({
      relations: ['horario', 'codigo', 'pantallazos'],
      where: {
        id: usuarioCampania.id
      },
    });
  }

  async uploadScreenshots(
    idUsuario: string,
    campañaId: number,
    pantallazos: Array<Express.Multer.File>,
  ) {
    const usuarioCampaña = await this.usuariosCampañaRepository.findOne({
      where: {
        usuario: { id: idUsuario },
        campaña: { id: campañaId },
      },
    });

    const filesKeys = await this.filesService.uploadPublicFiles(
      `campañas/${campañaId}/usuarios/${idUsuario}`,
      pantallazos,
    );

    await this.pantallazoRepository.save(
      filesKeys.map((key) => ({
        ruta: key,
        usuarioCampaña: usuarioCampaña.id,
      })) as any,
    );

    await this.usuariosCampañaRepository.save({
      ...usuarioCampaña,
      estado: ESTADOS_USUARIO_CAMPANIA.PANTALLAZOS_EN_REVISION
    });

    return this.findOne(campañaId, idUsuario);
  }

  async findCampaignUsers(campaignId: number, getCampaignUsersDto: GetCampaignUsersDto) {
    let { take, page, criterioOrden, orden, keyword, porRevisar } = getCampaignUsersDto;
    page = page || 1;
    take = take || 10;
    const skip = take * (page - 1);

    const params: FindManyOptions<UsuarioCampaña> = {
      where: {
        campaña: {
          id: campaignId,
        },
      },
      take,
      skip,
      relations: ["usuario", "horario", "pantallazos", "codigo"]
    };

    if (keyword) {
      params.where = {
        ...params.where,
        usuario: [{
          nombre: ILike(`%${keyword}%`)
        }, {
          apellido: ILike(`%${keyword}%`)
        }]
      }
    }

    if (porRevisar) {
      params.where = {
        ...params.where,
        estado: ESTADOS_USUARIO_CAMPANIA.PANTALLAZOS_EN_REVISION
      }
    } else if (porRevisar === false) {
      params.where = {
        ...params.where,
        estado: Not(ESTADOS_USUARIO_CAMPANIA.PANTALLAZOS_EN_REVISION)
      }
    }

    if (criterioOrden) {
      const usuarioFields = ["nombre", "telefono"];
      const horarioFields = ["fecha_hora"];
      if (usuarioFields.includes(criterioOrden)) {
        params.order = {
          usuario: {
            [criterioOrden]: orden || ORDENES.ASC
          }
        }
      } else if (horarioFields.includes(criterioOrden)) {
        params.order = {
          horario: {
            [criterioOrden]: orden || ORDENES.ASC,
          },
        }
      } else {
        params.order = {
          [criterioOrden]: orden || ORDENES.ASC
        }
      }
    }

    const [data, count] = await this.usuariosCampañaRepository.findAndCount(params);

    return this.paginateResponse(count, data, page, take);
  }

  async reviewScreenshot(
    userId: string,
    campaignId: number,
    reviewScreenshotDto: ReviewScreenshotDto,
  ) {
    if (!reviewScreenshotDto.aprobar && !reviewScreenshotDto.razon_rechazo_pantallazos) {
      throw new BadRequestException("Debe incluir una razón de rechazo");
    }

    const usuarioCampaña = await this.usuariosCampañaRepository.findOne({
      where: {
        usuario: { id: userId },
        campaña: { id: campaignId },
      },
    });

    if (!usuarioCampaña) {
      throw new BadRequestException("El usuario no esta inscrito a esta campaña")
    }

    if (usuarioCampaña.estado !== ESTADOS_USUARIO_CAMPANIA.PANTALLAZOS_EN_REVISION) {
      throw new BadRequestException("Los pantallazos no se encuentran en revisión");
    }

    await this.pantallazoRepository
      .createQueryBuilder("pantallazo")
      .update(Pantallazo, { aprobado: reviewScreenshotDto.aprobar })
      .where("aprobado is null")
      .andWhere("usuarioCampañaId = :id", { id: usuarioCampaña.id })
      .execute();

    const newUsuarioCampania: QueryDeepPartialEntity<UsuarioCampaña> = {
      estado: reviewScreenshotDto.aprobar ? ESTADOS_USUARIO_CAMPANIA.TERMINADA_SATISFACTORIAMENTE : ESTADOS_USUARIO_CAMPANIA.PANTALLAZOS_RECHAZADOS,
      razon_rechazo_pantallazos: reviewScreenshotDto.aprobar ? null : reviewScreenshotDto.razon_rechazo_pantallazos,
      terminada: reviewScreenshotDto.aprobar,
      fecha_finalizacion: reviewScreenshotDto.aprobar ? new Date() : null
    };

    await this.usuariosCampañaRepository.update(usuarioCampaña.id, newUsuarioCampania);

    // TODO: Si el pantallazo fue rechazado mandar mensaje de whatsapp

    return await this.usuariosCampañaRepository.findOne({
      where: {
        id: usuarioCampaña.id
      }
    });
  }

  async makePost(userCampaignId: number) {
    // TODO Mensaje de whatsapp
    await createRuleUploadScreenshots(userCampaignId);

    return this.usuariosCampañaRepository.update(userCampaignId, {
      estado: ESTADOS_USUARIO_CAMPANIA.DEBO_PUBLICAR
    });
  }

  async changeStateToUploadScreenshots(userCampaignId: number) {
    // TODO Mensaje de whatsapp
    await createRule24HReminder(userCampaignId);
    return this.usuariosCampañaRepository.update(userCampaignId, {
      estado: ESTADOS_USUARIO_CAMPANIA.SUBIR_PANTALLAZOS
    });
  }

  async make24HReminder(userCampaignId: number) {
    // Validar que el pantallazo no se haya subido para crear el la regla de 24 H y mandar el mensaje de whatsapp
    // TODO llamar mensaje whatsapp
    await createRule72HReminder(userCampaignId);
    return "24H reminder created"
  }

  make72HReminder(userCampaignId: number) {
    // Validar que el pantallazo no se haya subido para mandar el mensaje de whatsapp
    // TODO llamar mensaje whatsapp
    return "72H reminder"
  }
}
