import { Categoria } from 'src/campañas/entities/categorias.entitys';
import {
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    ManyToMany,
    ManyToOne,
    JoinColumn
  } from 'typeorm';

import { Usuario } from './usuario.entity';
  
  @Entity('intereses')
  export class Interes {
    @PrimaryGeneratedColumn()
    id: number;

    
    @ManyToOne(() => Categoria, (categoria) => categoria.intereses)
    categoria: Categoria;

   
    @ManyToOne(() => Usuario, (usuario) => usuario.intereses)
    usuario: Usuario;
  }
  