import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  import { Lugar } from './lugar.entity';
  
  @Entity('departamentos')
  export class Departamento {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    nombre: string;
  
    @OneToMany(() => Lugar, (lugar) => lugar.departamento)
    lugares: Lugar[];
  }
  