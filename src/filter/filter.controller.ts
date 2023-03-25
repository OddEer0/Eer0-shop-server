import { Body, Controller, Get, Post } from '@nestjs/common'
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
}
