import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateCategoryDto } from './dto/createCategory.dto'

@Injectable()
export class CategoryService {
	constructor(private prismaService: PrismaService) {}

	async createCategory(dto: CreateCategoryDto) {
		const category = await this.prismaService.category.create({ data: dto })
		return category
	}

	async getCategoryById(id: string) {
		const category = await this.prismaService.category.findUnique({
			where: { id },
			include: { brands: true, filters: true }
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

	async getAllCategory() {
		const categories = await this.prismaService.category.findMany()
		return categories
	}
}
