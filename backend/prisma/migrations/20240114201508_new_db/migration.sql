/*
  Warnings:

  - Added the required column `status` to the `Seat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Seat` ADD COLUMN `status` ENUM('AVAILABLE', 'TAKEN') NOT NULL;
