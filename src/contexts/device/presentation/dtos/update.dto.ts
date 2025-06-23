import { PartialType } from "@nestjs/swagger";
import { IsOptional, IsString, IsEnum } from "class-validator";
import { CreateDeviceDto } from "./create.dto";
import { DeviceState } from "../../commom/entities/device.entities";

export class UpdateDeviceDto extends PartialType(CreateDeviceDto) {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  brand?: string;

  @IsOptional()
  @IsEnum(DeviceState)
  state?: DeviceState;
}