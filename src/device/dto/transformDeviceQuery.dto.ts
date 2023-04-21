import { Prisma } from '@prisma/client'
import { BadRequestException } from '@nestjs/common'

export class TransformDeviceQueryDto {
	base: Prisma.DeviceWhereInput
	other: any

	constructor(queryObj: any) {
		const { category, isOnlyCash, isStock, minprice, maxprice, ...other } = queryObj

		if (Array.isArray(category)) {
			throw new BadRequestException()
		}

		this.base = {}

		this.base.categoryId = category
		this.base.count = isOnlyCash ? {} : { gt: 0 }
		this.base.stock = isStock ? { gt: 0 } : {}
		this.base.price = this.transformPrice(minprice, maxprice)

		this.other = other
	}

	private transformPrice(min: string, max: string) {
		const priceFilter = {} as Prisma.NestedIntFilter

		const $min = +min
		const $max = +max

		if ($min) {
			priceFilter.gt = +min
		}
		if ($max) {
			priceFilter.lt = +max
		}

		return priceFilter
	}

	private validateInclude(include: string) {
		if (Array.isArray(include)) {
			throw new BadRequestException()
		}
		const keys = ['bookings', 'brand', 'carts', 'category', 'comment', 'infos', 'purchases', 'refound', 'rate']

		const result = {} as Prisma.DeviceInclude

		const includes = include.split(',')

		includes.forEach(include => {
			if (!keys.includes(include)) {
				throw new BadRequestException()
			}

			result[include] = true
		})

		return result
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
}
