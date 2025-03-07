const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function hashPassword(password) {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

async function main() {
  // Create users
  const employerPassword = await hashPassword('employer123');
  const jobSeekerPassword = await hashPassword('jobseeker123');

  // Create employer
  const employer = await prisma.user.upsert({
    where: { email: 'employer@example.com' },
    update: {},
    create: {
      name: 'Tech Company',
      email: 'employer@example.com',
      password: employerPassword,
      role: 'EMPLOYER',
    },
  });

  // Create job seeker
  const jobSeeker = await prisma.user.upsert({
    where: { email: 'jobseeker@example.com' },
    update: {},
    create: {
      name: 'Job Seeker',
      email: 'jobseeker@example.com',
      password: jobSeekerPassword,
      role: 'JOBSEEKER',
    },
  });

  // Create jobs
  const job1 = await prisma.job.upsert({
    where: { id: 'job1' },
    update: {},
    create: {
      id: 'job1',
      title: 'Full Stack Developer',
      description:
        'We are looking for a Full Stack Developer who is proficient with React.js and Node.js to join our team.',
      companyName: 'Tech Company',
      location: '北京',
      salary: '¥30,000 - ¥40,000 /月',
      requirements: 'React, Node.js, TypeScript, 3+ years of experience',
      employerId: employer.id,
    },
  });

  const job2 = await prisma.job.upsert({
    where: { id: 'job2' },
    update: {},
    create: {
      id: 'job2',
      title: 'UX/UI Designer',
      description:
        'We are seeking a talented UX/UI Designer to create amazing user experiences.',
      companyName: 'Tech Company',
      location: '上海',
      salary: '¥25,000 - ¥35,000 /月',
      requirements: 'Figma, Adobe XD, 2+ years of experience',
      employerId: employer.id,
    },
  });

  const job3 = await prisma.job.upsert({
    where: { id: 'job3' },
    update: {},
    create: {
      id: 'job3',
      title: 'Product Manager',
      description:
        'We are looking for an experienced Product Manager to lead our product development efforts.',
      companyName: 'Tech Company',
      location: '深圳',
      salary: '¥35,000 - ¥50,000 /月',
      requirements: 'Agile methodologies, 5+ years of experience',
      employerId: employer.id,
    },
  });

  // Create an application
  const application = await prisma.application.upsert({
    where: { id: 'app1' },
    update: {},
    create: {
      id: 'app1',
      coverLetter:
        'I am excited to apply for the Full Stack Developer position and believe my skills match your requirements.',
      resume: 'https://example.com/resume.pdf',
      userId: jobSeeker.id,
      jobId: job1.id,
    },
  });

  console.log({
    employer,
    jobSeeker,
    jobs: [job1, job2, job3],
    application,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 