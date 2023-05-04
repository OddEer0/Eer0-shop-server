import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from '@nestjs/common'
import { DeviceService } from './device.service'
import { CreateDeviceDto } from './dto/createDevice.dto'
import { Roles } from '@/common/decorators/rolesAuth.decorator'
import { RoleEnum } from '@/common/types/Roles'
import { TransformDeviceQueryPipe } from './pipes/transformDeviceQuery.pipe'
import { Prisma, User } from '@prisma/client'
import { TransformOneDeviceQueryPipe } from './pipes/transformOneDeviceQuery.pipe'
import { BuyDeviceDtoController, BuyManyDeviceDto } from './dto/buyDevice.dto'
import { JwtAuthGuard } from '@/common/guards/jwtAuthGuard.guard'
import { GetUser } from '@/common/decorators/user.decorator'

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

	@UseGuards(JwtAuthGuard)
	@Post('/buy/:id')
	buyDevice(@Param('id') id: string, @Body() dto: BuyDeviceDtoController, @GetUser() user: User) {
		return this.deviceService.buy({ count: dto.count, userId: user.id, deviceId: id })
	}

	@UseGuards(JwtAuthGuard)
	@Post('/buy-many')
	buyDevices(@GetUser() user: User, @Body() dto: BuyManyDeviceDto[]) {
		return this.deviceService.buyMany(dto, user.id)
	}
}
