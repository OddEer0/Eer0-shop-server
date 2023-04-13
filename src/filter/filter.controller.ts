import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { CreateFilterDto } from './dto/createFilter.dto'
import { FilterService } from './filter.service'
import { Roles } from '@/common/decorators/rolesAuth.decorator'
import { RoleEnum } from '@/common/types/Roles'

@Controller('filter')
export class FilterController {
	constructor(private filterService: FilterService) {}

	@Roles(RoleEnum.admin, RoleEnum.employee, RoleEnum.moderator, RoleEnum.developer)
	@Get()
	getAllFilter() {
		return this.filterService.getAllFilter()
	}

	@Roles(RoleEnum.admin, RoleEnum.employee, RoleEnum.moderator, RoleEnum.developer)
	@Post()
	createFilter(@Body() filterDto: CreateFilterDto) {
		return this.filterService.createFilter(filterDto)
	}

	@Roles(RoleEnum.admin, RoleEnum.employee, RoleEnum.moderator, RoleEnum.developer)
	@Get(':id')
	getFilterById(@Param('id') id: string) {
		return this.filterService.getFilterById(id)
	}

	@Roles(RoleEnum.admin, RoleEnum.employee, RoleEnum.moderator, RoleEnum.developer)
	@Get('/category/:id')
	getFilterByCategoryId(@Param('id') id: string) {
		return this.filterService.getFiltersByCategoryId(id)
	}
}
