import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.pizza.deleteMany();
  await prisma.user.deleteMany();

  // Create admin user
  const adminPassword = await bcrypt.hash('abacate', 10);
  await prisma.user.create({
    data: {
      name: 'Admin',
      email: 'a@a',
      password: adminPassword,
      address: 'Admin Office',
      isAdmin: true
    }
  });

  // Insert sample pizzas
  const pizzas = [
    {
      name: 'Frango Com Catupiry',
      description: 'Molho de tomate, queijo muçarela, frango desfiado temperado, Catupiry, orégano e massa tradicional',
      imageUrl: '/frango.webp',
      price: 49.90,
    },
    {
      name: 'Portuguesa',
      description: 'Molho de tomate, queijo muçarela, presunto, ovos, cebola, azeitonas, pimentão, orégano e massa tradicional',
      imageUrl: '/portuguesa.jpeg',
      price: 45.90,
    },
    {
      name: 'Carne Seca Com Catupiry',
      description: 'Molho de tomate, queijo muçarela, carne seca desfiada, Catupiry, cebola roxa, orégano e massa tradicional',
      imageUrl: '/pizza-carne-seca.jpg',
      price: 54.90,
    },
    {
      name: 'Costela',
      description: 'Molho de tomate, queijo muçarela, costela desfiada, cebola caramelizada, orégano e massa tradicional',
      imageUrl: '/costela.jpg',
      price: 59.90,
    },
  ];

  for (const pizza of pizzas) {
    await prisma.pizza.create({
      data: pizza,
    });
  }

  console.log('Sample data created successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 