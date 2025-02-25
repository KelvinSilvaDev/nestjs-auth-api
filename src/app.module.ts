import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsuarioModule } from './usuario/usuario.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: 5432,
      username: process.env.DB_USER || 'sa',
      password: process.env.DB_PASS || '119696',
      database: process.env.DB_NAME || 'data_intelligence',
      autoLoadModels: true,
      synchronize: true,
      logging: false,
    }),
    UsuarioModule,
    AuthModule,
  ],
})
export class AppModule {}
