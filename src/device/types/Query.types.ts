import { IBaseQuery } from '@/common/types/Query.types'
import { Prisma } from '@prisma/client'

export interface IDeviceWhereQuery extends IBaseQuery {
	categoryId: string
	count?: Prisma.NestedIntFilter
	stock?: Prisma.NestedIntFilter
	price?: Prisma.NestedIntFilter
	brand?: any[]
	include?: Prisma.DeviceInclude
}
