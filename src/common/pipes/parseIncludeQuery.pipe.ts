import { ArgumentMetadata, PipeTransform } from '@nestjs/common'
import { TransformIncludeQueryDto } from '../dtos/transformIncludeQuery.dto'

export interface IParseIncludeQueryPipe<T> {
	include: undefined | T
	query: any
}

export class ParseIncludeQueryPipe<T = unknown> implements PipeTransform {
	constructor(private includeValues: Array<keyof T>) {}

	transform(value: any, metadata: ArgumentMetadata) {
		if (metadata.type !== 'query') {
			return value
		}

		const { include, ...other } = value

		const parsedInclude = new TransformIncludeQueryDto(include, this.includeValues)

		return {
			include: parsedInclude,
			query: other
		}
	}
}
