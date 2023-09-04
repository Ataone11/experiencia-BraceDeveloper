import { Categoria } from 'src/campañas/entities/categorias.entitys';
import { Ciudad } from 'src/paises/entities/ciudades.entitys';
import {
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    ManyToMany,
    ManyToOne,
    JoinColumn
  } from 'typeorm';
import { Campaña } from './campañas.entitys';


  
  @Entity('ciudades_campañas')
  export class CiudadesCampañas {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Campaña, (categoria) => categoria.ciudadesCampañas)
    @JoinColumn({name: "campana_id"})
    campaña: Campaña;

    @ManyToOne(() => Ciudad, (ciudad) => ciudad.ciudadesCampañas)
    ciudad: Ciudad;
  }
  