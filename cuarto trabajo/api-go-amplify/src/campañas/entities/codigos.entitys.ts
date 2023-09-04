import {
  Column,
  Entity,
  OneToOne,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { Campaña } from './campañas.entitys';
import { UsuarioCampaña } from 'src/usuarios/entities/usuarios-campañas.entity';

@Entity('codigos')
export class Codigo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  codigo: string;

  @ManyToOne(() => Campaña, (campaña) => campaña.codigos)
  campaña: Campaña[];

  @OneToOne(() => UsuarioCampaña, (usuarioCampaña) => usuarioCampaña.codigo)
  @JoinColumn({ name: "usuario_campana_id" })
  usuarioCampaña: UsuarioCampaña;
}
