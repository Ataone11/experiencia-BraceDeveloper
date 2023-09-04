import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { PaisesModule } from './paises/paises.module';
import { RifasModule } from './rifas/rifas.module';
import { CampañasService } from './campañas/campañas.service';
import { CampañasController } from './campañas/campañas.controller';
import { CampañasModule } from './campañas/campañas.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesService } from './files/files.service';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env.' + process.env.NODE_ENV, }),
    TypeOrmModule.forRoot({
    type: 'postgres', // type of our database
    host: process.env.HOST, // database host
    port: parseInt(process.env.PORT), // database host
    username: 'postgres', // username
    password: process.env.PASSWORD, // user password
    database: process.env.DATABASE, // name of our database,
    autoLoadEntities: JSON.parse(process.env.AUTO_LOAD_ENTITIES), // models will be loaded automatically
    synchronize: JSON.parse(process.env.SYNCHRONIZE), // your entities will be synced with the database(recommended: disable in prod)
    migrations: ['migration/*.js'],
  }),
  UsuariosModule, PaisesModule, RifasModule, CampañasModule
],
  controllers: [AppController, CampañasController],
  providers: [AppService, CampañasService, FilesService],
})
export class AppModule {}
