import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common'
import { CategoryService } from './category.service'
import { CreateCategoryDto } from './dto/createCategory.dto'
import { UpdateCategoryDto } from './dto/updateCategory.dto'
import { Roles } from '@/common/decorators/rolesAuth.decorator'
import { RoleEnum } from '@/common/types/Roles'

@Controller('category')
export class CategoryController {
	constructor(private categoryService: CategoryService) {}

	@Roles(RoleEnum.admin, RoleEnum.developer, RoleEnum.moderator, RoleEnum.employee)
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

	@Roles(RoleEnum.admin, RoleEnum.developer, RoleEnum.moderator, RoleEnum.employee)
	@Put(':id')
	updateCategory(@Param('id') id: string, @Body() updateDto: UpdateCategoryDto) {
		return this.categoryService.updateCategory(id, updateDto)
	}
}
