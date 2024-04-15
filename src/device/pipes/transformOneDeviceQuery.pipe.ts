import { DEVICE_INCLUDE_KEYS } from '@/common/constants/includeKeys'
import { TransformIncludeQueryDto } from '@/common/dtos/transformIncludeQuery.dto'
import { ArgumentMetadata, PipeTransform } from '@nestjs/common'
import { Prisma } from '@prisma/client'

export class TransformOneDeviceQueryPipe implements PipeTransform {
	transform(value: any, metadata: ArgumentMetadata) {
		const include = new TransformIncludeQueryDto<Prisma.DeviceInclude>(value.include, DEVICE_INCLUDE_KEYS).include

		return include
	}
}
