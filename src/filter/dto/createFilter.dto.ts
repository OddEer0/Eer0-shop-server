import { TypeValidation } from '@/common/constants/validation'
import { IsString } from 'class-validator'

export class CreateFilterDto {
	@IsString({ message: TypeValidation.IS_NUMBER })
	readonly name: string

	@IsString({ message: TypeValidation.IS_NUMBER })
	readonly type: string

	@IsString({ message: TypeValidation.IS_NUMBER })
	readonly title: string

	readonly maxValue: null | number

	readonly minValue: null | number

	@IsString({ message: TypeValidation.IS_NUMBER })
	readonly categoryId: string
}
