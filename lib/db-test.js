const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function testDatabaseConnection() {
  try {
    // Test database connection
    await prisma.$connect();
    console.log('✅ Database connection successful');

    // Test creating a user
    const testUser = await prisma.user.create({
      data: {
        username: 'testuser',
        email: 'test@example.com',
        password: 'testpassword123',
      },
    });
    console.log('✅ User creation successful:', testUser);

    // Test reading the user
    const readUser = await prisma.user.findUnique({
      where: { email: 'test@example.com' },
    });
    console.log('✅ User read successful:', readUser);

    // Test updating the user
    const updatedUser = await prisma.user.update({
      where: { email: 'test@example.com' },
      data: { username: 'updatedtestuser' },
    });
    console.log('✅ User update successful:', updatedUser);

    // Test deleting the user
    await prisma.user.delete({
      where: { email: 'test@example.com' },
    });
    console.log('✅ User deletion successful');

    console.log('🎉 All database tests passed successfully!');
  } catch (error) {
    console.error('❌ Database test failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the test
testDatabaseConnection(); 