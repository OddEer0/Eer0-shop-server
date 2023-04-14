import { BadRequestException, PipeTransform } from '@nestjs/common'
import { TransformDeviceQueryDto } from '../dto/transformDeviceQuery.dto'

export class TransformDeviceQueryPipe implements PipeTransform {
	transform(value: any) {
		const query = new TransformDeviceQueryDto(value)

		if (!query.base.category) {
			throw new BadRequestException()
		}

		return query
	}
}
