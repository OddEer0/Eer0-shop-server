import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateCategoryDto } from './dto/createCategory.dto'
import { UpdateCategoryDto } from './dto/updateCategory.dto'
import { CATEGORY_EXISTS, CATEGORY_NOT_FOUND } from './category.const'
import { FilesService } from 'src/files/files.service'

@Injectable()
export class CategoryService {
	constructor(private prismaService: PrismaService, private fileService: FilesService) {}

	async create(dto: CreateCategoryDto, image: Express.Multer.File) {
		const candidate = await this.prismaService.category.findUnique({ where: { name: dto.name } })
		if (candidate) {
			throw new BadRequestException(CATEGORY_EXISTS)
		}
		const fileName = await this.fileService.createFile(image)

		return await this.prismaService.category.create({ data: { ...dto, img: fileName } })
	}

	async delete(id: string) {
		await this.prismaService.filter.deleteMany({ where: { categoryId: id } })
		await this.prismaService.category.delete({ where: { id } })
		return 'Категория удалена'
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
		return await this.prismaService.category.findUnique({
			where: { id }
		})
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
