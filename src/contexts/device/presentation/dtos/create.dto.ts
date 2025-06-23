import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { DeviceState } from "../../commom/entities/device.entities";

export class CreateDeviceDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  brand: string;

  @ApiProperty({ enum: DeviceState, default: DeviceState.AVAILABLE })
  @IsEnum(DeviceState)
  state: DeviceState;
}