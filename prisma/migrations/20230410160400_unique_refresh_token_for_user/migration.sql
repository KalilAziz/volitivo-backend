/*
  Warnings:

  - You are about to drop the column `expiresIn` on the `RefreshToken` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `RefreshToken` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `expires_in` to the `RefreshToken` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RefreshToken" DROP COLUMN "expiresIn",
ADD COLUMN     "expires_in" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_user_id_key" ON "RefreshToken"("user_id");
