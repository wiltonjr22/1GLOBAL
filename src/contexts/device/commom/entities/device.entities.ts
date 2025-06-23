import { Expose } from "class-transformer";
import { IsEnum, IsString, IsDate, IsUUID } from "class-validator";

export enum DeviceState {
  AVAILABLE = "available",
  IN_USE = "in-use",
  INACTIVE = "inactive",
}

export class DeviceFactoryEntity {
  @Expose({ name: "name" })
  @IsString()
  name: string;

  @Expose({ name: "brand" })
  @IsString()
  brand: string;

  @Expose({ name: "state" })
  @IsEnum(DeviceState)
  state: DeviceState;

  @Expose({ name: "creationTime" })
  @IsDate()
  creationTime: Date;
}

export class DeviceEntity extends DeviceFactoryEntity {
  @Expose({ name: "id" })
  @IsUUID()
  id: string;
}