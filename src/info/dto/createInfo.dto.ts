import { TypeValidation } from '@/common/constants/validation'
import { IsString } from 'class-validator'

export class CreateInfoDto {
	@IsString({ message: TypeValidation.IS_STRING })
	readonly name: string

	@IsString({ message: TypeValidation.IS_STRING })
	readonly title: string

	@IsString({ message: TypeValidation.IS_STRING })
	readonly value: string

	@IsString({ message: TypeValidation.IS_STRING })
	readonly filterId: string
}
