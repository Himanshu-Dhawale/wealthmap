-- CreateTable
CREATE TABLE "PropertyBookmark" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PropertyBookmark_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PropertyBookmark" ADD CONSTRAINT "PropertyBookmark_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
