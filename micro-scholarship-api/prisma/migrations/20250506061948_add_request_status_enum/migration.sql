/*
  Warnings:

  - You are about to alter the column `status` on the `scholarshiprequest` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(1))`.

*/
-- AlterTable
ALTER TABLE `scholarshiprequest` MODIFY `status` ENUM('PENDING', 'APPROVED', 'FUNDED') NOT NULL DEFAULT 'PENDING';
