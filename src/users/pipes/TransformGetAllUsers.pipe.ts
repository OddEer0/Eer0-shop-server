import { USER_INCLUDE_KEYS } from '@/common/constants/includeKeys'
import { TransformIncludeQueryDto } from '@/common/dtos/transformIncludeQuery.dto'
import { PipeTransform } from '@nestjs/common'
import { Prisma } from '@prisma/client'

export class TransformGetAllUsersPipe implements PipeTransform {
	async transform(value: any) {
		const result = {} as Prisma.UserFindManyArgs
		result.include = new TransformIncludeQueryDto<Prisma.UserInclude>(value.include, USER_INCLUDE_KEYS).include

		return result
	}
}
