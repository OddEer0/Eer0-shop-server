import { ForbiddenException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common'
import { BrandService } from 'src/brand/brand.service'
import { CategoryService } from 'src/category/category.service'
import { InfoService } from 'src/info/info.service'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateDeviceDto } from './dto/createDevice.dto'
import { Prisma } from '@prisma/client'
import { DEVICE_NOT_FOUND } from './device.const'

@Injectable()
export class DeviceService {
	constructor(
		private prismaService: PrismaService,
		private brandService: BrandService,
		private categoryService: CategoryService,
		private infoService: InfoService
	) {}

	async create(dto: CreateDeviceDto) {
		const brand = await this.brandService.getOne(dto.brandId)
		const category = await this.categoryService.getCategoryById(dto.categoryId)

		if (!brand || !category) {
			throw new ForbiddenException(HttpStatus.BAD_REQUEST)
		}

		await this.categoryService.addBrandToCategory(category.id, brand.id)

		const connectOrCreate = []

		for await (const info of dto.infos) {
			const infoData = await this.infoService.getOrCreate(info)
			connectOrCreate.push({ id: infoData.id })
		}

		console.log(connectOrCreate)

		const device = this.prismaService.device.create({
			data: {
				...dto,
				infos: {
					connect: connectOrCreate
				}
			}
		})

		return device
	}

	async getSortAndFiltered(args: Prisma.DeviceFindManyArgs) {
		const deviceCount = await this.prismaService.device.count({ where: { ...args.where } })
		const devices = await this.prismaService.device.findMany({ ...args })

		return {
			devices,
			pageCount: Math.ceil(deviceCount / args.take)
		}
	}

	async deleteOne(id: string) {
		await this.prismaService.device.delete({ where: { id } })
		return 'Девайс с ' + id + 'удалён'
	}

	async getOne(id: string, include?: Prisma.DeviceInclude) {
		const device = await this.prismaService.device.findUnique({ where: { id }, include })

		if (!device) {
			throw new NotFoundException(DEVICE_NOT_FOUND)
		}

		return device
	}
}
