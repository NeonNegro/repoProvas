/*
  Warnings:

  - The primary key for the `teachersDisciplines` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `TeacherId` on the `teachersDisciplines` table. All the data in the column will be lost.
  - Added the required column `teacherId` to the `teachersDisciplines` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "teachersDisciplines" DROP CONSTRAINT "teachersDisciplines_TeacherId_fkey";

-- DropForeignKey
ALTER TABLE "tests" DROP CONSTRAINT "tests_disciplineId_teacherId_fkey";

-- AlterTable
ALTER TABLE "teachersDisciplines" DROP CONSTRAINT "teachersDisciplines_pkey",
DROP COLUMN "TeacherId",
ADD COLUMN     "teacherId" INTEGER NOT NULL,
ADD CONSTRAINT "teachersDisciplines_pkey" PRIMARY KEY ("disciplineId", "teacherId");

-- AddForeignKey
ALTER TABLE "tests" ADD CONSTRAINT "tests_disciplineId_teacherId_fkey" FOREIGN KEY ("disciplineId", "teacherId") REFERENCES "teachersDisciplines"("disciplineId", "teacherId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teachersDisciplines" ADD CONSTRAINT "teachersDisciplines_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "teachers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
