import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { CreateFilterDto } from './dto/createFilter.dto'
import { FilterService } from './filter.service'

@Controller('filter')
export class FilterController {
	constructor(private filterService: FilterService) {}

	@Get()
	getAllFilter() {
		return this.filterService.getAllFilter()
	}

	@Post()
	createFilter(@Body() filterDto: CreateFilterDto) {
		return this.filterService.createFilter(filterDto)
	}

	@Get(':id')
	getFilterById(@Param('id') id: string) {
		return this.filterService.getFilterById(id)
	}

	@Get('/category/:id')
	getFilterByCategoryId(@Param('id') id: string) {
		return this.filterService.getFiltersByCategoryId(id)
	}
}
