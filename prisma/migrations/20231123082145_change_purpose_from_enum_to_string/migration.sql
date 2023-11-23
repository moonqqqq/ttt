/*
  Warnings:

  - Changed the type of `purpose` on the `Model` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Model" DROP COLUMN "purpose",
ADD COLUMN     "purpose" TEXT NOT NULL;

-- DropEnum
DROP TYPE "ModelPurpose";
