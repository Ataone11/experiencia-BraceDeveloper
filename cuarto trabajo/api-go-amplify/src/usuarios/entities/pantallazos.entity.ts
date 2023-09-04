import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UsuarioCampaña } from './usuarios-campañas.entity';

@Entity('pantallazos')
export class Pantallazo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
  })
  ruta: string;

  @Column({
    nullable: true,
  })
  aprobado: Boolean;

  @ManyToOne(
    () => UsuarioCampaña,
    (usuarioCampaña) => usuarioCampaña.pantallazos,
  )
  usuarioCampaña: UsuarioCampaña;
}
