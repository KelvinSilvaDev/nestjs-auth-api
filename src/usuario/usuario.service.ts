import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Usuario } from './usuario.model';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectModel(Usuario)
    private usuarioModel: typeof Usuario,
  ) {}

  async create(usuarioData: Partial<Usuario>): Promise<Usuario> {
    return this.usuarioModel.create(usuarioData);
  }

  async findByCnpj(cnpj: string): Promise<Usuario | null> {
    return this.usuarioModel.findOne({ where: { cnpj } });
  }
}
