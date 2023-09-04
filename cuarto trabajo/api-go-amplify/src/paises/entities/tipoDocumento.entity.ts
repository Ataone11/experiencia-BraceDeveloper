import { Usuario } from 'src/usuarios/entities/usuario.entity';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
  } from 'typeorm';
 import { Pais } from './paises.entitys';
  
  @Entity('tipos_documento')
  export class TipoDocumento {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    nombre: string;
  
    @Column()
    abreviatura: string;
  
    @ManyToOne(() => Pais, (pais) => pais.tipoDocumento)
    pais: Pais[];

    @OneToMany(() => Usuario, (usuario) => usuario.tipoDocumento)
    usuarios: Usuario[];
  }
  