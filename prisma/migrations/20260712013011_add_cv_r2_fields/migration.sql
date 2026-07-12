-- AlterTable
ALTER TABLE "UserProfile" ADD COLUMN     "cvContentType" TEXT,
ADD COLUMN     "cvFileName" TEXT,
ADD COLUMN     "cvKey" TEXT,
ADD COLUMN     "cvSizeBytes" INTEGER,
ADD COLUMN     "cvUploadedAt" TIMESTAMP(3);
