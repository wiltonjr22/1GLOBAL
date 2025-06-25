import { DeviceEntity, DeviceState } from "../../commom/entities/device.entities";
import { CreateDeviceDto } from "../../presentation/dtos/create.dto";
import { UpdateDeviceDto } from "../../presentation/dtos/update.dto";

export interface IDeviceService {
  create(createDeviceDto: CreateDeviceDto): Promise<void>;
  findAll(): Promise<DeviceEntity[]>;
  findOne(id: number): Promise<DeviceEntity>;
  findByBrand(brand: string): Promise<DeviceEntity[]>;
  findByState(state: DeviceState): Promise<DeviceEntity[]>;
  update(id: number, updateDto: UpdateDeviceDto): Promise<DeviceEntity>;
  remove(id: number): Promise<void>;
}