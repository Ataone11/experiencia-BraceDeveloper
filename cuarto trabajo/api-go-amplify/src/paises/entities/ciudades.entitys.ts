import { Campaña } from 'src/campañas/entities/campañas.entitys';
import { CiudadesCampañas } from 'src/campañas/entities/ciudadesCampañas.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Pais } from './paises.entitys';
import { MultiPolygon } from "geojson";


@Entity('ciudades')
export class Ciudad {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @ManyToOne(() => Pais, (pais) => pais.ciudades)
  pais: Pais[];

  @OneToMany(() => Usuario, (usuario) => usuario.ciudad)
  usuario: Usuario[];

  @Index({ spatial: true })
  @Column({
    type: 'geography',
    spatialFeatureType: 'MultiPolygon',
    srid: 4326,
    nullable: true
  })
  multipolygon: MultiPolygon;

  @OneToMany(() => CiudadesCampañas, (ciudad) => ciudad.ciudad)
  @JoinColumn()
  ciudadesCampañas: CiudadesCampañas[];
}
