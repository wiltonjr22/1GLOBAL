import { Test, TestingModule } from "@nestjs/testing";
import { DeviceService } from "./device.service";
import { DeviceRepository } from "../../infra/repositories/device.repository";
import { DeviceEntity, DeviceState } from "../../commom/entities/device.entities";
import { NotFoundException, BadRequestException } from "@nestjs/common";
import { CreateDeviceDto } from "../../presentation/dtos/create.dto";
import { UpdateDeviceDto } from "../../presentation/dtos/update.dto";

const deviceMock: DeviceEntity = {
  id: 1,
  name: "Device 1",
  brand: "Brand A",
  state: DeviceState.AVAILABLE,
  creationTime: new Date(),
};

describe("DeviceService", () => {
  let service: DeviceService;
  let repository: jest.Mocked<DeviceRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeviceService,
        {
          provide: DeviceRepository,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findById: jest.fn(),
            findByBrand: jest.fn(),
            findByState: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<DeviceService>(DeviceService);
    repository = module.get(DeviceRepository);
  });

  it("should create a device", async () => {
    const dto: CreateDeviceDto = { name: "Device 1", brand: "Brand A", state: DeviceState.AVAILABLE };
    repository.create.mockResolvedValue(undefined);
    await expect(service.create(dto)).resolves.toBeUndefined();
    expect(repository.create).toHaveBeenCalledWith(dto);
  });

  it("should return all devices", async () => {
    repository.findAll.mockResolvedValue([deviceMock]);
    await expect(service.findAll()).resolves.toEqual([deviceMock]);
  });

  it("should return a device by id", async () => {
    repository.findById.mockResolvedValue(deviceMock);
    await expect(service.findOne(1)).resolves.toEqual(deviceMock);
  });

  it("should throw NotFoundException if device not found", async () => {
    repository.findById.mockResolvedValue(null);
    await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
  });

  it("should return devices by brand", async () => {
    repository.findByBrand.mockResolvedValue([deviceMock]);
    await expect(service.findByBrand("Brand A")).resolves.toEqual([deviceMock]);
  });

  it("should return devices by state", async () => {
    repository.findByState.mockResolvedValue([deviceMock]);
    await expect(service.findByState(DeviceState.AVAILABLE)).resolves.toEqual([deviceMock]);
  });

  it("should update a device", async () => {
    const updateDto: UpdateDeviceDto = { name: "Updated" };
    repository.findById.mockResolvedValue(deviceMock);
    repository.update.mockResolvedValue({ ...deviceMock, ...updateDto });
    await expect(service.update(1, updateDto)).resolves.toEqual({ ...deviceMock, ...updateDto });
  });

  it("should not update name/brand if device is in use", async () => {
    const updateDto: UpdateDeviceDto = { name: "Updated" };
    repository.findById.mockResolvedValue({ ...deviceMock, state: DeviceState.IN_USE });
    await expect(service.update(1, updateDto)).rejects.toThrow(BadRequestException);
  });

  it("should delete a device", async () => {
    repository.findById.mockResolvedValue(deviceMock);
    repository.delete.mockResolvedValue(undefined);
    await expect(service.remove(1)).resolves.toBeUndefined();
  });

  it("should not delete a device if in use", async () => {
    repository.findById.mockResolvedValue({ ...deviceMock, state: DeviceState.IN_USE });
    await expect(service.remove(1)).rejects.toThrow(BadRequestException);
  });
});