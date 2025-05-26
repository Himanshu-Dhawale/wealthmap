-- CreateTable
CREATE TABLE "Property" (
    "id" TEXT NOT NULL,
    "formattedAddress" TEXT NOT NULL,
    "addressLine1" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "county" TEXT,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "propertyType" TEXT NOT NULL,
    "bedrooms" INTEGER,
    "bathrooms" INTEGER,
    "squareFootage" INTEGER NOT NULL,
    "lotSize" INTEGER,
    "yearBuilt" INTEGER,
    "image" TEXT,
    "taxValue" DOUBLE PRECISION,
    "landValue" DOUBLE PRECISION,
    "improvementValue" DOUBLE PRECISION,
    "ownerName" TEXT,
    "ownerType" TEXT,
    "companyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Property_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
