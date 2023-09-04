import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Lugar } from './lugar.entity';

@Entity('medias')
export class Media {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ruta: string;

  @ManyToOne(() => Lugar, (lugar) => lugar.medias, { onDelete: 'CASCADE' })
  @JoinColumn()
  lugar: Lugar;
}
