import { ForbiddenException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common'
import { BrandService } from 'src/brand/brand.service'
import { CategoryService } from 'src/category/category.service'
import { InfoService } from 'src/info/info.service'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateDeviceDto } from './dto/createDevice.dto'
import { IDeviceQuery } from './types/Query.types'

@Injectable()
export class DeviceService {
	constructor(
		private prismaService: PrismaService,
		private brandService: BrandService,
		private categoryService: CategoryService,
		private infoService: InfoService
	) {}

	async createDevice(dto: CreateDeviceDto) {
		const brand = await this.brandService.getBrandById(dto.brandId)
		const category = await this.categoryService.getCategoryById(dto.categoryId)

		if (!brand || !category) {
			throw new ForbiddenException(HttpStatus.BAD_REQUEST)
		}

		await this.categoryService.addBrandToCategory(category.id, brand.id)

		const connectOrCreate = []

		for await (const info of dto.infos) {
			const infoData = await this.infoService.getInfoByFilterIdAndValue(info.filterId, info.value)
			if (infoData) {
				connectOrCreate.push({ id: infoData.id })
			} else {
				const newInfo = await this.infoService.createInfo(info)
				connectOrCreate.push({ id: newInfo.id })
			}
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

	async getFilteredAndSortDevice(baseSortParam: IDeviceQuery, otherFilterParam) {
		const orArray = this.brandQueryToOrArray(baseSortParam.brand)

		const andArray = this.queriesToAndArray(otherFilterParam)

		const deviceCount = await this.prismaService.device.count({
			where: {
				categoryId: baseSortParam.category,
				count: baseSortParam.isOnlyCash,
				stock: baseSortParam.isStock,
				price: baseSortParam.price,
				AND: andArray,
				OR: orArray
			}
		})

		const pageCount = Math.ceil(deviceCount / baseSortParam.limit)

		const devices = await this.prismaService.device.findMany({
			take: baseSortParam.limit,
			skip: (baseSortParam.page - 1) * baseSortParam.limit,
			orderBy: {
				[baseSortParam.sortBy]: baseSortParam.order
			},
			where: {
				categoryId: baseSortParam.category,
				count: baseSortParam.isOnlyCash,
				stock: baseSortParam.isStock,
				price: baseSortParam.price,
				AND: andArray,
				OR: orArray
			},
			include: { infos: true }
		})

		return {
			devices,
			pageCount
		}
	}

	private queryToOrInfoArray(name: string, value: string) {
		const arr = []
		value.split(',').forEach(val => {
			arr.push({ name, value: val })
		})
		return arr
	}

	private brandQueryToOrArray(value: string) {
		if (!value) return
		const arr = []
		value.split(',').forEach(val => {
			arr.push({ brand: { name: val } })
		})

		if (arr.length) {
			return arr
		}
		return
	}

	private queriesToAndArray(query: any) {
		const entries = Object.entries<string>(query)
		const andArray = []

		entries.forEach(entry => {
			const orArray = this.queryToOrInfoArray(...entry)
			andArray.push({ infos: { some: { OR: orArray } } })
		})

		return andArray
	}

	async deleteDevice(id: string) {
		await this.prismaService.device.delete({ where: { id } })
		return 'Девайс с ' + id + 'удалён'
	}

	async getDeviceById(id: string, withInfo?: boolean, withCount?: boolean) {
		const device = await this.prismaService.device.findUnique({
			where: { id },
			include: { infos: withInfo, _count: { select: { comment: withCount } } }
		})

		return device
	}
}
