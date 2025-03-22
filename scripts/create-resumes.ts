import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  try {
    // Find all users who dont have any resumes
    const users = await prisma.user.findMany();
    console.log(`Found ${users.length} total users`);

    for (const user of users) {
      const resumeCount = await prisma.resume.count({
        where: { userid: user.userid }
      });
      
      if (resumeCount === 0) {
        const resume = await prisma.resume.create({
          data: {
            userid: user.userid,
            filename: "",
            filepath: "",
            education: "",
            language: ""
          }
        });
        console.log(`Created resume for user ${user.userid}:`, resume);
      } else {
        console.log(`User ${user.userid} already has ${resumeCount} resume(s)`);
      }
    }

    console.log("Resume creation completed");
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 