import { Body, Controller, Delete, Get, Param, Post, Req } from '@nestjs/common'
import { DeviceService } from './device.service'
import { CreateDeviceDto } from './dto/createDevice.dto'
import { Request } from 'express'
import { Roles } from '@/common/decorators/rolesAuth.decorator'
import { RoleEnum } from '@/common/types/Roles'

@Controller('device')
export class DeviceController {
	constructor(private deviceService: DeviceService) {}

	@Roles(RoleEnum.admin, RoleEnum.developer, RoleEnum.employee, RoleEnum.moderator)
	@Post()
	createDevice(@Body() deviceDto: CreateDeviceDto) {
		return this.deviceService.createDevice(deviceDto)
	}

	@Get()
	getFilteredDevice(@Req() req: Request) {
		return this.deviceService.getFilteredAndSortDevice(req)
	}

	@Roles(RoleEnum.admin, RoleEnum.developer, RoleEnum.employee, RoleEnum.moderator)
	@Delete(':id')
	deleteDevice(@Param('id') id: string) {
		return this.deviceService.deleteDevice(id)
	}
}
