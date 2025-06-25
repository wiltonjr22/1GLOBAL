import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { DeviceEntity, DeviceState } from "../../commom/entities/device.entities";
import { CreateDeviceDto } from "../../presentation/dtos/create.dto";
import { UpdateDeviceDto } from "../../presentation/dtos/update.dto";
import { IDeviceService } from "../interfaces/device.service";
import { IDeviceRepository } from "../../infra/interfaces/device.repository";

@Injectable()
export class DeviceService implements IDeviceService {
  constructor(private readonly deviceRepository: IDeviceRepository) {
    // put logs to information of service
  }

  async create(createDeviceDto: CreateDeviceDto): Promise<void> {
    await this.deviceRepository.create(createDeviceDto);
  }

  async findAll(): Promise<DeviceEntity[]> {
    return await this.deviceRepository.findAll();
    // limit the number of devices returned (possible problem with too many devices)
  }

  async findOne(id: number): Promise<DeviceEntity> {
    const device = await this.deviceRepository.findById(id);
    if (!device) throw new NotFoundException("Device not found");
    return device;
  }

  async findByBrand(brand: string): Promise<DeviceEntity[]> {
    return await this.deviceRepository.findByBrand(brand);
    // limit the number of devices returned (possible problem with too many devices)
  }

  async findByState(state: DeviceState): Promise<DeviceEntity[]> {
    return await this.deviceRepository.findByState(state);
    // limit the number of devices returned (possible problem with too many devices)
  }

  async update(id: number, updateDto: UpdateDeviceDto): Promise<DeviceEntity> {
    const device = await this.findOne(id);

    if (
      device.state === DeviceState.IN_USE &&
      (updateDto.name !== undefined || updateDto.brand !== undefined)
    ) {
      throw new BadRequestException("Name and brand cannot be updated if device is in use");
    }

    return await this.deviceRepository.update(id, updateDto);
  }

  async remove(id: number): Promise<void> {
    // better to keep the record and just change the state from available to unavailable or perhaps create another column in the table to manage devices that have been asked to be deleted but still keep the data for BI decision-making.
    const device = await this.findOne(id);
    if (device.state === DeviceState.IN_USE) {
      throw new BadRequestException("In use devices cannot be deleted");
    }
    await this.deviceRepository.delete(id);
  }
}

