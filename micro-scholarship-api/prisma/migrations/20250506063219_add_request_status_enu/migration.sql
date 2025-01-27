/*
  Warnings:

  - You are about to alter the column `status` on the `scholarshiprequest` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `VarChar(191)`.
  - Added the required column `documentUrl` to the `ScholarshipRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `scholarshiprequest` ADD COLUMN `documentUrl` VARCHAR(191) NOT NULL,
    MODIFY `status` VARCHAR(191) NOT NULL;
