import { PipeTransform } from '@nestjs/common'
import { ITransformBaseQueryDto, TransformBaseQueryDto } from '../dtos/transformBaseQuery.dto'
import { IBaseQuery } from '../types/Query.types'

export interface ITransformBaseQueryPipe {
	base: IBaseQuery
	other: any
}

export class TransformBaseQueryPipe implements PipeTransform {
	constructor(private options: ITransformBaseQueryDto) {}

	async transform(value: any) {
		const query = new TransformBaseQueryDto(value, this.options)

		return query
	}
}
