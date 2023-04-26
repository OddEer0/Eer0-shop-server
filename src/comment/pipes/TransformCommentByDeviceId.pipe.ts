import { TransformBaseQueryDto } from '@/common/dtos/transformBaseQuery.dto'
import { PipeTransform } from '@nestjs/common'

export class TransformCommentByDeviceId implements PipeTransform {
	transform(value: any) {
		const query = new TransformBaseQueryDto(value, {
			maxLimit: 100,
			minLimit: 3,
			sortByValidFields: ['createdAt'],
			sortBy: 'createdAt',
			limit: 5,
			order: 'asc',
			page: 1
		})

		return query.base
	}
}
