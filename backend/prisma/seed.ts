import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@vsip.local' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@vsip.local',
      passwordHash: hashedPassword,
      role: Role.ADMIN,
      langPref: 'en',
    },
  });

  // Create head teacher
  const headTeacher = await prisma.user.upsert({
    where: { email: 'head@vsip.local' },
    update: {},
    create: {
      name: 'Head Teacher',
      email: 'head@vsip.local',
      passwordHash: hashedPassword,
      role: Role.HEAD,
      langPref: 'or',
    },
  });

  // Create teacher
  const teacher = await prisma.user.upsert({
    where: { email: 'teacher@vsip.local' },
    update: {},
    create: {
      name: 'Teacher',
      email: 'teacher@vsip.local',
      passwordHash: hashedPassword,
      role: Role.TEACHER,
      langPref: 'hi',
    },
  });

  // Create demo school
  const school = await prisma.school.upsert({
    where: { code: 'DEMO001' },
    update: {},
    create: {
      name: 'Demo Village School',
      code: 'DEMO001',
      mediums: ['or', 'hi', 'en'],
      grades: [1, 2, 3, 4, 5],
      facilitiesFlags: {
        toilets: true,
        handwash: true,
        mhm: true,
        kitchen: true,
        poshan: true,
      },
    },
  });

  console.log('✅ Seeding completed!');
  console.log('📝 Default credentials:');
  console.log('   Admin: admin@vsip.local / admin123');
  console.log('   Head: head@vsip.local / admin123');
  console.log('   Teacher: teacher@vsip.local / admin123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


