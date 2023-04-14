import { IBaseQuery } from '@/common/types/Query.types'
import { Prisma } from '@prisma/client'

export interface IDeviceQuery extends IBaseQuery {
	category: string
	isOnlyCash?: Prisma.NestedIntFilter
	isStock?: Prisma.NestedIntFilter
	price?: Prisma.NestedIntFilter
	brand?: string
}
