import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common'
import { CategoryService } from './category.service'
import { CreateCategoryDto } from './dto/createCategory.dto'
import { UpdateCategoryDto } from './dto/updateCategory.dto'

@Controller('category')
export class CategoryController {
	constructor(private categoryService: CategoryService) {}

	@Post()
	createCategory(@Body() categoryDto: CreateCategoryDto) {
		return this.categoryService.createCategory(categoryDto)
	}

	@Get()
	getAllCategory() {
		return this.categoryService.getAllCategory()
	}

	@Get(':id')
	getOneCategory(@Param('id') id: string) {
		return this.categoryService.getCategoryById(id)
	}

	@Put(':id')
	updateCategory(@Param('id') id: string, @Body() updateDto: UpdateCategoryDto) {
		return this.categoryService.updateCategory(id, updateDto)
	}
}
