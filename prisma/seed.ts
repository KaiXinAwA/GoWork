import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../lib/auth';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.application.deleteMany();
  await prisma.job.deleteMany();
  await prisma.company.deleteMany();
  await prisma.resume.deleteMany();
  await prisma.user.deleteMany();

  // Create test users
  const jobSeeker1 = await prisma.user.create({
    data: {
      username: 'john_developer',
      email: 'john@example.com',
      password: await hashPassword('password123'),
    },
  });

  const jobSeeker2 = await prisma.user.create({
    data: {
      username: 'alice_designer',
      email: 'alice@example.com',
      password: await hashPassword('password123'),
    },
  });

  // Create test company
  const company = await prisma.company.create({
    data: {
      company_name: 'Tech Solutions Inc.',
      email: 'contact@techsolutions.com',
      contact_number: '+1234567890',
      country_state: 'California',
      address: '123 Tech Street, San Francisco, CA',
      license: 'LIC123456',
      license_status: 'Active',
    },
  });

  // Create test jobs
  const job1 = await prisma.job.create({
    data: {
      companyid: company.companyid,
      position: 'Senior Frontend Developer',
      typesofwork: 'Full-time',
      salaryrange: '$100,000 - $150,000',
      requirements: '5+ years of React experience',
      contactdetails: 'jobs@techsolutions.com',
    },
  });

  const job2 = await prisma.job.create({
    data: {
      companyid: company.companyid,
      position: 'UI/UX Designer',
      typesofwork: 'Full-time',
      salaryrange: '$80,000 - $120,000',
      requirements: '3+ years of design experience',
      contactdetails: 'jobs@techsolutions.com',
    },
  });

  // Create test resumes
  const resume1 = await prisma.resume.create({
    data: {
      userid: jobSeeker1.userid,
      filename: 'john_resume.pdf',
      filepath: '/uploads/resumes/john_resume.pdf',
      education: 'BS in Computer Science',
      language: 'English',
    },
  });

  const resume2 = await prisma.resume.create({
    data: {
      userid: jobSeeker2.userid,
      filename: 'alice_resume.pdf',
      filepath: '/uploads/resumes/alice_resume.pdf',
      education: 'MS in Design',
      language: 'English',
    },
  });

  // Create test applications
  await prisma.application.create({
    data: {
      userid: jobSeeker1.userid,
      jobid: job1.jobid,
      resumeid: resume1.resumeid,
    },
  });

  await prisma.application.create({
    data: {
      userid: jobSeeker2.userid,
      jobid: job2.jobid,
      resumeid: resume2.resumeid,
    },
  });

  console.log('Seed data created successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

