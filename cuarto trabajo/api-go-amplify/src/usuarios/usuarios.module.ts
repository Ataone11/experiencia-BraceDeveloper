import { Module } from '@nestjs/common';
import { Usuario } from './entities/usuario.entity';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pantallazo } from './entities/pantallazos.entity';
import { UsuarioCampaña } from './entities/usuarios-campañas.entity';
import { Interes } from './entities/interes.entity';
import { CampañasModule } from 'src/campañas/campañas.module';
import { FilesService } from 'src/files/files.service';
import { PaisesModule } from 'src/paises/paises.module';
import { Lead } from './entities/leads.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Usuario,
      Pantallazo,
      UsuarioCampaña,
      Interes,
      Lead
    ]),
    CampañasModule,
    PaisesModule
  ],
  controllers: [UsuariosController],
  providers: [UsuariosService, FilesService]
})
export class UsuariosModule {}
