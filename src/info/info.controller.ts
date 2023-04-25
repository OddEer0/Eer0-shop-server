import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common'
import { CreateInfoDto } from './dto/createInfo.dto'
import { InfoService } from './info.service'
import { Roles } from '@/common/decorators/rolesAuth.decorator'
import { RoleEnum } from '@/common/types/Roles'
import { ITransformBaseQueryPipe } from '@/common/pipes/transformBaseQuery.pipe'
import { TransformGetByDeviceId } from './pipes/transformGetByDevice.pipe'

@Controller('info')
export class InfoController {
	constructor(private infoService: InfoService) {}

	@Roles(RoleEnum.admin, RoleEnum.employee, RoleEnum.moderator, RoleEnum.developer)
	@Post()
	createInfo(@Body() infoDto: CreateInfoDto) {
		return this.infoService.create(infoDto)
	}

	@Roles(RoleEnum.admin, RoleEnum.employee, RoleEnum.moderator, RoleEnum.developer)
	@Get()
	getAllInfo() {
		return this.infoService.getAll()
	}

	@Get('device/:id')
	getInfoByDeviceId(
		@Query(TransformGetByDeviceId)
		query: ITransformBaseQueryPipe,
		@Param('id') id: string
	) {
		return this.infoService.getByDeviceId(id, query)
	}
}
