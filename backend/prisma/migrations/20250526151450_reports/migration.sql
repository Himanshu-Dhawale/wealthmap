-- CreateEnum
CREATE TYPE "ReportStatus" AS ENUM ('NEW', 'REVIEWED');

-- CreateTable
CREATE TABLE "Report" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "estimatedNetWorth" INTEGER NOT NULL,
    "primaryLocation" TEXT NOT NULL,
    "contactEmail" TEXT NOT NULL,
    "primaryIndustry" TEXT NOT NULL,
    "sourceOfWealth" TEXT NOT NULL,
    "propertyTypes" TEXT[],
    "description" TEXT NOT NULL,
    "propertyDetails" TEXT NOT NULL,
    "confidenceScore" INTEGER NOT NULL,
    "lastContactDate" TIMESTAMP(3),
    "status" "ReportStatus" NOT NULL DEFAULT 'NEW',
    "createdById" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
