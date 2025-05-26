/*
  Warnings:

  - You are about to drop the column `email` on the `Report` table. All the data in the column will be lost.
  - You are about to drop the column `estimatedWorth` on the `Report` table. All the data in the column will be lost.
  - You are about to drop the column `industry` on the `Report` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Report` table. All the data in the column will be lost.
  - You are about to drop the column `reviewedByAdmin` on the `Report` table. All the data in the column will be lost.
  - You are about to drop the column `submittedById` on the `Report` table. All the data in the column will be lost.
  - You are about to drop the column `wealthSource` on the `Report` table. All the data in the column will be lost.
  - You are about to drop the `_CompanyToReport` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `contactEmail` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdById` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estimatedNetWorth` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `primaryIndustry` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `primaryLocation` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sourceOfWealth` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Report` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ReportStatus" AS ENUM ('NEW', 'REVIEWED');

-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_submittedById_fkey";

-- DropForeignKey
ALTER TABLE "_CompanyToReport" DROP CONSTRAINT "_CompanyToReport_A_fkey";

-- DropForeignKey
ALTER TABLE "_CompanyToReport" DROP CONSTRAINT "_CompanyToReport_B_fkey";

-- AlterTable
ALTER TABLE "Report" DROP COLUMN "email",
DROP COLUMN "estimatedWorth",
DROP COLUMN "industry",
DROP COLUMN "location",
DROP COLUMN "reviewedByAdmin",
DROP COLUMN "submittedById",
DROP COLUMN "wealthSource",
ADD COLUMN     "contactEmail" TEXT NOT NULL,
ADD COLUMN     "createdById" TEXT NOT NULL,
ADD COLUMN     "estimatedNetWorth" INTEGER NOT NULL,
ADD COLUMN     "primaryIndustry" TEXT NOT NULL,
ADD COLUMN     "primaryLocation" TEXT NOT NULL,
ADD COLUMN     "sourceOfWealth" TEXT NOT NULL,
ADD COLUMN     "status" "ReportStatus" NOT NULL DEFAULT 'NEW',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "_CompanyToReport";

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
