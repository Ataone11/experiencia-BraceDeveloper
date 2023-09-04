import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CaracteristicaAccesibilidad } from './caracteristica_accesbilidad.entity';
import { Lugar } from './lugar.entity';

@Entity('accesibilidades')
export class Accesibilidad {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  imagen: string;

  @OneToMany(() => CaracteristicaAccesibilidad, (caracteristicaAccesbilidad) => caracteristicaAccesbilidad.accesibilidad)
  caracteristicas: CaracteristicaAccesibilidad[];
}
 