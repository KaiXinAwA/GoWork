-- CreateTable
CREATE TABLE "User" (
    "userid" SERIAL NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "email" VARCHAR(100) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userid")
);

-- CreateTable
CREATE TABLE "Company" (
    "companyid" SERIAL NOT NULL,
    "company_name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "contact_number" VARCHAR(20),
    "country_state" VARCHAR(100),
    "address" VARCHAR(255),
    "license" VARCHAR(100),
    "license_status" VARCHAR(50),
    "company_photo" VARCHAR(255),

    CONSTRAINT "Company_pkey" PRIMARY KEY ("companyid")
);

-- CreateTable
CREATE TABLE "Job" (
    "jobid" SERIAL NOT NULL,
    "companyid" INTEGER NOT NULL,
    "position" VARCHAR(100) NOT NULL,
    "typesofwork" VARCHAR(100),
    "salaryrange" VARCHAR(50),
    "requirements" TEXT,
    "contactdetails" TEXT,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("jobid")
);

-- CreateTable
CREATE TABLE "Resume" (
    "resumeid" SERIAL NOT NULL,
    "userid" INTEGER NOT NULL,
    "filename" VARCHAR(255) NOT NULL,
    "filepath" VARCHAR(255) NOT NULL,
    "education" TEXT,
    "language" TEXT,

    CONSTRAINT "Resume_pkey" PRIMARY KEY ("resumeid")
);

-- CreateTable
CREATE TABLE "Application" (
    "applicationid" SERIAL NOT NULL,
    "userid" INTEGER NOT NULL,
    "jobid" INTEGER NOT NULL,
    "resumeid" INTEGER,
    "applicationdate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("applicationid")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Company_email_key" ON "Company"("email");

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_companyid_fkey" FOREIGN KEY ("companyid") REFERENCES "Company"("companyid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resume" ADD CONSTRAINT "Resume_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("userid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("userid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_jobid_fkey" FOREIGN KEY ("jobid") REFERENCES "Job"("jobid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_resumeid_fkey" FOREIGN KEY ("resumeid") REFERENCES "Resume"("resumeid") ON DELETE SET NULL ON UPDATE CASCADE;
