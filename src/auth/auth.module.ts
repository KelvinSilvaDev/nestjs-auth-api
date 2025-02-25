import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsuarioModule } from '../usuario/usuario.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    UsuarioModule,
    JwtModule.register({}), // Configuração dinâmica no serviço
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
