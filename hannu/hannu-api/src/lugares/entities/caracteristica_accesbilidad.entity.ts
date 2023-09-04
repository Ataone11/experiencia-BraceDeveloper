import {
    Column,
    Entity,
    JoinColumn,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
  } from 'typeorm';
import { Accesibilidad } from './accesibilidad.entity';
  import { Lugar } from './lugar.entity';
  
  @Entity('caracteristicas_accesibilidades')
  export class CaracteristicaAccesibilidad {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    nombre: string;
  
    @ManyToOne(() => Accesibilidad, (accesibilidad) => accesibilidad.caracteristicas, {
        eager: true,
    })
    @JoinColumn()
    accesibilidad: Accesibilidad;

    @ManyToMany(() => Lugar, (lugar) => lugar.caracteristicas)
    lugares: Lugar[];
  }
   