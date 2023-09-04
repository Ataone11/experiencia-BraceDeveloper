import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Usuario } from './usuario.entity';

@Entity('leads')
export class Lead {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: true,
    })
    ciudad: string;

    @Column({
        nullable: true,
    })
    pais: string;

    @Column({
        nullable: true,
    })
    direccion: string;

    @Column({
        nullable: true,
    })
    indicacionesAdicionales: string;

    @Column({
        nullable: true,
        type: "real"
    })
    longitud: number;

    @Column({
        nullable: true,
        type: "real"
    })
    latitud: number;

    @CreateDateColumn({ name: 'created_date' })
    created_date: Date;

    @ManyToOne(() => Usuario, (usuario) => usuario.leads)
    usuario: Usuario;
}