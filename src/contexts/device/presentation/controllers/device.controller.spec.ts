import { Test, TestingModule } from "@nestjs/testing";
import { DeviceController } from "./device.controller";
import { DeviceService } from "../../application/services/device.service";
import { DeviceState } from "../../commom/entities/device.entities";
import { CreateDeviceDto } from "../dtos/create.dto";
import { UpdateDeviceDto } from "../dtos/update.dto";

const deviceMock = {
  id: 1,
  name: "Device 1",
  brand: "Brand A",
  state: DeviceState.AVAILABLE,
  creationTime: new Date(),
};

describe("DeviceController", () => {
  let controller: DeviceController;
  let service: jest.Mocked<DeviceService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeviceController],
      providers: [
        {
          provide: DeviceService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findByBrand: jest.fn(),
            findByState: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<DeviceController>(DeviceController);
    service = module.get(DeviceService);
  });

  it("should create a device", async () => {
    const dto: CreateDeviceDto = { name: "Device 1", brand: "Brand A", state: DeviceState.AVAILABLE };
    service.create.mockResolvedValue(undefined);
    await expect(controller.create(dto)).resolves.toBeUndefined();
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it("should return all devices", async () => {
    service.findAll.mockResolvedValue([deviceMock]);
    await expect(controller.findAll()).resolves.toEqual([deviceMock]);
  });

  it("should return devices by brand", async () => {
    service.findByBrand.mockResolvedValue([deviceMock]);
    await expect(controller.findByBrand("Brand A")).resolves.toEqual([deviceMock]);
  });

  it("should return devices by state", async () => {
    service.findByState.mockResolvedValue([deviceMock]);
    await expect(controller.findByState(DeviceState.AVAILABLE)).resolves.toEqual([deviceMock]);
  });

  it("should return a device by id", async () => {
    service.findOne.mockResolvedValue(deviceMock);
    await expect(controller.findOne(1)).resolves.toEqual(deviceMock);
  });

  it("should update a device", async () => {
    const updateDto: UpdateDeviceDto = { name: "Updated" };
    service.update.mockResolvedValue({ ...deviceMock, ...updateDto });
    await expect(controller.update(1, updateDto)).resolves.toEqual({ ...deviceMock, ...updateDto });
  });

  it("should delete a device", async () => {
    service.remove.mockResolvedValue(undefined);
    await expect(controller.remove(1)).resolves.toBeUndefined();
  });
});