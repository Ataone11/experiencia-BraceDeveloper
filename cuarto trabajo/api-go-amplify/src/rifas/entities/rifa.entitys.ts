import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
  } from 'typeorm';


  
  @Entity('rifas')
  export class Rifa {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({
      nullable: true,
    })
    nombre: string;

    @Column({
      nullable: true,
    })
    descripcion: string;

    @Column({
      nullable: true,
    })
    fecha: Date;

    @Column({
      nullable: true,
    })
    tipo: string;

    @Column({
      nullable: true,
    })
    imagen: string;
  }
  