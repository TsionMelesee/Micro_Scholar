/*
  Warnings:

  - The primary key for the `donation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `scholarshiprequest` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `donation` DROP FOREIGN KEY `Donation_donorId_fkey`;

-- DropForeignKey
ALTER TABLE `donation` DROP FOREIGN KEY `Donation_requestId_fkey`;

-- DropForeignKey
ALTER TABLE `scholarshiprequest` DROP FOREIGN KEY `ScholarshipRequest_studentId_fkey`;

-- DropIndex
DROP INDEX `Donation_donorId_fkey` ON `donation`;

-- DropIndex
DROP INDEX `Donation_requestId_fkey` ON `donation`;

-- DropIndex
DROP INDEX `ScholarshipRequest_studentId_fkey` ON `scholarshiprequest`;

-- AlterTable
ALTER TABLE `donation` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `donorId` VARCHAR(191) NOT NULL,
    MODIFY `requestId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `scholarshiprequest` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `studentId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `role` ENUM('STUDENT', 'DONOR', 'ADMIN') NOT NULL DEFAULT 'STUDENT',
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `ScholarshipRequest` ADD CONSTRAINT `ScholarshipRequest_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Donation` ADD CONSTRAINT `Donation_donorId_fkey` FOREIGN KEY (`donorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Donation` ADD CONSTRAINT `Donation_requestId_fkey` FOREIGN KEY (`requestId`) REFERENCES `ScholarshipRequest`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
