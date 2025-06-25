import { DeviceEntity, DeviceState } from "../../commom/entities/device.entities";
import { CreateDeviceDto } from "../../presentation/dtos/create.dto";
import { UpdateDeviceDto } from "../../presentation/dtos/update.dto";

export abstract class IDeviceRepository {
  abstract create(data: CreateDeviceDto): Promise<void>;
  abstract findAll(): Promise<DeviceEntity[]>;
  abstract findById(id: number): Promise<DeviceEntity | null>;
  abstract findByBrand(brand: string): Promise<DeviceEntity[]>;
  abstract findByState(state: DeviceState): Promise<DeviceEntity[]>;
  abstract update(id: number, data: UpdateDeviceDto): Promise<DeviceEntity>;
  abstract delete(id: number): Promise<void>;
}