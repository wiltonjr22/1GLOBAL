import { Module } from "@nestjs/common";
import { DeviceService } from "./application/services/device.service";
import { DeviceRepository } from "./infra/repositories/device.repository";
import { PrismaService } from "@/resources/database/prisma/prisma.service";
import { DeviceController } from "./presentation/controllers/device.controller";

@Module({
  controllers: [DeviceController],
  providers: [DeviceService, DeviceRepository, PrismaService],
  exports: [DeviceService, DeviceRepository],
})
export class DeviceModule { }