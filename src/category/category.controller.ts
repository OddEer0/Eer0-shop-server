import { Body, Controller, Get, Post } from '@nestjs/common'
import { CategoryService } from './category.service'
import { CreateCategoryDto } from './dto/createCategory.dto'

@Controller('category')
export class CategoryController {
	constructor(private categoryService: CategoryService) {}

	async getCategoryById(id: string) {}

	@Post()
	async createCategory(@Body() categoryDto: CreateCategoryDto) {
		return this.categoryService.createCategory(categoryDto)
	}

	@Get()
	async getAllCategory() {
		return this.categoryService.getAllCategory()
	}
}
