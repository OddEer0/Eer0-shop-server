import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateBrandDto } from './dto/createBrand.dto'
import { BRAND_IS_HAVE, BRAND_NOT_FOUND } from './brand.const'

@Injectable()
export class BrandService {
	constructor(private prismaService: PrismaService) {}

	async create(dto: CreateBrandDto) {
		const candidate = await this.prismaService.brand.findUnique({ where: { name: dto.name } })
		if (candidate) {
			throw new BadRequestException(BRAND_IS_HAVE)
		}

		return await this.prismaService.brand.create({ data: dto })
	}

	async getOne(id: string) {
		const brand = await this.prismaService.brand.findUnique({ where: { id } })

		if (!brand) {
			throw new NotFoundException(BRAND_NOT_FOUND)
		}

		return brand
	}

	async getAll() {
		const brands = await this.prismaService.brand.findMany()
		return brands
	}

	async getBrandsByCategoryId(id: string) {
		return await this.prismaService.brand.findMany({
			where: { categories: { some: { id } } }
		})
	}
}
