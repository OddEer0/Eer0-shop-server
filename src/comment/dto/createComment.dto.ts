import { TypeValidation } from '@/common/constants/validation'
import { IsString, MaxLength, MinLength } from 'class-validator'
import { MAX_DESCRIPTION_LENGTH, MIN_DESCRIPTION_LENGTH } from '../comment.const'

export class CreateCommentDto {
	@IsString({ message: TypeValidation.IS_STRING })
	@MinLength(3, { message: MIN_DESCRIPTION_LENGTH })
	@MaxLength(255, { message: MAX_DESCRIPTION_LENGTH })
	readonly description: string

	@IsString({ message: TypeValidation.IS_STRING })
	readonly userId: string

	@IsString({ message: TypeValidation.IS_STRING })
	readonly deviceId: string
}
