/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from '../usuario/usuario.service';
import { Usuario } from '../usuario/usuario.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
  ) {}

  async validateUser(cnpj: string, senha: string): Promise<Usuario> {
    const user = await this.usuarioService.findByCnpj(cnpj);
    // Compara a senha informada com o hash armazenado
    if (user && (await bcrypt.compare(senha, user.senha))) {
      return user;
    }
    throw new UnauthorizedException('Credenciais inválidas');
  }

  async login(user: Usuario) {
    const payload = { sub: user.idUsuario, cnpj: user.cnpj };
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET || 'default_jwt_secret',
      expiresIn: process.env.JWT_EXPIRES_IN || '3600s',
    });
    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET || 'default_jwt_refresh_secret',
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '86400s',
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async refresh(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET || 'default_jwt_refresh_secret',
      });
      const user = await this.usuarioService.findByCnpj(payload.cnpj);
      if (!user) {
        throw new UnauthorizedException('Usuário não encontrado');
      }
      return this.login(user);
    } catch (error) {
      throw new UnauthorizedException('Refresh token inválido');
    }
  }
}

// /* eslint-disable @typescript-eslint/no-unused-vars */
// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { UsuarioService } from '../usuario/usuario.service';
// import { Usuario } from '../usuario/usuario.model';

// @Injectable()
// export class AuthService {
//   constructor(
//     private usuarioService: UsuarioService,
//     private jwtService: JwtService,
//   ) {}

//   async validateUser(cnpj: string, senha: string): Promise<Usuario> {
//     const user = await this.usuarioService.findByCnpj(cnpj);
//     // OBS.: Em produção, utilize comparação com senha criptografada (ex.: bcrypt).
//     if (user && user.senha === senha) {
//       return user;
//     }
//     throw new UnauthorizedException('Credenciais inválidas');
//   }

//   async login(user: Usuario) {
//     const payload = { sub: user.idUsuario, cnpj: user.cnpj };
//     const accessToken = this.jwtService.sign(payload, {
//       secret: process.env.JWT_SECRET || 'default_jwt_secret',
//       expiresIn: process.env.JWT_EXPIRES_IN || '3600s',
//     });
//     const refreshToken = this.jwtService.sign(payload, {
//       secret: process.env.JWT_REFRESH_SECRET || 'default_jwt_refresh_secret',
//       expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '86400s',
//     });

//     return {
//       accessToken,
//       refreshToken,
//     };
//   }

//   async refresh(refreshToken: string) {
//     try {
//       const payload = this.jwtService.verify(refreshToken, {
//         secret: process.env.JWT_REFRESH_SECRET || 'default_jwt_refresh_secret',
//       });
//       const user = await this.usuarioService.findByCnpj(payload.cnpj);
//       if (!user) {
//         throw new UnauthorizedException('Usuário não encontrado');
//       }
//       return this.login(user);
//     } catch (error) {
//       throw new UnauthorizedException('Refresh token inválido');
//     }
//   }
// }
