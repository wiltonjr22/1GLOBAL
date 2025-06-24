-- CreateTable
CREATE TABLE "Device" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "brand" VARCHAR(30) NOT NULL,
    "state" VARCHAR(20) NOT NULL,
    "creationTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Device_pkey" PRIMARY KEY ("id")
);
