import { TransformBaseQueryDto } from '@/common/dtos/transformBaseQuery.dto'
import { PipeTransform } from '@nestjs/common'

export class TransformGetByDeviceId implements PipeTransform {
	async transform(value: any) {
		const query = new TransformBaseQueryDto(value, {
			maxLimit: 100,
			minLimit: 1,
			sortBy: 'order',
			sortByValidFields: ['order'],
			limit: 10,
			order: 'asc',
			page: 1
		})

		return query
	}
}
