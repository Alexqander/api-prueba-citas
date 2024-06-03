/*
  Warnings:

  - A unique constraint covering the columns `[status]` on the table `AppointmentStatus` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "AppointmentStatus_status_key" ON "AppointmentStatus"("status");
