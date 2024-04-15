import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common'
import { CategoryService } from './category.service'
import { CreateCategoryDto } from './dto/createCategory.dto'
import { UpdateCategoryDto } from './dto/updateCategory.dto'
import { Roles } from '@/common/decorators/rolesAuth.decorator'
import { RoleEnum } from '@/common/types/Roles'
import { FileInterceptor } from '@nestjs/platform-express'

@Controller('category')
export class CategoryController {
	constructor(private categoryService: CategoryService) {}

	@Roles(RoleEnum.admin, RoleEnum.developer, RoleEnum.moderator, RoleEnum.employee)
	@UseInterceptors(FileInterceptor('img'))
	@Post()
	createCategory(@Body() categoryDto: CreateCategoryDto, @UploadedFile() img: Express.Multer.File) {
		return this.categoryService.create(categoryDto, img)
	}

	@Get()
	getAllCategory() {
		return this.categoryService.getAll()
	}

	@Get(':id')
	getOneCategory(@Param('id') id: string) {
		return this.categoryService.getOne(id)
	}

	@Roles(RoleEnum.admin, RoleEnum.developer, RoleEnum.moderator, RoleEnum.employee)
	@Put(':id')
	updateCategory(@Param('id') id: string, @Body() updateDto: UpdateCategoryDto) {
		return this.categoryService.update(id, updateDto)
	}

	@Roles(RoleEnum.admin, RoleEnum.developer)
	@Delete(':id')
	deleteCategory(@Param('id') id: string) {
		return this.categoryService.delete(id)
	}
}
