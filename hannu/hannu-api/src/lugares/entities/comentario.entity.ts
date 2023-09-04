import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Lugar } from './lugar.entity';
import { Usuario } from './usuario.entity';

@Entity('comentarios')
export class Comentario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  calificacion: number;

  @Column()
  texto: string;

  @Column({
    nullable: true
  })
  textoInt: string;

  @ManyToOne(() => Usuario, (usuario) => usuario.comentarios, {
    eager: true,
  })
  @JoinColumn()
  usuario: Usuario;

  @ManyToOne(() => Lugar, (lugar) => lugar.comentarios, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: "id_lugar"
  })
  lugar: Lugar;
}
