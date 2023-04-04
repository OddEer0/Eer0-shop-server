import { ForbiddenException, HttpStatus, Injectable, Req } from '@nestjs/common'
import { BrandService } from 'src/brand/brand.service'
import { CategoryService } from 'src/category/category.service'
import { InfoService } from 'src/info/info.service'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateDeviceDto } from './dto/createDevice.dto'
import { Request } from 'express'

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

	async getAllDevice() {
		const devices = await this.prismaService.device.findMany({ include: { brand: true, category: true, infos: true } })
		return devices
	}

	async getFilteredAndSortDevice(req: Request) {
		if (!this.validateFilterQuery(req.query)) {
			throw new ForbiddenException(HttpStatus.BAD_REQUEST)
		}
		const { sortBy, order, limit, page, category, isonlycash, isstock, maxprice, minprice, brand, ...otherQuery } =
			req.query

		const sortby = sortBy ? (sortBy as string) : 'price'
		const $order = order ? (order as string) : 'desc'
		const isOnlyCash = isonlycash ? {} : { gt: 0 }
		const isStock = isstock ? { gt: 0 } : {}
		const priceFilter = {} as any
		if (minprice) {
			priceFilter.gt = +minprice
		}
		if (maxprice) {
			priceFilter.lt = +maxprice
		}

		const orArray = this.brandQueryToOrArray(brand as string)

		const andArray = this.queriesToAndArray(otherQuery)

		const deviceCount = await this.prismaService.device.count({
			where: {
				categoryId: category as string,
				count: isOnlyCash,
				stock: isStock,
				price: priceFilter,
				AND: andArray,
				OR: orArray
			}
		})

		const pageCount = Math.ceil(deviceCount / +limit)

		const devices = await this.prismaService.device.findMany({
			take: +limit,
			skip: (+page - 1) * +limit,
			orderBy: {
				[sortby]: $order
			},
			where: {
				categoryId: category as string,
				count: isOnlyCash,
				stock: isStock,
				price: priceFilter,
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

	private validateFilterQuery(query: any) {
		if (!query.page || !query.limit || !query.category) {
			return false
		}
		return true
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
}
