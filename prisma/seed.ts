import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

const main = async () =>{
  // limpando os dados existentes
  await prisma.user.deleteMany({});
  await prisma.post.deleteMany({});

  const user = await prisma.user.create({
    data: {
      email:'fad@email.com.br',
      name:'fabio diniz',
      age:89
    }
  });

  const post = await prisma.post.create({
    data: {
      title:'post de teste via seed',
      body:'este é um post de teste',
      authorId: user.id
    }
  });
}

main();