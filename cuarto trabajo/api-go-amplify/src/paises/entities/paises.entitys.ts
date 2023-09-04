import { Usuario } from 'src/usuarios/entities/usuario.entity';
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    JoinColumn,
    OneToMany
  } from 'typeorm';
import { Ciudad } from './ciudades.entitys';
import { TipoDocumento } from './tipoDocumento.entity';
 
  
  @Entity('paises')
  export class Pais {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    nombre: string;

    @OneToMany(() => Ciudad, (ciudad) => ciudad.pais)
    @JoinColumn()
    ciudades: Ciudad;

    @OneToMany(() => TipoDocumento, (tipoDocumento) => tipoDocumento.pais)
    @JoinColumn()
    tipoDocumento: TipoDocumento;
  }
  