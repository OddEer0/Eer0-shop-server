import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateFilterDto } from './dto/createFilter.dto'

@Injectable()
export class FilterService {
	constructor(private prismaService: PrismaService) {}

	async getAllFilter() {
		return await this.prismaService.filter.findMany()
	}

	async getFilterById(id: string) {
		return await this.prismaService.filter.findUnique({ where: { id } })
	}

	async createFilter(dto: CreateFilterDto) {
		const filter = await this.prismaService.filter.create({ data: dto })
		return filter
	}

	async getFiltersByCategoryId(id: string) {
		return await this.prismaService.filter.findMany({ where: { categoryId: id }, include: { infos: true } })
	}
}
