import { TypeValidation } from '@/common/constants/validation'
import { IsString } from 'class-validator'

export class CreateRoleDto {
	@IsString({ message: TypeValidation.IS_STRING })
	readonly value: string

	@IsString({ message: TypeValidation.IS_STRING })
	readonly description: string
}
