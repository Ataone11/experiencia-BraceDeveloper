import { UsuarioCampaña } from 'src/usuarios/entities/usuarios-campañas.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Campaña } from './campañas.entitys';

@Entity('horarios')
export class Horario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fecha_hora: Date;

  @ManyToOne(() => Campaña, (campaña) => campaña.horarios)
  campaña: Campaña;

  @OneToMany(() => UsuarioCampaña, (usuarioCampaña) => usuarioCampaña.horario)
  usuariosCampañas: UsuarioCampaña[];
}
