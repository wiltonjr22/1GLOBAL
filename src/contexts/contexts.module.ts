import { Module } from "@nestjs/common";
import { HealthModule } from "./health/health.module";
import { DeviceModule } from "./device/device.module";

@Module({
  imports: [HealthModule, DeviceModule],
})
export class ContextsModule { }