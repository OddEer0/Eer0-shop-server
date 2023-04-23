import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateCategoryDto } from './dto/createCategory.dto'
import { UpdateCategoryDto } from './dto/updateCategory.dto'
import { CATEGORY_EXISTS, CATEGORY_NOT_FOUND } from './category.const'

@Injectable()
export class CategoryService {
	constructor(private prismaService: PrismaService) {}

	async create(dto: CreateCategoryDto) {
		const candidate = await this.prismaService.category.findUnique({ where: { name: dto.name } })
		if (candidate) {
			throw new BadRequestException(CATEGORY_EXISTS)
		}

		return await this.prismaService.category.create({ data: dto })
	}

	async getAll() {
		const categories = await this.prismaService.category.findMany()
		return categories
	}

	async getOne(id: string) {
		const category = await this.prismaService.category.findUnique({
			where: { id }
		})
		if (!category) {
			throw new NotFoundException(CATEGORY_NOT_FOUND)
		}

		return category
	}

	async update(id: string, dto: UpdateCategoryDto) {
		const candidate = await this.prismaService.category.findUnique({ where: { id } })
		if (!candidate) {
			throw new NotFoundException(CATEGORY_NOT_FOUND)
		}

		return await this.prismaService.category.update({
			where: { id },
			data: dto
		})
	}

	async getCategoryById(id: string) {
		const category = await this.prismaService.category.findUnique({
			where: { id }
		})
		return category
	}

	async addBrandToCategory(categoryId: string, brandId: string) {
		const candidate = this.prismaService.category.findFirst({
			where: { id: categoryId, brands: { some: { id: brandId } } }
		})

		if (candidate) {
			const category = await this.prismaService.category.update({
				where: { id: categoryId },
				data: { brands: { connect: { id: brandId } } }
			})

			return category
		}
	}
}
