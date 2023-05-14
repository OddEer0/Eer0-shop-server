import { TypeValidation } from '@/common/constants/validation'
import { IsString, ValidateIf } from 'class-validator'

export class CreateHomeSliderDto {
	@IsString({ message: TypeValidation.IS_STRING })
	readonly title: string

	@IsString({ message: TypeValidation.IS_STRING })
	@ValidateIf((obj, value) => value !== null)
	readonly href: string
}
