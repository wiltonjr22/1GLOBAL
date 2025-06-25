import { Module } from "@nestjs/common";
import { DeviceService } from "./application/services/device.service";
import { DeviceRepository } from "./infra/repositories/device.repository";
import { PrismaService } from "@/resources/database/prisma/prisma.service";
import { DeviceController } from "./presentation/controllers/device.controller";
import { IDeviceRepository } from "./infra/interfaces/device.repository";

@Module({
  controllers: [DeviceController],
  providers: [
    DeviceService,
    PrismaService,
    {
      provide: IDeviceRepository,
      useClass: DeviceRepository,
    },
  ],
  exports: [DeviceService, IDeviceRepository],
})
export class DeviceModule { }