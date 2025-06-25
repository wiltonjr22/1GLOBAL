import { Injectable } from "@nestjs/common";
import { DeviceEntity, DeviceState } from "../../commom/entities/device.entities";
import { PrismaService } from "@/resources/database/prisma/prisma.service";
import { CreateDeviceDto } from "../../presentation/dtos/create.dto";
import { IDeviceRepository } from "../interfaces/device.repository";
import { UpdateDeviceDto } from "../../presentation/dtos/update.dto";

@Injectable()
export class DeviceRepository implements IDeviceRepository {
  constructor(private readonly prisma: PrismaService) { }

  async create(data: CreateDeviceDto): Promise<void> {
    await this.prisma.device.create({
      data: {
        name: data.name,
        brand: data.brand,
        state: data.state,
      },
    });
  }

  async findAll(): Promise<DeviceEntity[]> {
    const devices = await this.prisma.device.findMany();
    return devices.map(this.toEntity);
  }

  async findById(id: number): Promise<DeviceEntity | null> {
    const device = await this.prisma.device.findUnique({ where: { id } });
    return this.toEntity(device);
  }

  async findByBrand(brand: string): Promise<DeviceEntity[]> {
    const devices = await this.prisma.device.findMany({ where: { brand } });
    return devices.map(this.toEntity);
  }

  async findByState(state: DeviceState): Promise<DeviceEntity[]> {
    const devices = await this.prisma.device.findMany({ where: { state } });
    return devices.map(this.toEntity);
  }

  async update(id: number, data: UpdateDeviceDto): Promise<DeviceEntity> {
    const device = await this.prisma.device.update({ where: { id }, data });
    return this.toEntity(device);
  }

  async delete(id: number): Promise<void> {
    await this.prisma.device.delete({ where: { id } });
  }

  private toEntity(device: any): DeviceEntity {
    if (!device) return null;
    return {
      ...device,
      state: device.state as DeviceState,
      creationTime: new Date(device.creationTime),
    };
  }
}