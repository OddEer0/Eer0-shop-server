import { PipeTransform } from '@nestjs/common'
import { TransformDeviceQueryDto } from '../dto/transformDeviceQuery.dto'

export class TransformDeviceQueryPipe implements PipeTransform {
	transform(value: any) {
		const query = new TransformDeviceQueryDto(value)

		return query
	}
}
