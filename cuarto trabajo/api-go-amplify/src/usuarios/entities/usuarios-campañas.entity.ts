import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Usuario } from './usuario.entity';
import { Campaña } from 'src/campañas/entities/campañas.entitys';
import { Horario } from 'src/campañas/entities/horarios.entitys';
import { Codigo } from 'src/campañas/entities/codigos.entitys';
import { Pantallazo } from './pantallazos.entity';

@Entity('usuarios_campañas')
export class UsuarioCampaña {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
  })
  terminada: boolean;

  @Column({
    nullable: true,
  })
  puntos: number;

  @Column({
    nullable: true,
  })
  fecha_inscripcion: Date;

  @Column({
    nullable: true,
  })
  fecha_finalizacion: Date;

  @Column({
    nullable: true,
  })
  estado: number;

  @Column({
    nullable: true,
  })
  razon_rechazo_pantallazos: string;

  @ManyToOne(() => Usuario, (usuario) => usuario.usuarioCampañas)
  usuario: Usuario;

  @ManyToOne(() => Campaña, (campaña) => campaña.usuarioCampañas)
  campaña: Campaña;

  @ManyToOne(() => Horario, (horario) => horario.usuariosCampañas)
  @JoinColumn()
  horario: Horario;

  @OneToOne(() => Codigo, (codigo) => codigo.usuarioCampaña)
  codigo: Codigo;

  @OneToMany(() => Pantallazo, (pantallazo) => pantallazo.usuarioCampaña)
  pantallazos: Pantallazo[];
}
