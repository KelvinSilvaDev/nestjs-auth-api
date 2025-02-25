import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UsuarioService } from './usuario/usuario.service';
import { Sequelize } from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';

async function bootstrap() {
  // Cria o contexto da aplicação sem levantar o servidor HTTP
  const appContext = await NestFactory.createApplicationContext(AppModule);

  // Recupera a instância do Sequelize
  const sequelize = appContext.get(Sequelize);

  // Dropar e recriar as tabelas com base nos modelos definidos
  await sequelize.sync({ force: true });
  console.log('Tabelas droppadas e recriadas.');

  const usuarioService = appContext.get(UsuarioService);

  // Dados para popular o banco
  const usuariosSeed = [
    { cnpj: '12345678901234', senha: 'senha123' },
    { cnpj: '98765432109876', senha: 'senha456' },
  ];

  const saltRounds = 10; // Número de rounds para o bcrypt

  for (const usuarioData of usuariosSeed) {
    // Gera o hash da senha utilizando bcrypt
    const hashedSenha = await bcrypt.hash(usuarioData.senha, saltRounds);
    await usuarioService.create({ cnpj: usuarioData.cnpj, senha: hashedSenha });
    console.log(`Usuário com CNPJ ${usuarioData.cnpj} criado.`);
  }

  await appContext.close();
}

bootstrap().catch((err) => {
  console.error('Erro ao popular o banco:', err);
});
