import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Lugar } from './lugar.entity';

@Entity('categorias')
export class Categoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  nombreInt: string;

  @Column()
  imagen: string;

  @OneToMany(() => Lugar, (lugar) => lugar.categoria)
  lugares: Lugar[];
}
