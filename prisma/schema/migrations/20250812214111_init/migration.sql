-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- CreateEnum
CREATE TYPE "public"."AbsenceEntityType" AS ENUM ('CLINIC', 'EMPLOYEE');

-- CreateEnum
CREATE TYPE "public"."AbsenceEntity" AS ENUM ('Clinic', 'Employee');

-- CreateEnum
CREATE TYPE "public"."TimeFormat" AS ENUM ('TWELVE', 'TWENTYFOUR');

-- CreateEnum
CREATE TYPE "public"."EmploymentType" AS ENUM ('FULL_TIME', 'PART_TIME');

-- CreateEnum
CREATE TYPE "public"."HolidayEntityType" AS ENUM ('CLINIC', 'EMPLOYEE');

-- CreateEnum
CREATE TYPE "public"."HolidayEntity" AS ENUM ('Clinic', 'Employee');

-- CreateEnum
CREATE TYPE "public"."WorkingDayEntityType" AS ENUM ('CLINIC', 'EMPLOYEE');

-- CreateEnum
CREATE TYPE "public"."Weekday" AS ENUM ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY');

-- CreateEnum
CREATE TYPE "public"."WorkingDayEntity" AS ENUM ('Clinic', 'Employee');

-- CreateTable
CREATE TABLE "public"."Absence" (
    "id" TEXT NOT NULL DEFAULT uuid_generate_v4(),
    "name" TEXT NOT NULL,
    "rrule" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "entityType" "public"."AbsenceEntityType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "Entity" "public"."AbsenceEntity" NOT NULL,

    CONSTRAINT "Absence_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Clinic" (
    "id" TEXT NOT NULL DEFAULT uuid_generate_v4(),
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL,
    "timeFormat" "public"."TimeFormat" NOT NULL,

    CONSTRAINT "Clinic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Employee" (
    "id" TEXT NOT NULL DEFAULT uuid_generate_v4(),
    "name" TEXT NOT NULL,
    "profession" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "employmentType" "public"."EmploymentType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Holiday" (
    "id" TEXT NOT NULL DEFAULT uuid_generate_v4(),
    "name" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "entityId" TEXT NOT NULL,
    "entityType" "public"."HolidayEntityType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "Entity" "public"."HolidayEntity" NOT NULL,

    CONSTRAINT "Holiday_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Peripheral" (
    "id" TEXT NOT NULL DEFAULT uuid_generate_v4(),
    "name" TEXT NOT NULL,
    "imageId" TEXT,
    "imageName" TEXT,
    "vendorId" TEXT NOT NULL,
    "statusId" TEXT,
    "series" TEXT,
    "categoryId" TEXT,
    "weight" DOUBLE PRECISION,
    "sku" TEXT,
    "barcode" TEXT,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Peripheral_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PeripheralAttachment" (
    "id" TEXT NOT NULL DEFAULT uuid_generate_v4(),
    "fileId" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "fileType" TEXT NOT NULL,
    "peripheralId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PeripheralAttachment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PeripheralCategory" (
    "id" TEXT NOT NULL DEFAULT uuid_generate_v4(),
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PeripheralCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PeripheralStatus" (
    "id" TEXT NOT NULL DEFAULT uuid_generate_v4(),
    "name" TEXT NOT NULL,
    "description" TEXT,
    "color" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PeripheralStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PeripheralTag" (
    "id" TEXT NOT NULL DEFAULT uuid_generate_v4(),
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PeripheralTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PeripheralVendor" (
    "id" TEXT NOT NULL DEFAULT uuid_generate_v4(),
    "name" TEXT NOT NULL,
    "description" TEXT,
    "address" TEXT NOT NULL,
    "contact_name" TEXT NOT NULL,
    "contact_phone" TEXT NOT NULL,
    "contact_email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PeripheralVendor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Treatment" (
    "id" TEXT NOT NULL DEFAULT uuid_generate_v4(),
    "treatmentGroupId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Treatment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."TreatmentGroup" (
    "id" TEXT NOT NULL DEFAULT uuid_generate_v4(),
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TreatmentGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."WorkingDay" (
    "id" TEXT NOT NULL DEFAULT uuid_generate_v4(),
    "entityId" TEXT NOT NULL,
    "entityType" "public"."WorkingDayEntityType" NOT NULL,
    "weekday" "public"."Weekday" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "Entity" "public"."WorkingDayEntity" NOT NULL,

    CONSTRAINT "WorkingDay_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."TimeSlot" (
    "id" TEXT NOT NULL DEFAULT uuid_generate_v4(),
    "workingDayId" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TimeSlot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_EmployeeToTreatment" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_EmployeeToTreatment_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "public"."_PeripheralToPeripheralTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_PeripheralToPeripheralTag_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Clinic_email_key" ON "public"."Clinic"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_email_key" ON "public"."Employee"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Peripheral_imageId_key" ON "public"."Peripheral"("imageId");

-- CreateIndex
CREATE UNIQUE INDEX "Peripheral_sku_key" ON "public"."Peripheral"("sku");

-- CreateIndex
CREATE UNIQUE INDEX "Peripheral_barcode_key" ON "public"."Peripheral"("barcode");

-- CreateIndex
CREATE UNIQUE INDEX "PeripheralAttachment_fileId_key" ON "public"."PeripheralAttachment"("fileId");

-- CreateIndex
CREATE UNIQUE INDEX "PeripheralCategory_name_key" ON "public"."PeripheralCategory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "PeripheralStatus_name_key" ON "public"."PeripheralStatus"("name");

-- CreateIndex
CREATE UNIQUE INDEX "PeripheralTag_name_key" ON "public"."PeripheralTag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "PeripheralVendor_name_key" ON "public"."PeripheralVendor"("name");

-- CreateIndex
CREATE INDEX "_EmployeeToTreatment_B_index" ON "public"."_EmployeeToTreatment"("B");

-- CreateIndex
CREATE INDEX "_PeripheralToPeripheralTag_B_index" ON "public"."_PeripheralToPeripheralTag"("B");

-- AddForeignKey
ALTER TABLE "public"."Absence" ADD CONSTRAINT "absence_clinic_id" FOREIGN KEY ("entityId") REFERENCES "public"."Clinic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Absence" ADD CONSTRAINT "absence_employee_id" FOREIGN KEY ("entityId") REFERENCES "public"."Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Holiday" ADD CONSTRAINT "holiday_clinic_id" FOREIGN KEY ("entityId") REFERENCES "public"."Clinic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Holiday" ADD CONSTRAINT "holiday_employee_id" FOREIGN KEY ("entityId") REFERENCES "public"."Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Peripheral" ADD CONSTRAINT "Peripheral_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "public"."PeripheralVendor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Peripheral" ADD CONSTRAINT "Peripheral_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."PeripheralCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Peripheral" ADD CONSTRAINT "Peripheral_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "public"."PeripheralStatus"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PeripheralAttachment" ADD CONSTRAINT "PeripheralAttachment_peripheralId_fkey" FOREIGN KEY ("peripheralId") REFERENCES "public"."Peripheral"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Treatment" ADD CONSTRAINT "Treatment_treatmentGroupId_fkey" FOREIGN KEY ("treatmentGroupId") REFERENCES "public"."TreatmentGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."WorkingDay" ADD CONSTRAINT "holiday_clinic_id" FOREIGN KEY ("entityId") REFERENCES "public"."Clinic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."WorkingDay" ADD CONSTRAINT "holiday_employee_id" FOREIGN KEY ("entityId") REFERENCES "public"."Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TimeSlot" ADD CONSTRAINT "TimeSlot_workingDayId_fkey" FOREIGN KEY ("workingDayId") REFERENCES "public"."WorkingDay"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_EmployeeToTreatment" ADD CONSTRAINT "_EmployeeToTreatment_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_EmployeeToTreatment" ADD CONSTRAINT "_EmployeeToTreatment_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Treatment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_PeripheralToPeripheralTag" ADD CONSTRAINT "_PeripheralToPeripheralTag_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Peripheral"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_PeripheralToPeripheralTag" ADD CONSTRAINT "_PeripheralToPeripheralTag_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."PeripheralTag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
