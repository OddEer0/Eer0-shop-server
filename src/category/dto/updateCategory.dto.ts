import { TypeValidation } from '@/common/constants/validation'
import { IsString } from 'class-validator'

export class UpdateCategoryDto {
	@IsString({ message: TypeValidation.IS_STRING })
	readonly id?: string

	@IsString({ message: TypeValidation.IS_STRING })
	readonly name?: string

	@IsString({ message: TypeValidation.IS_STRING })
	readonly title?: string
}
