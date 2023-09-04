import { MultiPolygon } from 'geojson';
import { Ciudad } from 'src/paises/entities/ciudades.entitys';
import { UsuarioCampaña } from 'src/usuarios/entities/usuarios-campañas.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Categoria } from './categorias.entitys';
import { CiudadesCampañas } from './ciudadesCampañas.entity';
import { Codigo } from './codigos.entitys';
import { Horario } from './horarios.entitys';

@Entity('campañas')
export class Campaña {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
  })
  titulo: string;

  @Column({
    nullable: true,
  })
  marca: string;

  @Column({
    nullable: true,
  })
  cupos: number;

  @Column({
    nullable: true,
  })
  estado: number;

  @Column({
    nullable: true,
  })
  puntos: number;

  @Column({
    nullable: true,
  })
  requisitos: string;

  @Column({
    nullable: true,
  })
  instrucciones: string;

  @Column({
    nullable: true,
  })
  muestra: boolean;

  @Column({
    nullable: true,
  })
  imgMuestra: string;

  @Column({
    nullable: true,
  })
  codigoUnico: boolean;

  @CreateDateColumn({ name: 'fechaCreacion' })
  fechaCreacion: Date;

  @Column({
    nullable: true,
  })
  fechaCierreInscripciones: Date;

  @Column({
    nullable: true,
  })
  urlInstagram: string;

  @Column({
    nullable: true,
  })
  descripcion: string;

  @Column({
    nullable: true,
  })
  mensajeWhatsapp: string;

  @Column({
    nullable: true,
  })
  imgCampania: string;

  @Index({ spatial: true })
  @Column({
    type: 'geography',
    spatialFeatureType: 'MultiPolygon',
    srid: 4326,
    nullable: true
  })
  areaCampaña: MultiPolygon;

  @Column({
    nullable: true,
  })
  materialGrafico: string;

  @ManyToOne(() => Categoria, (categoria) => categoria.campañas)
  @JoinColumn()
  categoria: Categoria[];

  @OneToMany(() => Horario, (horario) => horario.campaña, { cascade: true })
  @JoinColumn()
  horarios: Horario[];

  @OneToMany(() => Codigo, (codigo) => codigo.campaña, { cascade: true })
  @JoinColumn()
  codigos: Codigo[];

  @OneToMany(() => UsuarioCampaña, (usuarioCampaña) => usuarioCampaña.campaña)
  @JoinColumn()
  usuarioCampañas: UsuarioCampaña;

  @OneToMany(
    () => CiudadesCampañas,
    (ciudadesCampaña) => ciudadesCampaña.campaña,
    { cascade: true },
  )
  @JoinColumn()
  ciudadesCampañas: CiudadesCampañas[];
}
