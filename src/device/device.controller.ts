import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common'
import { DeviceService } from './device.service'
import { CreateDeviceDto } from './dto/createDevice.dto'
import { Roles } from '@/common/decorators/rolesAuth.decorator'
import { RoleEnum } from '@/common/types/Roles'
import { TransformDeviceQueryPipe } from './pipes/transformDeviceQuery.pipes'
import { Prisma } from '@prisma/client'

@Controller('device')
export class DeviceController {
	constructor(private deviceService: DeviceService) {}

	@Roles(RoleEnum.admin, RoleEnum.developer, RoleEnum.employee, RoleEnum.moderator)
	@Post()
	createDevice(@Body() deviceDto: CreateDeviceDto) {
		return this.deviceService.createDevice(deviceDto)
	}

	@Get()
	getFilteredAndSortedDevice(@Query(TransformDeviceQueryPipe) query: Prisma.DeviceFindManyArgs) {
		return this.deviceService.getFilteredAndSortDevice(query)
	}

	@Roles(RoleEnum.admin, RoleEnum.developer, RoleEnum.employee, RoleEnum.moderator)
	@Delete(':id')
	deleteDevice(@Param('id') id: string) {
		return this.deviceService.deleteDevice(id)
	}

	@Get(':id')
	getOneDevice(@Param('id') id: string) {
		return this.deviceService.getDeviceById(id, true, true)
	}
}
