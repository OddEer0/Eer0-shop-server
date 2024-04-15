import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateFilterDto } from './dto/createFilter.dto'
import { FILTER_EXISTS, FILTER_NOT_FOUND } from './filter.const'

@Injectable()
export class FilterService {
	constructor(private prismaService: PrismaService) {}

	async getAll() {
		return await this.prismaService.filter.findMany()
	}

	async getOne(id: string) {
		const filter = await this.prismaService.filter.findUnique({ where: { id } })
		if (!filter) {
			throw new NotFoundException(FILTER_NOT_FOUND)
		}

		return filter
	}

	async getFilterById(id: string) {
		return await this.prismaService.filter.findUnique({ where: { id } })
	}

	async create(dto: CreateFilterDto) {
		const candidate = await this.prismaService.filter.findFirst({
			where: { categoryId: dto.categoryId, name: dto.name }
		})
		if (candidate) {
			throw new BadRequestException(FILTER_EXISTS)
		}

		return await this.prismaService.filter.create({ data: dto })
	}

	async getFiltersByCategoryId(id: string) {
		return await this.prismaService.filter.findMany({ where: { categoryId: id }, include: { infos: true } })
	}

	async delete(id: string) {
		const isHave = await this.prismaService.filter.findUnique({ where: { id } })

		if (!isHave) {
			throw new NotFoundException(FILTER_NOT_FOUND)
		}

		await this.prismaService.filter.delete({ where: { id } })
		return 'Удалено'
	}
}
