import {
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  import { Comentario } from './comentario.entity';
import { Lugar } from './lugar.entity';
  
  @Entity('usuarios')
  export class Usuario {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    Nombre: string; 

    @OneToMany(() => Comentario, (comentario) => comentario.usuario)
    comentarios: Comentario[];

    @OneToMany(() => Lugar, (lugar) => lugar.usuario)
    lugar: Lugar;
  }
  