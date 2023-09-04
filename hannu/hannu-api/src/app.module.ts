import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LugaresModule } from './lugares/lugares.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesService } from './files/files.service';

@Module({
  imports: [
    LugaresModule,
    ConfigModule.forRoot({ envFilePath: process.env.NODE_ENV + '.env' }),
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
      cli: {
        migrationsDir: 'migration',
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, FilesService],
})
export class AppModule {}
