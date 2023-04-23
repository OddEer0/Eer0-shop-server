import { TypeValidation } from '@/common/constants/validation'
import { IsNumber, IsString, ValidateIf } from 'class-validator'

export class CreateFilterDto {
	@IsString({ message: TypeValidation.IS_NUMBER })
	readonly name: string

	@IsString({ message: TypeValidation.IS_NUMBER })
	readonly type: string

	@IsString({ message: TypeValidation.IS_NUMBER })
	readonly title: string

	@IsNumber({}, { message: TypeValidation.IS_NUMBER })
	@ValidateIf((obj, value) => value !== null)
	readonly maxValue: null | number

	@IsNumber({}, { message: TypeValidation.IS_NUMBER })
	@ValidateIf((obj, value) => value !== null)
	readonly minValue: null | number

	@IsString({ message: TypeValidation.IS_NUMBER })
	readonly categoryId: string
}
