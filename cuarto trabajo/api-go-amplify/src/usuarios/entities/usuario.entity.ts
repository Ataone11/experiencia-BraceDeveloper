import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { TipoDocumento } from 'src/paises/entities/tipoDocumento.entity';
import { Pais } from 'src/paises/entities/paises.entitys';
import { Ciudad } from 'src/paises/entities/ciudades.entitys';
import { UsuarioCampaña } from './usuarios-campañas.entity';
import { Interes } from './interes.entity';
import { ROLES_USUARIOS } from '../enums/roles-usuarios.enum';
import { Lead } from './leads.entity';

@Entity('usuarios')
export class Usuario {
  @PrimaryColumn()
  id: string;

  @Column()
  nombre: string;

  @Column({
    nullable: true,
  })
  apellido: string;

  @Column({
    nullable: true,
  })
  correo: string;

  @Column({
    nullable: true,
  })
  instagram: string;

  @Column({
    nullable: true,
  })
  urlFoto: string;

  @Column({
    nullable: true,
  })
  telefono: string;

  @Column({
    nullable: true,
  })
  numeroDocumento: string;

  @Column({
    nullable: true,
  })
  direccion: string;

  @Column({
    nullable: true,
  })
  indicacionesAdicionales: string;

  @Column({
    nullable: true,
  })
  fechaDeNacimiento: Date;

  @Column({
    nullable: true,
  })
  fechaSolicitud: Date;

  @Column({
    nullable: true,
    type: "real"
  })
  longitud: number;

  @Column({
    nullable: true,
    type: "real"
  })
  latitud: number;

  @Column({
    nullable: true,
  })
  seguidores: number;

  @Column({
    nullable: true,
  })
  estado: number;

  @Column({
    nullable: false,
    default: ROLES_USUARIOS.AMPLIFIER
  })
  rol: ROLES_USUARIOS;

  @ManyToOne(() => Ciudad, (ciudad) => ciudad.usuario)
  @JoinColumn()
  ciudad: Ciudad;

  @ManyToOne(() => TipoDocumento, (tipoDocumento) => tipoDocumento.usuarios)
  @JoinColumn()
  tipoDocumento: TipoDocumento;

  @OneToMany(() => UsuarioCampaña, (usuarioCampaña) => usuarioCampaña.usuario)
  @JoinColumn()
  usuarioCampañas: UsuarioCampaña;

  @OneToMany(() => Interes, (intereses) => intereses.usuario)
  @JoinColumn()
  intereses: Interes[];

  @OneToMany(() => Lead, (lead) => lead.usuario)
  @JoinColumn()
  leads: Lead;
}
