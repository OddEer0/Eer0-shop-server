import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common'
import { CreateFilterDto } from './dto/createFilter.dto'
import { FilterService } from './filter.service'
import { Roles } from '@/common/decorators/rolesAuth.decorator'
import { RoleEnum } from '@/common/types/Roles'
import { TransformBaseQueryPipe } from '@/common/pipes/transformBaseQuery.pipe'
import { TransformBaseQueryDto } from '@/common/dtos/transformBaseQuery.dto'

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

	@Get('/category/:id')
	getFiltersByCategoryId(@Param('id') id: string) {
		return this.filterService.getFiltersByCategoryId(id)
	}

	@Delete(':id')
	deleteFilter(@Param('id') id: string) {
		return this.filterService.deleteFilter(id)
	}
}
