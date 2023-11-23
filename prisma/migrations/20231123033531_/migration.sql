/*
  Warnings:

  - You are about to drop the `PortfolioImage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PortfolioImage" DROP CONSTRAINT "PortfolioImage_portfolioId_fkey";

-- AlterTable
ALTER TABLE "Portfolio" ADD COLUMN     "images" TEXT[];

-- DropTable
DROP TABLE "PortfolioImage";
