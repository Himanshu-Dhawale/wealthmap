/*
  Warnings:

  - You are about to drop the column `contactEmail` on the `Report` table. All the data in the column will be lost.
  - You are about to drop the column `createdById` on the `Report` table. All the data in the column will be lost.
  - You are about to drop the column `estimatedNetWorth` on the `Report` table. All the data in the column will be lost.
  - You are about to drop the column `primaryIndustry` on the `Report` table. All the data in the column will be lost.
  - You are about to drop the column `primaryLocation` on the `Report` table. All the data in the column will be lost.
  - You are about to drop the column `sourceOfWealth` on the `Report` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Report` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Report` table. All the data in the column will be lost.
  - Added the required column `email` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estimatedWorth` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `industry` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `submittedById` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wealthSource` to the `Report` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_companyId_fkey";

-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_createdById_fkey";

-- AlterTable
ALTER TABLE "Report" DROP COLUMN "contactEmail",
DROP COLUMN "createdById",
DROP COLUMN "estimatedNetWorth",
DROP COLUMN "primaryIndustry",
DROP COLUMN "primaryLocation",
DROP COLUMN "sourceOfWealth",
DROP COLUMN "status",
DROP COLUMN "updatedAt",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "estimatedWorth" INTEGER NOT NULL,
ADD COLUMN     "industry" TEXT NOT NULL,
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "reviewedByAdmin" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "submittedById" TEXT NOT NULL,
ADD COLUMN     "wealthSource" TEXT NOT NULL;

-- DropEnum
DROP TYPE "ReportStatus";

-- CreateTable
CREATE TABLE "_CompanyToReport" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_CompanyToReport_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_CompanyToReport_B_index" ON "_CompanyToReport"("B");

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_submittedById_fkey" FOREIGN KEY ("submittedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CompanyToReport" ADD CONSTRAINT "_CompanyToReport_A_fkey" FOREIGN KEY ("A") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CompanyToReport" ADD CONSTRAINT "_CompanyToReport_B_fkey" FOREIGN KEY ("B") REFERENCES "Report"("id") ON DELETE CASCADE ON UPDATE CASCADE;
