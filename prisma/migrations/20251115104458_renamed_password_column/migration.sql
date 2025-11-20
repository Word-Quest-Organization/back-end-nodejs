/*
  Warnings:

  - Added the required column `title` to the `grammar_books` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- AlterTable
ALTER TABLE "grammar_books" ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "usuarios" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';
