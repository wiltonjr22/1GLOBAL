import { Controller, Get, Post, Patch, Delete, Param, Body, Query } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { DeviceService } from "../../application/services/device.service";
import { CreateDeviceDto } from "../dtos/create.dto";
import { UpdateDeviceDto } from "../dtos/update.dto";
import { DeviceState } from "../../commom/entities/device.entities";

@ApiTags("Devices")
@Controller("devices")
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) { }

  @Post()
  @ApiOperation({ summary: "Create a new device" })
  async create(@Body() dto: CreateDeviceDto) {
    return this.deviceService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: "Fetch all devices" })
  async findAll() {
    return this.deviceService.findAll();
  }

  @Get("brand/:brand")
  @ApiOperation({ summary: "Fetch devices by brand" })
  async findByBrand(@Param("brand") brand: string) {
    return this.deviceService.findByBrand(brand);
  }

  @Get("state/:state")
  @ApiOperation({ summary: "Fetch devices by state" })
  async findByState(@Param("state") state: DeviceState) {
    return this.deviceService.findByState(state);
  }

  @Get(":id")
  @ApiOperation({ summary: "Fetch a single device" })
  async findOne(@Param("id") id: number) {
    return this.deviceService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update an existing device" })
  async update(@Param("id") id: number, @Body() dto: UpdateDeviceDto) {
    return this.deviceService.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a device" })
  async remove(@Param("id") id: number) {
    return this.deviceService.remove(id);
  }
}