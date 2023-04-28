import { TypeValidation } from '@/common/constants/validation'
import { MAX_DESCRIPTION_LENGTH, MIN_DESCRIPTION_LENGTH } from '../comment.const'
import { IsString, MaxLength, MinLength } from 'class-validator'

export class UpdateCommentDto {
	@IsString({ message: TypeValidation.IS_STRING })
	@MinLength(3, { message: MIN_DESCRIPTION_LENGTH })
	@MaxLength(255, { message: MAX_DESCRIPTION_LENGTH })
	readonly description: string
}
