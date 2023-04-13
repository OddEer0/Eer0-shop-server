import { Body, Controller, Get, Post } from '@nestjs/common'
import { CreateInfoDto } from './dto/createInfo.dto'
import { InfoService } from './info.service'
import { Roles } from '@/common/decorators/rolesAuth.decorator'
import { RoleEnum } from '@/common/types/Roles'

@Controller('info')
export class InfoController {
	constructor(private infoService: InfoService) {}

	@Roles(RoleEnum.admin, RoleEnum.employee, RoleEnum.moderator, RoleEnum.developer)
	@Post()
	createInfo(@Body() infoDto: CreateInfoDto) {
		return this.infoService.createInfo(infoDto)
	}

	@Roles(RoleEnum.admin, RoleEnum.employee, RoleEnum.moderator, RoleEnum.developer)
	@Get()
	getAllInfo() {
		return this.infoService.getAllInfo()
	}
}
