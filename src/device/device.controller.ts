import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common'
import { DeviceService } from './device.service'
import { CreateDeviceDto } from './dto/createDevice.dto'
import { Roles } from '@/common/decorators/rolesAuth.decorator'
import { RoleEnum } from '@/common/types/Roles'
import { TransformDeviceQueryPipe } from './pipes/transformDeviceQuery.pipe'
import { Prisma } from '@prisma/client'
import { TransformOneDeviceQueryPipe } from './pipes/transformOneDeviceQuery.pipe'

@Controller('device')
export class DeviceController {
	constructor(private deviceService: DeviceService) {}

	@Roles(RoleEnum.admin, RoleEnum.developer, RoleEnum.employee, RoleEnum.moderator)
	@Post()
	createDevice(@Body() deviceDto: CreateDeviceDto) {
		return this.deviceService.create(deviceDto)
	}

	@Get()
	getFilteredAndSortedDevice(@Query(TransformDeviceQueryPipe) query: Prisma.DeviceFindManyArgs) {
		return this.deviceService.getSortAndFiltered(query)
	}

	@Roles(RoleEnum.admin, RoleEnum.developer, RoleEnum.employee, RoleEnum.moderator)
	@Delete(':id')
	deleteDevice(@Param('id') id: string) {
		return this.deviceService.deleteOne(id)
	}

	@Get(':id')
	getOneDevice(@Param('id') id: string, @Query(TransformOneDeviceQueryPipe) include: Prisma.DeviceInclude) {
		return this.deviceService.getOne(id, include)
	}
}
