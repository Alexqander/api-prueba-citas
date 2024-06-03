/*
  Warnings:

  - A unique constraint covering the columns `[folio]` on the table `Appointment` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Appointment_folio_key" ON "Appointment"("folio");
