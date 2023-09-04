import { Interes } from 'src/usuarios/entities/interes.entity';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  import { Campaña } from './campañas.entitys'; 
  
  @Entity('categoria')
  export class Categoria {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    nombre: string;

    @OneToMany(() => Campaña, (campaña) => campaña.categoria)
    campañas: Campaña[];

    @OneToMany(() => Interes, (interes) => interes.categoria)
    @JoinColumn()
    intereses: Interes[];
  }
  