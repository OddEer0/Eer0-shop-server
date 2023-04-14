import { TransformBaseQueryDto } from '@/common/dtos/transformBaseQuery.dto'
import { Prisma } from '@prisma/client'
import { IDeviceQuery } from '../types/Query.types'

export class TransformDeviceQueryDto {
	base: IDeviceQuery
	other: any

	constructor(queryObj: any) {
		const query = new TransformBaseQueryDto(queryObj, { sortBy: 'rate' })
		const { category, isOnlyCash, isStock, minprice, maxprice, brand, ...other } = query.other
		this.base = query.base as IDeviceQuery

		this.base.category = category
		this.base.isOnlyCash = isOnlyCash ? {} : { gt: 0 }
		this.base.isStock = isStock ? { gt: 0 } : {}
		this.base.price = this.transformPrice(minprice, maxprice)
		this.base.brand = brand

		this.other = other
	}

	private transformPrice(min: string, max: string) {
		const priceFilter = {} as Prisma.NestedIntFilter

		if (min) {
			priceFilter.gt = +min
		}
		if (max) {
			priceFilter.lt = +max
		}

		return priceFilter
	}
}
