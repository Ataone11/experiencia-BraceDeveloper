import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Accesibilidad } from './accesibilidad.entity';
import { CaracteristicaAccesibilidad } from './caracteristica_accesbilidad.entity';
import { Categoria } from './categoria.entity';
import { Comentario } from './comentario.entity';
import { Departamento } from './departamento.entity';
import { Media } from './media.entity';
import { Usuario } from './usuario.entity';

@Entity('lugares')
export class Lugar {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({
    nullable: true,
  })
  nit: string;

  @Column({
    nullable: true,
  })
  correo: string;

  @Column({
    nullable: true,
  })
  telefono: string;

  @Column({
    nullable: true,
  })
  descripcion: string;

  @Column({
    nullable: true,
  })
  descripcionInterpretada: string;

  @Column({
    nullable: true,
  })
  latitud: string;
  
  @Column({
    nullable: true,
  })
  fechaRegistro: Date;

  @Column({
    nullable: true,
  })
  longitud: string;

  @Column({
    nullable: true,
  })
  direccion: string;

  @Column({
    nullable: true,
  })
  video: string;

  @Column({
    nullable: true,
  })
  estado: number;

  @OneToOne(() => Usuario, (usuario) => usuario.lugar, {
    eager: true,
  })
  @JoinColumn()
  usuario: Usuario;

  @ManyToOne(() => Categoria, (categoria) => categoria.lugares, {
    eager: true,
  })
  @JoinColumn()
  categoria: Categoria;

  @ManyToOne(() => Departamento, (departamento) => departamento.lugares, {
    eager: true,
  })
  @JoinColumn()
  departamento: Departamento;

  @OneToMany(() => Comentario, (comentario) => comentario.lugar, { cascade: true, eager: true })
  comentarios: Comentario[];

  @OneToMany(() => Media, (media) => media.lugar, { cascade: true, eager: true })
  medias: Media[];

  @ManyToMany(() => CaracteristicaAccesibilidad, (caracteristicaAccesbilidad) => caracteristicaAccesbilidad.lugares, {cascade:true, eager: true})
  @JoinTable({
    name: "caracteristicas_lugares",
    joinColumn: { name: "lugarId", referencedColumnName: "id" },
    inverseJoinColumn: { name: "caracteristicaId" }
  })
  caracteristicas: CaracteristicaAccesibilidad[];
}
