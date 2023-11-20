-- CreateEnum
CREATE TYPE "MediaType" AS ENUM ('news', 'video');

-- CreateTable
CREATE TABLE "Media" (
    "id" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "publisher" TEXT NOT NULL,
    "uploadedAt" TIMESTAMPTZ(3) NOT NULL,
    "type" "MediaType" NOT NULL,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);
