import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    // Find all users who don't have any resumes
    const usersWithoutResumes = await prisma.user.findMany({
      where: {
        resumes: {
          none: {}
        }
      }
    });

    console.log(`Found ${usersWithoutResumes.length} users without resumes`);

    // Create initial resume records for these users
    const createdResumes = await Promise.all(
      usersWithoutResumes.map(user =>
        prisma.resume.create({
          data: {
            userid: user.userid,
            filename: '',
            filepath: '',
            education: '',
            language: ''
          }
        })
      )
    );

    console.log(`Created ${createdResumes.length} resume records`);
    console.log('Created resumes:', createdResumes);
  } catch (error) {
    console.error('Error initializing resumes:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 