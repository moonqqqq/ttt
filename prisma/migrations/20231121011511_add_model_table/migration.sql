-- CreateEnum
CREATE TYPE "ModelPurpose" AS ENUM ('residence', 'accommodation');

-- CreateTable
CREATE TABLE "Model" (
    "id" TEXT NOT NULL,
    "representativeImageURL" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "purpose" "ModelPurpose" NOT NULL,
    "imageURL" TEXT NOT NULL,
    "minPrice" INTEGER NOT NULL,

    CONSTRAINT "Model_pkey" PRIMARY KEY ("id")
);
