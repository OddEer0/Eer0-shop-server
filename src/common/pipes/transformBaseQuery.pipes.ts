import { PipeTransform } from '@nestjs/common'
import { TransformBaseQueryDto } from '../dtos/transformBaseQuery.dto'

export class TransformBaseQueryPipe implements PipeTransform {
	constructor() {}

	async transform(value: any) {
		const query = new TransformBaseQueryDto(value)

		return query
	}
}
