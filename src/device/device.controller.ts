import { Body, Controller, Delete, Get, Param, Post, Req } from '@nestjs/common'
import { DeviceService } from './device.service'
import { CreateDeviceDto } from './dto/createDevice.dto'
import { Request } from 'express'

@Controller('device')
export class DeviceController {
	constructor(private deviceService: DeviceService) {}

	@Post()
	createDevice(@Body() deviceDto: CreateDeviceDto) {
		return this.deviceService.createDevice(deviceDto)
	}

	@Get()
	getAllDevice(@Req() req: Request) {
		return this.deviceService.getFilteredAndSortDevice(req)
	}

	@Delete(':id')
	deleteDevice(@Param('id') id: string) {
		return this.deviceService.deleteDevice(id)
	}
}
