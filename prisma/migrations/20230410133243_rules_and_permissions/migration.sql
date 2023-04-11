/*
  Warnings:

  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('ADMIN', 'USER');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ADD COLUMN     "roles" "Roles"[] DEFAULT ARRAY['USER']::"Roles"[],
ALTER COLUMN "permissions" SET DEFAULT ARRAY['USER_VIEWER']::"Permission"[];

-- DropEnum
DROP TYPE "Role";
