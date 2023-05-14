import { TypeValidation } from '@/common/constants/validation'
import { IsString } from 'class-validator'

export class CreateCategoryDto {
	@IsString({ message: TypeValidation.IS_STRING })
	readonly name: string

	@IsString({ message: TypeValidation.IS_STRING })
	readonly title: string
}
