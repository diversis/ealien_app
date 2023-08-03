/*
  Warnings:

  - A unique constraint covering the columns `[paypalID]` on the table `Order` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "paypalID" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Order_paypalID_key" ON "Order"("paypalID");
