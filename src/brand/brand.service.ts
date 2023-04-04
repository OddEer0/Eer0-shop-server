import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateBrandDto } from './dto/createBrand.dto'

@Injectable()
export class BrandService {
	constructor(private prismaService: PrismaService) {}

	async createBrand(dto: CreateBrandDto) {
		const brand = await this.prismaService.brand.create({ data: dto })
		return brand
	}

	async getBrandById(id: string) {
		const brand = await this.prismaService.brand.findUnique({ where: { id } })
		return brand
	}

	async getAllBrand() {
		const brands = await this.prismaService.brand.findMany()
		return brands
	}

	async getBrandsByCategoryId(id: string) {
		return await this.prismaService.brand.findMany({
			where: { categories: { some: { id } } }
		})
	}
}
