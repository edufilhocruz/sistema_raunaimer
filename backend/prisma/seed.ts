import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = 'admin@raunaimer.adv.br';
  const senha = 'Admin2025*';
  const nome = 'Eder Raunaimer';
  const role = 'Admin';

  const senhaHash = await bcrypt.hash(senha, 10);

  // Verifica se já existe
  const existing = await prisma.usuario.findUnique({ where: { email } });
  if (!existing) {
    await prisma.usuario.create({
      data: {
        nome,
        email,
        senha: senhaHash,
        role,
      },
    });
    console.log('Usuário admin criado com sucesso!');
  } else {
    console.log('Usuário admin já existe.');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 