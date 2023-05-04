import { TypeValidation } from '@/common/constants/validation'
import { Transform } from 'class-transformer'
import { IsDate, IsDateString, IsString, ValidateIf } from 'class-validator'

export class DirtyUserDto {
	@IsString({ message: TypeValidation.IS_STRING })
	readonly nickname?: string

	@IsString({ message: TypeValidation.IS_STRING })
	readonly email?: string

	@IsString({ message: TypeValidation.IS_STRING })
	@ValidateIf((obj, value) => value !== null)
	readonly avatar?: null | string

	@IsString({ message: TypeValidation.IS_STRING })
	readonly firstName?: string

	@IsString({ message: TypeValidation.IS_STRING })
	readonly lastName?: string

	@IsDateString()
	@ValidateIf((obj, value) => value !== null)
	@Transform(({ value }) => (typeof value === 'number' ? new Date(value) : value))
	readonly birthday?: null | Date

	@IsString({ message: TypeValidation.IS_STRING })
	@ValidateIf((obj, value) => value !== null)
	readonly subTitle?: null | string
}
