import { TransformBaseQueryDto } from '@/common/dtos/transformBaseQuery.dto'
import { ArgumentMetadata, PipeTransform } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { TransformIncludeQueryDto } from '@/common/dtos/transformIncludeQuery.dto'
import { DEVICE_INCLUDE_KEYS } from '@/common/constants/includeKeys'

export class TransformGetAllDevicePipe implements PipeTransform {
	transform(value: any, metadata: ArgumentMetadata) {
		const query = {} as Prisma.DeviceFindManyArgs

		const baseQuery = new TransformBaseQueryDto(value, {
			maxLimit: 100,
			minLimit: 2,
			sortBy: 'createdAt',
			sortByValidFields: ['createdAt'],
			limit: 30,
			order: 'desc',
			page: 1
		})

		query.take = baseQuery.base.limit
		query.skip = (baseQuery.base.page - 1) * baseQuery.base.limit
		query.orderBy = {
			[baseQuery.base.sortBy]: baseQuery.base.order
		}

		if (value.info) {
			query.where = { infos: { some: { value: { startsWith: value.info } } } }
		}

		query.include = new TransformIncludeQueryDto<Prisma.DeviceInclude>(value.include, DEVICE_INCLUDE_KEYS).include

		return query
	}
}
