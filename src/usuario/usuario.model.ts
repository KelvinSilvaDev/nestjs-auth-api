import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

@Table({ tableName: 'T_USUARIO', timestamps: false })
export class Usuario extends Model<Usuario> {
  @ApiProperty({ description: 'ID do usuário' })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'ID_USUARIO',
  })
  idUsuario: number;

  @ApiProperty({ description: 'CNPJ do usuário' })
  @Column({
    type: DataType.DECIMAL(14, 0),
    unique: true,
    allowNull: false,
    field: 'CNPJ',
  })
  cnpj: string;

  @ApiProperty({ description: 'Senha do usuário' })
  @Column({
    type: DataType.TEXT,
    allowNull: false,
    field: 'SENHA',
  })
  senha: string;
}
