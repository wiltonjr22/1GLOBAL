import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { DeviceEntity, DeviceState } from "../../commom/entities/device.entities";
import { CreateDeviceDto } from "../../presentation/dtos/create.dto";
import { UpdateDeviceDto } from "../../presentation/dtos/update.dto";
import { IDeviceService } from "../interfaces/device.service";
import { IDeviceRepository } from "../../infra/interfaces/device.repository";

@Injectable()
export class DeviceService implements IDeviceService {
  constructor(private readonly deviceRepository: IDeviceRepository) { }

  async create(createDeviceDto: CreateDeviceDto): Promise<void> {
    this.deviceRepository.create(createDeviceDto);
  }

  async findAll(): Promise<DeviceEntity[]> {
    return this.deviceRepository.findAll();
  }

  async findOne(id: number): Promise<DeviceEntity> {
    const device = await this.deviceRepository.findById(id);
    if (!device) throw new NotFoundException("Device not found");
    return device;
  }

  async findByBrand(brand: string): Promise<DeviceEntity[]> {
    return this.deviceRepository.findByBrand(brand);
  }

  async findByState(state: DeviceState): Promise<DeviceEntity[]> {
    return this.deviceRepository.findByState(state);
  }

  async update(id: number, updateDto: UpdateDeviceDto): Promise<DeviceEntity> {
    const device = await this.findOne(id);

    if (
      device.state === DeviceState.IN_USE &&
      (updateDto.name !== undefined || updateDto.brand !== undefined)
    ) {
      throw new BadRequestException("Name and brand cannot be updated if device is in use");
    }

    return this.deviceRepository.update(id, updateDto);
  }

  async remove(id: number): Promise<void> {
    const device = await this.findOne(id);
    if (device.state === DeviceState.IN_USE) {
      throw new BadRequestException("In use devices cannot be deleted");
    }
    await this.deviceRepository.delete(id);
  }
}