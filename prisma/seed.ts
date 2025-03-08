import { PrismaClient, UserRole, JobType, ApplicationStatus } from '@prisma/client';
import { hashPassword } from '../lib/auth';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Clean up existing data
  await prisma.application.deleteMany();
  await prisma.education.deleteMany();
  await prisma.job.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  // Create categories
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Software Development',
        description: 'Software development and engineering positions',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Data Science',
        description: 'Data science, analytics, and machine learning positions',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Design',
        description: 'UI/UX and graphic design positions',
      },
    }),
  ]);

  // Create skills
  const skills = await Promise.all([
    prisma.skill.create({ data: { name: 'JavaScript' } }),
    prisma.skill.create({ data: { name: 'Python' } }),
    prisma.skill.create({ data: { name: 'React' } }),
    prisma.skill.create({ data: { name: 'Node.js' } }),
    prisma.skill.create({ data: { name: 'SQL' } }),
    prisma.skill.create({ data: { name: 'UI/UX Design' } }),
  ]);

  // Create employer
  const employer = await prisma.user.create({
    data: {
      name: 'Tech Solutions Inc.',
      email: 'employer@example.com',
      password: await hashPassword('employer123'),
      role: UserRole.EMPLOYER,
      bio: 'Leading technology solutions provider',
      location: 'Singapore',
    },
  });

  // Create job seekers
  const jobSeeker1 = await prisma.user.create({
    data: {
      name: 'John Developer',
      email: 'john@example.com',
      password: await hashPassword('password123'),
      role: UserRole.JOBSEEKER,
      bio: 'Full-stack developer with 3 years of experience',
      location: 'Malaysia',
      experience: 3,
      skills: {
        connect: [
          { id: skills[0].id }, // JavaScript
          { id: skills[2].id }, // React
        ],
      },
      education: {
        create: {
          institution: 'University of Technology',
          degree: 'Bachelor',
          field: 'Computer Science',
          startDate: new Date('2018-09-01'),
          endDate: new Date('2022-06-30'),
        },
      },
    },
  });

  const jobSeeker2 = await prisma.user.create({
    data: {
      name: 'Alice Designer',
      email: 'alice@example.com',
      password: await hashPassword('password123'),
      role: UserRole.JOBSEEKER,
      bio: 'UI/UX designer passionate about user experience',
      location: 'Singapore',
      experience: 2,
      skills: {
        connect: [
          { id: skills[5].id }, // UI/UX Design
        ],
      },
      education: {
        create: {
          institution: 'Design Academy',
          degree: 'Bachelor',
          field: 'Digital Design',
          startDate: new Date('2019-09-01'),
          endDate: new Date('2023-06-30'),
        },
      },
    },
  });

  // Create jobs
  const job1 = await prisma.job.create({
    data: {
      title: 'Senior Frontend Developer',
      description: 'Looking for an experienced frontend developer with React expertise',
      companyName: 'Tech Solutions Inc.',
      location: 'Singapore',
      salary: '$6,000 - $8,000',
      type: JobType.FULL_TIME,
      experienceLevel: 'Senior',
      employerId: employer.id,
      categoryId: categories[0].id,
      skills: {
        connect: [
          { id: skills[0].id }, // JavaScript
          { id: skills[2].id }, // React
        ],
      },
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    },
  });

  const job2 = await prisma.job.create({
    data: {
      title: 'UI/UX Designer',
      description: 'Seeking a creative UI/UX designer for our product team',
      companyName: 'Tech Solutions Inc.',
      location: 'Remote',
      salary: '$4,000 - $6,000',
      type: JobType.FULL_TIME,
      experienceLevel: 'Mid-Level',
      employerId: employer.id,
      categoryId: categories[2].id,
      skills: {
        connect: [
          { id: skills[5].id }, // UI/UX Design
        ],
      },
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
  });

  // Create applications
  await prisma.application.create({
    data: {
      userId: jobSeeker1.id,
      jobId: job1.id,
      status: ApplicationStatus.PENDING,
      coverLetter: 'I am very interested in this position...',
    },
  });

  await prisma.application.create({
    data: {
      userId: jobSeeker2.id,
      jobId: job2.id,
      status: ApplicationStatus.REVIEWING,
      coverLetter: 'I would love to join your design team...',
    },
  });

  // Create test accounts
  const hashedPassword = await bcrypt.hash('Password123!', 10);

  // 1. Job Seeker Account
  const jobSeeker = await prisma.user.upsert({
    where: { email: 'jobseeker@example.com' },
    update: {},
    create: {
      name: 'John Smith',
      email: 'jobseeker@example.com',
      password: hashedPassword,
      role: UserRole.JOBSEEKER,
      bio: 'Experienced software developer looking for new opportunities',
      location: 'Sydney, Australia',
      experience: 3,
    },
  });

  // 2. Employer Account
  const employerAccount = await prisma.user.upsert({
    where: { email: 'employer@example.com' },
    update: {},
    create: {
      name: 'Sarah Johnson',
      email: 'employer@example.com',
      password: hashedPassword,
      role: UserRole.EMPLOYER,
      bio: 'Tech company hiring manager',
      location: 'Melbourne, Australia',
    },
  });

  // 3. Admin Account
  const admin = await prisma.user.upsert({
    where: { email: 'admin@gowork.dev' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@gowork.dev',
      password: hashedPassword,
      role: UserRole.ADMIN,
      bio: 'System administrator',
      location: 'Sydney, Australia',
    },
  });

  console.log({ jobSeeker, employerAccount, admin });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

